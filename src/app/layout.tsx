import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreeAIBypass — Free AI Humanizer & AI Detector Bypass Tool",
  description: "Transform AI-generated text into natural, undetectable human writing. Bypass GPTZero, Turnitin, ZeroGPT, Copyleaks and more — instantly and for free. No signup required.",
  keywords: "AI humanizer, bypass AI detector, free AI humanizer, GPTZero bypass, Turnitin bypass, ZeroGPT bypass, humanize AI text, AI to human text, undetectable AI, AI text converter, free AI humanizer no word limit, bypass zerogpt free, humanize chatgpt text for assignment, AI humanizer for college students free, bypass turnitin AI detection, free ai humanizer uk, free ai humanizer us college essays, undetectable AI text free, does turnitin detect chatgpt, free humanize AI text online",
  authors: [{ name: "FreeAIBypass" }],
  creator: "FreeAIBypass",
  publisher: "FreeAIBypass",
  robots: "index, follow",
  openGraph: {
    title: "FreeAIBypass — Free AI Humanizer Tool",
    description: "Transform AI-generated text into natural, undetectable human writing. Bypass GPTZero, Turnitin and more — free.",
    url: "https://freeaibypass.com",
    siteName: "FreeAIBypass",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeAIBypass — Free AI Humanizer Tool",
    description: "Transform AI-generated text into natural, undetectable human writing. Bypass GPTZero, Turnitin and more — free.",
  },
  alternates: {
    canonical: "https://freeaibypass.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0, background: "#07070f" }}>
        {children}
      </body>
    </html>
  );
}