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
    <div className="glass-card border border-white/70 rounded-2xl p-5 md:p-6 space-y-4 shadow-xl h-full max-h-full overflow-y-auto custom-scrollbar w-full flex flex-col items-center">
      <div className="w-full flex items-center justify-between border-b border-stone-900/10 pb-3 shrink-0">
        <div>
          <h3 className="text-base font-extrabold text-stone-900">{title}</h3>
          <p className="text-[11px] text-orange-950 font-bold">
            ✨ Product Ad Generation Complete
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-bold px-3.5 py-2 rounded-xl bg-white/50 hover:bg-white/80 text-stone-900 transition-all border border-white/80 shadow-xs cursor-pointer hover:scale-[1.02]"
        >
          + Create Another Ad
        </button>
      </div>

      {/* Video MP4 Player Container (Restrained height so it fits cleanly on laptop screens at 100% zoom) */}
      <div className="relative h-[340px] md:h-[380px] max-h-[45vh] aspect-[9/16] mx-auto rounded-xl overflow-hidden border border-stone-900/20 shadow-2xl bg-stone-950 shrink-0">
        <video
          src={fullVideoUrl}
          controls
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Download and Action Buttons */}
      <div className="w-full shrink-0 pt-1">
        <button
          onClick={handleDownload}
          className="w-full py-3.5 px-6 rounded-xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 hover:scale-[1.01] hover:shadow-[0_12px_25px_rgba(234,88,12,0.35)] active:scale-[0.99] text-white transition-all flex items-center justify-center gap-2.5 shadow-xl cursor-pointer text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Final MP4 Ad
        </button>
      </div>

      {/* Script Scene Breakdown Cards if available */}
      {script && script.length > 0 && (
        <div className="w-full space-y-2.5 pt-3 border-t border-stone-900/10 shrink-0">
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            🎬 Generated Storyboard Scenes
          </h4>
          <div className="space-y-2">
            {script.map((scene) => (
              <div
                key={scene.sceneNumber}
                className="bg-white/40 border border-white/60 rounded-xl p-3 text-xs text-stone-900 space-y-1 shadow-xs"
              >
                <span className="font-extrabold text-orange-950">
                  Scene {scene.sceneNumber}:
                </span>
                <p className="text-stone-800 font-mono text-[11px] leading-relaxed font-medium">
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
