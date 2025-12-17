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
exports.generateSummary = void 0;
const geminiApi_1 = require("../lib/geminiApi");
const prompt_1 = require("../prompt");
const generateSummary = (content, tone, language, length) => __awaiter(void 0, void 0, void 0, function* () {
    if (!content || content.trim().length < 50) {
        throw new Error("Content is too short to summarize.");
    }
    try {
        const config = { systemInstruction: (0, prompt_1.GET_SUMMARY)(tone, length, language) };
        const summary = yield (0, geminiApi_1.accessModel)(content, config);
        if (!summary) {
            throw new Error("Model returned an empty summary.");
        }
        return summary;
    }
    catch (err) {
        console.error("Error generating summary: ", err);
        throw new Error("Summary generation failed. Please try again.");
    }
});
exports.generateSummary = generateSummary;
