# ✦ AETHER — Malhar Jadhav's Portfolio

### 🔗 Live: **https://portfolio-omega-three-xx33ishfue.vercel.app**

A cosmic-observatory portfolio with a **chat-with-my-AI-twin** dock, a living
constellation hero, and a **sun/moon** day/night theme toggle.

**Stack:** React 18 · Vite · TypeScript · Tailwind CSS · shadcn-style UI ·
Framer Motion · lucide-react.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the build
npm run typecheck  # TS check (no emit)
```

## What's here

| Feature | Where |
|---|---|
| Sun/Moon theme toggle | `src/components/theme-toggle.tsx` |
| Living constellation canvas | `src/components/constellation.tsx` |
| AI twin "Ask Aether" (`⌘K`) | `src/components/ai-twin.tsx` |
| AI brain / knowledge base | `src/lib/ai-brain.ts` |
| All your content & links | `src/lib/data.ts` |
| Sections | `src/components/sections/*` |
| Theme colors & fonts | `src/index.css`, `tailwind.config.js` |

## Next steps (we'll do these together)

1. **Add your real GitHub projects** — edit the `projects` array in
   `src/lib/data.ts` (name, blurb, tags, repo/live link, status). Optionally
   auto-fetch from the GitHub API.
2. **Sync Medium posts** — replace the `writing` array, or pull live from your
   Medium RSS feed.
4. **Deploy** — pushes to `master` auto-build & deploy on Vercel.

## AI twin (Groq)

The "Ask Aether" chat is powered by **Groq** (free tier) via the Edge function
`api/aether.ts`. If the API is unavailable it automatically falls back to the
local rule-based brain in `src/lib/ai-brain.ts`, so the chat always responds.

**Setup:**
1. Create a free key at https://console.groq.com/keys
2. Add it to Vercel: Project → Settings → Environment Variables →
   `GROQ_API_KEY` = your key (or `vercel env add GROQ_API_KEY`).
3. Redeploy. (Optional: set `GROQ_MODEL`, default `llama-3.3-70b-versatile`.)

> Local: `npm run dev` (Vite) does **not** run the Edge function, so the chat
> uses the local fallback brain. To test Groq locally, run `vercel dev` with a
> `.env` containing `GROQ_API_KEY` (copy from `.env.example`).

## Notes
- Theme preference is saved to `localStorage` and respects `prefers-color-scheme`.
- Honors `prefers-reduced-motion` (constellation renders a static frame).
- Fonts: Fraunces (display), Satoshi (body), JetBrains Mono — loaded via CDN.
