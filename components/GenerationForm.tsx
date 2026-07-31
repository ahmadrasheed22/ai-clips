"use client";

import { useState } from "react";

interface GenerationFormProps {
  onGenerate: (prompt: string, totalDuration: number, quality: string, aspectRatio: string) => Promise<void> | void;
  isLoading?: boolean;
}

export default function GenerationForm({ onGenerate, isLoading = false }: GenerationFormProps) {
  const [prompt, setPrompt] = useState("");
  const [totalDuration, setTotalDuration] = useState<number>(10);
  const [quality, setQuality] = useState<string>("1080p");
  const [aspectRatio, setAspectRatio] = useState<string>("16:9");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateClick = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      await onGenerate(prompt, totalDuration, quality, aspectRatio);
    } catch (err) {
      console.error("Video generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const isSubmitDisabled = isGenerating || isLoading || !prompt.trim();
  const showSpinner = isGenerating || isLoading;

  return (
    <form onSubmit={handleGenerateClick} className="glass-card rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-300 border border-white/70">
      <textarea
        className="w-full glass-input rounded-2xl p-5 text-stone-900 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent resize-none transition-all duration-300 text-base md:text-lg leading-relaxed shadow-inner"
        rows={5}
        placeholder="Describe your scene in detail... (e.g. A high-speed pursuit through a glowing futuristic metropolis at sunset, cinematic camera movement, 8k render)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-6">
          {/* Duration Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
              Duration
            </label>
            <div className="flex bg-white/50 border border-white/80 rounded-2xl p-1 shadow-xs backdrop-blur-md">
              {[5, 10, 15].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTotalDuration(val)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                    totalDuration === val
                      ? "bg-stone-900 text-amber-200 shadow-md scale-[1.02]"
                      : "text-stone-700 hover:text-stone-950 hover:bg-white/40"
                  }`}
                >
                  {val}s
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
              Aspect Ratio
            </label>
            <div className="flex bg-white/50 border border-white/80 rounded-2xl p-1 shadow-xs backdrop-blur-md">
              {[
                { label: "16:9 Landscape", value: "16:9" },
                { label: "9:16 Portrait", value: "9:16" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setAspectRatio(opt.value)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                    aspectRatio === opt.value
                      ? "bg-stone-900 text-amber-200 shadow-md scale-[1.02]"
                      : "text-stone-700 hover:text-stone-950 hover:bg-white/40"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
              Quality Preset
            </label>
            <div className="flex bg-white/50 border border-white/80 rounded-2xl p-1 shadow-xs backdrop-blur-md">
              {["720p", "1080p"].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setQuality(val)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                    quality === val
                      ? "bg-stone-900 text-amber-200 shadow-md scale-[1.02]"
                      : "text-stone-700 hover:text-stone-950 hover:bg-white/40"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-end h-full">
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full lg:w-auto px-9 py-4 bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 text-white font-bold rounded-2xl shadow-xl hover:scale-[1.02] hover:shadow-[0_12px_25px_rgba(234,88,12,0.35)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-3 text-base cursor-pointer"
          >
            {showSpinner ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating Video...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Generate Video</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
