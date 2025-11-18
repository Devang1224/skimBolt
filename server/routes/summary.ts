import express, { Request, Response } from "express";
import base64 from "base-64";
import getRedisClient from "../lib/redis";
import prisma from "../lib/db";

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
/*
   -> make a hash out of url 
   -> create a redis key to store contexts inside it "context:{urlHash}:user:{userId}"
   -> if the there is no data regarding the site  
   ->   find the context in the db for that site if exists
   ->   if it exists 
   ->       use that context 
   ->   else
   ->       make a unique key for that site and start storing the context
   -> else
   ->   use the available context 
   -> the ttl of the context would be 5 hrs after that clear the data from the redis
   -> when the 5 context limit reached generate a new context out of the previous 5 contexts and store it in place of the previous contexts
   
        
*/
      var hashedUrl = base64.encode(url);
    
      const redis = await getRedisClient();
      if(!redis)return null;

      // TODO: generate summary and store it in the redis
      const summary = " ";

    //   redis.lPush(`context:${hashedUrl}:user:${"h1rYJ7efQy0xK6brW"}`,JSON.stringify(summary));
    const response = await prisma.summary.create({
        data: {
            urlHash:hashedUrl,
            url:url,
            summary:summary,
            userId:user.id,
        }
    })
    redis.set(`context:${hashedUrl}:user:${"h1rYJ7efQy0xK6brW"}:summary`,JSON.stringify(summary));
      

    return res.status(200);
        
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Something went wrong" 
        })
    }
})




export default router;