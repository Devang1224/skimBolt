import Link from "next/link";
import { FiZap } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-10 sm:py-12 border-t border-[#e2e8f0] bg-white/50"
      role="contentinfo"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + name */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
              style={{
                background: "linear-gradient(to bottom, #3b82f6, #a855f7)",
              }}
            >
              <FiZap className="w-4 h-4" aria-hidden />
            </div>
            <span className="text-lg font-bold text-[#1e293b]">
              Skim
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#a855f7]">
                Bolt
              </span>
            </span>
          </div>

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
    </footer>
  );
}
