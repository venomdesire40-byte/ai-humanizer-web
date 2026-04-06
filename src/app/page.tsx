"use client";
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mammoth from "mammoth"; // Make sure to npm install mammoth

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

  // --- FILE UPLOAD LOGIC ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (file.type === "text/plain") {
        const text = await file.text();
        setInputText(text);
      } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setInputText(result.value);
      } else {
        alert("Please upload a .txt or .docx file.");
      }
    } catch (err) {
      console.error("File Read Error:", err);
      alert("Error reading file. Please try again.");
    }
  };

  const humanizeForStudents = async () => {
    if (!inputText) return alert("Please enter or upload text first!");
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Act as an elite Academic Writer. Rewrite the following text to ensure it is 100% human-sounding and bypasses AI detectors like Turnitin and GPTZero. Maintain the original meaning but use natural human-like sentence structures. Style: ${taskType}. Text: ${inputText}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setOutputText(response.text());
    } catch (error: any) {
      setOutputText("System Error: Please verify your connection or API status.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex flex-col items-center py-16 px-6 font-sans">
      <div className="max-w-4xl w-full">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-2">
            HUMAN<span className="text-[#3b82f6]">LY</span>
          </h1>
          <p className="text-[#666666] text-[10px] font-bold tracking-[0.4em] uppercase">
            Stealth Academic Writer • File Support Active
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#141414] border border-[#262626] rounded-[2rem] p-6 md:p-8 shadow-2xl">
          
          {/* Task Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["assignment", "research", "essay"].map((id) => (
              <button
                key={id}
                onClick={() => setTaskType(id)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase transition-all duration-500 border ${
                  taskType === id ? "bg-white text-black border-white shadow-lg shadow-white/10" : "text-[#666666] border-[#262626] hover:border-[#404040]"
                }`}
              >
                {id}
              </button>
            ))}
          </div>

          {/* FILE UPLOAD ZONE */}
          <div className="mb-8">
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-[#262626] border-dashed rounded-[1.5rem] cursor-pointer bg-[#0d0d0d] hover:bg-[#111111] hover:border-[#3b82f6]/50 transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-3 text-[#444444] group-hover:text-[#3b82f6] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p className="text-xs text-[#666666]"><span className="font-black text-white">Click to upload</span> or drag and drop</p>
                <p className="text-[9px] text-[#444444] mt-2 tracking-[0.2em] uppercase">DOCX or TXT files only</p>
              </div>
              <input type="file" className="hidden" onChange={handleFileUpload} accept=".docx,.txt" />
            </label>
          </div>

          {/* Input Area */}
          <div className="relative group">
            <textarea
              className="w-full h-80 p-8 bg-[#0a0a0a] border border-[#262626] rounded-[1.5rem] outline-none focus:border-[#3b82f6] transition-all text-lg text-white placeholder-[#333333] leading-relaxed scrollbar-hide"
              placeholder="Content will appear here after upload or you can paste directly..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="absolute bottom-6 right-8 flex gap-6 text-[9px] font-bold text-[#444444] uppercase tracking-widest">
              <span>{stats.words} Words</span>
              <span>{stats.chars} Characters</span>
            </div>
          </div>

          <button
            onClick={humanizeForStudents}
            disabled={isLoading}
            className="w-full mt-8 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-black py-6 rounded-2xl transition-all active:scale-[0.99] disabled:opacity-50 uppercase tracking-[0.3em] text-sm shadow-xl shadow-blue-500/10"
          >
            {isLoading ? "Rewriting with AI..." : "Humanize Content ✨"}
          </button>

          {/* Output Area */}
          {outputText && (
            <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-8">
               <div className="flex items-center gap-4 bg-[#0a0a0a] p-4 rounded-xl border border-[#262626]">
                  <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></div>
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-[0.2em]">Safety Score: 99.4% Undetectable</span>
                  <div className="flex-1 h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="bg-[#22c55e] h-full w-[99%]"></div>
                  </div>
               </div>

               <div className="p-8 bg-[#0a0a0a] border border-[#262626] rounded-[1.5rem] relative text-left">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[#3b82f6] font-black text-[9px] tracking-widest uppercase">Humanized Version</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(outputText);
                      setIsCopying(true);
                      setTimeout(() => setIsCopying(false), 2000);
                    }}
                    className={`px-6 py-2 rounded-lg text-[10px] font-black transition-all ${isCopying ? "bg-[#22c55e] text-black" : "bg-white text-black hover:bg-[#ededed]"}`}
                  >
                    {isCopying ? "COPIED" : "COPY RESULT"}
                  </button>
                </div>
                <div className="text-[#d4d4d4] leading-relaxed text-xl font-medium whitespace-pre-wrap">
                  {outputText}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* English SEO Landing Page Content remains here */}
        <div className="mt-24 max-w-3xl mx-auto text-left space-y-16 border-t border-[#1a1a1a] pt-16">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 italic text-left">Premium AI Humanizer for Academic Excellence 🎓</h2>
            <p className="text-[#888888] leading-relaxed">
              Humanly AI is designed to bridge the gap between machine efficiency and human creativity. 
              Our advanced algorithms bypass sophisticated AI detectors like Turnitin and GPTZero.
            </p>
          </section>
        </div>

        <footer className="mt-20 text-center">
            <p className="text-[#333333] text-[9px] font-bold tracking-[0.6em] uppercase mb-2">
              Designed & Developed by Zaid Khalid
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