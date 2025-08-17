import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center border border-white/30">
      <div className="w-8 h-8 text-[#234e70] mx-auto mb-3">
        {icon}
      </div>
      <h3 className="font-bold text-[#1a254b] mb-2">{title}</h3>
      <p className="text-sm text-[#3b5b7e]">{description}</p>
    </div>
  );
} 