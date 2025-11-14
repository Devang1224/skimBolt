import { jwtDecrypt, JWTPayload, jwtVerify } from "jose";
import { NextFunction, Request, Response } from "express";
import { Provider } from "@prisma/client";

interface MyJWTPayload extends JWTPayload {
  name: string;
  email: string;
  provider: Provider;
  providerAccountId: string;
}

export async function sendExtensionToken(req:Request,res:Response):Promise<any>{

    const authToken = req.cookies['auth-token'];
    if (!authToken) {
       res.status(400).json({
         message: "Token not provided",
       });
       return;
     }
     const sec_key = new TextEncoder().encode(process.env.JWT_SECRET!);
     try {
       const { payload } = await jwtVerify<MyJWTPayload>(authToken, sec_key);
   
       const userDetails = {
         name: payload.name,
         email: payload.email,
         provider: payload.provider,
         providerAccountId: payload.providerAccountId,
         auth_token: authToken
       };

       return res.status(200).json({
        success:true,
        message:"Logged in successfully",
        data:userDetails
       });
       
     } catch (err) {
       console.log("jwt error", err);
        res.status(500).json({
         message: "Something went wrong with JWT",
       });
       return;
     }
}
