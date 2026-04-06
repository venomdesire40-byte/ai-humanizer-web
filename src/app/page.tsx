"use client";
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [taskType, setTaskType] = useState("assignment"); // Changed from 'tone' to 'taskType'
  const [isLoading, setIsLoading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [stats, setStats] = useState({ words: 0, chars: 0 });

  // 🔴 AAPKI API KEY FIXED HAI
  const API_KEY = "AIzaSyBlxaDIAIm8AoeoD1SWJPneQlDwHMufcPs"; 
  const genAI = new GoogleGenerativeAI(API_KEY);

  useEffect(() => {
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    setStats({ words, chars: inputText.length });
  }, [inputText]);

  const humanizeForStudents = async () => {
    if (!inputText) return alert("Bhai, assignment wala text to likho!");
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      // Student-Specific Prompt Logic
      const prompt = `Act as an expert Academic Writer and Student Assistant. 
      Task: Rewrite the following text to sound 100% human and natural.
      Target Style: ${taskType === 'research' ? 'Formal University Research (High Vocabulary)' : taskType === 'essay' ? 'Creative & Flowy Essay' : 'Standard College Assignment'}. 
      Goal: Bypass AI detectors like Turnitin/GPTZero while keeping the original meaning intact.
      Text: ${inputText}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setOutputText(response.text());
    } catch (error: any) {
      console.error("Error:", error);
      setOutputText("Connection Error: Please use a VPN or check your internet.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            STUDENT AI HUMANIZER 🎓
          </h1>
          <p className="text-slate-500 text-xs font-bold tracking-[0.3em] uppercase">
            Assignment & Thesis Edition • By Zaid Khalid
          </p>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
          
          {/* Option 1: Task Selector (The Student Logic) */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 bg-[#1e293b]/50 p-2 rounded-2xl border border-slate-800">
            {[
              { id: "assignment", label: "Assignment", icon: "📝" },
              { id: "research", label: "Research Paper", icon: "📖" },
              { id: "essay", label: "Creative Essay", icon: "✍️" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTaskType(item.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all duration-300 ${
                  taskType === item.id 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/40" 
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="relative group">
            <textarea
              className="w-full h-72 p-8 bg-[#020617] border border-slate-800 rounded-[2rem] outline-none focus:border-indigo-500 transition-all text-lg resize-none placeholder-slate-800"
              placeholder="Paste your AI-generated assignment here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="absolute bottom-6 right-8 flex gap-4 text-[10px] font-bold text-slate-600 uppercase bg-[#0f172a] px-4 py-2 rounded-full border border-slate-800 shadow-sm">
              <span>{stats.words} Words</span>
              <span className="text-indigo-900">|</span>
              <span>{stats.chars} Chars</span>
            </div>
          </div>

          <button
            onClick={humanizeForStudents}
            disabled={isLoading}
            className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600 text-white font-black py-6 rounded-[1.5rem] transition-all transform active:scale-[0.98] disabled:opacity-50 uppercase tracking-[0.2em] text-lg shadow-xl shadow-indigo-600/20"
          >
            {isLoading ? "Bypassing AI Detectors... 🧠" : "Humanize My Work ✨"}
          </button>

          {/* Output / Result */}
          {outputText && (
            <div className="mt-12 animate-in fade-in zoom-in duration-500">
               {/* Simulated AI Detection Meter */}
               <div className="mb-6 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest text-left">Human Probability Score</span>
                    <span className="text-xs font-black text-emerald-400">99%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-400 h-full w-[99%] shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                  </div>
                </div>

               <div className="p-8 bg-slate-900/60 border border-indigo-500/20 rounded-[2rem] relative">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-indigo-400 font-black text-[10px] tracking-widest uppercase text-left">Humanized Assignment</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(outputText);
                      setIsCopying(true);
                      setTimeout(() => setIsCopying(false), 2000);
                    }}
                    className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
                      isCopying ? "bg-green-600 text-white" : "bg-indigo-600 text-white"
                    }`}
                  >
                    {isCopying ? "COPIED! ✅" : "COPY RESULT"}
                  </button>
                </div>
                <div className="text-slate-300 leading-relaxed text-xl font-light italic whitespace-pre-wrap text-left">
                  {outputText}
                </div>
              </div>
            </div>
          )}
        </div>
        <footer className="mt-16 text-center text-slate-700 text-[10px] font-bold tracking-[0.4em] uppercase">
            © 2026 Student Academic Suite • Zaid Khalid
        </footer>
      </div>
    </div>
  );
}