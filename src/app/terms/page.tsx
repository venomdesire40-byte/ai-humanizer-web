export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] py-20 px-6 font-sans text-left">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Terms of Service</h1>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-500">Usage Agreement</h2>
          <p className="text-sm leading-relaxed text-[#888888]">
            By using Humanly AI, you agree to use this tool responsibly for educational and editing purposes.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-500">Disclaimer</h2>
          <p className="text-sm leading-relaxed text-[#888888]">
            Humanly AI provides the service "as is" and does not guarantee that the content will bypass all AI detection systems.
          </p>
        </section>
        <a href="/" className="inline-block mt-10 text-white font-bold border-b border-white pb-1 hover:text-blue-500 transition-all">← Back to Tool</a>
      </div>
    </div>
  );
}