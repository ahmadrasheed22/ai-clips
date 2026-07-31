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
    <div className="space-y-4">
      {/* Step 2: Product Info & Target Platform */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider">
            Product Title / Keyword <span className="text-orange-600">*</span>
          </label>
          <input
            type="text"
            value={productTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g., Wireless Noise-Canceling Earbuds"
            className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-stone-900 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all font-medium"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider">
            Target Ad Platform
          </label>
          <select
            value={targetPlatform}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all font-medium"
          >
            <option value="TikTok / Reels (9:16 Vertical)" className="bg-stone-900 text-stone-100">TikTok / Reels (9:16 Vertical)</option>
            <option value="YouTube Shorts (9:16 Vertical)" className="bg-stone-900 text-stone-100">YouTube Shorts (9:16 Vertical)</option>
            <option value="Meta Newsfeed (1:1 Square)" className="bg-stone-900 text-stone-100">Meta Newsfeed (1:1 Square)</option>
          </select>
        </div>
      </div>

      {/* Step 3: Preset Styles */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider">
          Select Ad Style Template
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {templates.map((style) => {
            const isSelected = selectedTemplate === style.title;
            return (
              <div
                key={style.title}
                onClick={() => onTemplateChange(style.title)}
                className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer space-y-1 hover:scale-[1.02] ${
                  isSelected
                    ? "bg-stone-900 text-amber-200 border-white/30 shadow-md"
                    : "bg-white/40 border-white/60 text-stone-800 hover:bg-white/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-extrabold ${isSelected ? "text-amber-200" : "text-stone-900"}`}>
                    {style.title}
                  </p>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />}
                </div>
                <p className={`text-[10px] leading-snug font-medium ${isSelected ? "text-amber-100/80" : "text-stone-700"}`}>{style.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 4: Ad Creative Prompt / Scene Details */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider">
          Ad Creative Details & Scene Description <span className="text-[10px] text-stone-600 font-normal lowercase">(optional)</span>
        </label>
        <textarea
          className="w-full glass-input rounded-xl p-3 text-stone-900 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-orange-600 resize-none transition-all duration-300 text-xs leading-relaxed font-medium"
          rows={2.5}
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
        className={`w-full py-3.5 rounded-xl font-bold text-xs md:text-sm text-center transition-all duration-300 flex items-center justify-center gap-2.5 ${
          canSubmit && !isSubmitting
            ? "bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 hover:scale-[1.02] hover:shadow-[0_12px_25px_rgba(234,88,12,0.35)] active:scale-[0.98] text-white shadow-xl cursor-pointer"
            : "bg-white/40 border border-white/60 text-stone-500 cursor-not-allowed opacity-50 shadow-none"
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
