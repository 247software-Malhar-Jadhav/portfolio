# 📖 How It Works — AETHER Portfolio (Complete Guide)

A plain-English walkthrough of **everything** in this project: the architecture,
where all the data comes from, how the AI twin chat works, how it deploys, and a
ready-to-use Q&A so you can confidently explain or defend any part of it.

---

## 1. The 30-second summary

> AETHER is a personal portfolio website. It's a **single-page React app** with a
> space-observatory theme. The headline feature is **"Ask Aether"** — an AI chat
> where visitors can ask questions about me and get answers. It runs on **Groq**
> (a free, fast AI provider) in production, with a built-in **offline fallback**
> so the chat never breaks. It has a **day/night theme toggle**, an animated
> star-field hero, and it **auto-deploys to Vercel** every time I push to GitHub.

---

## 2. Tech stack (and why each piece)

| Layer | Tool | Why |
|---|---|---|
| **UI library** | React 18 | Component-based, industry standard |
| **Build tool** | Vite | Instant dev server, fast production builds |
| **Language** | TypeScript | Type safety — catches bugs before runtime |
| **Styling** | Tailwind CSS | Utility-first; fast, consistent styling |
| **Components** | shadcn-style (Radix UI) | Accessible, unstyled primitives I style myself |
| **Animation** | Framer Motion | Smooth, declarative animations |
| **Icons** | lucide-react | Clean, consistent icon set |
| **AI** | Groq API (free tier) | Free, very fast LLM inference |
| **Hosting / CI-CD** | Vercel + GitHub | Auto-build & deploy on every push |

**Fonts:** Newsreader (display headings), Satoshi (body text), JetBrains Mono
(code/labels) — loaded from free font CDNs (Google Fonts + Fontshare).

---

## 3. Project structure (the map)

```
portfolio/
├── api/
│   └── aether.ts          ← AI backend (Vercel Edge function, calls Groq)
├── public/
│   ├── favicon.svg
│   └── Malhar-Jadhav-Resume.pdf   ← résumé served as a static file
├── src/
│   ├── main.tsx           ← app entry point
│   ├── App.tsx            ← assembles all sections in order
│   ├── index.css          ← theme colors (CSS variables) + global styles
│   │
│   ├── lib/
│   │   ├── data.ts        ← ⭐ SINGLE SOURCE OF TRUTH for all my content
│   │   ├── ai-brain.ts    ← local fallback answers + the API-call helper
│   │   └── utils.ts       ← tiny className helper
│   │
│   ├── hooks/
│   │   └── use-theme.tsx  ← dark/light theme state + persistence
│   │
│   └── components/
│       ├── nav.tsx            ← top navigation bar
│       ├── theme-toggle.tsx   ← the sun/moon switch
│       ├── constellation.tsx  ← animated star-field canvas
│       ├── ai-twin.tsx        ← the "Ask Aether" chat dialog
│       ├── reveal.tsx         ← scroll-into-view animation wrapper
│       ├── ui/                ← reusable buttons, dialog, input, badge
│       └── sections/          ← hero, about, skills, work, writing, contact
│
├── tailwind.config.js     ← design tokens (colors, fonts, animations)
├── vercel.json            ← tells Vercel how to build
├── .env.example           ← shows which secret keys are needed
└── package.json           ← dependencies + scripts
```

**Key idea:** all my personal info lives in **one file** — `src/lib/data.ts`.
Name, role, skills, projects, social links, résumé path — everything. Change it
there and it updates everywhere on the site.

---

## 4. Where does the data come from? (Important)

This is the question people ask most. There are **two separate kinds of "data"**:

### A) The site's *content* (what visitors see)
- **Hand-authored** by me in `src/lib/data.ts`. It's a static TypeScript file.
- The **projects** were taken from my GitHub account
  (`github.com/malharjadhav8999`) — I picked 6 of my best repos and
  wrote a one-line description for each.
- The **résumé** is a PDF file I dropped into `public/`.
- ➡️ There is **no database**. The content is baked into the site at build time.

### B) Visitor data (privacy — what I do NOT collect)
- ❌ **No analytics, no tracking, no cookies, no database, no sign-ups.**
- The **only** thing stored on a visitor's device is their theme choice
  (dark/light), saved in their browser's `localStorage`. It never leaves their
  device.
- When someone uses the **chat**, their typed question is sent to **Groq** to
  generate an answer (just like any AI chatbot). I don't log or store those
  questions anywhere myself.

