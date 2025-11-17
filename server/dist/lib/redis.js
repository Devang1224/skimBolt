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
exports.closeRedisClient = exports.getRedisClient = void 0;
const redis_1 = require("redis");
let redisClient = null;
let isConnecting = false;
function getRedisClient() {
    return __awaiter(this, void 0, void 0, function* () {
        // return existing client if already connected
        if (redisClient === null || redisClient === void 0 ? void 0 : redisClient.isOpen) {
            return redisClient;
        }
        // if connection is in progress, wait for it
        if (isConnecting) {
            yield new Promise((resolve) => setTimeout(resolve, 100));
            return getRedisClient();
        }
        // create new connection
        try {
            isConnecting = true;
            const client = (0, redis_1.createClient)({
                url: process.env.REDIS_URL || "redis://localhost:6379",
            });
            client.on("error", (err) => {
                console.error("Redis Client Error:", err);
            });
            client.on("connect", () => {
                console.log("Redis Client Connecting...");
            });
            client.on("ready", () => {
                console.log("Redis Client Ready");
            });
            client.on("reconnecting", () => {
                console.log("Redis Client Reconnecting...");
            });
            yield client.connect();
            redisClient = client;
            isConnecting = false;
            return redisClient;
        }
        catch (err) {
            isConnecting = false;
            console.error("Redis Connection Error:", err);
            return null;
        }
    });
}
exports.getRedisClient = getRedisClient;
function closeRedisClient() {
    return __awaiter(this, void 0, void 0, function* () {
        if (redisClient === null || redisClient === void 0 ? void 0 : redisClient.isOpen) {
            yield redisClient.quit();
            redisClient = null;
        }
    });
}
exports.closeRedisClient = closeRedisClient;
exports.default = getRedisClient;
