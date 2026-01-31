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
    <section id="how-it-works" className="py-24 lg:py-28 min-h-screen bg-gradient-to-t from-[#e1ecf988] to-white ">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
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
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-2xl border border-slate-100 
                shadow-sm p-8 overflow-hidden"
              >
                <span className="absolute top-4 left-4 text-4xl font-bold text-slate-300/40">
                  {item.step}
                </span>
                <div className="relative flex flex-col items-center justify-center">
                  <div
                    className={`w-18 h-18 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.iconBg} text-white shadow-md`}
                  >
                    <Icon className="w-8 h-8" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-[#1e293b]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[#64748b] text-center">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
