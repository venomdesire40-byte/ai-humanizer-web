import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const requestStore = new Map<string, { count: number; resetTime: number }>();

setInterval(() => {
  const now = Date.now();
  requestStore.forEach((value, key) => {
    if (now > value.resetTime) requestStore.delete(key);
  });
}, 60 * 60 * 1000);

function getClientFingerprint(req: Request): string {
  const headers = req.headers;
  const userAgent = headers.get("user-agent") || "";
  const acceptLanguage = headers.get("accept-language") || "";
  const acceptEncoding = headers.get("accept-encoding") || "";
  const accept = headers.get("accept") || "";
  const forwardedFor = headers.get("x-forwarded-for");
  const realIP = headers.get("x-real-ip");
  const cfConnectingIP = headers.get("cf-connecting-ip");
  const ip = cfConnectingIP || realIP || (forwardedFor ? forwardedFor.split(",")[0].trim() : "") || "unknown";
  const fingerprintData = `${ip}|${userAgent}|${acceptLanguage}|${acceptEncoding}|${accept}`;
  let hash = 0;
  for (let i = 0; i < fingerprintData.length; i++) {
    const char = fingerprintData.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `${ip}_${Math.abs(hash).toString(36)}`;
}

function checkRateLimit(fingerprint: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const dayInMs = 24 * 60 * 60 * 1000;
  const maxRequests = 3;
  const record = requestStore.get(fingerprint);
  if (!record || now > record.resetTime) {
    requestStore.set(fingerprint, { count: 1, resetTime: now + dayInMs });
    return { allowed: true, remaining: maxRequests - 1, resetIn: dayInMs };
  }
  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }
  record.count += 1;
  requestStore.set(fingerprint, record);
  return { allowed: true, remaining: maxRequests - record.count, resetIn: record.resetTime - now };
}

function detectBot(req: Request): boolean {
  const userAgent = (req.headers.get("user-agent") || "").toLowerCase();
  const botSignatures = ["bot", "crawler", "spider", "scraper", "curl", "wget", "python", "java", "go-http", "axios", "postman", "insomnia", "httpie", "libwww", "lwp-", "php/"];
  return botSignatures.some(sig => userAgent.includes(sig));
}

export async function POST(req: Request) {
  try {
    if (detectBot(req)) {
      return NextResponse.json({ output: "Error: Automated requests are not allowed." }, { status: 403 });
    }

    const fingerprint = getClientFingerprint(req);
    const rateLimit = checkRateLimit(fingerprint);

    if (!rateLimit.allowed) {
      const hoursLeft = Math.ceil(rateLimit.resetIn / (1000 * 60 * 60));
      return NextResponse.json({
        output: `Daily limit reached. You have used all 3 free requests for today. Please come back in ${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''}.`
      }, { status: 429 });
    }

    const body = await req.json();
    const { prompt, style } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ output: "Error: Please provide text to humanize." }, { status: 400 });
    }

    if (prompt.length > 3000) {
      return NextResponse.json({ output: `Error: Text too long. Maximum 3000 characters allowed.` }, { status: 400 });
    }

    if (prompt.trim().length < 20) {
      return NextResponse.json({ output: "Error: Text too short. Please provide at least 20 characters." }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ output: "Error: Service configuration issue." }, { status: 500 });
    }

    const client = new Anthropic({ apiKey });

    const finalPrompt = `You are an expert at rewriting text to bypass AI detectors like GPTZero, ZeroGPT, Turnitin and Copyleaks.

AI detectors measure two things:
1. PERPLEXITY — how predictable each word is
2. BURSTINESS — how much sentence lengths vary

To defeat both:

SENTENCE LENGTH — MOST IMPORTANT:
Mix extremely short and long sentences. Example pattern:
"Short sentence. Another short one. Now a much longer sentence that takes time to build its point, adding detail and context before finally wrapping up the thought completely. Short again. Medium length here."
NEVER write two sentences of similar length back to back.

WORD CHOICE:
Replace these immediately: crucial→really important, essential→needed, delve→look into, leverage→use, utilize→use, multifaceted→complex, furthermore→also, moreover→and, nevertheless→still, thus→so, hence→that's why, notably→interestingly, paradigm→way of thinking, foster→build, facilitate→help, demonstrate→show, indicate→suggest, subsequently→after that, in conclusion→so overall

HUMAN TOUCHES:
- Use contractions: it's, don't, isn't, can't, won't, there's
- Add one casual phrase: "to be honest", "the thing is", "oddly enough", "which makes sense"
- Show mild uncertainty once: "I think", "probably", "seems like"
- Start one sentence with: And, But, So, Yet, Honestly

STYLE: ${style || 'essay'}

TEXT TO REWRITE:
${prompt}

IMPORTANT: Output ONLY the rewritten text. Same length as input. No explanations.`;

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 2048,
      temperature: 1,
      messages: [{ role: "user", content: finalPrompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({
      output: text,
      remaining: rateLimit.remaining
    });

  } catch (error: any) {
    console.error("Error:", error);
    if (error?.status === 429) {
      return NextResponse.json({ output: "Service is busy. Please try again in a moment." }, { status: 429 });
    }
    return NextResponse.json({ output: "System Error: " + error.message }, { status: 500 });
  }
}