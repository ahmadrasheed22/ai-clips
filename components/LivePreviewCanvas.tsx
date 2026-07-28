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
        } relative rounded-3xl overflow-hidden border border-neutral-800/80 bg-neutral-950/90 shadow-[0_0_50px_rgba(147,51,234,0.15)] flex flex-col justify-between p-6 transition-all duration-500 group`}
      >
        {/* Background Layer: First Frame Video Preview or Shimmering Skeleton */}
        {fullPreviewUrl ? (
          <div className="absolute inset-0 z-0">
            <video
              src={fullPreviewUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60 transition-opacity duration-1000 scale-[1.02] filter blur-[0.5px]"
            />
            {/* Dark glass tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/60" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
            {/* Runway / Luma Shimmer Animation */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-[shimmer_2s_infinite]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0,transparent_70%)]" />
          </div>
        )}

        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/50 shadow-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              {fullPreviewUrl ? "First Frame Live Preview" : "Generating Master Canvas"}
            </span>
          </div>

          <div className="px-3 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-800 text-xs font-mono font-medium text-neutral-400">
            {aspectRatio}
          </div>
        </div>

        {/* Center Canvas Graphic / Status */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 my-auto">
          {!fullPreviewUrl && (
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-xl animate-pulse">
              <svg
                className="w-10 h-10 text-purple-400 animate-spin-slow"
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
            <p className="text-red-400 font-medium max-w-md px-4">{error}</p>
          ) : (
            <p className="text-lg md:text-xl font-medium text-neutral-100 drop-shadow-md max-w-md px-4 leading-relaxed">
              {statusMessage || "Initializing video pipeline..."}
            </p>
          )}
        </div>

        {/* Bottom Progress UI Bar */}
        <div className="relative z-10 w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-neutral-300 px-1">
            <span className="text-neutral-400">Pipeline Progress</span>
            <span className="font-mono text-purple-400 font-bold text-sm">
              {Math.min(100, Math.max(0, progress))}%
            </span>
          </div>

          {/* Glowing Luma Progress Bar */}
          <div className="w-full h-2.5 bg-neutral-900/90 rounded-full overflow-hidden border border-neutral-800 backdrop-blur-md relative p-0.5">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
              style={{ width: `${Math.min(100, Math.max(5, progress))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
