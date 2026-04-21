"use client";

const C = {
  bg: "#07070f", card: "#0e0e1a", card2: "#12121f", border: "#1e1e35",
  purple: "#8b5cf6", purpleLight: "#a78bfa", purpleDim: "rgba(139,92,246,0.12)",
  blue: "#3b82f6", text: "#e2e2f0", textMid: "#8888aa", textDim: "#44445a", green: "#10b981",
};

interface Article {
  tag: string; title: string; time: string; date: string;
  intro: string; sections: { heading: string; content: string }[];
  conclusion: string; related: { title: string; slug: string }[];
}

export default function BlogClient({ article, slug }: { article: Article; slug: string }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "system-ui,-apple-system,sans-serif" }}>
      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .nav-link:hover{color:#fff!important}
        .rel-card:hover{border-color:${C.purple}!important;transform:translateY(-2px)!important}
        .rel-card{transition:all 0.2s ease!important}
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(7,7,15,0.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}`, padding: "0 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="/" style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-2px", color: "#fff", textDecoration: "none" }}>HUMAN<span style={{ color: C.purple }}>LY</span></a>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="/#articles" className="nav-link" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: C.textMid, textDecoration: "none", transition: "color 0.2s" }}>← All Articles</a>
            <a href="/" style={{ padding: "8px 20px", background: C.purple, color: "#fff", borderRadius: 10, fontSize: 11, fontWeight: 700, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.15em" }}>Try Tool Free</a>
          </div>
        </div>
      </nav>

      {/* ARTICLE */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "64px 24px 96px", animation: "fadeIn 0.7s ease forwards" }}>

        {/* Breadcrumb — SEO */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 11, color: C.textDim }}>
          <a href="/" style={{ color: C.textDim, textDecoration: "none" }}>Home</a>
          <span>›</span>
          <a href="/#articles" style={{ color: C.textDim, textDecoration: "none" }}>Articles</a>
          <span>›</span>
          <span style={{ color: C.textMid }}>{article.tag}</span>
        </div>

        {/* Tag + Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span style={{ fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", color: C.purple, background: C.purpleDim, padding: "4px 12px", borderRadius: 6 }}>{article.tag}</span>
          <span style={{ fontSize: 11, color: C.textDim, fontWeight: 600 }}>{article.date}</span>
          <span style={{ width: 3, height: 3, background: C.textDim, borderRadius: "50%" }} />
          <span style={{ fontSize: 11, color: C.textDim, fontWeight: 600 }}>{article.time}</span>
        </div>

        {/* H1 Title */}
        <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.2, marginBottom: 32 }}>{article.title}</h1>

        {/* Divider */}
        <div style={{ height: 2, background: `linear-gradient(90deg, ${C.purple}, transparent)`, marginBottom: 40, borderRadius: 2 }} />

        {/* Intro */}
        <p style={{ fontSize: 17, color: C.text, lineHeight: 1.9, marginBottom: 48, borderLeft: `3px solid ${C.purple}`, paddingLeft: 20 }}>{article.intro}</p>

        {/* H2 Sections */}
        {article.sections.map((section, i) => (
          <div key={i} style={{ marginBottom: 44 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 16, letterSpacing: "-0.5px", lineHeight: 1.3 }}>{section.heading}</h2>
            <p style={{ fontSize: 15, color: C.textMid, lineHeight: 1.9, margin: 0 }}>{section.content}</p>
          </div>
        ))}

        {/* Conclusion */}
        <div style={{ marginTop: 48, padding: 32, background: C.card, border: `1px solid ${C.border}`, borderRadius: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.3em", color: C.purple, marginBottom: 12 }}>Key Takeaway</p>
          <p style={{ fontSize: 15, color: C.text, lineHeight: 1.9, margin: 0 }}>{article.conclusion}</p>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 56, padding: 40, background: C.card2, border: `1px solid ${C.border}`, borderRadius: 24, textAlign: "center" }}>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 12, letterSpacing: "-0.5px" }}>Ready to Humanize Your Text?</h3>
          <p style={{ fontSize: 13, color: C.textMid, marginBottom: 24, lineHeight: 1.7 }}>Use FreeAIBypass to transform AI-generated content into natural, undetectable human writing — completely free. No signup required.</p>
          <a href="/" style={{ display: "inline-block", padding: "16px 40px", background: `linear-gradient(135deg, ${C.purple}, ${C.blue})`, color: "#fff", textDecoration: "none", borderRadius: 14, fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em", boxShadow: "0 0 30px rgba(139,92,246,0.3)" }}>
            Try It Free →
          </a>
        </div>

        {/* Related Articles — Internal Linking */}
        <div style={{ marginTop: 64 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.2em" }}>Related Articles</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {article.related.map((r) => (
              <a key={r.slug} href={`/blog/${r.slug}`} style={{ textDecoration: "none" }}>
                <div className="rel-card" style={{ padding: 20, background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, cursor: "pointer" }}>
                  <p style={{ fontSize: 13, color: C.text, fontWeight: 600, lineHeight: 1.5, margin: "0 0 10px" }}>{r.title}</p>
                  <span style={{ fontSize: 10, color: C.purple, fontWeight: 700 }}>Read More →</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Back */}
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <a href="/#articles" style={{ fontSize: 12, color: C.textMid, textDecoration: "none", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>← Back to All Articles</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <a href="/" style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-2px", color: "#fff", textDecoration: "none" }}>HUMAN<span style={{ color: C.purple }}>LY</span></a>
        <nav style={{ display: "flex", gap: 24 }}>
          {[{ label: "About", href: "/about" }, { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }].map((link) => (
            <a key={link.label} href={link.href} className="nav-link" style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: C.textDim, textDecoration: "none", transition: "color 0.2s" }}>{link.label}</a>
          ))}
        </nav>
        <p style={{ fontSize: 10, color: C.textDim, margin: 0 }}>© 2025 FreeAIBypass. All rights reserved.</p>
      </footer>
    </div>
  );
}