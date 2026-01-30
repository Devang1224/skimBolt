import React from "react";
import DemoPreview from "@/components/ui/demo-preview";
import { MdKeyboardArrowRight } from "react-icons/md";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center relative z-10" aria-label="Hero">
      <div className="container mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 max-w-2xl">
          <div className="text-center lg:text-left">
            <p className="text-5xl lg:text-7xl font-bold leading-tight text-[#1a254b] mb-4">
              Turn Deep Reads
            </p>
            <p className="text-5xl lg:text-7xl font-bold text-[#234e70] mb-6">
              into{" "}
              <span className="font-extrabold text-[#2563eb]">Quick</span>{" "}
              Insights
            </p>
          </div>

          <div className="mt-6 text-center lg:text-left">
            <p className="text-lg lg:text-xl text-[#3b5b7e] max-w-lg">
              Don&apos;t have time to read it all? Just click and get the main
              points — it&apos;s that simple.
            </p>
          </div>

          <div className="mt-8 flex justify-center lg:justify-start">
            <button className="inline-flex items-center gap-3 px-7 py-3 rounded-xl font-semibold text-lg bg-[#1a254b] text-white 
              shadow hover:bg-[#234e70] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#234e70] group cursor-pointer"
            >
              <span>Add To Chrome</span>
              <MdKeyboardArrowRight className="text-white text-2xl group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>

        <div className="flex-1 max-w-lg">
          <DemoPreview />
        </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
