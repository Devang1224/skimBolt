 "use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="py-10 sm:py-12 border-t border-[#e2e8f0] bg-white/50"
      role="contentinfo"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + name */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ y: -2 }}
          >
            <Image
              src="/skimboltLogo.svg"
              alt="SkimBolt logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-lg font-bold text-[#1e293b]">
              Skim
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#a855f7]">
                Bolt
              </span>
            </span>
          </motion.div>

          {/* Links */}
          <nav
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
            aria-label="Footer navigation"
          >
            <Link
              href="/extension"
              className="text-sm text-[#64748b] hover:text-[#3b82f6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 rounded"
            >
              Extension
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm text-[#64748b] hover:text-[#3b82f6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 rounded"
            >
              Privacy Policy
            </Link>
            <Link
              href="/signin"
              className="text-sm text-[#64748b] hover:text-[#3b82f6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 rounded"
            >
              Sign in
            </Link>
            {/* <a
              href="#"
              className="text-sm text-[#64748b] hover:text-[#3b82f6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 rounded"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-[#64748b] hover:text-[#3b82f6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 rounded"
            >
              Terms
            </a> */}
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-[#e2e8f0] text-center">
          <p className="text-sm text-[#94a3b8]">
            © {currentYear} SkimBolt. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
