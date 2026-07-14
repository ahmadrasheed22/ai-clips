"use client";

import { useState } from "react";
import GenerationForm from "@/components/GenerationForm";
import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [generatedScenes, setGeneratedScenes] = useState<any[]>([]);
  const [finalVideoUrl, setFinalVideoUrl] = useState<string | null>(null);

  const handleGenerate = async (prompt: string) => {
    console.log("Generating video for prompt:", prompt);
    setIsLoading(true);
    setFinalVideoUrl(null);
    setGeneratedScenes([]);

    try {
      // Set a 10-minute timeout to match the backend and prevent premature aborts
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 600 * 1000);

      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      const data = await response.json();
      if (data && data.scenes) {
        setGeneratedScenes(data.scenes);
      }
      if (data && data.videoUrl) {
        setFinalVideoUrl(data.videoUrl);
      }
    } catch (error) {
      console.error("Failed to generate video:", error);
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
        


        <VideoPlayer videoUrl={finalVideoUrl} />
      </div>
    </main>
  );
}
