"use client";

import { useState } from "react";
import Link from "next/link";
import GenerationForm from "@/components/GenerationForm";
import VideoPlayer from "@/components/VideoPlayer";
import LivePreviewCanvas from "@/components/LivePreviewCanvas";

export default function StudioPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [finalVideoUrl, setFinalVideoUrl] = useState<string | null>(null);

  const handleGenerate = async (
    prompt: string,
    totalDuration: number,
    quality: string,
    selectedAspectRatio: string,
  ) => {
    console.log(
      "Generating video for prompt:",
      prompt,
      "totalDuration:",
      totalDuration,
      "quality:",
      quality,
      "aspectRatio:",
      selectedAspectRatio,
    );
    setIsLoading(true);
    setAspectRatio(selectedAspectRatio);
    setProgress(5);
    setStatusMessage("Initiating video generation pipeline...");
    setError(null);
    setPreviewUrl(null);
    setFinalVideoUrl(null);

    try {
      const response = await fetch("http://localhost:5000/generate-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, totalDuration, quality, aspectRatio: selectedAspectRatio }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate video: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error("No response body returned from server.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const jsonStr = trimmed.replace(/^data:\s*/, "");
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);
            if (data.progress !== undefined) {
              setProgress(data.progress);
            }
            if (data.status) {
              setStatusMessage(data.status);
            }
            if (data.type === "first_frame" && data.previewUrl) {
              setPreviewUrl(data.previewUrl);
            }
            if (data.type === "complete" && data.videoUrl) {
              setFinalVideoUrl(data.videoUrl);
              setProgress(100);
              setStatusMessage(data.status || "Masterpiece Complete!");
            }
            if (data.type === "error" || data.error) {
              setError(data.error || "Generation error occurred.");
            }
          } catch (e) {
            console.error("Failed to parse SSE payload:", jsonStr, e);
          }
        }
      }
    } catch (err: any) {
      console.error("Failed to generate video:", err);
      setError(err.message || "Failed to generate video.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-sunset-gradient text-stone-900 p-4 md:p-8 pb-16 md:pb-24 flex flex-col items-center font-sans relative overflow-hidden">
      {/* Background Glowing Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-amber-500/20 via-orange-600/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl w-full space-y-8 relative z-10 mx-auto my-auto">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-white/20 pb-4 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-amber-100 transition-all bg-white/15 hover:bg-white/25 border border-white/30 rounded-xl px-4 py-2 backdrop-blur-md shadow-md hover:scale-[1.02]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Hub
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-stone-950 text-amber-200 border border-white/20 shadow-md">
            Cinematic Studio
          </span>
        </div>

        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
            AI Director Studio
          </h1>
          <p className="text-amber-100/90 text-base md:text-lg max-w-2xl mx-auto font-medium drop-shadow-xs">
            Bring your ideas to life. Describe your scene below and let the AI direct the video for you.
          </p>
        </header>

        <GenerationForm onGenerate={handleGenerate} isLoading={isLoading} />

        {/* Live Preview Canvas with First Frame Preview & Shimmer Loading */}
        {(isLoading || (previewUrl && !finalVideoUrl)) && (
          <LivePreviewCanvas
            aspectRatio={aspectRatio}
            statusMessage={statusMessage}
            progress={progress}
            previewUrl={previewUrl}
            error={error}
          />
        )}

        {error && !isLoading && (
          <div className="glass-card border-red-500/40 rounded-3xl p-6 text-center space-y-2 shadow-lg">
            <p className="text-red-700 font-bold text-base">Generation Failed</p>
            <p className="text-sm text-stone-700 font-medium">{error}</p>
          </div>
        )}

        {finalVideoUrl && <VideoPlayer videoUrl={finalVideoUrl} />}
      </div>
    </main>
  );
}
