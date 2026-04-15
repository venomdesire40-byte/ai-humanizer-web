import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

    if (!apiToken || !accountId) {
      return NextResponse.json({ output: "Error: API credentials missing." }, { status: 500 });
    }

    const finalPrompt = `Act as an elite Academic Writer. Rewrite the following text to ensure it is 100% human-sounding and natural. Style: ${style || 'assignment'}. Text: ${prompt}`;

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
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