import React from "react";

interface VideoPlayerProps {
  videoUrl?: string | null;
}

export default function VideoPlayer({ 
  videoUrl
}: VideoPlayerProps) {
  if (!videoUrl) {
    return null;
  }

  const backendBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const fullVideoUrl = videoUrl.startsWith("/")
    ? `${backendBaseUrl.replace(/\/$/, "")}${videoUrl}`
    : videoUrl;

  return (
    <div className="mt-12 glass-card border border-white/70 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center transition-all duration-500 w-full animate-in fade-in zoom-in duration-700">
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden bg-stone-950 shadow-2xl border border-stone-800 relative group aspect-video flex items-center justify-center">
        <video 
          controls 
          autoPlay 
          className="w-full h-full object-contain"
          src={fullVideoUrl}
        />
      </div>
      <div className="mt-6 text-center space-y-1">
        <h3 className="text-2xl font-extrabold text-stone-900 drop-shadow-xs">Your Masterpiece is Ready</h3>
        <p className="text-stone-700 text-sm font-medium">Playback controls are available above.</p>
      </div>
    </div>
  );
}
