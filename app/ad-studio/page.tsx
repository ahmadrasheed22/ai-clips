"use client";

import { useState } from "react";
import Link from "next/link";
import { ImageDropzone } from "./components/ImageDropzone";
import { AdParametersForm } from "./components/AdParametersForm";
import { VideoResultPlayer } from "./components/VideoResultPlayer";
import { GenerationProgressStepper } from "./components/GenerationProgressStepper";
import { generateProductAd, AdScriptScene } from "@/lib/api/ad-generator.api";

export default function ProductAdStudioPage() {
  // Master State Management (Multi-Image Array)
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageNames, setImageNames] = useState<string[]>([]);
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

  // Multi-File Handlers
  const handleImagesSelect = (newFiles: File[]) => {
    const updatedFiles = [...imageFiles, ...newFiles].slice(0, 9);
    setImageFiles(updatedFiles);
    setImageNames(updatedFiles.map((f) => f.name));

    const previewPromises = newFiles.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(previewPromises).then((newPreviews) => {
      setImagePreviews((prev) => [...prev, ...newPreviews].slice(0, 9));
    });
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAllImages = () => {
    setImageFiles([]);
    setImagePreviews([]);
    setImageNames([]);
  };

  // Submit button active state logic: images OR title OR custom prompt entered
  const canSubmit = !!(imageFiles.length > 0 || productTitle.trim() || customPrompt.trim());

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setCurrentStep(1);
    setCurrentStepLabel("🔍 Analyzing multi-angle product details with Vision AI...");
    setErrorMessage(null);

    try {
      const response = await generateProductAd(
        {
          imageFiles,
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
    <main className="h-screen bg-zinc-950 text-zinc-100 p-3 md:p-5 flex flex-col items-center font-sans relative overflow-hidden">
      {/* Oversized Subtle Radial Gradient Blobs for Depth */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1600px] w-full h-[calc(100vh-40px)] md:h-[calc(100vh-50px)] overflow-hidden flex flex-col space-y-3 relative z-10 mx-auto px-2 md:px-4">
        {/* Navigation Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2 pt-1 flex-shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-zinc-300 hover:text-white transition-all bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 backdrop-blur-md"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Hub
          </Link>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Product Ad Studio
          </span>
        </div>

        {/* Hero Section Header */}
        <header className="text-left space-y-1 flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
            ✨ E-Commerce Video Studio
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent drop-shadow-sm">
            Product Ad Generator
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm max-w-3xl">
            Transform multi-angle product photos into high-converting video ads for TikTok, Instagram Reels, and Meta Ads.
          </p>
        </header>

        {/* Display Error Message Toast if any */}
        {errorMessage && (
          <div className="bg-red-950/50 border border-red-800/60 rounded-xl p-3 text-xs flex items-center justify-between text-red-300 flex-shrink-0 shadow-lg">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch flex-1 min-h-0 overflow-hidden">
          {/* Left Column (5 Cols): Form Parameters with Glass Card & Internal Scroll */}
          <div className="lg:col-span-5 h-full overflow-y-auto pr-2 custom-scrollbar">
            <form
              onSubmit={handleFormSubmit}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-3.5 shadow-xl"
            >
              <div className="border-b border-white/10 pb-2">
                <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <span>⚙️ Ad Configuration</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Customize image, platform, and prompt details.
                </p>
              </div>

              {/* Step 1: File Dropzone Component */}
              <ImageDropzone
                imagePreviews={imagePreviews}
                imageNames={imageNames}
                onImagesSelect={handleImagesSelect}
                onRemoveImage={handleRemoveImage}
                onClearAll={handleClearAllImages}
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

          {/* Right Column (7 Cols): Full Height Centered Stepper OR Video Result OR Idle Preview */}
          <div className="lg:col-span-7 h-full flex flex-col items-center justify-center min-h-0 overflow-hidden">
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
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 shadow-xl flex flex-col items-center justify-center text-center space-y-4 h-full max-h-full w-full relative overflow-hidden">
      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-950/30">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>

      <div className="max-w-md space-y-1">
        <h3 className="text-lg font-bold text-white">Studio Ad Preview & Output</h3>
        <p className="text-zinc-400 text-xs leading-relaxed">
          Configure your product title and upload a photo on the left panel, then click{" "}
          <span className="text-purple-300 font-semibold">&quot;Create Product Video Ad&quot;</span> to begin real-time Vision AI scripting and HD video generation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-lg pt-1">
        <div className="bg-black/20 border border-white/10 rounded-xl p-3 text-center space-y-0.5">
          <span className="text-base">📱</span>
          <p className="text-xs font-semibold text-zinc-200">Multi-Platform</p>
          <p className="text-[10px] text-zinc-400">Native TikTok & Reels (9:16)</p>
        </div>
        <div className="bg-black/20 border border-white/10 rounded-xl p-3 text-center space-y-0.5">
          <span className="text-base">🎯</span>
          <p className="text-xs font-semibold text-zinc-200">Product Locking</p>
          <p className="text-[10px] text-zinc-400">Preserves original product photo</p>
        </div>
        <div className="bg-black/20 border border-white/10 rounded-xl p-3 text-center space-y-0.5">
          <span className="text-base">⚡</span>
          <p className="text-xs font-semibold text-zinc-200">1080p HD Export</p>
          <p className="text-[10px] text-zinc-400">High bitrate FFmpeg render</p>
        </div>
      </div>
    </div>
  );
}

