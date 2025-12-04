import { GenerateContentConfig, GoogleGenAI } from "@google/genai";


// https://ai.google.dev/gemini-api/docs/text-generation?authuser=2



const ai = new GoogleGenAI({});

export async function accessModel(content:string,config:GenerateContentConfig) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: content, // blog text
    config:config
    
  });
  return response;
}


