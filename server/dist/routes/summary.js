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
const express_1 = __importDefault(require("express"));
const base_64_1 = __importDefault(require("base-64"));
const db_1 = __importDefault(require("../lib/db"));
const geminiApi_1 = require("../lib/geminiApi");
const router = express_1.default.Router();
router.post("/generate-summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { length, language, tone, textContent, url } = req.body;
        const user = req.user;
        const hashedUrl = base_64_1.default.encode(url);
        //   const key = `context:${hashedUrl}:user:${user.id}:summary`;
        //   const redis = await getRedisClient();
        //   if(!redis)return null;
        // TODO: generate summary and store it in the redis
        // TODO: do chunking if the text size is greater than 100kb 
        const modelOutput = yield (0, geminiApi_1.accessModel)(textContent);
        if (modelOutput) {
            return res.status(200).json({
                message: "summarized successfully",
                sucesss: true,
                summary: modelOutput
            });
        }
        const summary = " ";
        if (!summary) {
            return res.status(500).json({
                message: "Summary cannot be created",
                success: false
            });
        }
        const response = yield db_1.default.summary.upsert({
            where: {
                userId_urlHash: {
                    userId: user.id,
                    urlHash: hashedUrl
                },
            },
            update: {
                summary: summary,
                url: url
            },
            create: {
                urlHash: hashedUrl,
                url: url,
                summary: summary,
                userId: user.id,
            }
        });
        //  await redis.set( key,JSON.stringify(summary),{
        //     EX:6*60*60 // 6 hours
        //  });  
        return res.status(200).json({
            message: "Generated summary successfully",
            aiResp: summary,
            success: true
        });
    }
    catch (err) {
        console.log("🔴 Error: ", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}));
exports.default = router;
