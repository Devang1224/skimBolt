import { FiZap } from "react-icons/fi";
import FeatureGrid from "@/components/ui/feature-grid";

export default function FeaturesSection() {
  return (
    <section
      className="py-12 sm:py-16"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto px-6 w-full">
        <header className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#3b82f6] bg-[#eff6ff] mb-6"
            aria-hidden
          >
            <FiZap className="w-3.5 h-3.5" aria-hidden />
            POWERFUL FEATURES
          </span>
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e293b] mb-4 leading-tight"
          >
            Everything You Need To{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#a855f7]">
              Read Smarter
            </span>
          </h2>
          <p className="text-lg text-[#64748b] leading-relaxed">
            One extension. Six ways to read less and understand more—faster
            summaries, key takeaways, and zero distractions.
          </p>
        </header>
        <FeatureGrid />
      </div>
    </section>
  );
}
