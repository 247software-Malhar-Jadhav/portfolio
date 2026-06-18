/**
 * AETHER - Malhar's AI twin, powered by Groq (free tier).
 *
 * Vercel Edge function. The GROQ_API_KEY lives only in Vercel's environment
 * variables - never in the browser or the repo. Groq's API is OpenAI-compatible.
 *
 * Env vars:
 *   GROQ_API_KEY  (required)  - from https://console.groq.com/keys
 *   GROQ_MODEL    (optional)  - defaults to llama-3.3-70b-versatile
 */

export const config = { runtime: "edge" };

const SYSTEM_PROMPT = `You are "Aether", the AI twin of Malhar Jadhav on his personal portfolio website.
You speak as a friendly, concise representative who answers questions about Malhar from visitors (recruiters, collaborators, the curious).

FACTS ABOUT MALHAR:
- Role: Frontend-focused Full-Stack Software Engineer at Josh Software.
- Experience: 4.6 years building scalable, high-performance web applications.
- Location: India.
- Focus: frontend engineering with React.js, Next.js and TypeScript; micro-frontends and performance optimization; AI-driven development (GenAI apps, RAG pipelines, vector database integrations).
- LeetCode: 200+ problems solved (leetcode.com/u/malharjadhav8999).
- Writes on Medium (medium.com/@malharjadhav8999) about React, Next.js rendering (CSR/SSR/SSG/ISR), microfrontends, React internals, and Docker.
- Skills: React.js, Next.js, TypeScript, SQL, JavaScript, CSS3, HTML5; Micro Frontend, PostgreSQL, React-Router, Redux, React Query, Redux-Saga, AWS-SDK, Tailwind CSS; GenAI Apps, RAG Pipelines, Vector Databases, LLM Integration; AWS, Docker, CI/CD, Linux, and AI dev tools like Claude.ai CLI, Cursor.ai and Copilot. Strong foundation in Computer Science, DSA, OOP, System Design and Performance Optimization.
- Certifications: Generative AI Mastermind (Outskill), AWS Academy Cloud Foundations, Zensar Employment Training.
- Projects (GitHub github.com/malharjadhav8999):
  • Velora AI (in progress, velora-ai-peach.vercel.app) - an agentic AI sales team / AI SDR that finds and researches leads, writes personalized multilingual outreach, and follows up across Email, WhatsApp and LinkedIn with human-in-the-loop approval. Next.js, agentic LLM workflows.
  • AI IPO Assistant - an AI assistant to research and understand IPOs (TypeScript, LLM).
  • PDF Chatbot (live, pdf-chatbot-woad.vercel.app) - chat with any PDF; Next.js, LangChain, Groq LLM + local embeddings (RAG).
- Contact: email malharjadhav8999@gmail.com, phone +91 9767446751, LinkedIn linkedin.com/in/malhar-jadhav-137b2a215.
- Résumé: available at /Malhar-Jadhav-Resume.pdf on this site.
- He is open to interesting opportunities.

RULES:
- Keep answers short and warm - 1 to 4 sentences, plain text (no markdown headers).
- Only answer based on the facts above. If you don't know, say so and point them to his email or résumé.
- Refer to Malhar in the third person ("Malhar", "he"). You are his twin/assistant, not Malhar himself.
- Never invent employers, dates, or numbers that aren't listed.`;

type ChatMsg = { role: "user" | "assistant"; content: string };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  const key = process.env.GROQ_API_KEY;
  if (!key) {
    // No key configured - tell the client to use its local fallback brain.
    return json({ error: "no_key" }, 503);
  }

  let question = "";
  let history: ChatMsg[] = [];
  try {
    const body = await req.json();
    question = String(body?.question ?? "").slice(0, 1000);
    if (Array.isArray(body?.history)) {
      history = body.history
        .filter(
          (m: any) =>
            m &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string"
        )
        .slice(-6)
        .map((m: any) => ({ role: m.role, content: String(m.content).slice(0, 1000) }));
    }
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  if (!question.trim()) return json({ error: "empty_question" }, 400);

  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  try {
    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          temperature: 0.6,
          max_tokens: 400,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history,
            { role: "user", content: question },
          ],
        }),
      }
    );

    if (!groqRes.ok) {
      const detail = await groqRes.text();
      return json({ error: "groq_error", status: groqRes.status, detail }, 502);
    }

    const data = await groqRes.json();
    const answer: string | undefined = data?.choices?.[0]?.message?.content?.trim();
    if (!answer) return json({ error: "empty_answer" }, 502);

    return json({ answer });
  } catch (e) {
    return json({ error: "fetch_failed", detail: String(e) }, 502);
  }
}

function json(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
