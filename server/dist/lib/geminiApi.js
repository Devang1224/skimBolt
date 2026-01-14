"use strict";
// import { GenerateContentConfig, GoogleGenAI } from "@google/genai";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embedd = exports.llm = void 0;
const google_genai_1 = require("@langchain/google-genai");
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
exports.llm = new google_genai_1.ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature: 0,
    maxRetries: 2,
    apiKey: process.env.GOOGLE_API_KEY
});
exports.embedd = new google_genai_1.GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004",
    apiKey: process.env.GOOGLE_API_KEY
});
