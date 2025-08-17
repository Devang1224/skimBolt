import FloatingElements from "@/components/ui/floating-elements";
import Navbar from "@/components/ui/navbar";
import Hero from "@/components/sections/Hero";


export default function Home() {
  return (
    <div id="hero" className="bg-gradient-to-br from-[#fbc2eb] via-[#a6c1ee] to-[#f6f9fc] min-h-screen relative">
      <FloatingElements />
      
      <Navbar />
      
    <Hero/>
    </div>
  );
}
