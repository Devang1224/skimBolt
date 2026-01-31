import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconGradient?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  iconGradient = "linear-gradient(135deg, #3b82f6, #a855f7)",
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 text-center border border-[#e2e8f0] shadow-sm hover:shadow-md hover:border-[#cbd5e1] transition-all duration-200">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-white"
        style={{ background: iconGradient }}
      >
        {icon}
      </div>
      <h3 className="font-bold text-[#1e293b] mb-2 text-base sm:text-lg">
        {title}
      </h3>
      <p className="text-sm text-[#64748b] leading-relaxed">{description}</p>
    </div>
  );
}
