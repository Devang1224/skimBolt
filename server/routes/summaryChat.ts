import { Router } from "express";
import { embedd, llm } from "../lib/geminiApi";
import base64 from "base-64";
import { withTimeout } from "../helpers/withTimeout";
import prisma from "../lib/db";




const router = Router();

router.post("/",async (req,res):Promise<any>=>{
    try{
        const {query,url} = req.body;
        if(!query || !url){
            res.status(400).json({
                message:"Some fields are missing",
                success:false,
            });
            return;
        }

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

        console.log("RELATED CONTEXTS: ",queryContext);


        res.status(200).json({
            message:"User query processed successfully",
            success:true
        });

    }catch(err){
        return res.status(500).json({
            message:"Unable to process user query",
            success:false,
            error:err
        })
    }
});


export default router;