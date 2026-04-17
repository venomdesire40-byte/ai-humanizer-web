import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();
    
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

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

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: finalPrompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    return NextResponse.json({ output: text });

  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ 
      output: "System Error: " + error.message 
    }, { status: 500 });
  }
}