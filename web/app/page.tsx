import Navbar from "@/components/ui/navbar";
import Hero from "@/components/sections/Hero";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Footer from "@/components/sections/Footer";
import CtaSection from "@/components/sections/CtaSection";
import StepsSection from "@/components/sections/StepsSection";
import DemoVideo from "@/components/sections/DemoVideo";

export default function Home() {
  return (
    <div className="bg-[#f6f9fc] min-h-screen relative ">

      <Navbar />

      <Hero />

      <DemoVideo/>
      <StepsSection />

      <FeaturesSection />

      {/* <AboutSection /> */}


      <CtaSection />
       
      <Footer />
    </div>
  );
}
