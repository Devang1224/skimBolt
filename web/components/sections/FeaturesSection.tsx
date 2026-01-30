import FeatureGrid from "@/components/ui/feature-grid";

export default function FeaturesSection() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center py-16 sm:py-20"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto px-6 w-full">
        <header className="text-center max-w-2xl mx-auto mb-12">
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl font-bold text-[#1e293b] mb-4"
          >
            Why SkimBolt?
          </h2>
          <p className="text-lg text-[#64748b] leading-relaxed">
            One click on any article. Instant summaries. More time for what
            matters.
          </p>
        </header>
        <FeatureGrid />
      </div>
    </section>
  );
}
