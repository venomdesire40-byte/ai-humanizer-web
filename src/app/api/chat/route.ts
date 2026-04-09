import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Vercel ke environment variable ko uthany ka tareeka
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ output: "Error: API Key is missing in Vercel Settings" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(
      `Rewrite this text to be 100% human-like, natural, and undetectable: ${prompt}`
    );

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ output: text });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ output: "Error: " + (error.message || "Unknown error") }, { status: 500 });
  }
}