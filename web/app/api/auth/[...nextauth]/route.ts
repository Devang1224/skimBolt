import NextAuth from "next-auth";
import { encode } from "next-auth/jwt";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

const handler = NextAuth({
     providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
        }),
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID!,
            clientSecret: process.env.APPLE_CLIENT_SECRET!,
        }),
     ],
     pages: {
        signIn: '/pages/auth/signin'
      },
     session:{
        strategy:'jwt',
        maxAge:30*24*60*60,
    },
    secret:process.env.NEXTAUTH_SECRET!,
      callbacks: {
            async session({ session,token }) {
                  const jwtString = await encode({
                        secret: process.env.NEXTAUTH_SECRET!,
                        token,
                        });
                session.accessToken = jwtString;
                return session;
            },
            
      },
      
   
})

export { handler as GET, handler as POST }
