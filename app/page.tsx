"use client";

import { useState } from "react";

interface Scene {
  sceneNumber: number;
  text: string;
  imageUrl: string;
  audioUrl: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedScenes, setGeneratedScenes] = useState<Scene[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    console.log("Generating video for prompt:", prompt);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/test-assets", {
        method: "GET",
      });
      
      const data = await response.json();
      if (data && data.scenes) {
        setGeneratedScenes(data.scenes);
      }
    } catch (error) {
      console.error("Failed to generate scenes:", error);
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

        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl transition-all duration-300 hover:border-neutral-700">
          <textarea
            className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-5 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-300 text-lg leading-relaxed shadow-inner"
            rows={5}
            placeholder="Describe your scene in detail... (e.g. A neon-lit cyberpunk city alleyway at midnight, cinematic lighting, 8k resolution)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 text-lg"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Generate Video</span>
                </>
              )}
            </button>
          </div>
        </div>

        {generatedScenes.length === 0 ? (
          <section className="mt-12 bg-neutral-900 border border-neutral-800 border-dashed rounded-3xl p-12 min-h-[400px] flex flex-col items-center justify-center transition-all duration-300">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-neutral-950 border border-neutral-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <svg className="w-10 h-10 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-neutral-300 mb-2">No Content Generated Yet</h3>
                <p className="text-neutral-500 max-w-md mx-auto text-lg leading-relaxed">
                  Your generated scenes, audio, and images will appear here once you enter a prompt and click Generate.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <section className="mt-12 space-y-8">
            {generatedScenes.map((scene) => (
              <div key={scene.sceneNumber} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 w-full relative aspect-video rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`http://localhost:5000${scene.imageUrl}`} alt={`Scene ${scene.sceneNumber}`} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center justify-center px-4 py-1.5 bg-neutral-800 rounded-full">
                    <span className="text-sm font-bold text-neutral-300 tracking-wider uppercase">Scene {scene.sceneNumber}</span>
                  </div>
                  <p className="text-neutral-300 text-lg leading-relaxed italic">&quot;{scene.text}&quot;</p>
                  <div className="pt-2">
                    <audio controls className="w-full mt-2 outline-none" src={`http://localhost:5000${scene.audioUrl}`}></audio>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
