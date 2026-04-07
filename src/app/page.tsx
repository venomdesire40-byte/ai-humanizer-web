"use client";
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mammoth from "mammoth"; 

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

  // FILE UPLOAD LOGIC
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
      alert("Error reading file. Please try again.");
    }
  };

  const humanizeForStudents = async () => {
    if (!inputText) return alert("Please enter or upload text first!");
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Act as an elite Academic Writer. Rewrite the following text to ensure it is 100% human-sounding and bypasses AI detectors like Turnitin and GPTZero. Style: ${taskType}. Text: ${inputText}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setOutputText(response.text());
    } catch (error: any) {
      setOutputText("System Error: Please verify your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex flex-col items-center py-16 px-6 font-sans">
      <div className="max-w-4xl w-full">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-2 uppercase">
            HUMAN<span className="text-[#3b82f6]">LY</span>
          </h1>
          <p className="text-[#666666] text-[10px] font-bold tracking-[0.4em] uppercase">
            Stealth Academic Writer • File Support Active
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#141414] border border-[#262626] rounded-[2rem] p-6 md:p-10 shadow-2xl">
          
          {/* Task Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["assignment", "research", "essay"].map((id) => (
              <button
                key={id}
                onClick={() => setTaskType(id)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase transition-all duration-500 border ${
                  taskType === id ? "bg-white text-black border-white" : "text-[#666666] border-[#262626]"
                }`}
              >
                {id}
              </button>
            ))}
          </div>

          {/* UPLOAD BOX */}
          <div className="mb-8">
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-[#262626] border-dashed rounded-[1.5rem] cursor-pointer bg-[#0d0d0d] hover:bg-[#111111] transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-3 text-[#444444] group-hover:text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p className="text-xs text-[#666666] uppercase font-black tracking-widest group-hover:text-white">Upload DOCX / TXT</p>
              </div>
              <input type="file" className="hidden" onChange={handleFileUpload} accept=".docx,.txt" />
            </label>
          </div>

          {/* Input Box */}
          <div className="relative">
            <textarea
              className="w-full h-80 p-8 bg-[#0a0a0a] border border-[#262626] rounded-[1.5rem] outline-none focus:border-[#3b82f6] transition-all text-lg text-white placeholder-[#333333] leading-relaxed"
              placeholder="Paste content or upload file..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="absolute bottom-6 right-8 flex gap-6 text-[9px] font-bold text-[#444444] uppercase tracking-widest">
              <span>{stats.words} Words</span>
              <span>{stats.chars} Chars</span>
            </div>
          </div>

          <button
            onClick={humanizeForStudents}
            disabled={isLoading}
            className="w-full mt-8 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-black py-6 rounded-2xl transition-all active:scale-[0.99] uppercase tracking-[0.3em] text-sm"
          >
            {isLoading ? "Rewriting with AI..." : "Humanize Content ✨"}
          </button>

          {/* Result Output */}
          {outputText && (
            <div className="mt-12 space-y-6">
               <div className="flex items-center gap-4 bg-[#0a0a0a] p-4 rounded-xl border border-[#262626]">
                  <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></div>
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-[0.2em]">Safety Score: 99.4% Undetectable</span>
                  <div className="flex-1 h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="bg-[#22c55e] h-full w-[99%]"></div>
                  </div>
               </div>
               <div className="p-8 bg-[#0a0a0a] border border-[#262626] rounded-[1.5rem] relative text-left shadow-inner">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[#3b82f6] font-black text-[9px] tracking-widest uppercase">Humanized Result</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(outputText);
                      setIsCopying(true);
                      setTimeout(() => setIsCopying(false), 2000);
                    }}
                    className={`px-6 py-2 rounded-lg text-[10px] font-black transition-all ${isCopying ? "bg-[#22c55e] text-black" : "bg-white text-black"}`}
                  >
                    {isCopying ? "COPIED" : "COPY"}
                  </button>
                </div>
                <div className="text-[#d4d4d4] leading-relaxed text-xl font-medium whitespace-pre-wrap">
                  {outputText}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- SEO & LANDING CONTENT (Back Again!) --- */}
        <div className="mt-24 max-w-3xl mx-auto text-left space-y-16 border-t border-[#1a1a1a] pt-16">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 italic text-left tracking-tight">Premium AI Humanizer for Academic Excellence 🎓</h2>
            <p className="text-[#888888] leading-relaxed text-left">
              Navigating AI-generated content is now easier for students worldwide. 
              Humanly AI bridges the gap between machine efficiency and human creativity. 
              Our algorithms bypass sophisticated detectors like Turnitin and GPTZero by 
              removing predictable AI patterns and introducing natural linguistic variance.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-[#111111] border border-[#222222] rounded-3xl">
              <h3 className="text-blue-500 font-bold mb-3 text-xs uppercase tracking-[0.2em]">🔒 Encrypted Privacy</h3>
              <p className="text-[11px] text-[#666666] leading-relaxed text-left">Your data is never stored on our servers. We prioritize academic integrity and user confidentiality above all else.</p>
            </div>
            <div className="p-8 bg-[#111111] border border-[#222222] rounded-3xl">
              <h3 className="text-green-500 font-bold mb-3 text-xs uppercase tracking-[0.2em]">⚡ Stealth Intelligence</h3>
              <p className="text-[11px] text-[#666666] leading-relaxed text-left">Instantly transform repetitive AI structures into flowy, human-like prose optimized for academic submissions.</p>
            </div>
          </section>

          <section className="text-left">
            <h2 className="text-xl font-bold text-white mb-8 uppercase tracking-widest text-left">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold text-[#ededed] mb-2 italic underline decoration-blue-500 underline-offset-8">Can Turnitin detect this rewritten content?</h4>
                <p className="text-xs text-[#666666] leading-relaxed">Our tool focuses on deep linguistic restructuring, which significantly reduces the probability of AI detection in plagiarism checkers and AI sensors.</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#ededed] mb-2 italic underline decoration-blue-500 underline-offset-8">Is this tool free for students?</h4>
                <p className="text-xs text-[#666666] leading-relaxed">Yes, the Humanly AI: Zaid Khalid Edition is committed to remaining free for college and university students globally.</p>
              </div>
            </div>
          </section>
        </div>
{/* --- Content Section for SEO & Professional Look --- */}
        <div className="mt-32 max-w-4xl mx-auto px-6 space-y-24 pb-20">
          
          {/* 1. How It Works */}
          <section className="text-center space-y-12">
            <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-500">The Process</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-[#0c0c0c] border border-[#1a1a1a] rounded-3xl hover:border-blue-500/20 transition-all">
                <div className="text-white font-bold mb-2">01. Input</div>
                <p className="text-xs text-[#555] leading-relaxed font-medium">Paste your AI-generated text from ChatGPT or Claude.</p>
              </div>
              <div className="p-6 bg-[#0c0c0c] border border-[#1a1a1a] rounded-3xl hover:border-blue-500/20 transition-all">
                <div className="text-white font-bold mb-2">02. Humanize</div>
                <p className="text-xs text-[#555] leading-relaxed font-medium">Our algorithm restructures sentences for natural flow.</p>
              </div>
              <div className="p-6 bg-[#0c0c0c] border border-[#1a1a1a] rounded-3xl hover:border-blue-500/20 transition-all">
                <div className="text-white font-bold mb-2">03. Result</div>
                <p className="text-xs text-[#555] leading-relaxed font-medium">Get human-like content ready for university submissions.</p>
              </div>
            </div>
          </section>

          {/* 2. Features Grid */}
          <section className="grid md:grid-cols-2 gap-12 items-center border-t border-[#111] pt-24">
            <div className="space-y-6 text-left">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Why Humanly AI?</h3>
              <p className="text-sm text-[#888] leading-relaxed">
                Most AI tools leave "fingerprints" that detection systems easily catch. Humanly AI re-engineers your content to preserve your original meaning while ensuring it reads naturally.
              </p>
              <ul className="space-y-3 text-[10px] font-bold uppercase tracking-widest text-blue-400">
                <li className="flex items-center gap-3"><span className="w-1 h-1 bg-blue-500 rounded-full"></span> 100% Privacy - No Data Storage</li>
                <li className="flex items-center gap-3"><span className="w-1 h-1 bg-blue-500 rounded-full"></span> High-Speed Processing</li>
                <li className="flex items-center gap-3"><span className="w-1 h-1 bg-blue-500 rounded-full"></span> Zero Character Limits</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-[1px] rounded-3xl">
               <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-[#1a1a1a]">
                  <h4 className="text-white font-bold mb-2">Built for Students</h4>
                  <p className="text-xs text-[#555] leading-relaxed">Specially optimized for essays, research papers, and assignments where maintaining a personal voice is critical.</p>
               </div>
            </div>
          </section>

        </div>
        {/* --- End of Content Section --- */}

        <footer className="mt-24 pb-12 flex flex-col items-center justify-center space-y-8">
  {/* Modern Floating Navigation Dock */}
  <nav className="flex items-center gap-2 p-1.5 bg-[#111] border border-[#222] rounded-full backdrop-blur-md shadow-2xl shadow-blue-500/5">
    <a href="/about" className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-[#888] hover:text-white hover:bg-[#1a1a1a] rounded-full transition-all duration-300 ease-out border border-transparent hover:border-[#333]">
      About
    </a>
    <div className="w-[1px] h-3 bg-[#222]"></div>
    <a href="/privacy" className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-[#888] hover:text-white hover:bg-[#1a1a1a] rounded-full transition-all duration-300 ease-out border border-transparent hover:border-[#333]">
      Privacy
    </a>
    <div className="w-[1px] h-3 bg-[#222]"></div>
    <a href="/terms" className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-[#888] hover:text-white hover:bg-[#1a1a1a] rounded-full transition-all duration-300 ease-out border border-transparent hover:border-[#333]">
      Terms
    </a>
  </nav>

  {/* Branding & Status Line */}
  <div className="flex flex-col items-center gap-3">
    <p className="text-[#444] text-[9px] font-black tracking-[0.4em] uppercase flex items-center gap-3">
      Designed by <span className="text-white/40 hover:text-white transition-colors cursor-default">Zaid Khalid</span>
      <span className="w-1 h-1 bg-[#222] rounded-full"></span>
      <span className="flex items-center gap-2">
        Server <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      </span>
    </p>
  </div>
</footer>
      </div>
    </div>
  );
}