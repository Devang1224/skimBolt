
import { useEffect, useMemo, useState } from "react";

type SummaryLoaderProps = {

  steps?: string[];
  activeStep?: number;
  intervalMs?: number;
};

const DEFAULT_STEPS = [
  "Extracting the main article…",
  "Generating summary…",
  "Generating glossary…",
  "Finalizing…",
];

const SummaryLoader = ({
  steps,
  activeStep,
  intervalMs = 5000,
}: SummaryLoaderProps) => {
  const stepMessages = useMemo(() => steps?.length ? steps : DEFAULT_STEPS, [steps]);
  const [autoStep, setAutoStep] = useState(0);

  useEffect(() => {
    if (typeof activeStep === "number") return;
    const id = window.setInterval(() => {
      if(autoStep < stepMessages.length - 1){
        setAutoStep((prev) => prev + 1);
      }
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [activeStep, intervalMs, stepMessages.length]);

  const stepIdx =
    typeof activeStep === "number"
      ? Math.max(0, Math.min(activeStep, stepMessages.length - 1))
      : autoStep;

  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
        </div>
        <p className="text-sm text-black/60">
          {stepMessages[stepIdx]}
        </p>
      </div>
    </div>
  );
};

export default SummaryLoader;
