import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 text-center border border-[#e2e8f0] shadow-sm hover:shadow-md hover:border-[#cbd5e1] transition-all duration-200">
      <div className="w-8 h-8 text-[#2563eb] mx-auto mb-3">
        {icon}
      </div>
      <h3 className="font-bold text-[#1e293b] mb-2">{title}</h3>
      <p className="text-sm text-[#64748b]">{description}</p>
    </div>
  );
} 