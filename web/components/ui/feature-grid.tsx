import {
  FiZap,
  FiList,
  FiMinimize2,
  FiSend,
  FiClock,
  FiShield,
} from "react-icons/fi";
import FeatureCard from "./feature-card";

const FEATURES = [
  {
    title: "AI Summaries",
    description:
      "Get AI-powered summaries that turn long articles into quick, readable insights.",
    icon: <FiZap className="w-6 h-6" />,
    iconGradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
  },
  {
    title: "Key Takeaways",
    description:
      "Bullet-pointed insights so you never miss the important stuff.",
    icon: <FiList className="w-6 h-6" />,
    iconGradient: "linear-gradient(135deg, #8b5cf6, #a855f7)",
  },
  {
    title: "Distraction Free",
    description:
      "Clean, minimal interface that focuses on what matters—the content.",
    icon: <FiMinimize2 className="w-6 h-6" />,
    iconGradient: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
  },
  {
    title: "Works on Any Article",
    description:
      "Summarize articles, blogs, and long reads right in your browser—no extra steps.",
    icon: <FiSend className="w-6 h-6" />,
    iconGradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
  },
  {
    title: "Save 10+ Hours Weekly",
    description:
      "Average users save over 10 hours per week on reading time.",
    icon: <FiClock className="w-6 h-6" />,
    iconGradient: "linear-gradient(135deg, #14b8a6, #0ea5e9)",
  },
  {
    title: "Privacy First",
    description:
      "Your data stays yours. We never store or share your browsing history.",
    icon: <FiShield className="w-6 h-6" />,
    iconGradient: "linear-gradient(135deg, #059669, #0d9488)",
  },
];

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
      {FEATURES.map((feature) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          iconGradient={feature.iconGradient}
        />
      ))}
    </div>
  );
}
