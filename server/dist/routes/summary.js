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
const redis_1 = __importDefault(require("../lib/redis"));
const db_1 = __importDefault(require("../lib/db"));
const generateSummary_1 = require("../helpers/generateSummary");
const router = express_1.default.Router();
router.post("/generate-summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    try {
        const { textContent, url } = req.body;
        const { tone, language, length } = (_a = req.body) === null || _a === void 0 ? void 0 : _a.settings;
        const user = req.user;
        const hashedUrl = base_64_1.default.encode(url);
        //   const key = `context:${hashedUrl}:user:${user.id}:summary`;
        const redis = yield (0, redis_1.default)();
        if (!redis)
            return null;
        console.log("CONFIG____________", length, tone, language);
        const modelOutput = yield (0, generateSummary_1.generateSummary)(textContent, tone, length, language);
        console.log("MODELOUTPUT______: ", (_f = (_e = (_d = (_c = (_b = modelOutput === null || modelOutput === void 0 ? void 0 : modelOutput.candidates) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.parts) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.text);
        const summary = (_l = (_k = (_j = (_h = (_g = modelOutput === null || modelOutput === void 0 ? void 0 : modelOutput.candidates) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.content) === null || _j === void 0 ? void 0 : _j.parts) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l.text;
        // if(modelOutput){
        //     return res.status(200).json({
        //         message:"summarized successfully",
        //         sucesss:true,
        //         aiResp:modelOutput,
        //     })
        // }
        if (!summary) {
            return res.status(500).json({
                message: "Summary cannot be created",
                success: false,
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
            aiResp: modelOutput,
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
