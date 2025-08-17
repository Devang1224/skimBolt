import { FiClock, FiBookOpen, FiZap } from "react-icons/fi";
import FeatureCard from "./feature-card";

export default function FeatureGrid() {
  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      <FeatureCard
        icon={<FiClock className="w-8 h-8" />}
        title="Save Time"
        description="Insights that take seconds, not your time"
      />
      
      <FeatureCard
        icon={<FiBookOpen className="w-8 h-8" />}
        title="Any Article"
        description="Works on blogs, news, research papers"
      />
      
      <FeatureCard
        icon={<FiZap className="w-8 h-8" />}
        title="One Click"
        description="Simple extension, instant summaries"
      />
    </div>
  );
} 