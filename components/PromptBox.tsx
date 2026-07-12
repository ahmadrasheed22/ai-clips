import React from 'react';

interface PromptBoxProps {
  prompt: string;
  setPrompt: (value: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
}

export function PromptBox({ prompt, setPrompt, isGenerating, onGenerate }: PromptBoxProps) {
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="relative group">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isGenerating}
          placeholder="e.g., A cinematic documentary about the hidden life of urban foxes..."
          className="w-full h-40 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all duration-300 text-lg group-hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
        />
      </div>
      <button
        onClick={onGenerate}
        disabled={!prompt || isGenerating}
        className="w-full sm:w-auto self-center px-10 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
      >
        {isGenerating ? "Generating..." : "Generate Video"}
      </button>
    </div>
  );
}
