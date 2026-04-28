import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// In-memory store for rate limiting
const requestStore = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  requestStore.forEach((value, key) => {
    if (now > value.resetTime) {
      requestStore.delete(key);
    }
  });
}, 60 * 60 * 1000);

function getClientFingerprint(req: Request): string {
  const headers = req.headers;
  
  // Combine multiple signals to create fingerprint
  const userAgent = headers.get("user-agent") || "";
  const acceptLanguage = headers.get("accept-language") || "";
  const acceptEncoding = headers.get("accept-encoding") || "";
  const accept = headers.get("accept") || "";
  
  // Get IP - check multiple headers for proxies/VPNs
  const forwardedFor = headers.get("x-forwarded-for");
  const realIP = headers.get("x-real-ip");
  const cfConnectingIP = headers.get("cf-connecting-ip");
  
  const ip = cfConnectingIP || realIP || 
    (forwardedFor ? forwardedFor.split(",")[0].trim() : "") || 
    "unknown";

  // Create combined fingerprint from IP + browser signals
  const fingerprintData = `${ip}|${userAgent}|${acceptLanguage}|${acceptEncoding}|${accept}`;
  
  // Simple hash function
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
    // First request or reset time passed
    requestStore.set(fingerprint, {
      count: 1,
      resetTime: now + dayInMs,
    });
    return { allowed: true, remaining: maxRequests - 1, resetIn: dayInMs };
  }

  if (record.count >= maxRequests) {
    const resetIn = record.resetTime - now;
    return { allowed: false, remaining: 0, resetIn };
  }

  record.count += 1;
  requestStore.set(fingerprint, record);
  
  return { 
    allowed: true, 
    remaining: maxRequests - record.count,
    resetIn: record.resetTime - now 
  };
}

function detectBot(req: Request): boolean {
  const userAgent = (req.headers.get("user-agent") || "").toLowerCase();
  
  const botSignatures = [
    "bot", "crawler", "spider", "scraper", "curl", "wget", 
    "python", "java", "go-http", "axios", "postman", "insomnia",
    "httpie", "libwww", "lwp-", "php/"
  ];
  
  return botSignatures.some(sig => userAgent.includes(sig));
}

export async function POST(req: Request) {
  try {
    // Bot detection
    if (detectBot(req)) {
      return NextResponse.json({ 
        output: "Error: Automated requests are not allowed." 
      }, { status: 403 });
    }

    // Get client fingerprint
    const fingerprint = getClientFingerprint(req);

    // Check rate limit
    const rateLimit = checkRateLimit(fingerprint);
    
    if (!rateLimit.allowed) {
      const hoursLeft = Math.ceil(rateLimit.resetIn / (1000 * 60 * 60));
      return NextResponse.json({ 
        output: `Daily limit reached. You have used all 3 free requests for today. Please come back in ${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''}.`
      }, { 
        status: 429,
        headers: {
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": new Date(Date.now() + rateLimit.resetIn).toISOString(),
        }
      });
    }

    const body = await req.json();
    const { prompt, style } = body;

    // Input validation
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ 
        output: "Error: Please provide text to humanize." 
      }, { status: 400 });
    }

    // Character limit - 3000 chars max
    if (prompt.length > 3000) {
      return NextResponse.json({ 
        output: `Error: Text too long. Maximum 3000 characters allowed. Your text has ${prompt.length} characters.`
      }, { status: 400 });
    }

    // Minimum length check
    if (prompt.trim().length < 20) {
      return NextResponse.json({ 
        output: "Error: Text too short. Please provide at least 20 characters." 
      }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        output: "Error: Service configuration issue. Please try again later." 
      }, { status: 500 });
    }

    const client = new Anthropic({ apiKey });

    const finalPrompt = `You are a human university student writing in your own natural voice. Your task is to completely rewrite the given text so that it is 100% undetectable by AI detectors including GPTZero, ZeroGPT, Turnitin, Copyleaks, and Originality.ai.

STRICT REWRITING RULES:

1. SENTENCE STRUCTURE:
- Mix sentence lengths aggressively: one word sentences are fine. So are longer ones that develop an idea over several clauses before eventually reaching their conclusion.
- Never write two sentences of similar length back to back
- Start at least 3 sentences with conjunctions: And, But, So, Yet, Because, Though
- Break grammar rules occasionally like a real student would

2. VOCABULARY:
- NEVER use these words: crucial, essential, delve, leverage, utilize, multifaceted, furthermore, moreover, nevertheless, thus, hence, notably, importantly, significantly, paradigm, foster, facilitate, demonstrate, indicate, subsequently
- Use everyday words instead of formal ones
- Mix formal and informal vocabulary naturally

3. HUMAN PATTERNS:
- Add filler phrases: "to be honest", "the thing is", "what I find interesting is", "if you think about it"
- Show mild uncertainty: "I think", "probably", "I guess", "it seems like", "from what I understand"
- Add one personal observation or opinion naturally
- Use contractions everywhere: it's, don't, isn't, can't, won't, there's, that's

4. RHYTHM AND FLOW:
- One paragraph can be a single short sentence
- Another paragraph can be 4-5 sentences long
- Never have all paragraphs the same length
- Vary how sentences begin — not all with "The" or subject-first
- NEVER write sentences longer than 20 words
- Break every long sentence into 2-3 shorter ones
- Add more incomplete thoughts like "Anyway." or "Moving on." or "That's about it."
- Remove ALL transitional phrases completely
- IMPORTANT: Keep the output length similar to the input. Do NOT add extra content, explanations, or expand the text. Only rewrite what is given.

5. STYLE: ${style || 'assignment'}

TEXT TO REWRITE:
${prompt}

OUTPUT RULES:
- Output ONLY the rewritten text
- No explanations, no notes, no "Here is the rewritten text:"
- Just the pure rewritten content
- Maintain the original meaning and all key information`;

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 2048,
      messages: [{ role: "user", content: finalPrompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    
    return NextResponse.json({ 
      output: text,
      remaining: rateLimit.remaining
    }, {
      headers: {
        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
      }
    });

  } catch (error: any) {
    console.error("Error:", error);
    
    if (error?.status === 429) {
      return NextResponse.json({ 
        output: "Service is busy. Please try again in a moment." 
      }, { status: 429 });
    }
    
    return NextResponse.json({ 
      output: "System Error: " + error.message 
    }, { status: 500 });
  }
}