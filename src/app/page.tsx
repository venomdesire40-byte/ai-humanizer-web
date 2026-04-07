"use client";

import React, { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState("");

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto pt-20 px-6 text-center">
        
        {/* --- HEADER SECTION --- */}
        <header className="mb-24 space-y-6">
          <div className="inline-block px-5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-bold tracking-[0.3em] uppercase animate-pulse">
            Zaid Khalid Edition | Premium Access
          </div>
          <h1 className="text-8xl font-black text-white uppercase tracking-tighter italic leading-none">
            Humanly <span className="text-blue-500 italic">AI</span>
          </h1>
          <p className="text-[#666] text-[11px] font-bold tracking-[0.5em] uppercase mt-10 max-w-2xl mx-auto leading-loose">
            The World's Most Advanced AI-to-Human Text Transformer
          </p>
        </header>

        {/* --- MAIN TOOL SECTION --- */}
        <main className="max-w-4xl mx-auto space-y-10">
          
          {/* File Upload Area */}
          <div className="group relative p-16 bg-[#0c0c0c] border-2 border-dashed border-[#1a1a1a] rounded-[3.5rem] hover:border-blue-500/40 transition-all duration-700 cursor-pointer overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex flex-col items-center gap-5 relative z-10">
              <div className="w-16 h-16 bg-blue-500/10 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin opacity-0 group-hover:opacity-100 absolute"></div>
                <span className="text-blue-500 text-3xl font-light">+</span>
              </div>
              <p className="text-xl font-black text-white uppercase tracking-[0.2em] italic">Upload Document</p>
              <p className="text-[10px] text-[#333] uppercase tracking-[0.4em] font-bold">PDF • DOCX • TXT • RTF (Max 25MB)</p>
            </div>
          </div>

          {/* Large Input Area */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/10 to-transparent rounded-[3.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative">
              <textarea
                className="w-full h-[550px] bg-[#0c0c0c] border border-[#1a1a1a] rounded-[3.5rem] p-12 text-sm focus:outline-none focus:border-blue-500/40 transition-all placeholder:text-[#222] resize-none shadow-inner leading-[1.8] font-medium"
                placeholder="Paste your AI content here... Our neural engine will meticulously restructure your text to ensure it flows naturally like a human-written document."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              
              {/* Character Counter - Original Style */}
              <div className="absolute bottom-12 right-14 flex items-center gap-5">
                <div className="h-[1px] w-16 bg-[#1a1a1a]"></div>
                <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#444]">
                  Characters: <span className="text-blue-500">{inputText.length}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Action Button */}
          <button className="group w-full py-8 bg-white text-black font-black uppercase text-[14px] tracking-[0.6em] rounded-full hover:bg-blue-600 hover:text-white transition-all duration-700 shadow-2xl relative overflow-hidden">
            <span className="relative z-10">Execute Transformation</span>
            <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </main>

        {/* --- EXTENDED CONTENT (SEO & TRUST) --- */}
        <div className="mt-64 max-w-5xl mx-auto space-y-56 pb-48">
          
          {/* Detailed Features */}
          <section className="grid md:grid-cols-3 gap-20 text-left border-t border-[#111] pt-32">
            <div className="space-y-8">
              <div className="text-blue-500 font-black text-2xl italic">01.</div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">Detection <br/>Bypass</h3>
              <p className="text-[12px] text-[#555] leading-[2] font-medium italic">
                Our core algorithm is updated daily to stay ahead of AI detection technologies including Turnitin and GPTZero. We modify the syntax and structure to ensure a 100% human score.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="text-blue-500 font-black text-2xl italic">02.</div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">Context <br/>Preservation</h3>
              <p className="text-[12px] text-[#555] leading-[2] font-medium italic">
                Unlike simple spinning tools, Humanly AI understands the semantic meaning of your text. We ensure your original message remains identical while the wording becomes natural.
              </p>
            </div>

            <div className="space-y-8">
              <div className="text-blue-500 font-black text-2xl italic">03.</div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic leading-none">Academic <br/>Integrity</h3>
              <p className="text-[12px] text-[#555] leading-[2] font-medium italic">
                Designed specifically for the global student community. We provide an editing layer that helps you refine your thoughts into professional, human-sounding academic prose.
              </p>
            </div>
          </section>

          {/* Privacy & Technology Section */}
          <section className="grid md:grid-cols-2 gap-32 items-center text-left">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-none italic">
                  Absolute <br/><span className="text-blue-500">Privacy.</span>
                </h2>
                <div className="h-1.5 w-24 bg-blue-500"></div>
              </div>
              <p className="text-sm text-[#777] leading-[2.2] font-medium italic">
                We believe your data belongs to you. Humanly AI operates on an ephemeral processing system. This means your text is processed in the volatile memory (RAM) and is purged the microsecond you close your browser tab. No logs, no history, no footprints.
              </p>
              <div className="flex gap-12 pt-4">
                <div className="space-y-2">
                  <p className="text-white font-black text-2xl italic tracking-tighter leading-none underline decoration-blue-500 decoration-4 underline-offset-8">256-Bit</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#444] font-black">Encryption</p>
                </div>
                <div className="space-y-2">
                  <p className="text-white font-black text-2xl italic tracking-tighter leading-none underline decoration-blue-500 decoration-4 underline-offset-8">Zero</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#444] font-black">Data Logs</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0c0c0c] p-20 rounded-[4rem] border border-[#1a1a1a] shadow-inner">
              <h4 className="text-white font-black mb-12 text-xs tracking-[0.4em] uppercase italic opacity-50 text-center">Engine Protocol</h4>
              <ul className="space-y-10">
                <li className="flex gap-8 items-center border-b border-[#111] pb-8">
                  <span className="text-blue-500 font-black text-xl italic italic">I.</span>
                  <p className="text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] leading-loose">Deep Scan for AI-generated linguistic markers.</p>
                </li>
                <li className="flex gap-8 items-center border-b border-[#111] pb-8">
                  <span className="text-blue-500 font-black text-xl italic">II.</span>
                  <p className="text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] leading-loose">Neural re-mapping of sentence perplexity.</p>
                </li>
                <li className="flex gap-8 items-center">
                  <span className="text-blue-500 font-black text-xl italic">III.</span>
                  <p className="text-[10px] font-bold text-[#555] uppercase tracking-[0.2em] leading-loose">Final human-voice verification check.</p>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* --- FOOTER SECTION --- */}
        <footer className="pb-24 flex flex-col items-center justify-center space-y-12 border-t border-[#111] pt-24">
          <nav className="flex items-center gap-4 p-2 bg-[#0c0c0c] border border-[#1a1a1a] rounded-full backdrop-blur-3xl">
            <a href="/about" className="px-10 py-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#444] hover:text-white hover:bg-[#151515] rounded-full transition-all duration-500 italic">About</a>
            <div className="w-[1px] h-5 bg-[#1a1a1a]"></div>
            <a href="/privacy" className="px-10 py-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#444] hover:text-white hover:bg-[#151515] rounded-full transition-all duration-500 italic">Privacy</a>
            <div className="w-[1px] h-5 bg-[#1a1a1a]"></div>
            <a href="/terms" className="px-10 py-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#444] hover:text-white hover:bg-[#151515] rounded-full transition-all duration-500 italic">Terms</a>
          </nav>
          
          <div className="flex flex-col items-center gap-5">
            <p className="text-[#222] text-[10px] font-black tracking-[0.6em] uppercase flex items-center gap-5 italic">
               Developed by <span className="text-white/30 hover:text-blue-500 transition-colors">Zaid Khalid</span>
               <span className="w-2 h-2 bg-[#111] rounded-full"></span>
               <span className="flex items-center gap-4">
                  Server Status <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500/50 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                  </span>
               </span>
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}