
import { SignJWT } from "jose";
import { NextAuthOptions } from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";




export const authOptions:NextAuthOptions  = 
    {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      checks:['none'],
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      checks:['none'],
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
      checks:['none'],
    }),
  ],
  pages: {
    signIn: "/pages/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,

  },
  secret: process.env.NEXTAUTH_SECRET!,

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider; 
        token.providerAccountId = account.providerAccountId; 
      }
      return token;
    },
    async session({ session, token }) {
        const jwt_token = await new SignJWT(token)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(new TextEncoder().encode(process.env.NEXTAUTH_SECRET!));
      
      session.accessToken = jwt_token;
      return session;
    },
  },
};