"use client";

import React from "react";

interface AdParametersFormProps {
  productTitle: string;
  targetPlatform: string;
  selectedTemplate: string;
  customPrompt: string;
  isSubmitting: boolean;
  canSubmit: boolean;
  onTitleChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onTemplateChange: (value: string) => void;
  onPromptChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const templates = [
  { title: "Viral Hook UGC", desc: "Fast-paced dynamic cuts with energetic voiceover" },
  { title: "Sleek Cinematic", desc: "Studio lighting, 360 rotation & luxury aesthetics" },
  { title: "Problem-Solution", desc: "Direct response ad structure focused on conversion" },
];

export function AdParametersForm({
  productTitle,
  targetPlatform,
  selectedTemplate,
  customPrompt,
  isSubmitting,
  canSubmit,
  onTitleChange,
  onPlatformChange,
  onTemplateChange,
  onPromptChange,
  onSubmit,
}: AdParametersFormProps) {
  return (
    <div className="space-y-3.5">
      {/* Step 2: Product Info & Target Platform */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-zinc-200">
            Product Title / Keyword <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            value={productTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g., Wireless Noise-Canceling Earbuds"
            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-zinc-200">
            Target Ad Platform
          </label>
          <select
            value={targetPlatform}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          >
            <option value="TikTok / Reels (9:16 Vertical)" className="bg-zinc-900 text-zinc-100">TikTok / Reels (9:16 Vertical)</option>
            <option value="YouTube Shorts (9:16 Vertical)" className="bg-zinc-900 text-zinc-100">YouTube Shorts (9:16 Vertical)</option>
            <option value="Meta Newsfeed (1:1 Square)" className="bg-zinc-900 text-zinc-100">Meta Newsfeed (1:1 Square)</option>
          </select>
        </div>
      </div>

      {/* Step 3: Preset Styles */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-zinc-200">
          Select Ad Style Template
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {templates.map((style) => {
            const isSelected = selectedTemplate === style.title;
            return (
              <div
                key={style.title}
                onClick={() => onTemplateChange(style.title)}
                className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer space-y-0.5 hover:-translate-y-1 hover:border-purple-500/50 ${
                  isSelected
                    ? "bg-purple-500/10 border-purple-500 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "bg-black/20 border-white/10 text-zinc-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-semibold ${isSelected ? "text-purple-300" : "text-zinc-200"}`}>
                    {style.title}
                  </p>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />}
                </div>
                <p className="text-[10px] text-zinc-400 leading-snug">{style.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 4: Ad Creative Prompt / Scene Details */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-zinc-200">
          Ad Creative Details & Scene Description <span className="text-[10px] text-zinc-400 font-normal">(Optional)</span>
        </label>
        <textarea
          className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none transition-all duration-200 text-xs leading-relaxed"
          rows={2}
          placeholder="Describe the setting, model, action, or visual mood..."
          value={customPrompt}
          onChange={(e) => onPromptChange(e.target.value)}
        />
      </div>

      {/* Action Submit Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={!canSubmit || isSubmitting}
        className={`w-full py-2.5 md:py-3 rounded-xl font-bold text-xs md:text-sm text-center transition-all duration-200 flex items-center justify-center gap-2 ${
          canSubmit && !isSubmitting
            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] active:scale-[0.98] text-white shadow-lg shadow-purple-600/25 cursor-pointer"
            : "bg-white/5 border border-white/10 text-zinc-500 cursor-not-allowed opacity-50 shadow-none"
        }`}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Generating Product Video Ad...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Create Product Video Ad</span>
          </>
        )}
      </button>
    </div>
  );
}

