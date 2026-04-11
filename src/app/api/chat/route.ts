import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ output: "Error: API Key missing." }, { status: 500 });
    }

    const finalPrompt = `Act as an elite Academic Writer. Rewrite the following text to ensure it is 100% human-sounding and natural. Style: ${style || 'assignment'}. Text: ${prompt}`;

    // Direct API Call using fetch (No SDK needed)
    // Hum 'v1' stable version use kar rahe hain bajaye v1beta ke
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: finalPrompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Google API Error");
    }

    const text = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ output: text });

  } catch (error: any) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ 
      output: "System Error: " + error.message 
    }, { status: 500 });
  }
}