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
exports.generateMasterSummary = void 0;
const geminiApi_1 = require("../lib/geminiApi");
const prompt_1 = require("../prompt");
const withTimeout_1 = require("./withTimeout");
function generateMasterSummary(summarizedChunks, userSettings) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const summarizedChunksString = summarizedChunks === null || summarizedChunks === void 0 ? void 0 : summarizedChunks.join(" ");
            const res = yield (0, withTimeout_1.withTimeout)(geminiApi_1.llm.invoke([
                {
                    role: "system",
                    content: `${prompt_1.masterSummaryPrompt}
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
            ]), 30000, "LLM generate master summary");
            return res;
        }
        catch (err) {
            console.log("Error while generating master summary", err);
            throw err;
        }
    });
}
exports.generateMasterSummary = generateMasterSummary;
