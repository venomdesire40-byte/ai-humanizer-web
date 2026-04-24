import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: Request) {
try {
const { prompt, style } = await req.json();

const client = new Anthropic({
apiKey: process.env.ANTHROPIC_API_KEY,
});

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
model: "claude-haiku-4-5-20251001",
max_tokens: 2048,
messages: [{ role: "user", content: finalPrompt }],
});

const text = message.content[0].type === "text" ? message.content[0].text : "";
return NextResponse.json({ output: text });

} catch (error: any) {
console.error("Error:", error);
return NextResponse.json({
output: "System Error: " + error.message
}, { status: 500 });
}
}