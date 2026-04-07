export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] py-20 px-6 font-sans text-left">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Privacy Policy</h1>
        <p className="text-[#666666]">Last Updated: April 2026</p>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-500">1. Data Privacy</h2>
          <p className="text-sm leading-relaxed text-[#888888]">
            At Humanly AI, we prioritize your academic integrity. We do not store, save, or share any text or documents you upload to our servers.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-500">2. Cookies</h2>
          <p className="text-sm leading-relaxed text-[#888888]">
            We use Google AdSense to serve ads. Google may use cookies to serve ads based on your prior visits.
          </p>
        </section>
        <a href="/" className="inline-block mt-10 text-white font-bold border-b border-white pb-1 hover:text-blue-500 transition-all">← Back to Tool</a>
      </div>
    </div>
  );
}