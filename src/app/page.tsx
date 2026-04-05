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

  // 🔴 APNI API KEY YAHAN " AIzaSyBlxaDIAIm8AoeoD1SWJPneQlDwHMufcPs " KE ANDAR PASTE KAREIN
  const API_KEY = "YOUR_GEMINI_API_KEY_HERE"; 
  const genAI = new GoogleGenerativeAI(API_KEY);

  useEffect(() => {
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    setStats({ words, chars: inputText.length });
  }, [inputText]);

  const humanizeWithAI = async () => {
    if (!inputText) return alert("Bhai, pehle text to likho!");
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Rewrite the following text to make it sound 100% human and natural. Use a ${tone} tone. Remove all AI-like patterns. Text: ${inputText}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setOutputText(response.text());
    } catch (error) {
      console.error("Error:", error);
      setOutputText("Backend pe masla hai, shayad API Key ghalat hai!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-black text-center bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-8">
          AI HUMANIZER BEAST 🧬
        </h1>

        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-blue-500/10">
          <div className="flex gap-2 mb-6 bg-[#1e293b] p-1 rounded-xl w-fit mx-auto border border-slate-700">
            {["natural", "professional", "casual"].map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                  tone === t ? "bg-blue-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <textarea
            className="w-full h-60 p-6 bg-[#020617] border border-slate-800 rounded-2xl outline-none focus:border-blue-500 transition-all text-lg resize-none placeholder-slate-700"
            placeholder="Paste your AI text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            onClick={humanizeWithAI}
            disabled={isLoading}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] text-white font-black py-5 rounded-2xl transition-all disabled:opacity-50 uppercase tracking-[0.2em] text-lg shadow-xl shadow-blue-500/20"
          >
            {isLoading ? "AI is Thinking... 🧠" : "Humanize with Gemini ✨"}
          </button>

          {outputText && (
            <div className="mt-10 p-6 bg-slate-900/80 border border-blue-500/30 rounded-2xl relative animate-in fade-in slide-in-from-bottom-4">
               <div className="flex justify-between items-center mb-4">
                <span className="text-blue-400 font-bold text-xs tracking-widest uppercase">Result ({tone})</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(outputText);
                    setIsCopying(true);
                    setTimeout(() => setIsCopying(false), 2000);
                  }}
                  className={`px-4 py-1 rounded-lg text-xs font-bold transition-all ${isCopying ? "bg-green-600" : "bg-blue-600"}`}
                >
                  {isCopying ? "COPIED! ✅" : "COPY"}
                </button>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg italic">{outputText}</p>
            </div>
          )}
        </div>
        <footer className="mt-12 text-center text-slate-600 font-medium">
          Zaid Khalid Edition • Powered by Gemini AI
        </footer>
      </div>
    </div>
  );
}