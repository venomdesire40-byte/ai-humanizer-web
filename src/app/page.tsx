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

  // 🔴 AAPKI API KEY YAHAN FIXED HAI
  const API_KEY = "AIzaSyBlxaDIAIm8AoeoD1SWJPneQlDwHMufcPs"; 
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Counter Logic
  useEffect(() => {
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    setStats({ words, chars: inputText.length });
  }, [inputText]);

  const humanizeWithAI = async () => {
    if (!inputText) return alert("Bhai, pehle text likho!");
    setIsLoading(true);
    setOutputText(""); // Purana text clear karne ke liye

    try {
      // Using stable gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Act as a professional human writer. Rewrite the following text to make it sound 100% natural, human-like, and bypass AI detectors. Use a ${tone} tone and ensure the flow is perfect. Text: ${inputText}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const finalResult = response.text();
      
      setOutputText(finalResult);
    } catch (error: any) {
      console.error("Gemini Error:", error);
      // Agar error aaye to ye asli wajah bataye ga
      setOutputText("Error: " + (error.message || "Connection lost. Please use VPN or check API Key."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent tracking-tighter mb-4">
            AI HUMANIZER BEAST 🧬
          </h1>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">
            Zaid Khalid Professional Edition
          </p>
        </div>

        {/* Main Tool Box */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-blue-900/10">
          
          {/* Tone Selection */}
          <div className="flex gap-2 mb-8 bg-[#1e293b] p-1.5 rounded-2xl w-fit mx-auto border border-slate-700">
            {["natural", "professional", "casual"].map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase transition-all duration-300 ${
                  tone === t ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "text-slate-500 hover:text-slate-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="relative">
            <textarea
              className="w-full h-72 p-8 bg-[#020617] border border-slate-800 rounded-[2rem] outline-none focus:border-blue-500 transition-all text-lg resize-none placeholder-slate-800 leading-relaxed scrollbar-hide"
              placeholder="Paste your AI text here (ChatGPT, Claude, etc.)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            {/* Real-time Stats */}
            <div className="absolute bottom-6 right-8 flex gap-4 text-[10px] font-black tracking-widest text-slate-500 uppercase bg-[#0f172a]/90 backdrop-blur-sm px-5 py-2 rounded-full border border-slate-800">
              <span>{stats.words} Words</span>
              <span className="text-blue-900">|</span>
              <span>{stats.chars} Characters</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={humanizeWithAI}
            disabled={isLoading}
            className="w-full mt-8 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-black py-6 rounded-[1.5rem] transition-all transform active:scale-[0.98] disabled:opacity-50 uppercase tracking-[0.4em] text-lg shadow-xl shadow-blue-600/10"
          >
            {isLoading ? "Rewriting as Human... 🧠" : "Humanize Now ✨"}
          </button>

          {/* Result Area */}
          {outputText && (
            <div className="mt-12 p-8 bg-slate-900/50 border border-blue-500/20 rounded-[2rem] relative animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="flex justify-between items-center mb-6">
                <span className="text-blue-400 font-black text-[10px] tracking-widest uppercase">Output ({tone})</span>
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
                  {isCopying ? "COPIED! ✅" : "COPY TEXT"}
                </button>
              </div>
              <div className="text-slate-300 leading-relaxed text-xl font-light italic whitespace-pre-wrap">
                {outputText}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center opacity-40">
            <p className="text-slate-500 text-[10px] font-bold tracking-[0.5em] uppercase">
              Build By Zaid Khalid Edition
            </p>
        </footer>
      </div>
    </div>
  );
}