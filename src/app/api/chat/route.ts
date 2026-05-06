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

    // PASS 1 — Deep restructuring
    const pass1 = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 2048,
      temperature: 1,
      messages: [{
        role: "user",
        content: `You are rewriting text to make it completely undetectable by AI detectors.

WHAT AI DETECTORS LOOK FOR — AND HOW TO DEFEAT EACH:

1. PERPLEXITY (word predictability):
- Use unexpected word choices that a human would naturally pick
- Replace obvious words with less predictable synonyms
- Add idiomatic expressions specific to the topic
- Include domain-specific informal terms

2. BURSTINESS (sentence length variation):
- Create EXTREME variation: 3-word sentences next to 35-word sentences
- Pattern: short. medium length. VERY LONG sentence that develops multiple connected ideas before reaching its natural conclusion. Short again. Medium.
- Never three sentences of similar length in a row

3. HUMAN FINGERPRINTS:
- One factual tangent that feels like a genuine thought
- One mild contradiction or nuance: "though of course", "that said", "with some exceptions"
- One casual observation mid-paragraph
- Contractions throughout: it's don't isn't can't won't

4. VOCABULARY — REPLACE ALL OF THESE:
crucial→really important, essential→needed, delve→look into, leverage→use, utilize→use, multifaceted→complex, furthermore→also, moreover→and, nevertheless→still, thus→so, hence→that's why, notably→interestingly, paradigm→model, foster→build, facilitate→help, demonstrate→show, indicate→suggest, subsequently→after that, it is worth noting→worth mentioning, in conclusion→so overall, to summarize→in short

STYLE: ${style || 'essay'}

TEXT TO REWRITE:
${prompt}

Output the rewritten text only. No intro. No explanation.`
      }]
    });

    const pass1Text = pass1.content[0].type === "text" ? pass1.content[0].text : prompt;

    // PASS 2 — Final polish
    const pass2 = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 2048,
      temperature: 1,
      messages: [{
        role: "user",
        content: `Read this text and make final adjustments so it reads like a real person wrote it:

1. Find any remaining formal or AI-sounding phrases and replace with natural alternatives
2. Make sure no two consecutive sentences are the same length
3. Add one subtle personal touch — a brief reaction like "which makes sense" or "oddly enough" or "to be fair"
4. Check contractions are used throughout
5. Remove any remaining transitional phrases like "furthermore" "moreover" "in conclusion"
6. Make the opening sentence unexpected — not starting with "The" or a subject noun

TEXT:
${pass1Text}

Output the final text only. Nothing else.`
      }]
    });

    const finalText = pass2.content[0].type === "text" ? pass2.content[0].text : pass1Text;

    return NextResponse.json({
      output: finalText,
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