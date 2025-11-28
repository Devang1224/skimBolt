import express, { Request, Response } from "express";
import base64 from "base-64";
import getRedisClient from "../lib/redis";
import prisma from "../lib/db";
import { accessModel } from "../lib/geminiApi";

const router = express.Router();

router.post("/generate-summary",async(req:Request,res:Response):Promise<any>=>{

    try{
        
        const {
            length,
            language,
            tone,
            textContent,
            url
        } = req.body;
        const user = req.user;


      const hashedUrl = base64.encode(url);
      const key = `context:${hashedUrl}:user:${user.id}:summary`;
    
      const redis = await getRedisClient();
      if(!redis)return null;
     
      // TODO: generate summary and store it in the redis
      // TODO: do chunking if the text size is greater than 100kb 
      const modelOutput = await accessModel(textContent);
        if(modelOutput){
            return res.status(200).json({
                message:"summarized successfully",
                sucesss:true
            })
        }

      const summary = " " ;
       if(!summary){
        return res.status(500).json({
            message:"Summary cannot be created",
            success:false
        })
       }
    const response = await prisma.summary.upsert({
        where:{
            userId_urlHash:{
                userId:user.id,
                urlHash:hashedUrl
            },
        },
        update:{
            summary:summary,
            url:url
        },
        create: {
            urlHash:hashedUrl,
            url:url,
            summary:summary,
            userId:user.id,
        }
    })
     await redis.set( key,JSON.stringify(summary),{
        EX:6*60*60 // 6 hours
     });  

    return res.status(200).json({
        message:"Generated summary successfully",
        aiResp:summary,
        success:true
    });
        
    }catch(err){
        console.log("🔴 Error: ",err);
       return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
})




export default router;