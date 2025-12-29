"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkContent = void 0;
const textsplitters_1 = require("@langchain/textsplitters");
const geminiApi_1 = require("../lib/geminiApi");
const prompt_1 = require("../prompt");
function summarizeChunk(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield geminiApi_1.llm.invoke([
            {
                role: 'system',
                content: `${prompt_1.BASE_PROMPT}
            Summarize the following content into a concise, factual summary.
                - Preserve key ideas and important details
                - Remove redundancy
                - Write in neutral, clear language
                - Do NOT add information that is not present
                - Keep the summary compact and suitable as reusable Q&A context for other AI models.
            `
            },
            {
                role: 'user',
                content: text
            }
        ]);
        return res;
    });
}
function chunkContent(content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const splitter = new textsplitters_1.RecursiveCharacterTextSplitter({ chunkSize: 3000, chunkOverlap: 200 });
            const chunks = yield splitter.splitText(content);
            const summarizedChunks = yield Promise.all(chunks.map((item) => summarizeChunk(item)));
            const summaries = summarizedChunks.map((item) => item.content);
            console.log("splitted text: ", summaries);
            return summaries;
            // const summaryDocs = summarizedChunks.map((item)=>new Document({pageContent:item}))
        }
        catch (err) {
            console.log("Error while chunking: ", err);
        }
    });
}
exports.chunkContent = chunkContent;
