import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

export default function AboutSection() {
  return (
    <section
      className="py-12 sm:py-16"
      aria-labelledby="about-heading"
      id="about-section"
    >
      <div className="container mx-auto px-6 w-full">
        <div className="max-w-2xl mx-auto">
          {/* Card container */}
          <div
            className="relative rounded-2xl border bg-white p-8 sm:pl-12 sm:pr-10 sm:py-10 text-center sm:text-left shadow-sm transition-shadow duration-200 hover:shadow-md"
            style={{
              borderColor: "#e2e8f0",
              boxShadow: "0 1px 3px rgba(30, 41, 59, 0.06)",
            }}
          >
            {/* Accent line */}
            <div
              className="absolute left-0 top-8 bottom-8 w-1 rounded-full hidden sm:block"
              style={{ backgroundColor: "#3b82f6" }}
            />

            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#3b82f6" }}
            >
              The idea
            </p>
            <h2
              id="about-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-6"
              style={{ color: "#1e293b" }}
            >
              About SkimBolt
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed mb-5"
              style={{ color: "#64748b" }}
            >
              SkimBolt is a Chrome extension that turns long articles into quick,
              readable summaries. No more endless scrolling — get the main
              points in seconds and decide what&apos;s worth your time.
            </p>
            <p
              className="text-sm sm:text-base leading-relaxed mb-8"
              style={{ color: "#94a3b8" }}
            >
              Built for readers who want to stay informed without the overwhelm.
              One click, and you&apos;re done.
            </p>
            <Link
              href="/extension"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-[#3b82f6] text-[#3b82f6] bg-transparent hover:bg-[#3b82f6] hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2"
            >
              Get the extension
              <HiArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
