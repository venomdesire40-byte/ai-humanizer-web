import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ output: "Error: API Key missing." }, { status: 500 });
    }

    const finalPrompt = `Act as an elite Academic Writer. Rewrite the following text to ensure it is 100% human-sounding and natural. Style: ${style || 'assignment'}. Text: ${prompt}`;

    // GEMINI-PRO use karein, ye flash se zyada stable hai regions mein
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
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
      // Agar ab bhi error aaye to detail dikhaye
      throw new Error(data.error?.message || "Google API Error");
    }

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response from AI. Try different text.");
    }

    const text = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ output: text });

  } catch (error: any) {
    console.error("Final Attempt Error:", error);
    return NextResponse.json({ 
      output: "System Error: " + error.message 
    }, { status: 500 });
  }
}