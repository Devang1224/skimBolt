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
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, url } = req.body;
        if (!query || !url) {
            res.status(400).json({
                message: "Some fields are missing",
                success: false,
            });
            return;
        }
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
        console.log("RELATED CONTEXTS: ", queryContext);
        res.status(200).json({
            message: "User query processed successfully",
            success: true
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Unable to process user query",
            success: false,
            error: err
        });
    }
}));
exports.default = router;
