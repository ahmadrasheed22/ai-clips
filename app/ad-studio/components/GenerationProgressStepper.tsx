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
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 space-y-3 shadow-xl relative overflow-hidden flex flex-col justify-center h-full max-h-full overflow-y-auto custom-scrollbar w-full">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Stepper Header */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-300">
              AI Video Generation Pipeline
            </span>
          </div>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
            {progressPercent}% Complete
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-extrabold text-white tracking-tight">
          Generating Product Video Ad
        </h3>

        {/* Progress Bar Container */}
        <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-white/10">
          <div
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 h-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Progressive 5-Step List */}
      <div className="space-y-2.5 pt-1 relative z-10">
        {STEPS.map((s, index) => {
          const isCompleted = s.step < activeStep;
          const isActive = s.step === activeStep;

          return (
            <div key={s.step} className="flex items-start gap-3 relative group">
              {/* Connecting vertical timeline line */}
              {index < STEPS.length - 1 && (
                <div
                  className={`absolute left-3.5 top-7 bottom-0 w-0.5 -ml-[1px] transition-colors duration-500 ${
                    isCompleted ? "bg-purple-500/60" : "bg-white/10"
                  }`}
                />
              )}

              {/* Step Circle Indicator */}
              <div className="relative z-10 flex-shrink-0">
                {isCompleted ? (
                  <div className="w-7 h-7 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : isActive ? (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.6)] animate-pulse">
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-black/40 border border-white/10 text-zinc-500 flex items-center justify-center text-[11px] font-semibold">
                    {s.step}
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div
                className={`flex-1 p-2.5 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "bg-purple-500/10 border-purple-500/60 shadow-lg shadow-purple-950/20"
                    : isCompleted
                    ? "bg-black/20 border-white/10"
                    : "bg-black/10 border-white/5 opacity-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold ${
                      isActive
                        ? "text-purple-300"
                        : isCompleted
                        ? "text-emerald-400"
                        : "text-zinc-400"
                    }`}
                  >
                    {isActive ? (currentStepLabel || s.label) : s.label}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 animate-pulse">
                      Processing...
                    </span>
                  )}
                  {isCompleted && (
                    <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                      Done
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
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

