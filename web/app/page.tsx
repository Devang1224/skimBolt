import Navbar from "@/components/ui/navbar";
import Hero from "@/components/sections/Hero";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/sections/Footer";
import CtaSection from "@/components/sections/CtaSection";
import StepsSection from "@/components/sections/StepsSection";

export default function Home() {
  return (
    <div className="bg-[#f6f9fc] min-h-screen relative">

      <Navbar />

      <Hero />
      <StepsSection />

      <FeaturesSection />

      {/* <AboutSection /> */}


      <CtaSection />
       
      <Footer />
    </div>
  );
}
