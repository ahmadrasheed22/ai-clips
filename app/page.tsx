import Link from "next/link";

export default function HubPage() {
  return (
    <main className="min-h-screen bg-sunset-gradient text-stone-900 flex flex-col items-center justify-center p-6 md:p-14 font-sans relative overflow-hidden">
      {/* Cinematic Sunset Ambient Lighting Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-orange-600/30 via-amber-500/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-35 -left-20 w-[600px] h-[600px] bg-red-900/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[650px] h-[650px] bg-amber-400/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl w-full space-y-14 relative z-10 my-auto">
        {/* Top Header Badge & Navigation */}
        <header className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/40 border border-white/60 backdrop-blur-md text-stone-900 text-xs font-bold uppercase tracking-widest shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            AI Creation Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-stone-900 drop-shadow-sm leading-tight">
            Select Your AI Creation Tool
          </h1>
          
          <p className="text-stone-800 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Choose a tool below to generate multi-scene cinematic films or produce high-converting e-commerce video ads.
          </p>
        </header>

        {/* Primary Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: Cinematic Video Studio */}
          <div className="group relative rounded-3xl glass-card glass-card-hover p-8 md:p-12 flex flex-col justify-between border border-white/70 shadow-[0_20px_50px_rgba(31,10,4,0.12)]">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-stone-900 to-amber-950 text-amber-200 border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/60 text-stone-900 border border-white/80 shadow-xs">
                  Text-to-Video
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 group-hover:text-orange-950 transition-colors">
                  Cinematic Video Studio
                </h2>
                <p className="text-stone-700 text-sm md:text-base leading-relaxed font-normal">
                  Generate multi-scene cinematic videos from text prompts with automated AI director scripts, multi-angle camera shifts, and synchronized audio.
                </p>
              </div>

              <ul className="space-y-3 text-xs md:text-sm text-stone-800 border-t border-stone-900/10 pt-6 font-medium">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-600/15 text-orange-900 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  DeepSeek Director automatic scene decomposition
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-600/15 text-orange-900 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Real-time live frame preview & progress streaming
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-600/15 text-orange-900 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Support for 16:9 Landscape & 9:16 Portrait
                </li>
              </ul>
            </div>

            <div className="pt-10">
              <Link
                href="/studio"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 hover:from-amber-950 hover:to-orange-950 text-white font-bold shadow-xl hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(31,10,4,0.3)] transition-all duration-300 text-sm md:text-base cursor-pointer"
              >
                Open Studio
                <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 2: Product Ad Generator */}
          <div className="group relative rounded-3xl glass-card glass-card-hover p-8 md:p-12 flex flex-col justify-between border border-white/70 shadow-[0_20px_50px_rgba(31,10,4,0.12)]">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 text-white border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/60 text-stone-900 border border-white/80 shadow-xs">
                  E-Commerce Ads
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 group-hover:text-orange-950 transition-colors">
                  Product Ad Generator
                </h2>
                <p className="text-stone-700 text-sm md:text-base leading-relaxed font-normal">
                  Upload product photos to create high-converting e-commerce video ads with AI visual synthesis and dynamic product hooks.
                </p>
              </div>

              <ul className="space-y-3 text-xs md:text-sm text-stone-800 border-t border-stone-900/10 pt-6 font-medium">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-600/15 text-orange-900 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Product photo image-to-video synthesis
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-600/15 text-orange-900 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Viral TikTok & Instagram Reels ad script templates
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-600/15 text-orange-900 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Automated background generation & camera motion
                </li>
              </ul>
            </div>

            <div className="pt-10">
              <Link
                href="/ad-studio"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 text-white font-bold shadow-xl hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(234,88,12,0.35)] transition-all duration-300 text-sm md:text-base cursor-pointer"
              >
                Create Product Ad
                <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs font-semibold text-stone-700 pt-8 border-t border-stone-900/10 uppercase tracking-wider">
          AI Creation Suite • Powered by DeepSeek Director & Fal.ai Engine
        </footer>
      </div>
    </main>
  );
}
