import React from 'react';

interface VideoPlayerProps {
  videoUrl?: string;
  posterUrl?: string;
}

export function VideoPlayer({ 
  videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4", 
  posterUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
}: VideoPlayerProps) {
  return (
    <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-gray-200 dark:border-zinc-800">
      <video 
        controls 
        className="w-full h-full object-cover"
        poster={posterUrl}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support HTML video.
      </video>
    </div>
  );
}
