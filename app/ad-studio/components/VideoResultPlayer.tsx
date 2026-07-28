"use client";

import React from "react";
import { AdScriptScene } from "@/lib/api/ad-generator.api";

interface VideoResultPlayerProps {
  videoUrl: string;
  title: string;
  script?: AdScriptScene[];
  onReset: () => void;
}

export function VideoResultPlayer({
  videoUrl,
  title,
  script,
  onReset,
}: VideoResultPlayerProps) {
  const fullVideoUrl = videoUrl.startsWith("http")
    ? videoUrl
    : `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"}${videoUrl}`;

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = fullVideoUrl;
    a.download = `product-ad-${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 space-y-3 shadow-xl h-full max-h-full overflow-y-auto custom-scrollbar w-full flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div>
          <h3 className="text-base font-bold text-zinc-100">{title}</h3>
          <p className="text-[11px] text-purple-400 font-medium">
            ✨ Product Ad Generation Complete
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-all border border-white/10"
        >
          + Create Another Ad
        </button>
      </div>

      {/* Video MP4 Player Container */}
      <div className="relative w-full max-w-[240px] mx-auto aspect-[9/16] rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-black">
        <video
          src={fullVideoUrl}
          controls
          autoPlay
          loop
          className="w-full h-full object-cover"
        />
      </div>

      {/* Download and Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          onClick={handleDownload}
          className="flex-1 py-3 px-5 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] active:scale-[0.98] text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Final MP4 Ad
        </button>
      </div>

      {/* Script Scene Breakdown Cards if available */}
      {script && script.length > 0 && (
        <div className="space-y-2.5 pt-3 border-t border-white/10">
          <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            🎬 Generated Storyboard Scenes
          </h4>
          <div className="space-y-2">
            {script.map((scene) => (
              <div
                key={scene.sceneNumber}
                className="bg-black/20 border border-white/10 rounded-xl p-3 text-xs text-zinc-300 space-y-1"
              >
                <span className="font-semibold text-purple-400">
                  Scene {scene.sceneNumber}:
                </span>
                <p className="text-zinc-300 font-mono text-[11px] leading-relaxed">
                  {scene.prompt}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

