import express, { Request, Response } from "express";
import prisma from "../lib/db";

const router = express.Router();

router.post("/validateAuthToken",async(req:Request,res:Response):Promise<any>=>{
    try{
        return res.status(200).json({
            message:"Auth token validated",
            success:true,
        })
    }catch(err){
        return res.status(500).json({
            message:"Something went wrong while validating auth token",
            success:false,
        })
    }
})

router.post('/signin',async (req:Request,res:Response):Promise<any> => {
    try{
         const {name,email,provider,providerAccountId} = req.user;
         const user = await prisma.user.findFirst({
            where:{
                OR: [
                    {email:email},
                    {providerAccountId:providerAccountId}
                ]
            }
         });
        if(user){
            return res.status(200).json({
                success:true,
                message:'User already exists',
                user:user
            })
        }
        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                provider:provider,
                providerAccountId:providerAccountId
            }
        })
        return res.status(200).json({
           success:true,
           message:'User created successfully',
           user:newUser
        })

    }catch(err){
        console.log("🔴 signin error:",err);
         res.status(500).json({
            success:false,
            message:'Something went wrong'
        });

    }
})


export default router;