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
    <main className="h-screen bg-sunset-gradient text-stone-900 p-4 md:p-6 flex flex-col items-center font-sans relative overflow-hidden">
      {/* Ambient Radial Gradient Blobs for Depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-amber-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1600px] w-full h-[calc(100vh-40px)] md:h-[calc(100vh-50px)] overflow-hidden flex flex-col space-y-4 relative z-10 mx-auto px-2 md:px-4">
        {/* Navigation Header Bar */}
        <div className="flex items-center justify-between border-b border-stone-900/15 pb-2.5 pt-1 flex-shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-stone-950 transition-all bg-white/40 hover:bg-white/60 border border-white/60 rounded-xl px-3.5 py-2 backdrop-blur-md shadow-xs hover:scale-[1.02]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Hub
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-stone-900 text-amber-200 border border-white/20 flex items-center gap-2 shadow-md">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Product Ad Studio
          </span>
        </div>

        {/* Hero Section Header */}
        <header className="text-left space-y-1 flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 border border-white/60 text-stone-900 text-xs font-bold uppercase tracking-wider shadow-xs">
            ✨ E-Commerce Video Studio
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-stone-900 drop-shadow-xs">
            Product Ad Generator
          </h1>
          <p className="text-stone-700 text-xs md:text-sm font-medium max-w-3xl">
            Transform multi-angle product photos into high-converting video ads for TikTok, Instagram Reels, and Meta Ads.
          </p>
        </header>

        {/* Display Error Message Toast if any */}
        {errorMessage && (
          <div className="glass-card border-red-500/50 rounded-xl p-3 text-xs flex items-center justify-between text-red-800 flex-shrink-0 shadow-lg font-medium">
            <span>⚠️ {errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-700 hover:text-red-900 underline font-bold ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Split-Screen 2-Column Responsive Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch flex-1 min-h-0 overflow-hidden">
          {/* Left Column (5 Cols): Form Parameters with Glass Card & Internal Scroll */}
          <div className="lg:col-span-5 h-full overflow-y-auto pr-2 custom-scrollbar">
            <form
              onSubmit={handleFormSubmit}
              className="glass-card rounded-2xl p-4.5 space-y-4 shadow-xl border border-white/70"
            >
              <div className="border-b border-stone-900/10 pb-2.5">
                <h2 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <span>⚙️ Ad Configuration</span>
                </h2>
                <p className="text-xs text-stone-700 font-medium mt-0.5">
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
    <div className="glass-card border border-white/70 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col items-center justify-center text-center space-y-5 h-full max-h-full w-full relative overflow-hidden">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-orange-950/20">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-extrabold text-stone-900">Studio Ad Preview & Output</h3>
        <p className="text-stone-700 text-xs md:text-sm leading-relaxed font-medium">
          Configure your product title and upload a photo on the left panel, then click{" "}
          <span className="text-orange-900 font-bold">&quot;Create Product Video Ad&quot;</span> to begin real-time Vision AI scripting and HD video generation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg pt-2">
        <div className="bg-white/50 border border-white/80 rounded-xl p-3.5 text-center space-y-1 shadow-xs backdrop-blur-md">
          <span className="text-lg">📱</span>
          <p className="text-xs font-bold text-stone-900">Multi-Platform</p>
          <p className="text-[11px] text-stone-700 font-medium">Native TikTok & Reels (9:16)</p>
        </div>
        <div className="bg-white/50 border border-white/80 rounded-xl p-3.5 text-center space-y-1 shadow-xs backdrop-blur-md">
          <span className="text-lg">🎯</span>
          <p className="text-xs font-bold text-stone-900">Product Locking</p>
          <p className="text-[11px] text-stone-700 font-medium">Preserves original product photo</p>
        </div>
        <div className="bg-white/50 border border-white/80 rounded-xl p-3.5 text-center space-y-1 shadow-xs backdrop-blur-md">
          <span className="text-lg">⚡</span>
          <p className="text-xs font-bold text-stone-900">1080p HD Export</p>
          <p className="text-[11px] text-stone-700 font-medium">High bitrate FFmpeg render</p>
        </div>
      </div>
    </div>
  );
}
