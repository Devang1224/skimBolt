import express, { Request, Response } from "express";
import base64 from "base-64";
import getRedisClient from "../lib/redis";
import prisma from "../lib/db";
import { generateSummary } from "../helpers/generateSummary";
import { chunkContent } from "../helpers/chunkContent";


const router = express.Router();


router.post("/check-summary",async(req:Request,res:Response):Promise<any>=>{
    try{
     const {url} = req.body;
     const userId = req.user.id;
     if(!url){
        return res.status(400).json({
            message:"url not supplied",
            success:false
        });
     }

     const hashedUrl = base64.encode(url);

     const isSummaryExists = await prisma.summary.findFirst({
        where:{
            urlHash:hashedUrl,
            userId:userId
        }
     });
    
     if(!isSummaryExists){
        return res.status(404).json({
            message:"Summary not found",
            found:false,
            success:false,
        });
     }

     const cachedSummary = isSummaryExists?.summary;
     return res.status(200).json({
        summary:cachedSummary,
        message:"summary found",
        found:true,
        success:true,
     })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
})

router.post("/save-summary",async(req:Request,res:Response):Promise<any>=>{
  try{
    
  }catch(err){
    return res.status(500).json({
        success:false,
        message:"Something went wrong",
    })
  }
})



router.post("/generate-summary",async(req:Request,res:Response):Promise<any>=>{

    try{

        const {
            textContent,
            url
        } = req.body;
        const {tone,language,length} = req.body?.settings;
        const user = req.user;


      const hashedUrl = base64.encode(url);
    //   const key = `context:${hashedUrl}:user:${user.id}:summary`;
    
    //   const redis = await getRedisClient();
    //   if(!redis)return null;
     
    //   console.log("CONFIG____________",length,tone,language);

      const chunks = await chunkContent(textContent);
         
      return res.status(200).json({
        data:chunks
      });

      const modelOutput = await generateSummary(textContent,tone,length,language) as any;
      console.log("MODELOUTPUT______: ",modelOutput?.candidates?.[0]?.content?.parts?.[0]?.text);

      const summary  = modelOutput?.candidates?.[0]?.content?.parts?.[0]?.text;
    

       if(!summary){
        return res.status(500).json({
            message:"Summary cannot be created",
            success:false,
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
    //  await redis.set( key,JSON.stringify(summary),{
    //     EX:6*60*60 // 6 hours
    //  });  

    return res.status(200).json({
        message:"Generated summary successfully",
        aiResp:modelOutput,
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