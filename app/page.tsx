"use client";

import { useState, useRef, useEffect } from "react";
import { PromptBox } from "../components/PromptBox";
import { LoadingIndicator, loadingStates } from "../components/LoadingIndicator";
import { VideoPlayer } from "../components/VideoPlayer";
import { CaptionCard } from "../components/CaptionCard";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setIsComplete(false);
    setLoadingIndex(0);

    // Smoothly scroll to the result area right as generation starts
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    // Mock progress simulation
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx < loadingStates.length) {
        setLoadingIndex(currentIdx);
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        setIsComplete(true);
      }
    }, 1200); // 1.2s per state for demonstration
  };

  const handleReset = () => {
    setPrompt("");
    setIsComplete(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll smoothly to video when generation finishes (in case they scrolled back up)
  useEffect(() => {
    if (isComplete) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isComplete]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100 p-8 sm:p-20 transition-colors duration-500">
      <main className="flex flex-col w-full max-w-4xl flex-1 items-center justify-start gap-10">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            AI-Clips
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Describe your vision, and we'll script, generate, and narrate a complete professional video.
          </p>
        </div>

        {/* Main Input Area (Always Visible) */}
        <PromptBox 
          prompt={prompt} 
          setPrompt={setPrompt} 
          isGenerating={isGenerating} 
          onGenerate={handleGenerate} 
        />

        {/* Loading and Completion Wrapper */}
        <div ref={resultRef} className="w-full max-w-3xl flex flex-col items-center justify-center min-h-[50px]">
          
          {/* Loading State */}
          {isGenerating && <LoadingIndicator loadingIndex={loadingIndex} />}

          {/* Completion View */}
          {isComplete && (
            <div className="w-full flex flex-col gap-8 animate-in fade-in duration-700 py-10">
              <VideoPlayer />
              <CaptionCard onReset={handleReset} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
