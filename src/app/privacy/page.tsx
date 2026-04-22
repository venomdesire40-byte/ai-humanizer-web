import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — FreeAIBypass",
  description: "FreeAIBypass privacy policy. We do not store your text, sell your data, or track your usage. Your privacy is our priority.",
  alternates: { canonical: "https://freeaibypass.com/privacy" },
};

export default function Privacy() {
  const C = {
    bg: "#07070f", card: "#0e0e1a", card2: "#12121f", border: "#1e1e35",
    purple: "#8b5cf6", blue: "#3b82f6", text: "#e2e2f0", textMid: "#8888aa", textDim: "#44445a",
  };

  const sections = [
    { title: "Information We Collect", content: "FreeAIBypass does not require you to create an account or provide any personal information to use our tool. We do not collect your name, email address, or any identifying information during normal use of the humanization tool. The only data we may collect is standard server log data such as IP addresses and browser types, which is collected automatically by our hosting provider for security and performance purposes." },
    { title: "How We Handle Your Text", content: "The text you submit to FreeAIBypass for humanization is processed in real time and is not stored on our servers after processing is complete. We do not retain copies of your input text or output text. We do not use your submitted content to train AI models, improve our algorithms, or for any other purpose beyond generating your requested output. Your academic work remains entirely private." },
    { title: "Cookies and Tracking", content: "FreeAIBypass uses minimal cookies necessary for the basic operation of the website. We do not use tracking cookies, advertising cookies, or third-party analytics cookies that would allow us or third parties to build a profile of your browsing behavior. We do not use Google Analytics or similar services that track individual users across sessions." },
    { title: "Third-Party Services", content: "FreeAIBypass uses third-party infrastructure services to host and operate our platform. These services may have access to server-level data such as request logs as part of providing their infrastructure services. We select infrastructure partners that maintain high standards of data security and privacy. We do not share your submitted text with any third-party services for any purpose." },
    { title: "Data Security", content: "We implement appropriate technical measures to protect the data that passes through our platform. All data transmission between your browser and our servers is encrypted using industry-standard TLS encryption. However, no method of transmission over the internet is completely secure, and we cannot guarantee the absolute security of data in transit." },
    { title: "Children's Privacy", content: "FreeAIBypass is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, please contact us and we will take immediate steps to delete that information." },
    { title: "Changes to This Policy", content: "We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the updated policy on this page with a revised date. Your continued use of FreeAIBypass after any changes constitutes your acceptance of the updated policy." },
    { title: "Contact Us", content: "If you have any questions about this privacy policy or our data practices, please contact us at venomdesire40@gmail.com. We will respond to all privacy-related inquiries within 48 hours." },
  ];

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
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase", color: C.purple, marginBottom: 16 }}>Legal</p>
          <h1 style={{ fontSize: "clamp(32px,6vw,52px)", fontWeight: 900, color: "#fff", letterSpacing: "-2px", lineHeight: 1.1, marginBottom: 20 }}>Privacy Policy</h1>
          <p style={{ fontSize: 13, color: C.textDim, fontWeight: 600 }}>Last updated: {new Date().getFullYear()}</p>
          <div style={{ height: 2, width: 80, background: `linear-gradient(90deg, ${C.purple}, transparent)`, borderRadius: 2, marginTop: 16 }} />
        </div>

        <div style={{ padding: 32, background: "rgba(139,92,246,0.08)", border: `1px solid rgba(139,92,246,0.2)`, borderRadius: 20, marginBottom: 40 }}>
          <p style={{ fontSize: 15, color: C.text, lineHeight: 1.9, margin: 0 }}>
            At FreeAIBypass, your privacy is a core principle — not an afterthought. We built this tool to be genuinely private: no accounts, no data storage, no tracking. This policy explains exactly what we do and do not do with any data that passes through our platform.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {sections.map((s, i) => (
            <div key={i} style={{ padding: 36, background: C.card, border: `1px solid ${C.border}`, borderRadius: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 14, letterSpacing: "-0.3px" }}>{s.title}</h2>
              <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.9, margin: 0 }}>{s.content}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: "center" }}>
          <a href="/" style={{ display: "inline-block", padding: "14px 36px", background: `linear-gradient(135deg, ${C.purple}, ${C.blue})`, color: "#fff", textDecoration: "none", borderRadius: 12, fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.2em" }}>← Back to Tool</a>
        </div>
      </div>

      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <a href="/" style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-2px", color: "#fff", textDecoration: "none" }}>HUMAN<span style={{ color: C.purple }}>LY</span></a>
        <nav style={{ display: "flex", gap: 24 }}>
          {[{ label: "About", href: "/about" }, { label: "Terms", href: "/terms" }].map((link) => (
            <a key={link.label} href={link.href} className="nav-link" style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: C.textDim, textDecoration: "none", transition: "color 0.2s" }}>{link.label}</a>
          ))}
        </nav>
        <p style={{ fontSize: 10, color: C.textDim, margin: 0 }}>© {new Date().getFullYear()} FreeAIBypass. All rights reserved.</p>
      </footer>
    </div>
  );
}