import { GoogleGenAI } from "@google/genai";
import { GET_SUMMARY } from "../prompt";

// https://ai.google.dev/gemini-api/docs/text-generation?authuser=2

const ai = new GoogleGenAI({});

export async function accessModel(content:string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: content, // blog text
    config:{
        systemInstruction: GET_SUMMARY 
    }
  });
  return response;
}



