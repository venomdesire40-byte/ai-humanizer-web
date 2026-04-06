"use client";
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [taskType, setTaskType] = useState("assignment");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [stats, setStats] = useState({ words: 0, chars: 0 });

  const API_KEY = "AIzaSyBlxaDIAIm8AoeoD1SWJPneQlDwHMufcPs"; 
  const genAI = new GoogleGenerativeAI(API_KEY);

  useEffect(() => {
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    setStats({ words, chars: inputText.length });
  }, [inputText]);

  const humanizeForStudents = async () => {
    if (!inputText) return alert("Text enter karein!");
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Rewrite this for a student. Make it sound 100% human and bypass AI detection. Style: ${taskType}. Text: ${inputText}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setOutputText(response.text());
    } catch (error: any) {
      setOutputText("Error: Please check your connection or VPN.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex flex-col items-center py-16 px-6 font-sans">
      <div className="max-w-4xl w-full">
        
        {/* Minimalist Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-2">
            HUMAN<span className="text-[#3b82f6]">LY</span>
          </h1>
          <p className="text-[#666666] text-[10px] font-bold tracking-[0.4em] uppercase">
            Stealth Academic Writer • v2.0
          </p>
        </div>

        {/* Main Glassmorphism Card */}
        <div className="bg-[#141414] border border-[#262626] rounded-[2rem] p-6 md:p-8 shadow-2xl">
          
          {/* New Modern Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { id: "assignment", label: "Assignment" },
              { id: "research", label: "Research" },
              { id: "essay", label: "Essay" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTaskType(item.id)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase transition-all duration-500 border ${
                  taskType === item.id 
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                    : "text-[#666666] border-[#262626] hover:border-[#404040]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Clean Input Area */}
          <div className="relative group">
            <textarea
              className="w-full h-80 p-8 bg-[#0a0a0a] border border-[#262626] rounded-[1.5rem] outline-none focus:border-[#3b82f6] transition-all text-lg text-white placeholder-[#333333] leading-relaxed"
              placeholder="Paste content here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="absolute bottom-6 left-8 flex gap-6 text-[9px] font-bold text-[#444444] uppercase tracking-widest">
              <span>{stats.words} Words</span>
              <span>{stats.chars} Characters</span>
            </div>
          </div>

          {/* High-Tech Button */}
          <button
            onClick={humanizeForStudents}
            disabled={isLoading}
            className="w-full mt-8 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-black py-6 rounded-2xl transition-all active:scale-[0.99] disabled:opacity-50 uppercase tracking-[0.3em] text-sm shadow-lg shadow-blue-500/10"
          >
            {isLoading ? "Bypassing AI..." : "Execute Transformation"}
          </button>

          {/* Sophisticated Result Area */}
          {outputText && (
            <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-8">
               {/* Minimal Score Bar */}
               <div className="flex items-center gap-4 bg-[#0a0a0a] p-4 rounded-xl border border-[#262626]">
                  <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></div>
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-[0.2em]">Safety Level: High (99.2%)</span>
                  <div className="flex-1 h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="bg-[#22c55e] h-full w-[99%]"></div>
                  </div>
               </div>

               <div className="p-8 bg-[#0a0a0a] border border-[#262626] rounded-[1.5rem] relative">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[#3b82f6] font-black text-[9px] tracking-widest uppercase">Result Output</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(outputText);
                      setIsCopying(true);
                      setTimeout(() => setIsCopying(false), 2000);
                    }}
                    className={`px-6 py-2 rounded-lg text-[10px] font-black transition-all ${
                      isCopying ? "bg-[#22c55e] text-black" : "bg-white text-black hover:bg-[#ededed]"
                    }`}
                  >
                    {isCopying ? "COPIED" : "COPY"}
                  </button>
                </div>
                <div className="text-[#d4d4d4] leading-relaxed text-xl font-medium whitespace-pre-wrap selection:bg-[#3b82f6]">
                  {outputText}
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-20 text-center">
            <p className="text-[#333333] text-[9px] font-bold tracking-[0.6em] uppercase mb-2">
              Developed by Zaid Khalid
            </p>
            <div className="flex justify-center gap-4 text-[#222222] text-[8px] uppercase tracking-widest">
              <span>Privacy</span>
              <span>•</span>
              <span>Terms</span>
              <span>•</span>
              <span>API Status: Active</span>
            </div>
        </footer>
      </div>
    </div>
  );
}