 "use client";

import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";
import { FaChrome } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#d9e0f6] via-white to-[#fdf2f8]">
      <div className="w-full text-center px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center mb-5">
            <motion.div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
              style={{
                background: "linear-gradient(to bottom, #3b82f6, #a855f7)",
              }}
              whileHover={{ scale: 1.06 }}
            >
              <FiZap className="w-5 h-5" aria-hidden />
            </motion.div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e293b] mb-4">
            Ready to Reclaim{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#a855f7]">
              Your Time
            </span>
            ?
          </h2>
          <p className="text-[#64748b] text-lg mb-8">
            Save hours every week by turning dense articles into clear,
            bite-sized takeaways you can scan in seconds, while still keeping
            the key details and context that matter.
          </p>
          <motion.a
            href="/extension"
            className="inline-flex items-center gap-3 px-7 py-3 rounded-xl text-lg text-white bg-gradient-to-r from-[#3b82f6] to-[#a855f7] shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6]"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaChrome className="text-white text-xl" aria-hidden />
            <span>Install Free Chrome Extension</span>
            <MdKeyboardArrowRight className="text-white text-2xl transition-transform duration-200" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
