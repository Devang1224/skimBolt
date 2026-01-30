import FloatingElements from "@/components/ui/floating-elements";
import Navbar from "@/components/ui/navbar";
import Hero from "@/components/sections/Hero";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="bg-[#f6f9fc] min-h-screen relative">
      <FloatingElements />

      <Navbar />

      <Hero />

      <FeaturesSection />

      <AboutSection />

      <Footer />
    </div>
  );
}
