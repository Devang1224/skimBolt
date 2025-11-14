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
exports.sendExtensionToken = void 0;
const jose_1 = require("jose");
function sendExtensionToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const authToken = req.cookies['auth-token'];
        if (!authToken) {
            res.status(400).json({
                message: "Token not provided",
            });
            return;
        }
        const sec_key = new TextEncoder().encode(process.env.JWT_SECRET);
        try {
            const { payload } = yield (0, jose_1.jwtVerify)(authToken, sec_key);
            const userDetails = {
                name: payload.name,
                email: payload.email,
                provider: payload.provider,
                providerAccountId: payload.providerAccountId,
                auth_token: authToken
            };
            return res.status(200).json({
                success: true,
                message: "Logged in successfully",
                data: userDetails
            });
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
exports.sendExtensionToken = sendExtensionToken;
