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
    <div className="space-y-8">
      {/* Step 2: Product Info & Target Platform */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-200">
            Product Title / Keyword <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            value={productTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g., Wireless Noise-Canceling Earbuds"
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-200">
            Target Ad Platform
          </label>
          <select
            value={targetPlatform}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            <option value="TikTok / Reels (9:16 Vertical)">TikTok / Reels (9:16 Vertical)</option>
            <option value="YouTube Shorts (9:16 Vertical)">YouTube Shorts (9:16 Vertical)</option>
            <option value="Meta Newsfeed (1:1 Square)">Meta Newsfeed (1:1 Square)</option>
          </select>
        </div>
      </div>

      {/* Step 3: Preset Styles */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-neutral-200">
          Select Ad Style Template
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {templates.map((style) => {
            const isSelected = selectedTemplate === style.title;
            return (
              <div
                key={style.title}
                onClick={() => onTemplateChange(style.title)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1 ${
                  isSelected
                    ? "bg-purple-950/40 border-purple-500 text-purple-200 shadow-md shadow-purple-500/10"
                    : "bg-neutral-950/40 border-neutral-800 hover:border-purple-500/40 text-neutral-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-semibold ${isSelected ? "text-purple-300" : "text-neutral-200"}`}>
                    {style.title}
                  </p>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-purple-400" />}
                </div>
                <p className="text-xs text-neutral-400">{style.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 4: Ad Creative Prompt / Scene Details */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-neutral-200">
          Ad Creative Details & Scene Description <span className="text-xs text-neutral-400 font-normal">(Optional)</span>
        </label>
        <textarea
          className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-5 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-300 text-sm md:text-base leading-relaxed shadow-inner"
          rows={4}
          placeholder="Describe the setting, model, action, or visual mood... (e.g., A sleek gym commercial with a fit model raising her wrist to tap the smartwatch during a workout)."
          value={customPrompt}
          onChange={(e) => onPromptChange(e.target.value)}
        />
      </div>

      {/* Action Submit Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={!canSubmit || isSubmitting}
        className={`w-full py-4 rounded-2xl font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2 ${
          canSubmit && !isSubmitting
            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-600/25 cursor-pointer"
            : "bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-60"
        }`}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Generating Product Video Ad...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Create Product Video Ad</span>
          </>
        )}
      </button>
    </div>
  );
}
