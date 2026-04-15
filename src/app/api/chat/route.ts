import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

    if (!apiToken || !accountId) {
      return NextResponse.json({ output: "Error: API credentials missing." }, { status: 500 });
    }

    const finalPrompt = `You are a human student writing in a natural, conversational academic style. 

Rewrite the following text with these rules:
- Use varied sentence lengths (mix short and long sentences)
- Add natural transitions like "Moreover", "However", "In fact"
- Use contractions occasionally (it's, don't, isn't)
- Avoid robotic or repetitive sentence structures
- Add slight imperfections like a human would write
- Use simple vocabulary where possible
- Do NOT sound like an AI assistant
- Write in first or third person naturally
- Style: ${style || 'assignment'}

Text to rewrite: ${prompt}

Important: Output ONLY the rewritten text, nothing else.`;

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/mistral/mistral-7b-instruct-v0.1`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
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