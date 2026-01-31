import { motion } from "framer-motion";

export default function DemoPreview() {
  return (
    <div className="relative rounded-2xl p-8 shadow-xl border border-white/30 bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-sm">

      <div className="bg-white/90 rounded-xl p-6 mb-4 shadow-sm border border-white/60">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <div className="ml-2 flex-1 max-w-[240px] rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-500">
            https://blog.example.com/deep-dive-article
          </div>

        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Original Article
            </p>
            <div className="space-y-2 mb-4">
              {["w-full", "w-11/12", "w-10/12", "w-9/12", "w-8/12", "w-7/12"].map(
                (widthClass, index) => (
                  <motion.div
                    key={widthClass}
                    className={`h-2 bg-slate-200 rounded ${widthClass}`}
                    animate={{ opacity: [0.5, 1, 0.5], x: [0, 2, 0] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  />
                )
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">Read time: 12 min</p>
          </div>

          <div className="rounded-lg border border-purple-100 bg-gradient-to-br from-[#eef2ff] to-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              SkimBolt Summary
            </p>
            <ul className="text-xs text-slate-600 space-y-2 mb-4">
              <motion.li
                className="flex items-start gap-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7]"></span>
                Key takeaway in one line.
              </motion.li>
              <motion.li
                className="flex items-start gap-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              >
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7]"></span>
                Important point summarized fast.
              </motion.li>
              <motion.li
                className="flex items-start gap-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              >
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7]"></span>
                Actionable insight, no fluff.
              </motion.li>
            </ul>
            <p className="text-xs font-medium bg-gradient-to-r from-[#3b82f6] to-[#a855f7] bg-clip-text text-transparent">
              Optimized read: 45 sec
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 