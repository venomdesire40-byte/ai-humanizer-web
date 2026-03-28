"use client";
import { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const humanizeText = () => {
    let text = inputText;
    text = text.replace(/utilize/gi, "use");
    text = text.replace(/furthermore/gi, "also");
    text = text.replace(/consequently/gi, "so");
    text = text.replace(/facilitate/gi, "help");
    setOutputText("Humanized Output: \n\n" + text);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-10 font-sans">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">AI to Human Converter</h1>
      <p className="text-gray-500 mb-8">Convert AI text into natural human writing.</p>
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <textarea 
          className="h-64 p-4 border-2 border-indigo-100 rounded-xl shadow-sm focus:border-indigo-500 outline-none"
          placeholder="Paste AI generated text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <textarea 
          className="h-64 p-4 border-2 border-green-100 rounded-xl shadow-sm bg-white outline-none"
          placeholder="Humanized text will appear here..."
          value={outputText}
          readOnly
        />
      </div>

      <button 
        onClick={humanizeText}
        className="mt-8 bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg"
      >
        Humanize Text ✨
      </button>
    </div>
  );
}