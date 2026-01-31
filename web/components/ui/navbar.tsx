"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FiZap } from "react-icons/fi";
declare const chrome: any;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {data: session} = useSession();

console.log('session',session)

const handleSignOut = async ()=>{
  try{
    const res = await signOut();
      if(
          typeof chrome !== "undefined" &&
          chrome.runtime &&
          chrome.runtime.sendMessage
        ) {
          chrome.runtime.sendMessage(
             process.env.NEXT_PUBLIC_EXTENSION_ID , // extension id
            {
              type: "SIGNOUT_FROM_WEBSITE",
            },
            (response: any) => {
              console.log("Extension response:", response);
              // clearing the cookie
              document.cookie = "auth-token=; domain=localhost; samesite=strict; expires=Thu, 01 Jan 1970 00:00:00 UTC";

            }
          );
        } else {
          console.warn("Extension not installed or not accessible.");
        }

  }catch(err){
    console.log("signout error: ",err);
  }
}

  return (
    <nav className="h-20 bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{
                  background: "linear-gradient(to bottom, #3b82f6, #a855f7)",
                }}
              >
                <FiZap className="w-4 h-4" aria-hidden />
              </div>
              <span className="text-xl font-bold text-[#1e293b]">
                Skim<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#a855f7]">Bolt</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#how-it-works" 
              className="text-[#64748b] hover:text-[#3b82f6] transition-colors duration-200 font-medium"
            >
              How It Works
            </a>
            {/* <a 
              href="#pricing" 
              className="text-[#64748b] hover:text-[#3b82f6] transition-colors duration-200 font-medium"
            >
              Pricing
            </a>
            <a 
              href="#help" 
              className="text-[#64748b] hover:text-[#3b82f6] transition-colors duration-200 font-medium"
            >
              Help
            </a> */}
            {
              session?.user?.email ? (
                <button className="cursor-pointer bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:opacity-95 transition-all duration-200"
                  onClick={() => handleSignOut()}
                  >
                    Sign Out
                </button>
              ) : (
                <button className="cursor-pointer bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:opacity-95 transition-all duration-200">
                  <Link href="/signin">
                    Sign In
                  </Link>
                </button>
              )
            }
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#1e293b] hover:text-[#64748b] transition-colors duration-200"
            >
              {isMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-white/20 shadow-lg">
            <div className="container mx-auto px-6 py-4 space-y-4">
              <a 
                href="#about" 
                className="block text-[#64748b] hover:text-[#3b82f6] transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              {/* <a 
                href="#pricing" 
                className="block text-[#64748b] hover:text-[#3b82f6] transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a> */}
              {/* <a 
                href="#help" 
                className="block text-[#64748b] hover:text-[#3b82f6] transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </a> */}
              <button 
                className="w-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 