import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { Document } from "langchain";
import { embedd, llm } from "../lib/geminiApi";
import { BASE_PROMPT } from "../prompt";

async function summarizeChunk(text:string):Promise<string>{
    
    const res = await llm.invoke([
        {
            role:'system',
            content:`${BASE_PROMPT}
            Summarize the following content into a concise, factual summary.
                - Preserve key ideas and important details
                - Remove redundancy
                - Write in neutral, clear language
                - Do NOT add information that is not present
                - Keep the summary compact and suitable as reusable Q&A context for other AI models.
            `
        },
        {
            role:'user',
            content:text
        }
    ])
    return res.content as string;
}


export async function chunkContent(content:string){
    try{

        const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 3000, chunkOverlap: 200 });
        const chunks = await splitter.splitText(content);
        const summarizedChunks = await Promise.all(chunks.map((item)=>summarizeChunk(item)));
        const embeddings = embedd.embedDocuments(summarizedChunks);
         
        


        console.log("splitted text: ",summarizedChunks);
        return summarizedChunks;
        // const summaryDocs = summarizedChunks.map((item)=>new Document({pageContent:item}))

      
 
    }catch(err){
        console.log("Error while chunking: ",err);
    }
}