> One-line answer for interviews: *"The site is static — all content is
> hand-written in one data file, sourced from my GitHub and résumé. I don't
> collect any visitor data; the only thing stored locally is the theme setting."*

---

## 5. The theme system (day / night toggle)

**Files:** `src/hooks/use-theme.tsx`, `src/components/theme-toggle.tsx`,
`src/index.css`

How it works:
1. `index.css` defines **two sets of colors as CSS variables** — one under
   `html.dark` (night) and one under `:root`/`.light` (day). E.g.
   `--background`, `--foreground`, `--teal`.
2. Every component styles itself with those variables (`bg-background`, etc.),
   so changing the active set instantly re-skins the whole site.
3. `use-theme.tsx` (a React Context) holds the current theme, adds the `dark` or
   `light` class to the `<html>` element, and saves the choice to `localStorage`
   (key `aether-theme`).
4. **Default is dark.** If a visitor previously chose light, that preference is
   remembered on their next visit.
5. The toggle is a single switch (`role="switch"` for accessibility) — click
   anywhere on it to flip, and the knob slides sun → moon.

---

## 6. The constellation (animated hero background)

**File:** `src/components/constellation.tsx`

- A full-screen HTML `<canvas>`. On load it creates ~100 "stars" (the count
  scales with screen size).
- Each frame (60fps): stars drift slowly, bounce off edges, and the code draws
  faint **teal lines between nearby stars** and **toward the mouse cursor** — so
  the sky appears to "reach" for the visitor.
- The colors switch with the theme.
- **Accessibility:** if the visitor's OS has "reduce motion" enabled, it draws a
  single static frame instead of animating.

---

## 7. ⭐ The AI twin — "Ask Aether" (the main feature)

This is the part to understand deeply, because it's what makes the site unique.

### 7.1 Two brains, one chat

The chat has a **primary brain** and a **fallback brain**:

```
Visitor types a question
        │
        ▼
   Frontend (ai-twin.tsx)
        │
        ├──①──►  POST /api/aether  ──►  Groq AI  ──►  smart answer
        │              (Vercel Edge function)
        │
        └──② if that fails for ANY reason ──►  local brain (ai-brain.ts)
                                                 (keyword-matched answer)
        ▼
   Answer is "typed out" with a typewriter effect
```

- **① Primary — Groq (real AI):** handles open-ended questions, understands
  phrasing, remembers the conversation.
- **② Fallback — local brain:** if Groq is down, the key isn't set, the user is
  offline, or it's running in local dev — the chat still answers using
  pre-written responses matched by keywords. **The chat never shows an error.**

### 7.2 The frontend (`src/components/ai-twin.tsx`)

- Opens with the **⌘K / Ctrl+K** shortcut, the nav button, or the floating orb.
- Shows **suggested questions** as starter chips.
- When you send a question it:
  1. Adds your message + an empty "thinking" bubble (blinking caret).
  2. Calls `fetchAetherAnswer()` (the Groq path), passing the **last 6 messages**
     as conversation history so follow-up questions make sense.
  3. If that throws, it calls `askAether()` (local fallback).
  4. Reveals the answer with a typewriter animation.

### 7.3 The backend (`api/aether.ts`) — how Groq is called securely

This is a **Vercel Edge function** — a small piece of server code that runs in
the cloud, *not* in the visitor's browser. That matters for security.

Step by step when a question arrives:
1. It reads the secret **`GROQ_API_KEY`** from Vercel's environment variables
   (never in the code, never sent to the browser).
2. It builds the request: a **system prompt** (a paragraph of facts about me —
   role, skills, projects, contact, résumé) + the conversation history + the new
   question.
3. It calls Groq's API (`api.groq.com`, OpenAI-compatible format) using the
   model `llama-3.3-70b-versatile`.
4. It returns just the answer text as JSON to the frontend.

If the key is missing or Groq errors, it returns an error code — which is the
signal that makes the frontend fall back to the local brain.

### 7.4 Why a backend function at all? (security)

> **The API key must never be exposed.** If I called Groq directly from the
> browser, anyone could open dev-tools, steal my key, and run up usage on my
> account. The Edge function keeps the key server-side — the browser only ever
> talks to *my* `/api/aether` endpoint, never to Groq directly.

### 7.5 How the AI "knows" about me

