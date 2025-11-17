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
const router = express_1.default.Router();
router.post("/generate-summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { length, language, tone, textContent, url } = req.body;
        const user = req.user;
        /*
           -> make a hash out of url
           -> create a redis key to store contexts inside it "context:{urlHash}:user:{userId}"
           -> if the there is no data regarding the site
           ->   find the context in the db for that site if exists
           ->   if it exists
           ->       use that context
           ->   else
           ->       make a unique key for that site and start storing the context
           -> else
           ->   use the available context
           -> the ttl of the context would be 5 hrs after that clear the data from the redis
           -> when the 5 context limit reached generate a new context out of the previous 5 contexts and store it in place of the previous contexts
           
                
        */
        var hashedUrl = base_64_1.default.encode(url);
        const redis = yield (0, redis_1.default)();
        if (!redis)
            return null;
        redis.set(`context:${hashedUrl}:user:${user.id}`, JSON.stringify(textContent));
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}));
exports.default = router;
