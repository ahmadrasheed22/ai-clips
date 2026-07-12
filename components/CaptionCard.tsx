import React from 'react';

interface CaptionCardProps {
  onReset: () => void;
  captionText?: string;
}

export function CaptionCard({ onReset, captionText }: CaptionCardProps) {
  const defaultCaption = `Just uncovered the fascinating secret life of urban foxes right in our backyard! 🦊✨ Nature always finds a way to thrive, even in the concrete jungle. Watch till the end to see their incredible night vision in action. 

#NatureDocumentary #UrbanWildlife #FoxesOfInstagram #WildlifePhotography #AIClips #DocumentaryShort`;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">Generated Caption</h4>
        <button 
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          onClick={onReset}
        >
          Clear & Start Over
        </button>
      </div>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
        {captionText || defaultCaption}
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
  );
}
