'use client';

import React from "react";
import DemoPreview from "@/components/ui/demo-preview";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiZap } from "react-icons/fi";
import { FaChrome } from "react-icons/fa";
import { motion, type Easing, type Variants } from "framer-motion";
import { scrollAndReset } from "@/utils/anchorScrollReset";
import toast from "react-hot-toast";

const Hero = () => {
  const easeOut: Easing = [0.16, 1, 0.3, 1];

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
        staggerChildren: 0.12,
      },
    },
  };

  const handleAddToChrome = () => {
   toast.error("The extension is under review by Google. Please wait for it to be approved. Till then you can watch the demo video.");
   return;

  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <section
      className="min-h-[90vh] flex items-start pt-12 sm:pt-20 lg:pt-24 relative z-10 overflow-hidden"
      aria-label="Hero"
    >
      {/* Large blurred light-blue circle at top right */}
      <motion.div
        className="absolute top-0 right-10 w-[80vmin] h-[80vmin] rounded-full opacity-[0.15] blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"
        style={{ backgroundColor: "#93c5fd" }}
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2, ease: easeOut }}
      />
      {/* Large blurred purple circle at bottom left */}
      <motion.div
        className="absolute bottom-10 left-10 w-[80vmin] h-[80vmin] rounded-full opacity-[0.15] blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/2"
        style={{ backgroundColor: "#8e75f2" }}
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2, ease: easeOut, delay: 0.1 }}
      />
      <div className="container mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
        <motion.div
          className="flex-1 max-w-2xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="text-center lg:text-left">
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-[#3b82f6] bg-[#eff6ff] border-lg shadow-sm mb-6"
              aria-hidden
            >
              <FiZap className="w-4 h-4 shrink-0" aria-hidden />
              Read Less Know More
            </motion.span>
            <motion.p
              className="text-[2.2rem] max-[350px]:text-[2rem] sm:text-5xl lg:text-7xl font-bold leading-tight text-[#1e293b] sm:mb-4"
              variants={itemVariants}
            >
              Turn Deep Reads
            </motion.p>
            <motion.p
              className="text-[2.2rem] max-[350px]:text-[2rem] sm:text-5xl lg:text-7xl font-bold text-[#1e293b] mb-4 sm:mb-6"
              variants={itemVariants}
            >
              into{" "}
              <span className="font-extrabold text-[#3b82f6]">Quick</span>{" "}
              Insights
            </motion.p>
          </div>

          <motion.div className="mt-4 sm:mt-6 text-center lg:text-left" variants={itemVariants}>
            <p className="text-base sm:text-lg lg:text-xl text-[#64748b] max-w-lg mx-auto lg:mx-0">
              Don&apos;t have time to read it all? Just click and get the main
              points — it&apos;s that simple.
            </p>
          </motion.div>

          <motion.div
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-3 justify-center lg:justify-start"
            variants={itemVariants}
          >
            <motion.a
              onClick={handleAddToChrome}
              className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 rounded-xl text-base sm:text-lg text-white bg-gradient-to-r from-[#3b82f6] to-[#a855f7] shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6] group cursor-pointer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaChrome className="text-white text-xl" aria-hidden />
              <span>Add To Chrome - Free</span>
              <MdKeyboardArrowRight className="text-white text-2xl group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
            <motion.a
              href="/#demo-video"
              className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 rounded-xl text-base sm:text-lg text-[#1e293b] bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6] group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => scrollAndReset(e)}
            >
              <span>Watch Demo</span>
              <MdKeyboardArrowRight className="text-[#1e293b] text-2xl group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 max-w-lg"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
        >
          <DemoPreview />
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
