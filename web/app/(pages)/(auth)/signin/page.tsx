"use client";
import { api } from "@/utils/axoisInstance";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

declare const chrome: any;
type Provider = "google" | "twitter" | "apple";

export default function SignIn() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams ? searchParams.get("error") : null;

  const saveUserDetails = async () => {
    const accessToken = session?.accessToken;
    console.log("running ---------------=======", accessToken);
    try {
      const res = await api.post(
        "auth/signin",
        {},
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const body = res?.data;
      if (body.success) {
        // On your website - make it persistent
        //  todo: enter secure here
        document.cookie = `auth-token=${accessToken}; domain=localhost; samesite=strict; max-age=2592000`; // 30 days

        console.log("extension_id :: ",process.env.NEXT_PUBLIC_EXTENSION_ID);
        if (
          typeof chrome !== "undefined" &&
          chrome.runtime &&
          chrome.runtime.sendMessage
        ) {
          chrome.runtime.sendMessage(
             process.env.NEXT_PUBLIC_EXTENSION_ID , // extension id
            {
              action: "TOKEN_FROM_WEBSITE",
              token: accessToken,
            },
            (response: any) => {
              console.log("Extension response:", response);
            }
          );
        } else {
          console.warn("Extension not installed or not accessible.");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to SignIn at this moment. Please Try again later");
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      saveUserDetails();
    }
  }, [session]);

  const handleSignIn = async (provider: Provider) => {
    try {
      await signIn(provider);
    } catch (err) {
      toast.error("Unable to SignIn at this moment. Please Try again later");
      console.log(err);
    }
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#fbc2eb] via-[#a6c1ee] to-[#f6f9fc]">
        <div className="bg-white/90 shadow-2xl rounded-2xl px-10 py-12 flex flex-col items-center max-w-md w-full">
          <div className="mb-6 flex flex-col items-center">
            <div className="w-14 h-14 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-2">
              <span className="text-white font-extrabold text-2xl">S</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1a254b]">
              You are already signed in
            </h2>
            <p className="text-[#3b5b7e] mt-2">{session.user?.email}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#fbc2eb] via-[#a6c1ee] to-[#f6f9fc]">
      <div className="bg-white/90 shadow-2xl rounded-2xl px-10 py-12 flex flex-col items-center max-w-md w-full">
        <div className="mb-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
            <span className="text-white font-extrabold text-3xl">S</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-[#1a254b]">
            Sign in to SkimBolt
          </h1>
          <p className="text-[#3b5b7e] text-sm">
            Get started with your favorite provider
          </p>
        </div>
        {error && (
          <div className="mb-4 text-red-600 w-full text-center">
            Sign in failed. Please try again.
          </div>
        )}
        <button
          onClick={() => handleSignIn("google")}
          className="w-full mb-4 py-3 px-4 bg-white border border-[#e0e0e0] rounded-lg font-semibold text-[#234e70] shadow-sm hover:shadow-md hover:bg-[#f1f5f9] transition-all flex items-center justify-center gap-3 group"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <g>
              <path
                fill="#4285F4"
                d="M24 9.5c3.54 0 6.73 1.22 9.24 3.23l6.92-6.92C36.68 2.36 30.7 0 24 0 14.82 0 6.71 5.48 2.69 13.44l8.06 6.26C12.6 13.13 17.88 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.66 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"
              />
              <path
                fill="#FBBC05"
                d="M10.75 28.7c-1.13-3.36-1.13-6.98 0-10.34l-8.06-6.26C.9 16.1 0 19.94 0 24c0 4.06.9 7.9 2.69 11.9l8.06-6.26z"
              />
              <path
                fill="#EA4335"
                d="M24 48c6.7 0 12.68-2.36 17.16-6.41l-7.19-5.6c-2.01 1.35-4.6 2.16-7.47 2.16-6.12 0-11.4-3.63-13.25-8.9l-8.06 6.26C6.71 42.52 14.82 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </g>
          </svg>
          <span className="group-hover:text-[#4285F4] transition-colors">
            Sign in with Google
          </span>
        </button>
        <button
          onClick={() => handleSignIn("twitter")}
          className="w-full mb-4 py-3 px-4 bg-white border border-[#e0e0e0] rounded-lg font-semibold text-[#234e70] shadow-sm hover:shadow-md hover:bg-[#f1f5f9] transition-all flex items-center justify-center gap-3 group"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.46 5.94c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 8.99 4.07 7.13 1.64 4.15c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.94 3.62-.72-.02-1.4-.22-1.99-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.11 2.9 3.97 2.93A8.6 8.6 0 0 1 2 19.54c-.65 0-1.28-.04-1.9-.11A12.13 12.13 0 0 0 6.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54.8-.58 1.5-1.3 2.05-2.12z"
            />
          </svg>
          <span className="group-hover:text-[#1DA1F2] transition-colors">
            Sign in with Twitter
          </span>
        </button>
        <button
          onClick={() => handleSignIn("apple")}
          className="w-full py-3 px-4 bg-white border border-[#e0e0e0] rounded-lg font-semibold text-[#234e70] shadow-sm hover:shadow-md hover:bg-[#f1f5f9] transition-all flex items-center justify-center gap-3 group"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07-1.14 0-2.07-.93-2.07-2.07 0-1.14.93-2.07 2.07-2.07 1.14 0 2.07.93 2.07 2.07zm4.7 6.13c-.13-.13-2.6-1.27-5.38-1.27-2.78 0-5.25 1.14-5.38 1.27-.13.13-1.27 2.6-1.27 5.38 0 2.78 1.14 5.25 1.27 5.38.13.13 2.6 1.27 5.38 1.27 2.78 0 5.25-1.14 5.38-1.27.13-.13 1.27-2.6 1.27-5.38 0-2.78-1.14-5.25-1.27-5.38zm-5.38 10.13c-2.78 0-5.25-1.14-5.38-1.27-.13-.13-1.27-2.6-1.27-5.38 0-2.78 1.14-5.25 1.27-5.38.13-.13 2.6-1.27 5.38-1.27 2.78 0 5.25 1.14 5.38 1.27.13.13 1.27 2.6 1.27 5.38 0 2.78-1.14 5.25-1.27 5.38-.13.13-2.6 1.27-5.38 1.27z"
            />
          </svg>
          <span className="group-hover:text-black transition-colors">
            Sign in with Apple
          </span>
        </button>
        <div className="flex items-center w-full my-6">
          {/* <div className="flex-grow h-px bg-[#e0e0e0]" />
          <span className="mx-4 text-[#b0b0b0] text-xs">or</span>
          <div className="flex-grow h-px bg-[#e0e0e0]" /> */}
        </div>
        <p className="text-xs text-[#b0b0b0] text-center mb-2">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-[#234e70]">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-[#234e70]">
            Privacy Policy
          </a>
          .
        </p>
        <footer className="mt-4 text-xs text-[#b0b0b0] text-center w-full">
          &copy; {new Date().getFullYear()} SkimBolt. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
