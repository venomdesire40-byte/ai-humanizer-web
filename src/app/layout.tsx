import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Path ko absolute banane ki koshish (Agar @/app folder structure hai)
import "@/app/globals.css"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Humanly AI",
  description: "Stealth Academic Writer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}