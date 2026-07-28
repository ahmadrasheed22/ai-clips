"use client";

import { useState } from "react";
import Link from "next/link";
import { ImageDropzone } from "./components/ImageDropzone";
import { AdParametersForm } from "./components/AdParametersForm";
import { VideoResultPlayer } from "./components/VideoResultPlayer";
import { GenerationProgressStepper } from "./components/GenerationProgressStepper";
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

  // Generation & Stepper State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentStepLabel, setCurrentStepLabel] = useState<string | undefined>(undefined);

  // Result State
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
    setCurrentStep(1);
    setCurrentStepLabel("🔍 Analyzing product details with Vision AI...");
    setErrorMessage(null);

    try {
      const response = await generateProductAd(
        {
          imageFile,
          title: productTitle.trim() || "Featured Product",
          platform: targetPlatform,
          template: selectedTemplate,
          customPrompt,
          aspectRatio: targetPlatform.includes("1:1") ? "1:1" : "9:16",
          duration: 15,
        },
        (step, label) => {
          setCurrentStep(step);
          setCurrentStepLabel(label);
        },
      );

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

  // Reset video player without wiping user input context (title, image, options)
  const handleReset = () => {
    setResultVideoUrl(null);
    setGeneratedScript([]);
    setErrorMessage(null);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-8 flex flex-col items-center font-sans relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] w-full space-y-8 relative z-10 mx-auto px-2 md:px-6">
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
            Product Ad Studio
          </span>
        </div>

        {/* Hero Section Header */}
        <header className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
            ✨ E-Commerce Video Studio
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent drop-shadow-sm pb-1">
            Product Ad Generator
          </h1>
          <p className="text-neutral-400 text-sm md:text-base max-w-3xl">
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

        {/* Split-Screen 2-Column Responsive Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Form Parameters (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6 self-start">
            <form
              onSubmit={handleFormSubmit}
              className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/80 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl"
            >
              <div className="border-b border-neutral-800/80 pb-4">
                <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                  <span>⚙️ Ad Configuration</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Customize image, platform, and prompt details.
                </p>
              </div>

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
          </div>

          {/* Right Column (7 Cols): Stepper OR Video Result OR Idle Preview */}
          <div className="lg:col-span-7 space-y-6 min-h-[580px]">
            {isSubmitting ? (
              <GenerationProgressStepper
                currentStep={currentStep}
                currentStepLabel={currentStepLabel}
              />
            ) : resultVideoUrl ? (
              <VideoResultPlayer
                videoUrl={resultVideoUrl}
                title={productTitle || "Product Video Ad"}
                script={generatedScript}
                onReset={handleReset}
              />
            ) : (
              <AdPreviewPlaceholder />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function AdPreviewPlaceholder() {
  return (
    <div className="bg-neutral-900/40 backdrop-blur-xl border border-neutral-800/70 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center text-center space-y-6 min-h-[580px] relative overflow-hidden">
      <div className="w-20 h-20 rounded-3xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-center text-purple-400 shadow-xl shadow-purple-950/50">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-bold text-white">Studio Ad Preview & Output</h3>
        <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
          Configure your product title and upload a photo on the left panel, then click{" "}
          <span className="text-purple-300 font-semibold">&quot;Create Product Video Ad&quot;</span> to begin real-time Vision AI scripting and HD video generation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg pt-2">
        <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-4 text-center space-y-1">
          <span className="text-lg">📜</span>
          <p className="text-xs font-semibold text-neutral-200">3-Scene Script</p>
          <p className="text-[10px] text-neutral-400">Automated hook & call to action</p>
        </div>
        <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-4 text-center space-y-1">
          <span className="text-lg">🪄</span>
          <p className="text-xs font-semibold text-neutral-200">Vision Consistency</p>
          <p className="text-[10px] text-neutral-400">Preserves product subject details</p>
        </div>
        <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-4 text-center space-y-1">
          <span className="text-lg">⚡</span>
          <p className="text-xs font-semibold text-neutral-200">1080p HD MP4</p>
          <p className="text-[10px] text-neutral-400">High bitrate FFmpeg stitch</p>
        </div>
      </div>
    </div>
  );
}
