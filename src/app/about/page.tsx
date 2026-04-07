export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] py-20 px-6 font-sans text-left">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">About Humanly AI</h1>
        <p className="text-lg leading-relaxed text-[#888888]">
          Humanly AI: Zaid Khalid Edition is a premier academic utility tool designed to help university students refine their AI-generated content into natural, human-like prose.
        </p>
        <div className="p-8 bg-[#141414] border border-[#262626] rounded-3xl">
          <h3 className="text-white font-bold mb-2 tracking-widest uppercase text-xs">The Mission</h3>
          <p className="text-sm text-[#666666]">
            Our mission is to provide students with a free, high-speed, and secure platform to ensure their assignments maintain a natural human flow while bypassing AI detection.
          </p>
        </div>
        <a href="/" className="inline-block mt-10 text-white font-bold border-b border-white pb-1 hover:text-blue-500 transition-all">← Back to Tool</a>
      </div>
    </div>
  );
}