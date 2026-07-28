import Link from "next/link";

export default function HubPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-6 md:p-12 font-sans relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-purple-600/20 to-pink-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl w-full space-y-12 relative z-10 my-auto">
        {/* Top Header Badge & Navigation */}
        <header className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-md text-neutral-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            AI Video Generation Suite
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-400 bg-clip-text text-transparent drop-shadow-sm">
            Select Your AI Creation Tool
          </h1>
          
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            Choose a tool below to generate multi-scene cinematic films or produce high-converting e-commerce video ads.
          </p>
        </header>

        {/* Primary Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Cinematic Video Studio */}
          <div className="group relative rounded-3xl bg-neutral-900/40 backdrop-blur-xl border border-neutral-800/80 p-8 md:p-10 flex flex-col justify-between hover:border-blue-500/50 hover:bg-neutral-900/60 transition-all duration-300 shadow-2xl hover:shadow-blue-500/10">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-950/60 text-blue-300 border border-blue-800/40">
                  Text-to-Video
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-100 group-hover:text-blue-400 transition-colors">
                  Cinematic Video Studio
                </h2>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                  Generate multi-scene cinematic videos from text prompts with automated AI director scripts, multi-angle camera shifts, and synchronized audio.
                </p>
              </div>

              <ul className="space-y-2 text-xs md:text-sm text-neutral-400 border-t border-neutral-800/80 pt-4">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  DeepSeek Director automatic scene decomposition
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time live frame preview & progress streaming
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Support for 16:9 Landscape & 9:16 Portrait
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href="/studio"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-500/35 transition-all duration-200 group-hover:translate-x-0.5"
              >
                Open Studio
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 2: Product Ad Generator */}
          <div className="group relative rounded-3xl bg-neutral-900/40 backdrop-blur-xl border border-neutral-800/80 p-8 md:p-10 flex flex-col justify-between hover:border-purple-500/50 hover:bg-neutral-900/60 transition-all duration-300 shadow-2xl hover:shadow-purple-500/10">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-800/40">
                  E-Commerce Ads
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-100 group-hover:text-purple-400 transition-colors">
                  Product Ad Generator
                </h2>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                  Upload product photos to create high-converting e-commerce video ads with AI visual synthesis and dynamic product hooks.
                </p>
              </div>

              <ul className="space-y-2 text-xs md:text-sm text-neutral-400 border-t border-neutral-800/80 pt-4">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Product photo image-to-video synthesis
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Viral TikTok & Instagram Reels ad script templates
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Automated background generation & camera motion
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href="/ad-studio"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold shadow-lg shadow-purple-600/20 hover:shadow-purple-500/35 transition-all duration-200 group-hover:translate-x-0.5"
              >
                Create Product Ad
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-neutral-500 pt-6 border-t border-neutral-900">
          AI Creation Suite • Powered by DeepSeek Director & Fal.ai Engine
        </footer>
      </div>
    </main>
  );
}
