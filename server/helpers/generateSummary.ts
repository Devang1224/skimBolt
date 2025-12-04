import { accessModel } from "../lib/geminiApi";
import { GET_SUMMARY } from "../prompt";
import { SUMMARY_LENGTH, TONE } from "../types";

export const generateSummary = async(
    content:string,
    tone:TONE,
    language:string,
    length:SUMMARY_LENGTH
)=>{
     if (!content || content.trim().length < 50) {
        throw new Error("Content is too short to summarize.");
      }

    try{
        const config = { systemInstruction: GET_SUMMARY(tone,length,language) };
        const summary = await accessModel(content,config);
          if (!summary) {
            throw new Error("Model returned an empty summary.");
          }
         return summary;
    
    }catch(err){
        console.error("Error generating summary: ",err);
        throw new Error("Summary generation failed. Please try again.");
    }
}