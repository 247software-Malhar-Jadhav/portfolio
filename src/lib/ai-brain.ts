import { profile, skillGroups, projects } from "./data";

/**
 * AETHER - Malhar's AI twin (local brain).
 *
 * Right now this answers from a hand-written knowledge base so the site works
 * with zero backend. To make it a *real* LLM, replace `askAether` with a call
 * to your API route (see `askAetherViaAPI` below) - the UI already streams
 * token-by-token, so nothing else needs to change.
 */

const knowledge: { match: RegExp; answer: string }[] = [
  {
    match: /\b(hi|hello|hey|yo|sup|greetings)\b/i,
    answer:
      "Hey! I'm Aether - Malhar's AI twin. Ask me about his skills, projects, experience, or how to get in touch.",
  },
  {
    match: /(who are you|what are you|aether)/i,
    answer:
      "I'm Aether, an AI version of Malhar Jadhav. Think of me as his portfolio you can actually talk to. Ask away.",
  },
  {
    match: /(who is|about|tell me about|bio|background|yourself)/i,
    answer: `${profile.name} is a ${profile.role}${
      profile.company ? ` at ${profile.company}` : ""
    }. ${profile.blurb}`,
  },
  {
    match: /(skill|stack|tech|language|tools|know|good at|expertise)/i,
    answer:
      "His toolkit spans the stack:\n" +
      skillGroups
        .map((g) => `• ${g.title}: ${g.items.join(", ")}`)
        .join("\n") +
      "\nStrongest areas: frontend with React.js/Next.js/TypeScript, micro-frontends & performance, and AI-driven development (GenAI, RAG, vector DBs).",
  },
  {
    match: /(strong|best|strength|specialty|specialise|specialize)/i,
    answer:
      "His strongest areas are frontend engineering (React.js, Next.js, TypeScript), micro-frontends and performance optimization, plus AI-driven development - GenAI apps, RAG pipelines and vector databases. 4.6 years in, with 200+ LeetCode solved.",
  },
  {
    match: /(project|work|built|build|portfolio|repo|github)/i,
    answer:
      "A few things he's worked on:\n" +
      projects.map((p) => `• ${p.name} - ${p.blurb}`).join("\n") +
      `\nMore on GitHub: github.com/malharjadhav8999`,
  },
  {
    match: /(leetcode|dsa|algorithm|competitive|problem)/i,
    answer:
      "Malhar has solved 200+ problems on LeetCode and treats DSA as a craft. Profile: leetcode.com/u/malharjadhav8999",
  },
  {
    match: /(blog|medium|write|article|writing)/i,
    answer:
      "He writes on Medium about engineering and problem-solving: medium.com/@malharjadhav8999",
  },
  {
    match: /(resume|cv|curriculum)/i,
    answer: `You can view Malhar's résumé here: ${profile.resumeUrl} (opens the PDF). Prefer to reach out directly? Email ${profile.email}.`,
  },
  {
    match: /(contact|reach|email|hire|available|opportunit|job|connect|touch)/i,
    answer: `Easiest ways to reach him:\n• Email: ${profile.email}\n• Phone: ${profile.phone}\n• LinkedIn: linkedin.com/in/malhar-jadhav-137b2a215\n• Résumé: ${profile.resumeUrl}\nHe's open to interesting opportunities.`,
  },
  {
    match: /(experience|company|josh|247|job|role|work at|years)/i,
    answer: `He currently works as a ${profile.role} at ${profile.company}, with 4.6 years building scalable, high-performance web applications.`,
  },
  {
    match: /(ai|ml|machine learning|llm|model|genai|rag|vector)/i,
    answer:
      "Malhar is active in AI-driven development - building GenAI-powered apps, RAG pipelines and vector database integrations. This very portfolio ships an AI twin (me!), and he's comfortable wiring LLMs into real products.",
  },
  {
    match: /(thank|thanks|cool|nice|awesome|great)/i,
    answer:
      "Anytime! If you're a recruiter or collaborator, the fastest path is his email: " +
      profile.email,
  },
];

const fallbacks = [
  `I don't have a canned answer for that yet - but here's the gist: ${profile.name} is a ${profile.role} into backend, algorithms, and AI. Try asking about his skills, projects, or how to reach him.`,
  `Good question - I'd point you to his work directly. Reach Malhar at ${profile.email}, or ask me about his stack or projects.`,
];

export const suggestedQuestions = [
  "What is Malhar's strongest skill?",
  "Show me his projects",
  "What's his tech stack?",
  "Can I see his résumé?",
  "How do I get in touch?",
];

/** Local, offline brain. Returns the full answer text. */
export function askAether(question: string): string {
  const q = question.trim();
  if (!q) return "Ask me anything about Malhar - skills, projects, or contact.";
  for (const entry of knowledge) {
    if (entry.match.test(q)) return entry.answer;
  }
  // deterministic-ish fallback so SSR/tests stay stable
  return fallbacks[q.length % fallbacks.length];
}

export type ChatTurn = { role: "user" | "assistant"; content: string };

/**
 * Real LLM answer via the Groq-backed /api/aether Edge function.
 * Throws on any failure so the caller can fall back to the local brain
 * (e.g. during `npm run dev`, which doesn't run Vercel functions, or if the
 * GROQ_API_KEY isn't set yet).
 */
export async function fetchAetherAnswer(
  question: string,
  history: ChatTurn[] = []
): Promise<string> {
  const res = await fetch("/api/aether", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, history }),
  });
  if (!res.ok) throw new Error(`api_${res.status}`);
  const data = (await res.json()) as { answer?: string };
  if (!data.answer) throw new Error("empty_answer");
  return data.answer;
}

/**
 * Architecture: the chat first tries `fetchAetherAnswer` (Groq via /api/aether).
 * On any failure it falls back to `askAether` (the local brain above), so the
 * site always responds - even offline, in `npm run dev`, or before the API key
 * is configured. The Groq prompt lives in `api/aether.ts`.
 */
