import { Router } from "express";
import { embedd, llm } from "../lib/geminiApi";
import base64 from "base-64";
import { withTimeout } from "../helpers/withTimeout";
import prisma from "../lib/db";
import { summaryChatPrompt } from "../prompt";
import getRedisClient from "../lib/redis";




const router = Router();

router.post("/",async (req,res):Promise<any>=>{
    try{
        const {query,url,settings:userSettings} = req.body;
        const {id:userId} = req.user;

        if(!query.trim() || !url){
            res.status(400).json({
                message:"Some fields are missing",
                success:false,
            });
            return;
        }


         console.log("USER SETTINGS: ",userSettings );
        const hashedUrl = base64.encode(url);
        const embeddings = await withTimeout(
            embedd.embedQuery(query),
            60_000,
            "Embedding generation for user query"
          );
        if(!embeddings.length){
            throw new Error("Unable to generate embeddings");
        }
        const userQueryEmbedding = `[${embeddings.join(",")}]`;

        const queryContext = await prisma.$queryRaw<
        { content: string; similarity: number }[]
        >`
           SELECT content, 1 - (embedding <=> ${userQueryEmbedding}::vector) AS Similarity
           FROM blog_summary_chunks
           WHERE source_url = ${hashedUrl}
           ORDER BY embedding <=> ${userQueryEmbedding}::vector
           LIMIT 5;
        `;
        let contexts = queryContext
        .filter(c => c.similarity > 0.6)
        .sort((a, b) => b.similarity - a.similarity);
        
        if (contexts.length === 0) {
            contexts = queryContext
              .sort((a, b) => b.similarity - a.similarity)
        }

        if (contexts[0]?.similarity > 0.85) {
          contexts = contexts.slice(0, 1);
        } else {
          contexts = contexts.slice(0, 3);
        }

        const contextString = contexts
        .map((c, i) => `Context ${i + 1}:\n${c.content}`)
        .join("\n\n---\n\n");

        const key = `chat:${userId}:${hashedUrl}`;
        const redis = await getRedisClient();

        const existingChat = await redis?.get(key);
        const chat = existingChat ? JSON.parse(existingChat) : { messages: [] };
        chat.messages = chat.messages.slice(-8);
    //  console.log("CURRENT CHAT MESSAGES: ",chat.messages);
        const aiResp = await llm.invoke([
            {
                role:"system",
                content:`
                ${summaryChatPrompt}
                ====================================================
                  USER-CONTROLLED SETTINGS (DO NOT IGNORE)
                ====================================================
                        USER PREFERENCES:
                        - Tone: ${userSettings.tone}
                        - Language: ${userSettings.language}
                        - Length: ${userSettings.length}
                        
                        RULES:
                        - You MUST respect these settings.
                        - If "language" is provided, the ENTIRE content must be in that language.
                        - If "tone" is provided, adjust writing style but DO NOT change factual meaning.
                        - If any setting is missing, fall back to defaults: 
                          tone = "neutral", language = "English", length = "medium".
                ====================================================
                 PREVIOUS CHAT AS CONTEXT
                ====================================================
               - Treat all previous messages as part of a single ongoing conversation.
               - Use them to understand follow-up questions.
               - Do not restate information already provided unless the user asks.
                `
            },
            ...chat.messages,
            {
                role:'user',
                content: `
                  User question: ${query}
                  Relevant context: ${contextString}
                  `
            }
        ])
       
        const  userQueryAns = aiResp.content;
          
      if(redis){
        chat.messages.push({
          role:'user',
          content:query
        });
        chat.messages.push({
          role:'assistant',
          content:userQueryAns
        })
        await redis.set(key, JSON.stringify(chat), {
            EX: 60 * 60, // 1 hour
          });
        }
        

        res.status(200).json({
            message:"User query processed successfully",
            success:true,
            aiResp:userQueryAns
        });

    }catch(err:any){
        console.log("Unable to process user query: ",err);
       
        return res.status(500).json({
            message:"Unable to process user query",
            success:false,
            error:err
        })
    }
});


export default router;