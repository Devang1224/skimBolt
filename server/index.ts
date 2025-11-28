import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { authenticateUser } from "./middlewares/authenticate";
import authRouter from "./routes/auth";
import summaryRouter from "./routes/summary";
import { Provider } from "@prisma/client";
import { sendExtensionToken } from "./helpers/sendTokenToExtension";
import cookieParser from "cookie-parser";
import { getRedisClient } from "./lib/redis";

dotenv.config();

const app = express();


getRedisClient().catch((err) => {
  console.error("Failed to initialize Redis:", err);
});

declare global {
  namespace Express {
    export interface Request {
      user: {
        id:string;
        name: string;
        email: string;
        provider: Provider;
        providerAccountId: string;
        auth_token: string;
        hasSubscription: boolean,
        subscriptionEndsAt:string | null;
        usage:number;
      };
    }
  }
}

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/v1/extension-token", sendExtensionToken);


app.use("/api/v1/summary",summaryRouter);
app.use("/api/v1/auth",authenticateUser,authRouter);
// app.use("/api/v1/summary",authenticateUser,summaryRouter);




app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port", process.env.PORT);
});
