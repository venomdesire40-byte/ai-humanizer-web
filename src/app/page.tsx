"use client";

import React, { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleHumanize = () => {
    // Basic logic for now
    setOutputText(inputText);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto pt-20 px-6">
        
        {/* Header Section */}
        <header className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase">
            Zaid Khalid Edition
          </div>
          <h1 className="text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
            Humanly <span className="text-blue-500">AI</span>
          </h1>
          <p className="text-[#555] text-xs font-medium tracking-widest uppercase">
            Refining machine logic into human expression
          </p>
        </header>

        {/* Main Tool Card */}
        <main className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            <textarea
              className="w-full h-80 bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] p-8 text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-[#333] resize-none"
              placeholder="Paste AI Content Here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="w-full h-80 bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] p-8 text-sm text-[#888] overflow-y-auto relative">
              {outputText || "Humanized Output..."}
            </div>
          </div>
          
          <button 
            onClick={handleHumanize}
            className="w-full mt-6 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500 shadow-xl shadow-blue-500/5"
          >
            Humanize Text
          </button>
        </main>

        {/* --- SEO & Professional Content Section --- */}
        <div className="mt-32 max-w-4xl mx-auto space-y-24 pb-20">
          
          <section className="text-center space-y-12">
            <h2 className="text-[11px] font-black tracking-[0.3em] uppercase flex items-center justify-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-500 animate-pulse">
                The Process
              </span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-8 bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] hover:border-green-500/20 transition-all duration-500 group">
                <div className="text-white font-bold mb-3 text-sm italic">01. Paste Input</div>
                <p className="text-[11px] text-[#555] leading-relaxed group-hover:text-[#888]">Insert your AI-generated draft from ChatGPT, Claude, or Gemini.</p>
              </div>
              <div className="p-8 bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] hover:border-green-500/20 transition-all duration-500 group">
                <div className="text-white font-bold mb-3 text-sm italic">02. Humanize</div>
                <p className="text-[11px] text-[#555] leading-relaxed group-hover:text-[#888]">Our algorithm restructures syntax to mimic natural student writing.</p>
              </div>
              <div className="p-8 bg-[#0c0c0c] border border-[#1a1a1a] rounded-[2rem] hover:border-green-500/20 transition-all duration-500 group">
                <div className="text-white font-bold mb-3 text-sm italic">03. Final Output</div>
                <p className="text-[11px] text-[#555] leading-relaxed group-hover:text-[#888]">Receive undetectable, high-quality content ready for submission.</p>
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-16 items-center border-t border-[#111] pt-24 text-left">
            <div className="space-y-8">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">Why <br/><span className="text-blue-500 text-left">Humanly AI?</span></h3>
              <p className="text-sm text-[#888] leading-relaxed">
                Standard AI outputs often carry predictable patterns. Humanly AI: Zaid Khalid Edition is fine-tuned to provide a seamless bridge between machine efficiency and human creativity.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                   <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span> 
                   Bypass Advanced Detection
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                   <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span> 
                   Privacy First - No Logs Kept
                </div>
              </div>
            </div>
            
            <div className="relative p-10 bg-gradient-to-br from-[#0c0c0c] to-transparent border border-[#1a1a1a] rounded-[2.5rem] overflow-hidden">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 blur-[60px]"></div>
               <h4 className="text-white font-bold mb-4 text-sm tracking-tight italic text-left">Academic Integrity</h4>
               <p className="text-xs text-[#555] leading-relaxed text-left">
                 We believe in empowering students. Our tool is designed as an editing assistant to help you express your ideas more clearly and naturally.
               </p>
            </div>
          </section>
        </div>

        {/* --- Floating Footer --- */}
        <footer className="mt-24 pb-12 flex flex-col items-center justify-center space-y-8">
          <nav className="flex items-center gap-2 p-1.5 bg-[#111] border border-[#222] rounded-full backdrop-blur-md">
            <a href="/about" className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-[#888] hover:text-white hover:bg-[#1a1a1a] rounded-full transition-all">About</a>
            <div className="w-[1px] h-3 bg-[#222]"></div>
            <a href="/privacy" className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-[#888] hover:text-white hover:bg-[#1a1a1a] rounded-full transition-all">Privacy</a>
            <div className="w-[1px] h-3 bg-[#222]"></div>
            <a href="/terms" className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-[#888] hover:text-white hover:bg-[#1a1a1a] rounded-full transition-all">Terms</a>
          </nav>
          <div className="flex flex-col items-center gap-3">
            <p className="text-[#444] text-[9px] font-black tracking-[0.4em] uppercase flex items-center gap-3">
              Developed by <span className="text-white/40">Zaid Khalid</span>
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