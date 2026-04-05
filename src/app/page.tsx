"use client";
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isCopying, setIsCopying] = useState(false);

  const humanizeText = () => {
    // Abhi ke liye hum simple logic rakh rahe hain, baad mein isay AI API se connect karenge
    const humanized = inputText
      .replace(/AI/g, "Human")
      .replace(/algorithm/g, "way of thinking")
      .replace(/generate/g, "create");
    setOutputText(humanized || "Please enter some text first!");
  };

  const copyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2000); // 2 second baad wapas normal ho jaye ga
    }
  };

  const clearAll = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8">AI Humanizer Pro 🚀</h1>
      
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md">
        <textarea
          className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
          placeholder="Paste your AI-generated text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="flex gap-4 mt-4">
          <button
            onClick={humanizeText}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Humanize Text ✨
          </button>
          <button
            onClick={clearAll}
            className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition"
          >
            Clear
          </button>
        </div>

        {outputText && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800">Humanized Result:</h2>
              <button
                onClick={copyToClipboard}
                className={`text-sm px-3 py-1 rounded ${isCopying ? 'bg-green-500 text-white' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'}`}
              >
                {isCopying ? "Copied! ✅" : "Copy Text"}
              </button>
            </div>
            <div className="w-full p-4 bg-gray-50 border border-indigo-100 rounded-lg text-gray-700 min-h-[100px]">
              {outputText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}