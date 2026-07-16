"use client";

import { useState } from "react";

interface GenerationFormProps {
  onGenerate: (prompt: string, duration: number, quality: string) => void;
  isLoading: boolean;
}

export default function GenerationForm({ onGenerate, isLoading }: GenerationFormProps) {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState<number>(10);
  const [quality, setQuality] = useState<string>("1080p");

  const handleGenerateClick = () => {
    if (!prompt.trim()) return;
    onGenerate(prompt, duration, quality);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl transition-all duration-300 hover:border-neutral-700">
      <textarea
        className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-5 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-300 text-lg leading-relaxed shadow-inner"
        rows={5}
        placeholder="Describe your scene in detail... (e.g. A neon-lit cyberpunk city alleyway at midnight, cinematic lighting, 8k resolution)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-6">
          {/* Duration Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Duration
            </label>
            <div className="flex bg-neutral-950 border border-neutral-800 rounded-xl p-1">
              {[3, 8, 10, 15].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setDuration(val)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    duration === val
                      ? "bg-purple-600 text-white shadow-md shadow-purple-500/10"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {val}s
                </button>
              ))}
            </div>
          </div>

          {/* Quality Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Quality
            </label>
            <div className="flex bg-neutral-950 border border-neutral-800 rounded-xl p-1">
              {["720p", "1080p"].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setQuality(val)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    quality === val
                      ? "bg-purple-600 text-white shadow-md shadow-purple-500/10"
                      : "text-neutral-400 hover:text-neutral-200"
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
            onClick={handleGenerateClick}
            disabled={isLoading || !prompt.trim()}
            className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 text-lg"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating...</span>
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
    </div>
  );
}
