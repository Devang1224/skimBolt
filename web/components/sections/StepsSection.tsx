"use client";

import { motion } from "framer-motion";
import { FiMousePointer, FiCpu, FiCheckCircle } from "react-icons/fi";

const steps = [
  {
    step: "01",
    title: "Click the Bolt",
    description:
      "Visit any article or blog post and click the Skimbolt icon in your browser toolbar.",
    icon: FiMousePointer,
    iconBg: "from-[#3b82f6] to-[#38bdf8]",
  },
  {
    step: "02",
    title: "AI Analyzes",
    description:
      "Our advanced AI reads and understands the full article in milliseconds.",
    icon: FiCpu,
    iconBg: "from-[#a855f7] to-[#ec4899]",
  },
  {
    step: "03",
    title: "Get Your Summary",
    description:
      "Receive a clean, concise summary with key takeaways highlighted.",
    icon: FiCheckCircle,
    iconBg: "from-[#22c55e] to-[#16a34a]",
  },
];

export default function StepsSection() {
  return (
    <section className="py-24 lg:py-28 min-h-screen bg-gradient-to-t from-[#e1ecf988] to-white scroll-mt-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold text-[#5b21b6] bg-[#ede9fe]">
            Simple Process
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e293b]">
            Three Steps to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#a855f7]">
              Faster Reading
            </span>
          </h2>
          <p className="mt-4 text-[#64748b] text-lg">
            Go from long-form content to clear, shareable takeaways in just a
            few clicks.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                className="relative bg-white rounded-2xl border border-slate-100 
                shadow-sm p-8 overflow-hidden"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.98 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -6, boxShadow: "0 18px 40px rgba(15, 23, 42, 0.12)" }}
              >
                <span className="absolute top-4 left-4 text-4xl font-bold text-slate-300/40">
                  {item.step}
                </span>
                <div className="relative flex flex-col items-center justify-center">
                  <motion.div
                    className={`w-18 h-18 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.iconBg} text-white shadow-md`}
                    whileHover={{ scale: 1.06 }}
                  >
                    <Icon className="w-8 h-8" aria-hidden />
                  </motion.div>
                  <h3 className="mt-5 text-xl font-semibold text-[#1e293b]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[#64748b] text-center">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
