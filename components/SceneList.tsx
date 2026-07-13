export interface Scene {
  sceneNumber: number;
  text: string;
  imageUrl: string;
  audioUrl: string;
}

interface SceneListProps {
  generatedScenes: Scene[];
}

export default function SceneList({ generatedScenes }: SceneListProps) {
  if (generatedScenes.length === 0) {
    return (
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
    );
  }

  return (
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
  );
}
