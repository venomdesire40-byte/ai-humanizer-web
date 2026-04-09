import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();

    // Vercel Environment Variable se key uthana
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { output: "Error: API Key missing in Vercel Settings." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // MODIFIED: Updated to gemini-1.5-flash (More stable and supports latest API)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Custom prompt based on the task type (Assignment, Essay, etc.)
    const finalPrompt = `Act as an elite Academic Writer. Rewrite the following text to ensure it is 100% human-sounding, natural, and bypasses AI detectors like Turnitin and GPTZero. Use a ${style || 'academic'} tone. 
    
    Text: ${prompt}`;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ output: text });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Detailed error message for debugging
    let errorMessage = "System Error: Please try again.";
    if (error.message.includes("404")) {
      errorMessage = "Error: Model not found. Check if gemini-1.5-flash is available.";
    } else if (error.message.includes("API key")) {
      errorMessage = "Error: Invalid API Key.";
    }

    return NextResponse.json(
      { output: errorMessage },
      { status: 500 }
    );
  }
}