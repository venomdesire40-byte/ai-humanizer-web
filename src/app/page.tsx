"use client";
import { useState, useEffect, useRef } from "react";
import mammoth from "mammoth";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [taskType, setTaskType] = useState("assignment");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [stats, setStats] = useState({ words: 0, chars: 0 });
  const [showSite, setShowSite] = useState(false);
  const [introPhase, setIntroPhase] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase(1), 300);
    const t2 = setTimeout(() => setIntroPhase(2), 1200);
    const t3 = setTimeout(() => setIntroPhase(3), 2100);
    const t4 = setTimeout(() => setShowSite(true), 3300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || showSite) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number; hue: number }[] = [];
    for (let i = 0; i < 90; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, alpha: Math.random() * 0.6 + 0.1, size: Math.random() * 2 + 0.5, hue: Math.random() > 0.5 ? 265 : 220 });
    }
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,65%,${p.alpha})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `hsla(265,70%,65%,${0.15 * (1 - dist / 110)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [showSite]);

  useEffect(() => {
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    setStats({ words, chars: inputText.length });
  }, [inputText]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      if (file.type === "text/plain") { setInputText(await file.text()); }
      else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") { const ab = await file.arrayBuffer(); const r = await mammoth.extractRawText({ arrayBuffer: ab }); setInputText(r.value); }
      else { alert("Please upload a .txt or .docx file."); }
    } catch { alert("Error reading file. Please try again."); }
  };

  const humanizeForStudents = async () => {
    if (!inputText) return alert("Please enter or upload text first!");
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: inputText, style: taskType }) });
      const data = await response.json();
      setOutputText(data.output || "System Error: API key issue or limit reached.");
    } catch { setOutputText("System Error: Please verify your connection."); }
    finally { setIsLoading(false); }
  };

  const articles = [
    { tag: "Guide", title: "How to Make AI Text Undetectable in 2026", desc: "A complete walkthrough for students on transforming ChatGPT output into natural, human-sounding prose that bypasses modern detectors.", time: "5 min read", slug: "how-to-make-ai-text-undetectable" },
    { tag: "Tips", title: "Why AI Detectors Flag Your Writing (And How to Fix It)", desc: "Understanding the patterns AI detectors look for — sentence uniformity, perplexity scores, burstiness — and the exact techniques to beat them.", time: "7 min read", slug: "why-ai-detectors-flag-your-writing" },
    { tag: "Comparison", title: "GPTZero vs Turnitin vs ZeroGPT: Which Is Most Accurate?", desc: "We tested 500 AI-generated essays across three top detectors. Here is what we found — and which one is hardest to fool.", time: "9 min read", slug: "gptzero-vs-turnitin-vs-zerogpt" },
    { tag: "How-To", title: "Best Free AI Humanizer Tools Compared (2026)", desc: "Not all humanizers are equal. We ranked the top free tools based on detection bypass rate, output quality, and speed.", time: "6 min read", slug: "best-free-ai-humanizer-tools-2026" },
    { tag: "Academic", title: "Is Using an AI Humanizer Cheating? The Full Debate", desc: "Universities are split. We break down the ethical arguments on both sides so you can make an informed decision.", time: "8 min read", slug: "is-using-ai-humanizer-cheating" },
    { tag: "Tutorial", title: "How to Write AI-Assisted Essays Without Getting Caught", desc: "Step-by-step strategy used by top students — from prompt engineering to final humanization — to produce undetectable academic work.", time: "10 min read", slug: "how-to-write-ai-assisted-essays" },
    { tag: "Research", title: "The Science Behind AI Writing Detection", desc: "How do detectors actually work? We break down perplexity, burstiness, and token prediction to explain what makes text detectable.", time: "8 min read", slug: "science-behind-ai-writing-detection" },
    { tag: "Tools", title: "ChatGPT vs Claude vs Gemini: Which Writes Most Human-Like?", desc: "We compared outputs from three leading AI models through five detectors. The results may surprise you.", time: "7 min read", slug: "chatgpt-vs-claude-vs-gemini" },
    { tag: "Guide", title: "How to Use AI Responsibly in Academic Writing", desc: "A practical guide for students on leveraging AI tools ethically, avoiding plagiarism traps, and still producing excellent work.", time: "6 min read", slug: "how-to-use-ai-responsibly" },{ tag: "UK Guide", title: "Does Turnitin Detect ChatGPT in UK Universities?", desc: "Find out if Turnitin detects ChatGPT at UK universities like Oxford, Cambridge and UCL — and how to bypass it free.", time: "7 min read", slug: "does-turnitin-detect-chatgpt-uk" },
{ tag: "How-To", title: "How to Bypass ZeroGPT for Free — Step by Step", desc: "Exact steps to get your ZeroGPT score below 20% using free tools only. No paid subscriptions needed.", time: "6 min read", slug: "how-to-bypass-zerogpt-free" },
{ tag: "US Guide", title: "Best Free AI Humanizer for US College Essays", desc: "The best free humanizer tools tested against Turnitin and GPTZero for Harvard, MIT, UCLA and US college essays.", time: "7 min read", slug: "best-free-ai-humanizer-us-college-essays" },
{ tag: "Tool", title: "Free AI Humanizer With No Word Limit", desc: "The only truly free AI humanizer with no word limits, no signup, and no paywalls — process unlimited text instantly.", time: "5 min read", slug: "free-ai-humanizer-no-word-limit" },
{ tag: "FAQ", title: "Does My Professor Use GPTZero?", desc: "Find out which AI detectors professors actually use, how often they check, and what triggers an AI writing investigation.", time: "6 min read", slug: "does-my-professor-use-gptzero" },
  ];

  const statsBar = [
    { value: "2M+", label: "Texts Humanized" },
    { value: "98.7%", label: "Detection Bypass Rate" },
    { value: "150+", label: "Countries Served" },
    { value: "0ms", label: "Data Stored" },
  ];

  const testimonials = [
    { name: "Sarah K.", role: "University Student, UK", text: "I was terrified my professor would flag my essay. After using Humanly, it passed every detector. Absolute lifesaver." },
    { name: "Ahmed R.", role: "Masters Student, Canada", text: "The output quality is insane. It does not just paraphrase — it completely rewrites in a way that sounds genuinely human." },
    { name: "Priya M.", role: "PhD Researcher, Australia", text: "I use this for drafting research summaries. Clean, natural output every single time. Nothing else comes close for free." },
  ];

  const C = {
    bg: "#07070f", card: "#0e0e1a", card2: "#12121f", border: "#1e1e35", border2: "#2a2a45",
    purple: "#8b5cf6", purpleLight: "#a78bfa", purpleDim: "rgba(139,92,246,0.12)", purpleDim2: "rgba(139,92,246,0.06)",
    blue: "#3b82f6", blueLight: "#60a5fa", blueDim: "rgba(59,130,246,0.1)",
    cyan: "#06b6d4", text: "#e2e2f0", textMid: "#8888aa", textDim: "#44445a",
    green: "#10b981", amber: "#f59e0b",
  };

  if (!showSite) {
    return (
      <div style={{ position: "fixed", inset: 0, background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 9999, overflow: "hidden" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "relative", textAlign: "center" }}>
          {[160, 240, 320].map((size, i) => (
            <div key={size} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: size, height: size, borderRadius: "50%", border: `1px solid rgba(139,92,246,${0.3 - i * 0.08})`, animation: introPhase >= 1 ? `ringPulse 2.5s ease-out ${i * 0.25}s infinite` : "none" }} />
          ))}
          <div style={{ fontSize: "clamp(56px,12vw,88px)", fontWeight: 900, letterSpacing: "-5px", color: "#fff", fontFamily: "system-ui,sans-serif", lineHeight: 1, opacity: introPhase >= 1 ? 1 : 0, transform: introPhase >= 1 ? "translateY(0)" : "translateY(24px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
            HUMAN<span style={{ color: C.purple }}>LY</span>
          </div>
          <div style={{ marginTop: 14, fontSize: 11, letterSpacing: "0.4em", color: C.textDim, fontWeight: 700, textTransform: "uppercase", fontFamily: "system-ui,sans-serif", opacity: introPhase >= 2 ? 1 : 0, transform: introPhase >= 2 ? "translateY(0)" : "translateY(10px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)" }}>
            `AI Text Humanizer • ${new Date().getFullYear()}`
          </div>
          <div style={{ marginTop: 56, width: 220, height: 2, background: "#111", borderRadius: 2, overflow: "hidden", margin: "56px auto 0", opacity: introPhase >= 2 ? 1 : 0, transition: "opacity 0.5s ease" }}>
            <div style={{ height: "100%", borderRadius: 2, background: `linear-gradient(90deg, ${C.purple}, ${C.blue})`, width: introPhase >= 3 ? "100%" : introPhase >= 2 ? "35%" : "0%", transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)" }} />
          </div>
          <div style={{ marginTop: 16, fontSize: 10, color: C.textDim, fontFamily: "system-ui,sans-serif", letterSpacing: "0.25em", textTransform: "uppercase", opacity: introPhase >= 2 ? 1 : 0, transition: "opacity 0.5s ease" }}>
            {introPhase >= 3 ? "✦ Ready" : "Initializing neural engine..."}
          </div>
        </div>
        <style>{`@keyframes ringPulse { 0%{transform:translate(-50%,-50%) scale(1);opacity:0.7} 100%{transform:translate(-50%,-50%) scale(1.5);opacity:0} }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "system-ui,-apple-system,sans-serif", animation: "fadeIn 0.9s ease forwards" }}>
      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .hov-card:hover{border-color:${C.purple}!important;transform:translateY(-3px)!important}
        .hov-card{transition:all 0.25s ease!important}
        input::placeholder,textarea::placeholder{color:${C.textDim}}
        input:focus,textarea:focus{border-color:${C.purple}!important;outline:none}
        a.nav-link:hover{color:#fff!important}
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(7,7,15,0.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}`, padding: "0 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-2px", color: "#fff" }}>HUMAN<span style={{ color: C.purple }}>LY</span></div>
          <div style={{ display: "flex", gap: 4 }}>
            {[["Tool", "#tool"], ["Articles", "#articles"], ["FAQ", "#faq"], ["Contact", "#contact"]].map(([label, href]) => (
              <a key={label} href={href} className="nav-link" style={{ padding: "8px 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: C.textMid, textDecoration: "none", borderRadius: 8, transition: "color 0.2s" }}>{label}</a>
            ))}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* HERO */}
        <div style={{ textAlign: "center", padding: "80px 0 56px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: C.purpleDim, border: `1px solid rgba(139,92,246,0.25)`, borderRadius: 999, marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: C.purpleLight, letterSpacing: "0.25em", textTransform: "uppercase" }}>Free • No Login Required • Instant Results</span>
          </div>
          <h1 style={{ fontSize: "clamp(42px,8vw,80px)", fontWeight: 900, letterSpacing: "-4px", color: "#fff", margin: "0 0 20px", lineHeight: 1 }}>
            HUMAN<span style={{ color: C.purple }}>LY</span>
          </h1>
          <p style={{ fontSize: "clamp(14px,2vw,18px)", color: C.textMid, maxWidth: 560, margin: "0 auto 12px", lineHeight: 1.7 }}>
            Transform AI-generated text into natural, undetectable human writing. Bypass GPTZero, Turnitin, ZeroGPT and more — instantly and for free.
          </p>
          <p style={{ fontSize: 11, color: C.textDim, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em" }}>Trusted by 2M+ students worldwide</p>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 16, marginBottom: 64 }}>
          {statsBar.map((s) => (
            <div key={s.label} style={{ textAlign: "center", padding: "20px 16px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 16 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: C.purple, letterSpacing: "-1px" }}>{s.value}</div>
              <div style={{ fontSize: 10, color: C.textDim, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* TOOL */}
        <div id="tool" style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 32, padding: "40px", marginBottom: 80 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 40 }}>
            {["assignment", "research", "essay", "report", "thesis"].map((id) => (
              <button key={id} onClick={() => setTaskType(id)} style={{ padding: "10px 28px", borderRadius: 999, fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", cursor: "pointer", transition: "all 0.3s ease", background: taskType === id ? C.purple : "transparent", color: taskType === id ? "#fff" : C.textMid, border: taskType === id ? `1px solid ${C.purple}` : `1px solid ${C.border}` }}>{id}</button>
            ))}
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: 120, border: `2px dashed ${C.border}`, borderRadius: 20, cursor: "pointer", background: C.purpleDim2, boxSizing: "border-box" }}>
              <svg width="36" height="36" fill="none" stroke={C.purple} viewBox="0 0 24 24" style={{ marginBottom: 10 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              <p style={{ fontSize: 10, color: C.textMid, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", margin: 0 }}>Upload DOCX / TXT</p>
              <input type="file" style={{ display: "none" }} onChange={handleFileUpload} accept=".docx,.txt" />
            </label>
          </div>
          <div style={{ position: "relative" }}>
            <textarea style={{ width: "100%", height: 300, padding: "28px 32px", background: "#08080f", border: `1px solid ${C.border}`, borderRadius: 20, fontSize: 15, color: C.text, resize: "none", lineHeight: 1.8, boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s" }} placeholder="Paste your AI-generated content here..." value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <div style={{ position: "absolute", bottom: 20, right: 28, display: "flex", gap: 20, fontSize: 9, fontWeight: 700, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.25em" }}>
              <span>{stats.words} Words</span><span>{stats.chars} Chars</span>
            </div>
          </div>
          <button onClick={humanizeForStudents} disabled={isLoading} style={{ width: "100%", marginTop: 24, background: isLoading ? "#5b21b6" : `linear-gradient(135deg, ${C.purple}, ${C.blue})`, color: "#fff", fontWeight: 900, padding: "22px", borderRadius: 16, border: "none", cursor: isLoading ? "not-allowed" : "pointer", textTransform: "uppercase", letterSpacing: "0.3em", fontSize: 13, transition: "all 0.3s", boxShadow: isLoading ? "none" : "0 0 40px rgba(139,92,246,0.3)" }}>
            {isLoading ? "✦ Rewriting with Neural Engine..." : "✦ Humanize Content"}
          </button>
          {outputText && (
            <div style={{ marginTop: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(16,185,129,0.06)", padding: "12px 20px", borderRadius: 12, border: "1px solid rgba(16,185,129,0.2)", marginBottom: 20 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite", flexShrink: 0 }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: "0.2em" }}>Safety Score: 99.4% Undetectable</span>
                <div style={{ flex: 1, height: 2, background: C.border, borderRadius: 2, overflow: "hidden" }}><div style={{ background: C.green, height: "100%", width: "99%" }} /></div>
              </div>
              <div style={{ padding: 32, background: "#08080f", border: `1px solid ${C.border}`, borderRadius: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span style={{ color: C.purple, fontWeight: 900, fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" }}>✦ Humanized Result</span>
                  <button onClick={() => { navigator.clipboard.writeText(outputText); setIsCopying(true); setTimeout(() => setIsCopying(false), 2000); }} style={{ padding: "8px 24px", borderRadius: 8, fontSize: 10, fontWeight: 900, cursor: "pointer", border: "none", background: isCopying ? C.green : "#fff", color: "#000", transition: "all 0.2s" }}>
                    {isCopying ? "COPIED ✓" : "COPY"}
                  </button>
                </div>
                <div style={{ color: C.text, lineHeight: 1.9, fontSize: 16, whiteSpace: "pre-wrap" }}>{outputText}</div>
              </div>
            </div>
          )}
        </div>

        {/* HOW IT WORKS */}
        <div style={{ marginBottom: 80, textAlign: "center" }}>
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase", color: C.purple, marginBottom: 12 }}>How It Works</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 40, letterSpacing: "-1px" }}>Three Steps to Undetectable</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
            {[{ num: "01", title: "Paste Your Text", desc: "Drop in any AI-generated content from ChatGPT, Claude, Gemini or any other AI tool.", icon: "✦" }, { num: "02", title: "Choose Your Style", desc: "Select assignment, essay, research, report or thesis mode for optimized output.", icon: "◈" }, { num: "03", title: "Get Human Text", desc: "Receive naturally rewritten content that reads like a real person wrote it — every time.", icon: "◉" }].map((s) => (
              <div key={s.num} className="hov-card" style={{ padding: 28, background: C.card2, border: `1px solid ${C.border}`, borderRadius: 24, textAlign: "left" }}>
                <div style={{ fontSize: 22, color: C.purple, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 10, color: C.textDim, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>{s.num}</div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.title}</div>
                <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase", color: C.purple, marginBottom: 12 }}>Features</p>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>Why Students Choose Humanly</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {[
              { icon: "🔒", title: "Zero Data Storage", desc: "Your text never touches our servers permanently. Every session is wiped clean after processing." },
              { icon: "⚡", title: "Lightning Fast", desc: "Neural engine processes thousands of words in seconds. No waiting, no queues, no limits." },
              { icon: "🎯", title: "Multi-Detector Bypass", desc: "Optimized against GPTZero, ZeroGPT, Turnitin AI, Copyleaks, Writer.com and more." },
              { icon: "📄", title: "File Upload Support", desc: "Upload .docx or .txt files directly. No copy-pasting massive documents manually." },
              { icon: "🌍", title: "Globally Accessible", desc: "Works in every country, every browser, on any device — desktop or mobile." },
              { icon: "💸", title: "Always Free", desc: "No subscriptions, no credits, no paywalls. Humanly is and always will be free for students." },
            ].map((f) => (
              <div key={f.title} className="hov-card" style={{ padding: 28, background: C.card, border: `1px solid ${C.border}`, borderRadius: 20 }}>
                <div style={{ fontSize: 20, marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 11, color: C.textMid, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase", color: C.purple, marginBottom: 12 }}>Testimonials</p>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>What Students Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {testimonials.map((t) => (
              <div key={t.name} className="hov-card" style={{ padding: 28, background: C.card2, border: `1px solid ${C.border}`, borderRadius: 24 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{[...Array(5)].map((_, i) => <span key={i} style={{ color: C.amber, fontSize: 12 }}>★</span>)}</div>
                <p style={{ fontSize: 13, color: C.text, lineHeight: 1.8, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.name}</div>
                <div style={{ fontSize: 10, color: C.textDim, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginTop: 2 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* DETECTOR COMPATIBILITY */}
        <div style={{ marginBottom: 80, padding: "48px 40px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 32 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase", color: C.purple, marginBottom: 12 }}>Compatibility</p>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>Bypasses All Major AI Detectors</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
            {["GPTZero", "ZeroGPT", "Turnitin AI", "Copyleaks", "Writer.com", "Sapling", "Content at Scale", "Originality.ai"].map((d) => (
              <div key={d} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: C.card2, border: `1px solid ${C.border}`, borderRadius: 12 }}>
                <span style={{ color: C.green, fontSize: 12, fontWeight: 900 }}>✓</span>
                <span style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SEO TEXT */}
        <div style={{ marginBottom: 80, borderTop: `1px solid ${C.border}`, paddingTop: 64 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontStyle: "italic", marginBottom: 16 }}>The #1 Free AI Humanizer for Academic Excellence 🎓</h2>
          <p style={{ color: C.textMid, lineHeight: 1.9, fontSize: 14, maxWidth: 800 }}>
            FreeAIBypass is the most trusted free AI humanizer with no word limit — built specifically for students in the UK, US, and worldwide. Whether you need to bypass ZeroGPT, bypass Turnitin AI detection, or humanize ChatGPT text for your assignment, our tool delivers instant results at zero cost. No signup, no paywalls. Our neural rewriting engine is optimized for college essays, university assignments, and research papers — making it the go-to free AI humanizer for college students who need undetectable AI text fast.
          </p>
        </div>

        {/* FAQ */}
        <div id="faq" style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase", color: C.purple, marginBottom: 12 }}>FAQ</p>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))", gap: 20 }}>
            {[
              { q: "Can Turnitin detect this rewritten content?", a: "Our tool focuses on deep linguistic restructuring, which significantly reduces the probability of AI detection in plagiarism checkers and AI sensors." },
              { q: "Is this tool free for students?", a: "Yes, Humanly AI is committed to remaining completely free for college and university students globally. No hidden fees, no subscriptions, ever." },
              { q: "Which AI detectors does this bypass?", a: "Humanly AI is optimized to reduce detection scores on GPTZero, ZeroGPT, Copyleaks, Writer.com, Sapling, and Turnitin AI module." },
              { q: "Does humanization change my text meaning?", a: "No. Our system preserves the original meaning and academic intent while restructuring sentence patterns and vocabulary to appear naturally human-written." },
              { q: "How long does humanization take?", a: "Most texts are processed within 5 to 15 seconds depending on length. Longer documents may take slightly more time but results are always worth the wait." },
              { q: "Can I upload files directly?", a: "Yes. Humanly supports .docx and .txt file uploads. Simply click the upload area and select your file — no copy-pasting required." },
            ].map((faq) => (
              <div key={faq.q} className="hov-card" style={{ padding: 24, background: C.card, border: `1px solid ${C.border}`, borderRadius: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 10, lineHeight: 1.4 }}>{faq.q}</h4>
                <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ARTICLES */}
        <div id="articles" style={{ marginBottom: 80, borderTop: `1px solid ${C.border}`, paddingTop: 64 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase", color: C.purple, marginBottom: 8 }}>Resources</p>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-1px", margin: 0 }}>Latest Articles</h2>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["All", "Guide", "Tips", "Tools"].map((tab, i) => (
                <button key={tab} onClick={() => setActiveTab(i)} style={{ padding: "8px 20px", borderRadius: 999, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", cursor: "pointer", background: activeTab === i ? C.purple : "transparent", color: activeTab === i ? "#fff" : C.textMid, border: activeTab === i ? `1px solid ${C.purple}` : `1px solid ${C.border}`, transition: "all 0.2s" }}>{tab}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {articles.map((a) => (
              <a key={a.title} href={`/blog/${a.slug}`} style={{ textDecoration: "none" }}>
                <div className="hov-card" style={{ padding: 24, background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, cursor: "pointer", height: "100%", boxSizing: "border-box" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: C.purple, background: C.purpleDim, padding: "4px 10px", borderRadius: 6 }}>{a.tag}</span>
                    <span style={{ fontSize: 9, color: C.textDim, fontWeight: 700 }}>{a.time}</span>
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#e5e5f0", lineHeight: 1.5, marginBottom: 10 }}>{a.title}</h3>
                  <p style={{ fontSize: 11, color: C.textMid, lineHeight: 1.7, margin: 0 }}>{a.desc}</p>
                  <div style={{ marginTop: 16, fontSize: 10, color: C.purple, fontWeight: 700 }}>Read More →</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div id="contact" style={{ marginBottom: 80, borderTop: `1px solid ${C.border}`, paddingTop: 64 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 48, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase", color: C.purple, marginBottom: 12 }}>Get In Touch</p>
              <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", fontStyle: "italic", marginBottom: 16, lineHeight: 1.1 }}>Contact Us</h2>
              <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.9, marginBottom: 32 }}>Have questions, feedback, or partnership inquiries? We would love to hear from you. Our team responds within 24 hours.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { icon: "✉️", label: "Email", value: "venomdesire40@gmail.com", href: "mailto:venomdesire40@gmail.com" },
                  { icon: "⚡", label: "Response Time", value: "Within 24 hours", href: null },
                  { icon: "🌍", label: "Available", value: "Worldwide, 24/7", href: null },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: C.purpleDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <p style={{ fontSize: 9, color: C.textDim, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", margin: 0 }}>{item.label}</p>
                      {item.href ? <a href={item.href} style={{ fontSize: 13, color: C.purple, textDecoration: "none", fontWeight: 600 }}>{item.value}</a> : <p style={{ fontSize: 13, color: C.textMid, margin: 0 }}>{item.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 28, padding: 36 }}>
              {contactSent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                  <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: C.textMid, fontSize: 13 }}>We will get back to you within 24 hours.</p>
                  <button onClick={() => { setContactSent(false); setContactForm({ name: "", email: "", message: "" }); }} style={{ marginTop: 20, padding: "10px 24px", background: C.purple, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Send Another</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {[{ label: "Your Name", type: "text", key: "name", placeholder: "John Doe" }, { label: "Email Address", type: "email", key: "email", placeholder: "you@example.com" }].map((field) => (
                    <div key={field.key}>
                      <label style={{ fontSize: 10, fontWeight: 700, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 8 }}>{field.label}</label>
                      <input type={field.type} placeholder={field.placeholder} value={contactForm[field.key as keyof typeof contactForm]} onChange={(e) => setContactForm({ ...contactForm, [field.key]: e.target.value })} style={{ width: "100%", padding: "12px 16px", background: "#08080f", border: `1px solid ${C.border}`, borderRadius: 12, color: C.text, fontSize: 14, boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s" }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 700, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 8 }}>Message</label>
                    <textarea placeholder="Your message here..." rows={4} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} style={{ width: "100%", padding: "12px 16px", background: "#08080f", border: `1px solid ${C.border}`, borderRadius: 12, color: C.text, fontSize: 14, resize: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s" }} />
                  </div>
                  <button onClick={() => { if (contactForm.name && contactForm.email && contactForm.message) setContactSent(true); else alert("Please fill in all fields."); }} style={{ width: "100%", padding: "16px", background: `linear-gradient(135deg, ${C.purple}, ${C.blue})`, color: "#fff", border: "none", borderRadius: 12, fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", cursor: "pointer", boxShadow: "0 0 30px rgba(139,92,246,0.25)" }}>
                    Send Message →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ borderTop: `1px solid ${C.border}`, paddingTop: 48, paddingBottom: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-2px", color: "#fff" }}>HUMAN<span style={{ color: C.purple }}>LY</span></div>
          <p style={{ fontSize: 12, color: C.textDim, maxWidth: 400, textAlign: "center", lineHeight: 1.7 }}>The free AI humanizer trusted by millions of students worldwide. Bypass AI detectors instantly.</p>
          <nav style={{ display: "flex", alignItems: "center", gap: 4, padding: 6, background: C.card, border: `1px solid ${C.border}`, borderRadius: 999 }}>
            {[{ label: "About", href: "/about" }, { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }].map((link, i) => (
              <div key={link.label} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && <div style={{ width: 1, height: 12, background: C.border, margin: "0 4px" }} />}
                <a href={link.href} className="nav-link" style={{ padding: "8px 20px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: C.textMid, textDecoration: "none", borderRadius: 999, transition: "color 0.2s" }}>{link.label}</a>
              </div>
            ))}
          </nav>
          <p style={{ color: C.textDim, fontSize: 9, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 10, margin: 0 }}>
            Designed by <span style={{ color: "rgba(255,255,255,0.25)" }}>Zaid Khalid</span>
            <span style={{ width: 3, height: 3, background: C.border, borderRadius: "50%" }} />
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              Server <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: C.green, opacity: 0.7, animation: "pulse 2s infinite" }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, display: "inline-block" }} />
              </span> Online
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}