import React from 'react';

interface VideoPlayerProps {
  videoUrl?: string | null;
}

export default function VideoPlayer({ 
  videoUrl
}: VideoPlayerProps) {
  if (!videoUrl) {
    return null;
  }

  return (
    <div className="mt-12 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-center transition-all duration-500 w-full animate-in fade-in zoom-in duration-700">
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden bg-black shadow-inner border border-neutral-800 relative group aspect-video flex items-center justify-center">
        <video 
          controls 
          autoPlay 
          className="w-full h-full object-contain"
          src={`http://localhost:5000${videoUrl}`}
        />
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Your Masterpiece is Ready</h3>
        <p className="text-neutral-400 mt-2">Playback controls are available above.</p>
      </div>
    </div>
  );
}
