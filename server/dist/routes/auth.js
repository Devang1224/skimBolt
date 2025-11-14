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
const db_1 = __importDefault(require("../lib/db"));
const router = express_1.default.Router();
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, provider, providerAccountId } = req.user;
        const user = yield db_1.default.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { providerAccountId: providerAccountId }
                ]
            }
        });
        if (user) {
            return res.status(200).json({
                success: true,
                message: 'User already exists',
                user: user
            });
        }
        const newUser = yield db_1.default.user.create({
            data: {
                name,
                email,
                provider: provider,
                providerAccountId: providerAccountId
            }
        });
        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            user: newUser
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}));
exports.default = router;
