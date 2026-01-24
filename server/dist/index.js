"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const authenticate_1 = require("./middlewares/authenticate");
const auth_1 = __importDefault(require("./routes/auth"));
const summary_1 = __importDefault(require("./routes/summary"));
const summaryChat_1 = __importDefault(require("./routes/summaryChat"));
const sendTokenToExtension_1 = require("./helpers/sendTokenToExtension");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const redis_1 = require("./lib/redis");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, redis_1.getRedisClient)().catch((err) => {
    console.error("Failed to initialize Redis:", err);
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/extension-token", sendTokenToExtension_1.sendExtensionToken);
// app.use("/api/v1/summary",summaryRouter);
app.use("/api/v1/auth", authenticate_1.authenticateUser, auth_1.default);
app.use("/api/v1/summary", authenticate_1.authenticateUser, summary_1.default);
app.use("/api/v1/summaryChat", authenticate_1.authenticateUser, summaryChat_1.default);
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port", process.env.PORT);
});
