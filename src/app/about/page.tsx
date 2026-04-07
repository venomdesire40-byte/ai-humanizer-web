export default function About() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] py-24 px-6 font-sans selection:bg-blue-500/30">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 inline-block px-4 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase">
          Our Identity
        </div>
        <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-8 bg-gradient-to-r from-white to-[#444] bg-clip-text text-transparent">
          About <span className="text-blue-500">Humanly AI</span>
        </h1>
        
        <div className="space-y-12">
          <p className="text-xl leading-relaxed text-[#888888] font-medium">
            Humanly AI: Zaid Khalid Edition is a premier academic utility tool designed to help university students refine their AI-generated content into natural, human-like prose.
          </p>

          <div className="p-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded-[2rem] relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] group-hover:bg-blue-500/10 transition-all"></div>
            <h3 className="text-blue-500 font-bold mb-4 tracking-widest uppercase text-xs">The Core Mission</h3>
            <p className="text-sm leading-relaxed text-[#666666]">
              Our mission is to provide students with a free, high-speed, and secure platform to ensure their assignments maintain a natural human flow while bypassing rigid AI detection systems.
            </p>
          </div>
        </div>

        <a href="/" className="inline-flex items-center mt-16 text-white font-bold gap-2 group transition-all">
          <span className="w-8 h-[1px] bg-white group-hover:w-12 transition-all"></span>
          <span className="uppercase text-[10px] tracking-widest group-hover:text-blue-400">Back to Home</span>
        </a>
      </div>
    </div>
  );
}