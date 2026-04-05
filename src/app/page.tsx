"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [tone, setTone] = useState("natural");
  const [isCopying, setIsCopying] = useState(false);
  const [stats, setStats] = useState({ words: 0, chars: 0 });

  useEffect(() => {
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    setStats({ words, chars: inputText.length });
  }, [inputText]);

  const humanizeText = () => {
    if (!inputText) return setOutputText("Kuch likhein to sahi! ✨");

    let processedText = inputText;

    if (tone === "professional") {
      processedText = processedText
        .replace(/\bI think\b/gi, "It is my professional assessment")
        .replace(/\bgood\b/gi, "exceptional")
        .replace(/\bhelp\b/gi, "facilitate")
        .replace(/\bAI\b/gi, "automated intelligence");
    } else if (tone === "casual") {
      processedText = processedText
        .replace(/\bGreetings\b/gi, "Hey there!")
        .replace(/\butilize\b/gi, "use")
        .replace(/\bAI\b/gi, "bot")
        .replace(/\btherefore\b/gi, "so");
    } else {
      processedText = processedText
        .replace(/\bAI\b/gi, "human-like intelligence")
        .replace(/\bgenerate\b/gi, "create")
        .replace(/\balgorithm\b/gi, "natural flow");
    }

    setOutputText(processedText);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col items-center py-12 px-4 font-sans text-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
          AI HUMANIZER PRO MAX
        </h1>
        <p className="text-slate-400 text-lg mb-8">Zaid Khalid's Professional Edition</p>

        <div className="bg-[#1e293b] border border-slate-700/50 rounded-3xl shadow-2xl p-6 md:p-8 text-left">
          <div className="flex bg-[#0f172a] p-1 rounded-2xl mb-6 w-fit mx-auto border border-slate-700">
            {["natural", "professional", "casual"].map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-4 py-2 md:px-6 rounded-xl text-xs md:text-sm font-bold uppercase transition-all ${
                  tone === t ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative group">
            <textarea
              className="w-full h-64 p-6 bg-[#0f172a] border border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-lg transition-all placeholder-slate-600 resize-none"
              placeholder="Paste AI text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="absolute bottom-4 right-6 flex gap-4 text-xs font-mono text-slate-500">
              <span>{stats.words} WORDS</span>
              <span>{stats.chars} CHARS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <button
              onClick={humanizeText}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-500/20 transition-all transform active:scale-95 text-lg uppercase tracking-widest"
            >
              Transform ✨
            </button>
            <button
              onClick={() => { setInputText(""); setOutputText(""); }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold py-4 rounded-2xl transition-all uppercase tracking-widest"
            >
              Reset
            </button>
          </div>

          {outputText && (
            <div className="mt-10 p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-indigo-400 font-black text-xs uppercase tracking-[0.2em]">Output ({tone})</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(outputText);
                    setIsCopying(true);
                    setTimeout(() => setIsCopying(false), 2000);
                  }}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                    isCopying ? "bg-green-500 text-white" : "bg-indigo-600 text-white"
                  }`}
                >
                  {isCopying ? "COPIED! ✅" : "COPY RESULT"}
                </button>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg italic">{outputText}</p>
            </div>
          )}
        </div>
        <footer className="mt-12 text-slate-600 text-sm font-medium">
          Built by Zaid Khalid • 2026
        </footer>
      </div>
    </div>
  );
}