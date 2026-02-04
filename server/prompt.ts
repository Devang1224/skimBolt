

import { SUMMARY_LENGTH, TONE } from "./types";


export const GET_SUMMARY = (tone:TONE,length:SUMMARY_LENGTH,language:string) => `
${process.env.GET_SUMMARY_PROMPT || ""}
====================================================
USER-CONTROLLED SETTINGS (DO NOT IGNORE)
====================================================
USER PREFERENCES:
- Tone: ${tone}
- Language: ${language}
- Length: ${length}

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

`;

export const BASE_PROMPT = process.env.BASE_PROMPT || "";

export const masterSummaryPrompt = `
${BASE_PROMPT}
${process.env.MASTER_SUMMARY_PROMPT || ""}
 ` 

export const summaryChatPrompt = `
${BASE_PROMPT}
${process.env.SUMMARY_CHAT_PROMPT || ""}

`;