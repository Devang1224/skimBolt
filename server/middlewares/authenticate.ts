import { jwtDecrypt, JWTPayload, jwtVerify } from "jose";
import { NextFunction, Request, Response } from "express";
import { Provider } from "@prisma/client";
import prisma from "../lib/db";

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
    
    const user = await prisma.user.findFirst({
      where:{email:payload.email}
    })
    if(!user){
      res.status(404).json({
        success:false,
        message:'user not found'
      });
      return;
    }

    req.user = {
      id:user.id,
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
  } catch (err:any) {
    // console.log("🔴 jwt error", err);
    if(err.code=='ERR_JWT_EXPIRED'){
      res.status(401).json({
        message:"Expired Token please relogin",
        code:'ERR_JWT_EXPIRED',
        success:false
      })
      return;
    }
    res.status(500).json({
      message: "Something went wrong with JWT",
    });
    return;
  }
}
