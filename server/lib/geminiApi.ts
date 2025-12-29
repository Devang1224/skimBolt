// import { GenerateContentConfig, GoogleGenAI } from "@google/genai";

import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";


// // https://ai.google.dev/gemini-api/docs/text-generation?authuser=2



// const ai = new GoogleGenAI({});

// export async function accessModel(content:string,config:GenerateContentConfig) {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: content, // blog text
//     config:config
    
//   });
//   return response;
// }

export const llm = new ChatGoogleGenerativeAI({
  model:"gemini-2.5-flash",
  temperature:0,
  maxRetries:2,
  apiKey:process.env.GOOGLE_API_KEY
});


export const embedd= new GoogleGenerativeAIEmbeddings({
   model: "text-embedding-004",
   apiKey:process.env.GOOGLE_API_KEY
})
