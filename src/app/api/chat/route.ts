import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// .env.local se key uthany ke liye
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(
      `Rewrite this text to be 100% human-like, natural, and undetectable by AI detectors: ${prompt}`
    );
    
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ output: text });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "API connection failed" }, { status: 500 });
  }
}