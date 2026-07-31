"use client";

import React from "react";

interface GenerationProgressStepperProps {
  currentStep: number;
  currentStepLabel?: string;
}

const STEPS = [
  {
    step: 1,
    title: "Vision AI Analysis",
    label: "🔍 Analyzing product details with Vision AI...",
    description: "Extracting key features, subject lighting & product geometry",
  },
  {
    step: 2,
    title: "Storyboard Scripting",
    label: "📜 Scripting 3-scene storyboard...",
    description: "Crafting viral visual hooks, direct response transitions & scene prompts",
  },
  {
    step: 3,
    title: "Fal.ai Scene Rendering",
    label: "🎬 Rendering AI video scenes on Fal.ai...",
    description: "Synthesizing high-fidelity video clips using Gemini Omni models",
  },
  {
    step: 4,
    title: "Subject & Angle Alignment",
    label: "🪄 Aligning product lighting & angles...",
    description: "Enforcing camera motion control and product consistency across cuts",
  },
  {
    step: 5,
    title: "FFmpeg HD Stitching",
    label: "⚡ Normalizing & stitching HD video with FFmpeg...",
    description: "Encoding 1080x1920 MP4 video at 8Mbps CRF 18 high-clarity preset",
  },
];

export function GenerationProgressStepper({
  currentStep,
  currentStepLabel,
}: GenerationProgressStepperProps) {
  const activeStep = Math.min(Math.max(1, currentStep), 5);
  const progressPercent = Math.min(100, Math.max(15, activeStep * 20));

  return (
    <div className="glass-card rounded-2xl p-5 md:p-6 space-y-4 shadow-xl border border-white/70 relative overflow-hidden flex flex-col justify-center h-full max-h-full overflow-y-auto custom-scrollbar w-full">
      {/* Background ambient sunset lighting effects */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-600/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Stepper Header */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-600"></span>
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-950">
              AI Video Generation Pipeline
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-stone-900 text-amber-200 border border-white/20 shadow-xs">
            {progressPercent}% Complete
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight">
          Generating Product Video Ad
        </h3>

        {/* Progress Bar Container */}
        <div className="w-full bg-stone-900/15 rounded-full h-3 overflow-hidden border border-white/60 p-0.5 shadow-inner">
          <div
            className="bg-gradient-to-r from-orange-600 via-amber-500 to-amber-400 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(234,88,12,0.6)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Progressive 5-Step List */}
      <div className="space-y-3 pt-1 relative z-10">
        {STEPS.map((s, index) => {
          const isCompleted = s.step < activeStep;
          const isActive = s.step === activeStep;

          return (
            <div key={s.step} className="flex items-start gap-3.5 relative group">
              {/* Connecting vertical timeline line */}
              {index < STEPS.length - 1 && (
                <div
                  className={`absolute left-4 top-8 bottom-0 w-0.5 -ml-[1px] transition-colors duration-500 ${
                    isCompleted ? "bg-orange-600/60" : "bg-stone-900/15"
                  }`}
                />
              )}

              {/* Step Circle Indicator */}
              <div className="relative z-10 flex-shrink-0">
                {isCompleted ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-md transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : isActive ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-orange-950/30 animate-pulse">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/50 border border-white/80 text-stone-600 flex items-center justify-center text-xs font-bold shadow-xs">
                    {s.step}
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div
                className={`flex-1 p-3 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "bg-white/70 border-orange-600/60 shadow-md"
                    : isCompleted
                    ? "bg-white/40 border-white/60"
                    : "bg-white/20 border-white/40 opacity-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-extrabold ${
                      isActive
                        ? "text-orange-950"
                        : isCompleted
                        ? "text-emerald-800"
                        : "text-stone-700"
                    }`}
                  >
                    {isActive ? (currentStepLabel || s.label) : s.label}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-600/15 text-orange-900 border border-orange-600/30 animate-pulse">
                      Processing...
                    </span>
                  )}
                  {isCompleted && (
                    <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                      Done
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-700 font-medium mt-1 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
