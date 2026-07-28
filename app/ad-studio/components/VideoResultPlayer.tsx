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
    <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-neutral-100">{title}</h3>
          <p className="text-xs text-purple-400 font-medium mt-0.5">
            ✨ Product Ad Generation Complete
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors border border-neutral-700"
        >
          + Create Another Ad
        </button>
      </div>

      {/* Video MP4 Player Container */}
      <div className="relative w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl overflow-hidden border border-neutral-700/80 shadow-2xl bg-black">
        <video
          src={fullVideoUrl}
          controls
          autoPlay
          loop
          className="w-full h-full object-cover"
        />
      </div>

      {/* Download and Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={handleDownload}
          className="flex-1 py-3.5 px-5 rounded-xl font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Final MP4 Ad
        </button>
      </div>

      {/* Script Scene Breakdown Cards if available */}
      {script && script.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-neutral-800">
          <h4 className="text-sm font-semibold text-neutral-300">
            🎬 Generated Storyboard Scenes
          </h4>
          <div className="space-y-2">
            {script.map((scene) => (
              <div
                key={scene.sceneNumber}
                className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-3.5 text-xs text-neutral-300 space-y-1"
              >
                <span className="font-semibold text-purple-400">
                  Scene {scene.sceneNumber}:
                </span>
                <p className="text-neutral-300 font-mono text-[11px] leading-relaxed">
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
