import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";


export async function middleware(req:NextRequest){
   const token = await getToken({req,secret:process.env.NEXTAUTH_SECRET!})
   if(token){
    console.log('token sdfsfdsf',token)
    //  localStorage.setItem('token',token)
   }
}

