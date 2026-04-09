import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();

    // Vercel Environment Variable
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { output: "Error: API Key missing in Vercel Settings." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Using 'gemini-pro' as it is the most widely supported name across SDK versions
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const finalPrompt = `Act as an elite Academic Writer. Rewrite the following text to ensure it is 100% human-sounding, natural, and bypasses AI detectors like Turnitin and GPTZero. Use a ${style || 'academic'} style. 
    
    Text: ${prompt}`;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ output: text });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Detailed error handling to see what's actually happening
    return NextResponse.json(
      { output: "System Error: " + (error.message || "Please check API key and connection.") },
      { status: 500 }
    );
  }
}