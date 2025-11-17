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
exports.authenticateUser = void 0;
const jose_1 = require("jose");
const db_1 = __importDefault(require("../lib/db"));
function authenticateUser(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        //   console.log("------reqbody------", accessToken);
        if (!accessToken) {
            res.status(400).json({
                message: "Token not provided",
            });
            return;
        }
        const sec_key = new TextEncoder().encode(process.env.JWT_SECRET);
        try {
            const { payload } = yield (0, jose_1.jwtVerify)(accessToken, sec_key);
            const user = yield db_1.default.user.findFirst({
                where: { email: payload.email }
            });
            if (!user) {
                res.status(404).json({
                    success: false,
                    message: 'user not found'
                });
                return;
            }
            req.user = {
                id: user.id,
                name: user.name,
                email: user.email,
                provider: user.provider,
                providerAccountId: user.providerAccountId,
                auth_token: accessToken,
                hasSubscription: false,
                subscriptionEndsAt: null,
                usage: 5,
            };
            next();
        }
        catch (err) {
            console.log("jwt error", err);
            res.status(500).json({
                message: "Something went wrong with JWT",
            });
            return;
        }
    });
}
exports.authenticateUser = authenticateUser;