It does **not** read my GitHub or résumé live. I wrote a **system prompt** inside
`api/aether.ts` — a paragraph listing my role, skills, the 6 projects, LeetCode
count, contact details, and résumé link. The AI answers *only* from those facts
(it's instructed not to invent things). To update what the AI knows, I edit that
prompt.

### 7.6 Cost

**Free.** Groq has a generous free tier. The fallback brain costs nothing. No
database, no paid services anywhere.

---

## 8. The résumé

- The PDF lives at `public/Malhar-Jadhav-Resume.pdf`, so it's served directly at
  the URL `/Malhar-Jadhav-Resume.pdf`.
- Linked from the **nav button**, the **contact section**, and the AI can share
  the link when asked. It opens in a new browser tab.

---

## 9. Deployment & auto-update (CI/CD)

**Flow:** `GitHub repo → Vercel → live site`

1. The code is on GitHub: `github.com/malharjadhav8999/portfolio`.
2. That repo is **connected to Vercel**.
3. **Every `git push` to the `master` branch** triggers Vercel to automatically
   rebuild and redeploy — no manual steps. (Verified: a push creates a new
   production deployment within ~30 seconds.)
4. Vercel reads `vercel.json` → runs `npm run build` (Vite) → serves the `dist/`
   folder, and deploys the `api/` folder as serverless functions.

**My update workflow:**
```bash
# edit files...
git add -A
git commit -m "message"
git push          # → site updates automatically
```

**Secrets:** the `GROQ_API_KEY` is set in Vercel's dashboard
(Settings → Environment Variables), **not** in the code. The `.env` file is
git-ignored so no key is ever committed.

---

## 10. Local development

```bash
npm install        # one-time
npm run dev        # http://localhost:5173  (live-reloading)
npm run build      # production build into dist/
npm run typecheck  # TypeScript validation
```

> Note: `npm run dev` runs only the frontend (Vite), **not** the Vercel API
> function — so locally the chat uses the **local fallback brain**. The real Groq
> AI works on the live site (or via `vercel dev` with a local `.env`).

---

## 11. Interview / FAQ — answers ready to go

**Q: What is this project?**
A personal portfolio SPA in React + TypeScript, with an AI chatbot ("Ask
Aether") that answers questions about me, a day/night theme, and an animated
star-field. It auto-deploys to Vercel from GitHub.

**Q: Which AI model does it use?**
Groq's `llama-3.3-70b-versatile` (free tier), called through a secure server-side
Edge function. There's also a local keyword-based fallback so the chat always
works.

**Q: How do you keep the API key safe?**
The key lives only in Vercel's environment variables and is used inside a
server-side Edge function. The browser never sees it — it only calls my own
`/api/aether` endpoint.

**Q: Where does the chatbot's knowledge come from?**
A hand-written "system prompt" in the backend listing my real facts (role,
skills, projects, contact). The model answers only from those facts and is told
not to make things up.

**Q: Do you collect any user data?**
No. No analytics, cookies, tracking, or database. The only stored value is the
visitor's theme preference, kept in their own browser's localStorage. Chat
questions are sent to Groq to generate answers (not logged by me).

**Q: What happens if Groq is down or out of quota?**
The frontend catches the failure and instantly falls back to the local
rule-based brain, so the chat keeps responding — no error shown.

**Q: How does it deploy?**
GitHub is connected to Vercel. Every push to `master` auto-builds (Vite) and
redeploys, including the serverless API. ~30s end to end.

**Q: How is the theme implemented?**
Two sets of CSS variables (dark/light) toggled by a class on `<html>`. A React
context manages state and saves the choice to localStorage. Default is dark.

**Q: Why React + Vite + Tailwind?**
React for components, Vite for fast builds/dev, Tailwind for rapid consistent
styling, TypeScript for safety, Framer Motion for animation. All free and
industry-standard.

**Q: How would you scale or extend it?**
Pull projects live from the GitHub API, sync blog posts from Medium's RSS, add
streaming responses to the chat, and (if needed) add rate-limiting to the API
function.

**Q: Is anything paid?**
No — every service (Vercel hosting, GitHub, Groq AI, the fonts) is on a free
tier.

---

## 12. How to make common changes

| I want to… | Edit this |
|---|---|
| Change my bio / role / contact | `src/lib/data.ts` (the `profile` object) |
| Add / edit a project | `src/lib/data.ts` (the `projects` array) |
| Update social links | `src/lib/data.ts` (the `socials` array) |
| Change what the AI knows | `api/aether.ts` (the `SYSTEM_PROMPT`) |
| Add a local fallback answer | `src/lib/ai-brain.ts` (the `knowledge` array) |
| Change theme colors | `src/index.css` (the CSS variables) |
| Swap the résumé | replace `public/Malhar-Jadhav-Resume.pdf` |
| Change the AI model | set `GROQ_MODEL` env var in Vercel |
