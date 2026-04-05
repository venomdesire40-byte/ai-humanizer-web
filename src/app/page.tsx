"use client";
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [tone, setTone] = useState("natural");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [stats, setStats] = useState({ words: 0, chars: 0 });

  // 🔴 AAPKI API KEY SET KAR DI HAI
  const API_KEY = "AIzaSyBlxaDIAIm8AoeoD1SWJPneQlDwHMufcPs"; 
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Counter Logic
  useEffect(() => {
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    setStats({ words, chars: inputText.length });
  }, [inputText]);

  const humanizeWithAI = async () => {
    if (!inputText) return alert("Bhai, pehle text to likho!");
    setIsLoading(true);
    try {
      // Model set to gemini-1.5-flash for speed
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Rewrite the following text to make it sound 100% human, natural, and undetectable by AI detectors. Use a ${tone} tone. Keep the original meaning but change the sentence structure to be more flowy. Text: ${inputText}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setOutputText(response.text());
    } catch (error) {
      console.error("Error:", error);
      setOutputText("Backend pe masla aa gaya hai. Shayad API quota khatam ho gaya ya connection error hai.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl md:text-6xl font-black text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
          AI HUMANIZER BEAST 🧬
        </h1>
        <p className="text-center text-slate-500 mb-10 font-medium tracking-widest uppercase text-xs">
          Professional Edition • By Zaid Khalid
        </p>

        <div className="bg-[#0f172a] border border-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-blue-900/20">
          {/* Tone Tabs */}
          <div className="flex gap-2 mb-8 bg-[#1e293b] p-1.5 rounded-2xl w-fit mx-auto border border-slate-700">
            {["natural", "professional", "casual"].map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase transition-all duration-300 ${
                  tone === t ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="relative group">
            <textarea
              className="w-full h-72 p-8 bg-[#020617] border border-slate-800 rounded-[2rem] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all text-lg resize-none placeholder-slate-800 leading-relaxed"
              placeholder="Paste AI-generated content here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            {/* Word & Char Counter */}
            <div className="absolute bottom-6 right-8 flex gap-5 text-[11px] font-black tracking-[0.15em] text-slate-600 uppercase bg-[#0f172a]/80 backdrop-blur-md px-5 py-2 rounded-full border border-slate-800">
              <span>{stats.words} Words</span>
              <span className="text-blue-900">|</span>
              <span>{stats.chars} Chars</span>
            </div>
          </div>

          <button
            onClick={humanizeWithAI}
            disabled={isLoading}
            className="w-full mt-8 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white font-black py-6 rounded-[1.5rem] transition-all transform active:scale-[0.98] disabled:opacity-50 uppercase tracking-[0.3em] text-lg shadow-2xl shadow-blue-600/20"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="animate-ping h-2 w-2 rounded-full bg-white"></span>
                Rewriting...
              </span>
            ) : "Transform Text ✨"}
          </button>

          {/* Output Area */}
          {outputText && (
            <div className="mt-12 p-8 bg-slate-900/40 border border-blue-500/20 rounded-[2rem] relative animate-in fade-in zoom-in duration-500">
               <div className="flex justify-between items-center mb-6">
                <span className="text-blue-400 font-black text-[10px] tracking-[0.25em] uppercase">Humanized Result ({tone})</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(outputText);
                    setIsCopying(true);
                    setTimeout(() => setIsCopying(false), 2000);
                  }}
                  className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
                    isCopying ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-500"
                  }`}
                >
                  {isCopying ? "COPIED! ✅" : "COPY"}
                </button>
              </div>
              <p className="text-slate-300 leading-relaxed text-xl font-light italic">
                {outputText}
              </p>
            </div>
          )}
        </div>
        <footer className="mt-16 text-center">
            <p className="text-slate-700 text-sm font-bold tracking-widest uppercase">
              Designed & Developed by Zaid Khalid
            </p>
            <p className="text-slate-800 text-[10px] mt-2">© 2026 AI Humanizer Lab</p>
        </footer>
      </div>
    </div>
  );
}