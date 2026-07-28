"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function ProductAdStudioPage() {
  // State Management
  const [productImage, setProductImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [productTitle, setProductTitle] = useState("");
  const [targetPlatform, setTargetPlatform] = useState("TikTok / Reels (9:16 Vertical)");
  const [selectedTemplate, setSelectedTemplate] = useState("Viral Hook UGC");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedPayload, setSubmittedPayload] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Upload Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProductImage(null);
    setImageName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Active Button Logic: Enabled if an image is uploaded OR a title/prompt is entered
  const canSubmit = !!(productImage || productTitle.trim() || customPrompt.trim());

  const handleSubmitAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    const payload = {
      productImageName: imageName,
      productTitle: productTitle.trim(),
      targetPlatform,
      selectedTemplate,
      customPrompt: customPrompt.trim(),
    };

    console.log("Submitting Product Ad Payload:", payload);
    setIsSubmitting(true);
    setSubmittedPayload(payload);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2500);
  };

  const templates = [
    { title: "Viral Hook UGC", desc: "Fast-paced dynamic cuts with energetic voiceover" },
    { title: "Sleek Cinematic", desc: "Studio lighting, 360 rotation & luxury aesthetics" },
    { title: "Problem-Solution", desc: "Direct response ad structure focused on conversion" },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-8 flex flex-col items-center font-sans relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full space-y-8 relative z-10">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 rounded-lg px-3.5 py-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Hub
          </Link>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-950/60 text-purple-400 border border-purple-800/50 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Product Ad Generator
          </span>
        </div>

        {/* Hero Section */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
            ✨ E-Commerce Video Studio
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent drop-shadow-sm pb-2">
            Product Ad Generator
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Transform still product photos into high-converting video ads for TikTok, Instagram Reels, and Meta Ads.
          </p>
        </header>

        {/* Interactive Shell / Form UI */}
        <form onSubmit={handleSubmitAd} className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/80 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl">
          {/* Step 1: Upload Dropzone */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-neutral-200">
              1. Upload Product Photo
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="product-image-upload"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-neutral-700/70 hover:border-purple-500/50 rounded-2xl p-6 md:p-8 text-center transition-all bg-neutral-950/40 flex flex-col items-center justify-center gap-3 group cursor-pointer relative overflow-hidden"
            >
              {productImage ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-purple-500/50 shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={productImage} alt="Product preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-purple-300 font-medium">{imageName}</span>
                    <button
                      type="button"
                      onClick={handleClearImage}
                      className="text-xs text-red-400 hover:text-red-300 underline bg-red-950/40 px-2 py-0.5 rounded border border-red-900/40"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-purple-950/50 border border-purple-800/40 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-300">
                      Drag and drop product image here, or <span className="text-purple-400 underline">browse</span>
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">PNG, JPG, or WEBP up to 10MB</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Step 2: Product Info & Target Platform */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-200">
                Product Title / Keyword
              </label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
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
                onChange={(e) => setTargetPlatform(e.target.value)}
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
                    onClick={() => setSelectedTemplate(style.title)}
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
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                      )}
                    </div>
                    <p className="text-xs text-neutral-400">{style.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 4: Ad Creative Prompt / Scene Details Textarea */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-neutral-200">
              Ad Creative Details & Scene Description <span className="text-xs text-neutral-400 font-normal">(Optional)</span>
            </label>
            <textarea
              className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-5 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-300 text-sm md:text-base leading-relaxed shadow-inner"
              rows={4}
              placeholder="Describe the setting, model, action, or visual mood... (e.g., A sleek gym commercial with a fit model raising her wrist to tap the smartwatch during a workout)."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
          </div>

          {/* Under Construction Notice Banner */}
          <div className="bg-purple-950/30 border border-purple-800/40 rounded-2xl p-5 flex items-start gap-4">
            <div className="p-2 bg-purple-900/40 rounded-xl text-purple-400 shrink-0 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-purple-200">
                Product Ad Engine Ready for Input
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Enter your product details and creative prompt above to preview the submission payload. Once backend integration completes, this form will trigger our full multi-scene product video ad generator!
              </p>
            </div>
          </div>

          {/* Submission Feedback Toast / Box */}
          {submittedPayload && (
            <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Product Ad Payload Captured!
              </div>
              <pre className="text-neutral-300 bg-neutral-950/60 p-3 rounded-lg overflow-x-auto text-[11px] font-mono border border-neutral-800">
                {JSON.stringify(submittedPayload, null, 2)}
              </pre>
            </div>
          )}

          {/* Action Button: Disabled when no input/image present, Active when canSubmit is true */}
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className={`w-full py-4 rounded-2xl font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2 ${
              canSubmit
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
                <span>Processing Product Ad Request...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Create Product Ad</span>
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
