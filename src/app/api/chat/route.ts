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
    
    // Yahan hum bilkul standard name use kar rahe hain
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
    });

    const finalPrompt = `Act as an academic writer. Humanize this: ${prompt}`;

    // Error yahan aa raha hai, is liye hum ne try-catch ko mazeed detail di hai
    const result = await model.generateContent(finalPrompt);
    const text = result.response.text();

    return NextResponse.json({ output: text });

  } catch (error: any) {
    console.error("Detailed Error:", error);
    return NextResponse.json({ 
      output: "System Error: " + error.message 
    }, { status: 500 });
  }
}