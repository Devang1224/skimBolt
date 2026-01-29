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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const geminiApi_1 = require("../lib/geminiApi");
const base_64_1 = __importDefault(require("base-64"));
const withTimeout_1 = require("../helpers/withTimeout");
const db_1 = __importDefault(require("../lib/db"));
const prompt_1 = require("../prompt");
const redis_1 = __importDefault(require("../lib/redis"));
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { query, url, settings: userSettings } = req.body;
        const { id: userId } = req.user;
        if (!query.trim() || !url) {
            res.status(400).json({
                message: "Some fields are missing",
                success: false,
            });
            return;
        }
        console.log("USER SETTINGS: ", userSettings);
        const hashedUrl = base_64_1.default.encode(url);
        const embeddings = yield (0, withTimeout_1.withTimeout)(geminiApi_1.embedd.embedQuery(query), 60000, "Embedding generation for user query");
        if (!embeddings.length) {
            throw new Error("Unable to generate embeddings");
        }
        const userQueryEmbedding = `[${embeddings.join(",")}]`;
        const queryContext = yield db_1.default.$queryRaw `
           SELECT content, 1 - (embedding <=> ${userQueryEmbedding}::vector) AS Similarity
           FROM blog_summary_chunks
           WHERE source_url = ${hashedUrl}
           ORDER BY embedding <=> ${userQueryEmbedding}::vector
           LIMIT 5;
        `;
        let contexts = queryContext
            .filter(c => c.similarity > 0.6)
            .sort((a, b) => b.similarity - a.similarity);
        if (contexts.length === 0) {
            contexts = queryContext
                .sort((a, b) => b.similarity - a.similarity);
        }
        if (((_a = contexts[0]) === null || _a === void 0 ? void 0 : _a.similarity) > 0.85) {
            contexts = contexts.slice(0, 1);
        }
        else {
            contexts = contexts.slice(0, 3);
        }
        const contextString = contexts
            .map((c, i) => `Context ${i + 1}:\n${c.content}`)
            .join("\n\n---\n\n");
        const key = `chat:${userId}:${hashedUrl}`;
        const redis = yield (0, redis_1.default)();
        const existingChat = yield (redis === null || redis === void 0 ? void 0 : redis.get(key));
        const chat = existingChat ? JSON.parse(existingChat) : { messages: [] };
        chat.messages = chat.messages.slice(-8);
        //  console.log("CURRENT CHAT MESSAGES: ",chat.messages);
        const aiResp = yield geminiApi_1.llm.invoke([
            {
                role: "system",
                content: `
                ${prompt_1.summaryChatPrompt}
                ====================================================
                  USER-CONTROLLED SETTINGS (DO NOT IGNORE)
                ====================================================
                        USER PREFERENCES:
                        - Tone: ${userSettings.tone}
                        - Language: ${userSettings.language}
                        - Length: ${userSettings.length}
                        
                        RULES:
                        - You MUST respect these settings.
                        - If "language" is provided, the ENTIRE content must be in that language.
                        - If "tone" is provided, adjust writing style but DO NOT change factual meaning.
                        - If any setting is missing, fall back to defaults: 
                          tone = "neutral", language = "English", length = "medium".
                ====================================================
                 PREVIOUS CHAT AS CONTEXT
                ====================================================
               - Treat all previous messages as part of a single ongoing conversation.
               - Use them to understand follow-up questions.
               - Do not restate information already provided unless the user asks.
                `
            },
            ...chat.messages,
            {
                role: 'user',
                content: `
                  User question: ${query}
                  Relevant context: ${contextString}
                  `
            }
        ]);
        const userQueryAns = aiResp.content;
        if (redis) {
            chat.messages.push({
                role: 'user',
                content: query
            });
            chat.messages.push({
                role: 'assistant',
                content: userQueryAns
            });
            yield redis.set(key, JSON.stringify(chat), {
                EX: 60 * 60, // 1 hour
            });
        }
        res.status(200).json({
            message: "User query processed successfully",
            success: true,
            aiResp: userQueryAns
        });
    }
    catch (err) {
        console.log("Unable to process user query: ", err);
        return res.status(500).json({
            message: "Unable to process user query",
            success: false,
            error: err
        });
    }
}));
exports.default = router;
