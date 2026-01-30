import Link from "next/link";

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
            <div className="w-8 h-8 bg-gradient-to-r from-[#3b82f6] to-[#a855f7] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-lg font-bold text-[#1e293b]">SkimBolt</span>
          </div>

          {/* Links */}
          <nav
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
            aria-label="Footer navigation"
          >
            <Link
              href="/extension"
              className="text-sm text-[#64748b] hover:text-[#2563eb] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 rounded"
            >
              Extension
            </Link>
            <Link
              href="/signin"
              className="text-sm text-[#64748b] hover:text-[#2563eb] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 rounded"
            >
              Sign in
            </Link>
            <a
              href="#"
              className="text-sm text-[#64748b] hover:text-[#2563eb] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 rounded"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-[#64748b] hover:text-[#2563eb] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 rounded"
            >
              Terms
            </a>
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
