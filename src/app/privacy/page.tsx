export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] py-24 px-6 font-sans selection:bg-emerald-500/30">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 inline-block px-4 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-bold tracking-[0.2em] uppercase">
          Data Security
        </div>
        <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">Privacy <span className="text-emerald-500">Policy</span></h1>
        <p className="text-[#444] text-[10px] font-bold uppercase tracking-widest mb-16">Updated: April 2026</p>
        
        <div className="grid gap-8">
          <section className="p-8 border-l border-[#1a1a1a] hover:border-emerald-500 transition-colors">
            <h2 className="text-lg font-bold text-white mb-4">1. Zero-Retention Policy</h2>
            <p className="text-sm leading-relaxed text-[#888888]">
              At Humanly AI, we prioritize your academic integrity. We do not store, save, or share any text you upload. All processing is transient and cleared immediately.
            </p>
          </section>

          <section className="p-8 border-l border-[#1a1a1a] hover:border-emerald-500 transition-colors text-left">
            <h2 className="text-lg font-bold text-white mb-4">2. AdSense & Cookies</h2>
            <p className="text-sm leading-relaxed text-[#888888]">
              We use Google AdSense for monetization. Google uses cookies to serve ads based on your visits.
            </p>
          </section>
        </div>

        <a href="/" className="inline-flex items-center mt-16 text-white font-bold gap-2 group transition-all">
          <span className="w-8 h-[1px] bg-white group-hover:w-12 transition-all"></span>
          <span className="uppercase text-[10px] tracking-widest group-hover:text-emerald-400 text-left">Return</span>
        </a>
      </div>
    </div>
  );
}