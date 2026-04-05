"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isCopying, setIsCopying] = useState(false);
  const [stats, setStats] = useState({ words: 0, chars: 0 });

  // Word aur Character Count ka Logic
  useEffect(() => {
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    setStats({ words, chars: inputText.length });
  }, [inputText]);

  const humanizeText = () => {
    if (!inputText) return setOutputText("Pehle kuch likho to sahi! 😊");
    
    // Thora behtar logic
    let text = inputText
      .replace(/\bAI\b/g, "human-like intelligence")
      .replace(/\bgenerate\b/g, "bring to life")
      .replace(/\balgorithm\b/g, "natural flow")
      .replace(/\bcomplex\b/g, "deep")
      .replace(/\butilize\b/g, "use");
    
    setOutputText(text);
  };

  const copyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          AI Humanizer Ultra
        </h1>
        <p className="text-slate-400">Make your AI content feel more natural and alive.</p>
      </div>

      <div className="w-full max-w-3xl bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl">
        {/* Input Area */}
        <div className="relative">
          <textarea
            className="w-full h-48 p-5 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-200 placeholder-slate-500 resize-none"
            placeholder="Paste your AI text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="absolute bottom-3 right-4 text-xs text-slate-500 font-mono">
            {stats.words} Words | {stats.chars} Chars
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={humanizeText}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
          >
            Humanize Now ✨
          </button>
          <button
            onClick={() => { setInputText(""); setOutputText(""); }}
            className="px-8 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-4 rounded-xl transition-all"
          >
            Clear
          </button>
        </div>

        {/* Output Area */}
        {outputText && (
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-indigo-400 font-bold uppercase tracking-wider text-sm">Humanized Result</h2>
              <button
                onClick={copyToClipboard}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isCopying ? 'bg-green-600 text-white' : 'bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20'
                }`}
              >
                {isCopying ? "Copied! ✅" : "Copy Output"}
              </button>
            </div>
            <div className="w-full p-6 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-300 leading-relaxed italic">
              {outputText}
            </div>
          </div>
        )}
      </div>

      <footer className="mt-12 text-slate-500 text-sm">
        Built by Zaid Khalid • 2026 Edition
      </footer>
    </div>
  );
}