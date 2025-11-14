import express, { Request, Response } from "express";

const router = express.Router();

router.post("/generate-summary",async(req:Request,res:Response)=>{
    try{
        
        const {
            length,
            language,
            tone,
            textContent,
        } = req.body;

       

        
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
})




export default router;