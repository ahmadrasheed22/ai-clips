"use client";

import { useState } from "react";
import Link from "next/link";
import { ImageDropzone } from "./components/ImageDropzone";
import { AdParametersForm } from "./components/AdParametersForm";
import { VideoResultPlayer } from "./components/VideoResultPlayer";
import { generateProductAd, AdScriptScene } from "@/lib/api/ad-generator.api";

export default function ProductAdStudioPage() {
  // Master State Management
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [productTitle, setProductTitle] = useState("");
  const [targetPlatform, setTargetPlatform] = useState("TikTok / Reels (9:16 Vertical)");
  const [selectedTemplate, setSelectedTemplate] = useState("Viral Hook UGC");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultVideoUrl, setResultVideoUrl] = useState<string | null>(null);
  const [generatedScript, setGeneratedScript] = useState<AdScriptScene[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // File Handlers
  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setProductImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImageFile(null);
    setProductImagePreview(null);
    setImageName(null);
  };

  // Submit button active state logic: image OR title OR custom prompt entered
  const canSubmit = !!(imageFile || productTitle.trim() || customPrompt.trim());

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await generateProductAd({
        imageFile,
        title: productTitle.trim() || "Featured Product",
        platform: targetPlatform,
        template: selectedTemplate,
        customPrompt,
        aspectRatio: targetPlatform.includes("1:1") ? "1:1" : "9:16",
        duration: 15,
      });

      if (response.success && response.videoUrl) {
        setResultVideoUrl(response.videoUrl);
        if (response.script) setGeneratedScript(response.script);
      } else {
        throw new Error("Invalid response format received from ad generator backend.");
      }
    } catch (err: any) {
      console.error("Failed to generate ad:", err);
      setErrorMessage(err.message || "Failed to generate video ad. Please check backend connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setResultVideoUrl(null);
    setGeneratedScript([]);
    setErrorMessage(null);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-8 flex flex-col items-center font-sans relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full space-y-8 relative z-10">
        {/* Navigation Header Bar */}
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

        {/* Hero Section Header */}
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

        {/* Display Error Message Toast if any */}
        {errorMessage && (
          <div className="bg-red-950/40 border border-red-800/60 rounded-2xl p-4 text-xs flex items-center justify-between text-red-300">
            <span>⚠️ {errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-200 underline font-semibold ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Conditional Render: Result Video Player OR Product Ad Form */}
        {resultVideoUrl ? (
          <VideoResultPlayer
            videoUrl={resultVideoUrl}
            title={productTitle || "Product Video Ad"}
            script={generatedScript}
            onReset={handleReset}
          />
        ) : (
          <form
            onSubmit={handleFormSubmit}
            className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/80 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl"
          >
            {/* Step 1: File Dropzone Component */}
            <ImageDropzone
              productImagePreview={productImagePreview}
              imageName={imageName}
              onImageSelect={handleImageSelect}
              onClearImage={handleClearImage}
            />

            {/* Steps 2-4: Ad Parameters Form Component */}
            <AdParametersForm
              productTitle={productTitle}
              targetPlatform={targetPlatform}
              selectedTemplate={selectedTemplate}
              customPrompt={customPrompt}
              isSubmitting={isSubmitting}
              canSubmit={canSubmit}
              onTitleChange={setProductTitle}
              onPlatformChange={setTargetPlatform}
              onTemplateChange={setSelectedTemplate}
              onPromptChange={setCustomPrompt}
              onSubmit={handleFormSubmit}
            />
          </form>
        )}
      </div>
    </main>
  );
}
