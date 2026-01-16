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
const generateSummary_1 = require("../helpers/generateSummary");
const chunkAndSaveContent_1 = require("../helpers/chunkAndSaveContent");
const router = express_1.default.Router();
router.post("/check-summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body;
        const userId = req.user.id;
        if (!url) {
            return res.status(400).json({
                message: "url not supplied",
                success: false
            });
        }
        const hashedUrl = base_64_1.default.encode(url);
        const isSummaryExists = yield db_1.default.summary.findFirst({
            where: {
                urlHash: hashedUrl,
                userId: userId
            }
        });
        if (!isSummaryExists) {
            return res.status(404).json({
                message: "Summary not found",
                found: false,
                success: false,
            });
        }
        const cachedSummary = isSummaryExists === null || isSummaryExists === void 0 ? void 0 : isSummaryExists.summary;
        return res.status(200).json({
            summary: cachedSummary,
            message: "summary found",
            found: true,
            success: true,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}));
router.post("/save-summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}));
router.post("/generate-summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { textContent, url } = req.body;
        const userSettings = (_a = req.body) === null || _a === void 0 ? void 0 : _a.settings;
        const user = req.user;
        const hashedUrl = base_64_1.default.encode(url);
        //   const key = `context:${hashedUrl}:user:${user.id}:summary`;
        //   const redis = await getRedisClient();
        //   if(!redis)return null;
        //   console.log("CONFIG____________",length,tone,language);
        const { summarizedChunks } = yield (0, chunkAndSaveContent_1.chunkAndSaveContent)(textContent, hashedUrl);
        const masterSummary = yield (0, generateSummary_1.generateMasterSummary)(summarizedChunks, userSettings);
        console.log("MASTER SUMMARY________", masterSummary);
        console.log("USERID________: ", user === null || user === void 0 ? void 0 : user.id);
        if (!masterSummary.content) {
            return res.status(500).json({
                message: "Summary cannot be created",
                success: false,
            });
        }
        console.log("USERID: ", user === null || user === void 0 ? void 0 : user.id);
        const response = yield db_1.default.summary.upsert({
            where: {
                userId_urlHash: {
                    userId: user.id,
                    urlHash: hashedUrl
                },
            },
            update: {
                summary: masterSummary.content,
                url: url
            },
            create: {
                urlHash: hashedUrl,
                url: url,
                summary: masterSummary.content,
                userId: user.id,
            }
        });
        //  await redis.set( key,JSON.stringify(summary),{
        //     EX:6*60*60 // 6 hours
        //  });  
        return res.status(200).json({
            message: "Generated summary successfully",
            aiResp: masterSummary,
            success: true
        });
    }
    catch (err) {
        console.log("🔴 Error: ", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
}));
exports.default = router;
