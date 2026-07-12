"use client";

import { useState } from "react";

const loadingStates = [
  "Scripting Storyboard...",
  "Generating Scene 1 of 4...",
  "Generating Scene 2 of 4...",
  "Generating Scene 3 of 4...",
  "Generating Scene 4 of 4...",
  "Rendering Audio...",
  "Finalizing Video..."
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setIsComplete(false);
    setLoadingIndex(0);

    // Mock progress simulation
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx < loadingStates.length) {
        setLoadingIndex(currentIdx);
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        setIsComplete(true);
      }
    }, 1200); // 1.2s per state for demonstration
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100 p-8 sm:p-20 transition-colors duration-500">
      <main className="flex flex-col w-full max-w-4xl flex-1 items-center justify-center gap-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            AI-Clips
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Describe your vision, and we'll script, generate, and narrate a complete professional video.
          </p>
        </div>

        {/* Main Input Area */}
        {!isGenerating && !isComplete && (
          <div className="w-full max-w-2xl flex flex-col gap-4 animate-in fade-in zoom-in duration-500">
            <div className="relative group">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A cinematic documentary about the hidden life of urban foxes..."
                className="w-full h-40 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all duration-300 text-lg group-hover:shadow-md"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={!prompt}
              className="w-full sm:w-auto self-center px-10 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Generate Video
            </button>
          </div>
        )}

        {/* Loading State */}
        {isGenerating && (
          <div className="w-full max-w-md flex flex-col items-center justify-center gap-8 py-20 animate-in fade-in duration-500">
            <div className="relative flex items-center justify-center w-24 h-24">
               {/* Simple spinning ring */}
               <div className="absolute inset-0 border-4 border-gray-200 dark:border-zinc-800 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white transition-all">
                {loadingStates[loadingIndex]}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Please wait while we orchestrate your video...
              </p>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                 style={{ width: `${((loadingIndex + 1) / loadingStates.length) * 100}%` }}
               ></div>
            </div>
          </div>
        )}

        {/* Completion View */}
        {isComplete && (
          <div className="w-full max-w-3xl flex flex-col gap-8 animate-in fade-in duration-700">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-gray-200 dark:border-zinc-800">
              {/* Mock HTML5 Video Player */}
              <video 
                controls 
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Generated Caption</h4>
                <button 
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => {
                     setPrompt("");
                     setIsComplete(false);
                  }}
                >
                  Create Another
                </button>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                Just uncovered the fascinating secret life of urban foxes right in our backyard! 🦊✨ Nature always finds a way to thrive, even in the concrete jungle. Watch till the end to see their incredible night vision in action. 

#NatureDocumentary #UrbanWildlife #FoxesOfInstagram #WildlifePhotography #AIClips #DocumentaryShort
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                 <button className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-medium rounded-xl transition-colors">
                    Copy Caption
                 </button>
                 <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm">
                    Download Video
                 </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
