"use client";

import React from "react";

interface LivePreviewCanvasProps {
  aspectRatio: string;
  statusMessage: string;
  progress: number;
  previewUrl: string | null;
  error?: string | null;
}

export default function LivePreviewCanvas({
  aspectRatio,
  statusMessage,
  progress,
  previewUrl,
  error,
}: LivePreviewCanvasProps) {
  const backendBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const fullPreviewUrl = previewUrl
    ? previewUrl.startsWith("/")
      ? `${backendBaseUrl.replace(/\/$/, "")}${previewUrl}`
      : previewUrl
    : null;

  const isPortrait = aspectRatio === "9:16";

  return (
    <div className="w-full flex flex-col items-center justify-center my-8 animate-in fade-in zoom-in duration-500">
      <div
        className={`w-full ${
          isPortrait ? "max-w-sm aspect-[9/16]" : "max-w-3xl aspect-video"
        } relative rounded-3xl overflow-hidden border border-white/70 glass-card shadow-[0_25px_60px_rgba(31,10,4,0.2)] flex flex-col justify-between p-6 transition-all duration-500 group`}
      >
        {/* Background Layer: First Frame Video Preview or Shimmering Sunset Skeleton */}
        {fullPreviewUrl ? (
          <div className="absolute inset-0 z-0">
            <video
              src={fullPreviewUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-75 transition-opacity duration-1000 scale-[1.02] filter blur-[0.5px]"
            />
            {/* Dark warm glass tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/60" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-stone-950 via-amber-950/80 to-stone-950">
            {/* Sunset Shimmer Animation */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-orange-500/15 to-transparent animate-[shimmer_2s_infinite]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.12)_0,transparent_70%)]" />
          </div>
        )}

        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-stone-900/85 backdrop-blur-md border border-white/20 shadow-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
              {fullPreviewUrl ? "First Frame Live Preview" : "Generating Master Canvas"}
            </span>
          </div>

          <div className="px-3 py-1 rounded-full bg-stone-900/85 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-amber-200">
            {aspectRatio}
          </div>
        </div>

        {/* Center Canvas Graphic / Status */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 my-auto">
          {!fullPreviewUrl && (
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/20 border border-orange-400/40 backdrop-blur-xl animate-pulse shadow-lg">
              <svg
                className="w-10 h-10 text-orange-400 animate-spin-slow"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {error ? (
            <p className="text-red-300 font-bold max-w-md px-4 drop-shadow-md">{error}</p>
          ) : (
            <p className="text-lg md:text-xl font-bold text-white drop-shadow-lg max-w-md px-4 leading-relaxed">
              {statusMessage || "Initializing video pipeline..."}
            </p>
          )}
        </div>

        {/* Bottom Progress UI Bar */}
        <div className="relative z-10 w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-200 px-1 drop-shadow-xs">
            <span className="text-stone-300 uppercase tracking-wider text-[11px]">Pipeline Progress</span>
            <span className="font-mono text-orange-400 font-extrabold text-sm">
              {Math.min(100, Math.max(0, progress))}%
            </span>
          </div>

          {/* Glowing Sunset Progress Bar */}
          <div className="w-full h-3 bg-stone-950/80 rounded-full overflow-hidden border border-white/20 backdrop-blur-md relative p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-orange-600 via-amber-500 to-amber-300 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(234,88,12,0.8)]"
              style={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
