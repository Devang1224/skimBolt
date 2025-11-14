import { jwtDecrypt, JWTPayload, jwtVerify } from "jose";
import { NextFunction, Request, Response } from "express";
import { Provider } from "@prisma/client";

interface MyJWTPayload extends JWTPayload {
  name: string;
  email: string;
  provider: Provider;
  providerAccountId: string;
}

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
//   console.log("------reqbody------", accessToken);
  if (!accessToken) {
    res.status(400).json({
      message: "Token not provided",
    });
    return;
  }

  const sec_key = new TextEncoder().encode(process.env.JWT_SECRET!);
  try {
    const { payload } = await jwtVerify<MyJWTPayload>(accessToken, sec_key);

    req.user = {
      name: payload.name,
      email: payload.email,
      provider: payload.provider,
      providerAccountId: payload.providerAccountId,
      auth_token: accessToken
    };

  } catch (err) {
    console.log("jwt error", err);
     res.status(500).json({
      message: "Something went wrong with JWT",
    });
    return;
  }

  return next();
}
