import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ output: "Error: API Key missing." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
   // Isay simple 'gemini-1.5-flash' kar dein, bina '-latest' ke
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const finalPrompt = `Act as an elite Academic Writer. Rewrite the following text to ensure it is 100% human-sounding and natural. Style: ${style || 'assignment'}. Text: ${prompt}`;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ output: text });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ output: "System Error: " + error.message }, { status: 500 });
  }
}