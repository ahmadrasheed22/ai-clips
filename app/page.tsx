import Link from "next/link";

export default function HubPage() {
  return (
    <main className="min-h-screen bg-sunset-gradient text-stone-900 flex flex-col items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Cinematic Sunset Ambient Lighting Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-orange-600/30 via-amber-500/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-35 -left-20 w-[500px] h-[500px] bg-red-900/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] bg-amber-400/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl w-full space-y-6 md:space-y-8 relative z-10 my-auto">
        {/* Top Header Badge & Navigation */}
        <header className="text-center space-y-3.5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md text-amber-100 text-xs font-extrabold uppercase tracking-widest shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            AI Video Generation Suite
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight">
            Select Your AI Creation Tool
          </h1>
          
          <p className="text-amber-100/90 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-xs">
            Choose a tool below to generate multi-scene cinematic films or produce high-converting e-commerce video ads.
          </p>
        </header>

        {/* Primary Interactive Cards Grid (Both Cards Fully Clickable & Compact Above-The-Fold) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Cinematic Video Studio (Entire Card is Clickable Link) */}
          <Link
            href="/studio"
            className="group relative rounded-3xl glass-card glass-card-hover p-6 md:p-8 flex flex-col justify-between border border-white/70 shadow-[0_15px_40px_rgba(31,10,4,0.12)] cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-13 h-13 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-stone-900 to-amber-950 text-amber-200 border border-white/20 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/70 text-stone-900 border border-white/90 shadow-xs">
                  Text-to-Video
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-extrabold text-stone-950 group-hover:text-orange-950 transition-colors">
                  Cinematic Video Studio
                </h2>
                <p className="text-stone-800 text-xs md:text-sm leading-relaxed font-medium">
                  Generate multi-scene cinematic videos from text prompts with automated AI director scripts, multi-angle camera shifts, and synchronized audio.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-stone-900 border-t border-stone-900/10 pt-4 font-semibold">
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-orange-600/20 text-orange-950 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  DeepSeek Director automatic scene decomposition
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-orange-600/20 text-orange-950 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Real-time live frame preview & progress streaming
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-orange-600/20 text-orange-950 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Support for 16:9 Landscape & 9:16 Portrait
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <div className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 group-hover:from-amber-950 group-hover:to-orange-950 text-white font-bold shadow-md group-hover:shadow-[0_8px_25px_rgba(31,10,4,0.35)] transition-all duration-300 text-sm">
                <span>Open Studio</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Card 2: Product Ad Generator (Entire Card is Clickable Link) */}
          <Link
            href="/ad-studio"
            className="group relative rounded-3xl glass-card glass-card-hover p-6 md:p-8 flex flex-col justify-between border border-white/70 shadow-[0_15px_40px_rgba(31,10,4,0.12)] cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-13 h-13 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 text-white border border-white/20 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/70 text-stone-900 border border-white/90 shadow-xs">
                  E-Commerce Ads
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-extrabold text-stone-950 group-hover:text-orange-950 transition-colors">
                  Product Ad Generator
                </h2>
                <p className="text-stone-800 text-xs md:text-sm leading-relaxed font-medium">
                  Upload product photos to create high-converting e-commerce video ads with AI visual synthesis and dynamic product hooks.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-stone-900 border-t border-stone-900/10 pt-4 font-semibold">
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-orange-600/20 text-orange-950 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Product photo image-to-video synthesis
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-orange-600/20 text-orange-950 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Viral TikTok & Instagram Reels ad script templates
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-orange-600/20 text-orange-950 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Automated background generation & camera motion
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <div className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 group-hover:from-orange-700 group-hover:to-amber-800 text-white font-bold shadow-md group-hover:shadow-[0_8px_25px_rgba(234,88,12,0.35)] transition-all duration-300 text-sm">
                <span>Create Product Ad</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center text-[11px] font-extrabold text-amber-100/80 pt-4 uppercase tracking-wider drop-shadow-xs">
          AI Creation Suite • Powered by DeepSeek Director & Fal.ai Engine
        </footer>
      </div>
    </main>
  );
}
