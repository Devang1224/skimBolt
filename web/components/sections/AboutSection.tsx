import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center py-16 sm:py-20"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-6 w-full">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold text-[#1e293b] mb-6"
          >
            About SkimBolt
          </h2>
          <p className="text-lg text-[#64748b] leading-relaxed mb-6">
            SkimBolt is a Chrome extension that turns long articles into quick,
            readable summaries. No more endless scrolling — get the main points
            in seconds and decide what&apos;s worth your time.
          </p>
          <p className="text-base text-[#64748b] leading-relaxed">
            Built for readers who want to stay informed without the overwhelm.
            One click, and you&apos;re done.
          </p>
          <Link
            href="/extension"
            className="inline-block mt-10 text-[#2563eb] font-semibold hover:text-[#1d4ed8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 rounded transition-colors"
          >
            Get the extension →
          </Link>
        </div>
      </div>
    </section>
  );
}
