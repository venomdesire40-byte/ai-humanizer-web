export default function Terms() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] py-24 px-6 font-sans selection:bg-orange-500/30">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 inline-block px-4 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-[10px] font-bold tracking-[0.2em] uppercase">
          Legal Terms
        </div>
        <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-16">Terms of <span className="text-orange-500 text-left">Service</span></h1>
        
        <div className="space-y-16">
          <section className="text-left">
            <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-4">Usage Agreement</h2>
            <p className="text-lg leading-relaxed text-[#888888]">
              By using Humanly AI, you agree to use this tool responsibly for educational and editing purposes only.
            </p>
          </section>

          <section className="text-left">
            <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-4">Limitation of Liability</h2>
            <p className="text-lg leading-relaxed text-[#888888]">
              Service is provided "as is". We do not guarantee 100% bypass of all evolving AI detection systems.
            </p>
          </section>
        </div>

        <a href="/" className="inline-flex items-center mt-20 text-white font-bold gap-2 group transition-all text-left">
          <span className="w-8 h-[1px] bg-white group-hover:w-12 transition-all"></span>
          <span className="uppercase text-[10px] tracking-widest group-hover:text-orange-400">Back</span>
        </a>
      </div>
    </div>
  );
}