import { llm } from "../lib/geminiApi";
import { GET_SUMMARY, masterSummaryPrompt } from "../prompt";
import { SUMMARY_LENGTH, TONE, UserSettings } from "../types";
import { withTimeout } from "./withTimeout";

export async function generateMasterSummary(summarizedChunks:string[],userSettings:UserSettings){
    try{
       const summarizedChunksString = summarizedChunks?.join(" ");
        const res = await withTimeout(
          llm.invoke([
            {
              role: "system",
              content: `${masterSummaryPrompt}
                      ====================================================
                        USER-CONTROLLED SETTINGS (DO NOT IGNORE)
                        ====================================================
                        USER PREFERENCES:
                        - Tone: ${userSettings.tone}
                        - Language: ${userSettings.language}
                        - Length: ${userSettings.length}
                        
                        RULES:
                        - You MUST respect these settings.
                        - If "language" is provided, the ENTIRE summary, glossary, and metadata must be in that language.
                        - If "tone" is provided, adjust writing style but DO NOT change factual meaning.
                        - If "length" is provided:
                            • "short" → 3–4 key points total
                            • "medium" → 5–8 key points
                            • "detailed" → 8–12 key points + fuller paragraphs
                        - If any setting is missing, fall back to defaults: 
                      
                        tone = "neutral", language = "English", length = "medium".
              `,
            },
            {
              role: "user",
              content: summarizedChunksString,
            },
          ]),
          30_000,
          "LLM generate master summary"
        );
       
        return res;

    }catch(err){
        console.log("Error while generating master summary",err);
        throw err;
    }
}