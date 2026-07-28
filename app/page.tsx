"use client";

import { useState } from "react";
import GenerationForm from "@/components/GenerationForm";
import VideoPlayer from "@/components/VideoPlayer";
import LivePreviewCanvas from "@/components/LivePreviewCanvas";

export default function Home() {
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
              setStatusMessage("Masterpiece Complete!");
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
          <div className="bg-red-950/30 border border-red-900/50 rounded-3xl p-6 text-center space-y-2">
            <p className="text-red-400 font-medium">Generation Failed</p>
            <p className="text-sm text-neutral-400">{error}</p>
          </div>
        )}

        {finalVideoUrl && <VideoPlayer videoUrl={finalVideoUrl} />}
      </div>
    </main>
  );
}
