import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) return NextResponse.json({ output: "API Key Missing" }, { status: 500 });

    const genAI = new GoogleGenerativeAI(apiKey);
    // AI Studio ke mutabiq exact model name:
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(`Style: ${style}. Text: ${prompt}`);
    const response = await result.response;
    
    return NextResponse.json({ output: response.text() });

  } catch (error: any) {
    return NextResponse.json({ output: "Error: " + error.message }, { status: 500 });
  }
}