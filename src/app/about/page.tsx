import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About FreeAIBypass — Free AI Humanizer Tool",
  description: "Learn about FreeAIBypass — the free AI humanizer trusted by millions of students worldwide to bypass GPTZero, Turnitin, and ZeroGPT.",
  alternates: { canonical: "https://freeaibypass.com/about" },
};

export default function About() {
  const C = {
    bg: "#07070f", card: "#0e0e1a", card2: "#12121f", border: "#1e1e35",
    purple: "#8b5cf6", purpleLight: "#a78bfa", purpleDim: "rgba(139,92,246,0.12)",
    blue: "#3b82f6", text: "#e2e2f0", textMid: "#8888aa", textDim: "#44445a", green: "#10b981",
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "system-ui,-apple-system,sans-serif" }}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} a.nav-link:hover{color:#fff!important}`}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(7,7,15,0.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}`, padding: "0 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="/" style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-2px", color: "#fff", textDecoration: "none" }}>HUMAN<span style={{ color: C.purple }}>LY</span></a>
          <a href="/" className="nav-link" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: C.textMid, textDecoration: "none", transition: "color 0.2s" }}>← Back to Home</a>
        </div>
      </nav>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px 96px", animation: "fadeIn 0.7s ease forwards" }}>

        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase", color: C.purple, marginBottom: 16 }}>About Us</p>
          <h1 style={{ fontSize: "clamp(32px,6vw,52px)", fontWeight: 900, color: "#fff", letterSpacing: "-2px", lineHeight: 1.1, marginBottom: 20 }}>
            Built for Students.<br /><span style={{ color: C.purple }}>Free Forever.</span>
          </h1>
          <div style={{ height: 2, width: 80, background: `linear-gradient(90deg, ${C.purple}, transparent)`, borderRadius: 2 }} />
        </div>

        <div style={{ padding: 40, background: C.card, border: `1px solid ${C.border}`, borderRadius: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Our Mission</h2>
          <p style={{ fontSize: 15, color: C.textMid, lineHeight: 1.9, margin: 0 }}>FreeAIBypass was built with a single goal: to give every student access to professional-grade AI humanization tools without paying a cent. We believe that the ability to refine and improve AI-assisted writing should not be gated behind expensive subscriptions. Our tool is free, has no word limits, and requires no signup — and we intend to keep it that way.</p>
        </div>

        <div style={{ padding: 40, background: C.card, border: `1px solid ${C.border}`, borderRadius: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 16 }}>What We Do</h2>
          <p style={{ fontSize: 15, color: C.textMid, lineHeight: 1.9, margin: "0 0 16px" }}>FreeAIBypass uses advanced language model technology to transform AI-generated text into natural, human-sounding prose. Our system analyzes sentence structure, vocabulary patterns, and linguistic rhythm to produce output that reads authentically and passes the most sophisticated AI detection tools available today.</p>
          <p style={{ fontSize: 15, color: C.textMid, lineHeight: 1.9, margin: 0 }}>We support students working on assignments, essays, research papers, reports, and theses — with separate modes optimized for each document type. File uploads are supported for .docx and .txt formats, and there are no word limits on any submission.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16, marginBottom: 32 }}>
          {[{ value: "2M+", label: "Texts Humanized" }, { value: "98.7%", label: "Bypass Rate" }, { value: "150+", label: "Countries" }, { value: "100%", label: "Free Forever" }].map((s) => (
            <div key={s.label} style={{ textAlign: "center", padding: "24px 16px", background: C.card2, border: `1px solid ${C.border}`, borderRadius: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.purple, letterSpacing: "-1px" }}>{s.value}</div>
              <div style={{ fontSize: 10, color: C.textDim, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: 40, background: C.card, border: `1px solid ${C.border}`, borderRadius: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Our Privacy Commitment</h2>
          <p style={{ fontSize: 15, color: C.textMid, lineHeight: 1.9, margin: 0 }}>We do not store the text you submit. Every humanization request is processed and the input is immediately discarded. We do not sell data, we do not build user profiles, and we do not use your content to train AI models. Your academic work is private — full stop.</p>
        </div>

        <div style={{ padding: 40, background: C.card2, border: `1px solid ${C.border}`, borderRadius: 28, textAlign: "center" }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Get In Touch</h3>
          <p style={{ fontSize: 13, color: C.textMid, marginBottom: 24, lineHeight: 1.7 }}>Have questions, feedback, or partnership inquiries? We would love to hear from you.</p>
          <a href="mailto:venomdesire40@gmail.com" style={{ display: "inline-block", padding: "14px 36px", background: `linear-gradient(135deg, ${C.purple}, ${C.blue})`, color: "#fff", textDecoration: "none", borderRadius: 12, fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em" }}>venomdesire40@gmail.com</a>
        </div>
      </div>

      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <a href="/" style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-2px", color: "#fff", textDecoration: "none" }}>HUMAN<span style={{ color: C.purple }}>LY</span></a>
        <nav style={{ display: "flex", gap: 24 }}>
          {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }].map((link) => (
            <a key={link.label} href={link.href} className="nav-link" style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: C.textDim, textDecoration: "none", transition: "color 0.2s" }}>{link.label}</a>
          ))}
        </nav>
        <p style={{ fontSize: 10, color: C.textDim, margin: 0 }}>© {new Date().getFullYear()} FreeAIBypass. All rights reserved.</p>
      </footer>
    </div>
  );
}