import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

    if (!apiToken || !accountId) {
      return NextResponse.json({ output: "Error: API credentials missing." }, { status: 500 });
    }

    const finalPrompt = `You are a human writer. Your job is to rewrite the given text so that it passes ALL AI detection tools like ZeroGPT, GPTZero, Turnitin, and Copyleaks.

Follow these rules STRICTLY:
- Write exactly like a real human being writes
- Use VERY different sentence structures throughout — no patterns
- Mix short, medium, and long sentences randomly
- Start some sentences with "And", "But", "So", "Yet", "Still"
- Use casual transitions like "On top of that", "Thing is", "What's more", "At the end of the day"
- Add personal opinions occasionally like "I think", "In my view", "Personally"
- Use simple everyday words — avoid fancy or complex vocabulary
- Add slight grammar imperfections naturally — like a real person would
- Never repeat the same sentence structure twice in a row
- Vary paragraph lengths — some short, some long
- Do NOT use bullet points or lists
- Do NOT sound robotic, formal, or AI-generated
- Do NOT use words like "crucial", "essential", "innovative", "leverage", "utilize"
- Make it flow naturally like someone is actually thinking and writing
- Style: ${style || 'assignment'}

Text to rewrite: ${prompt}

IMPORTANT: Output ONLY the rewritten text. No explanations, no notes, nothing else.`;

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.3-70b-instruct-fp8-fast`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a human writer who rewrites text to bypass AI detectors. You never reveal you are an AI." },
            { role: "user", content: finalPrompt }
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Cloudflare API Error");
    }

    const text = data.result.response;
    return NextResponse.json({ output: text });

  } catch (error: any) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ 
      output: "System Error: " + error.message 
    }, { status: 500 });
  }
}