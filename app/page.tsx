"use client";

import { useState } from "react";
import GenerationForm from "@/components/GenerationForm";
import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [finalVideoUrl, setFinalVideoUrl] = useState<string | null>(null);

  const handleGenerate = async (prompt: string, duration: number, quality: string) => {
    console.log("Generating video for prompt:", prompt, "duration:", duration, "quality:", quality);
    setIsLoading(true);
    setStatusMessage("Generating video via Fal.ai...");
    setError(null);
    setFinalVideoUrl(null);

    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, duration, quality }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate video: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data?.videoUrl) {
        throw new Error("No videoUrl returned from the server.");
      }

      console.log("Video URL received:", data.videoUrl);
      setFinalVideoUrl(data.videoUrl);
    } catch (err: any) {
      console.error("Failed to generate video:", err);
      setError(err.message || "Failed to generate video.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 flex flex-col items-center font-sans">
      <div className="max-w-4xl w-full space-y-8 mt-12">
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm pb-2">
            AI Director Studio
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Bring your ideas to life. Describe your scene below and let the AI direct the video for you.
          </p>
        </header>

        <GenerationForm onGenerate={handleGenerate} isLoading={isLoading} />

        {isLoading && statusMessage && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-center space-y-4 animate-pulse-slow">
            <div className="flex items-center space-x-3">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-600"></span>
              </span>
              <span className="text-lg font-medium text-neutral-200">
                {statusMessage}
              </span>
            </div>
            <div className="w-full bg-neutral-950 rounded-full h-1.5 overflow-hidden border border-neutral-800 relative">
              <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full animate-progress-loading"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-950/30 border border-red-900/50 rounded-3xl p-6 text-center space-y-2">
            <p className="text-red-400 font-medium">Generation Failed</p>
            <p className="text-sm text-neutral-400">{error}</p>
          </div>
        )}

        <VideoPlayer videoUrl={finalVideoUrl} />
      </div>
    </main>
  );
}
