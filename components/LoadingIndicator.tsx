import React from 'react';

export const loadingStates = [
  "Scripting Storyboard...",
  "Generating Scene 1 of 4...",
  "Generating Scene 2 of 4...",
  "Generating Scene 3 of 4...",
  "Generating Scene 4 of 4...",
  "Rendering Audio...",
  "Finalizing Video..."
];

interface LoadingIndicatorProps {
  loadingIndex: number;
}

export function LoadingIndicator({ loadingIndex }: LoadingIndicatorProps) {
  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center gap-8 py-20 animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center w-24 h-24">
         <div className="absolute inset-0 border-4 border-gray-200 dark:border-zinc-800 rounded-full"></div>
         <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-medium text-gray-900 dark:text-white transition-all">
          {loadingStates[loadingIndex] || loadingStates[loadingStates.length - 1]}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Please wait while we orchestrate your video...
        </p>
      </div>
      
      <div className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
         <div 
           className="h-full bg-blue-500 transition-all duration-1000 ease-out"
           style={{ width: `${((loadingIndex + 1) / loadingStates.length) * 100}%` }}
         ></div>
      </div>
    </div>
  );
}
