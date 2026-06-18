# 🎨 Make This Portfolio Your Own — Customization Guide

This site is built so you can rebrand it with **your** details by editing just a
few files. No deep coding needed — mostly you're changing text inside one file.

> **Golden rule:** Almost everything you'll want to change lives in
> **`src/lib/data.ts`**. Open that file first.

---

## 0. Before you start (one-time setup)

You need [Node.js](https://nodejs.org) installed (version 18+).

```bash
# 1. Get the code
git clone <the-repo-url>
cd portfolio

# 2. Install dependencies (one time)
npm install

# 3. Run it locally — opens at http://localhost:5173
npm run dev
```

Leave `npm run dev` running. Every time you save a file, the browser updates
automatically. When you're happy, see **Section 8** to put it online.

**Tip:** any line starting with `//` is a "comment" — it's turned off/ignored.
To hide something, add `//` in front; to show it, remove the `//`.

---

## 1. Your name, role, bio & contact details

📄 **File:** `src/lib/data.ts` → the `profile` object at the top.

```ts
export const profile = {
  name: "Malhar Jadhav",          // ← your full name
  initials: "MJ",                 // ← shows in the top-left logo
  role: "Software Engineer",      // ← your job title
  company: "247software",         // ← your company (used in the About section)
  location: "India",              // ← your location
  tagline: "I build intelligent systems.",   // ← the big italic line
  blurb: "Software engineer who likes...",    // ← the longer intro paragraph
  email: "malharjadhav8999@gmail.com",        // ← your email
  phone: "+91 9767446751",                    // ← your phone
  resumeUrl: "/Your-Resume.pdf",              // ← see Section 5
};
```

Just change the text inside the quotes. Save, and it updates everywhere.

---

## 2. Social links (GitHub, LinkedIn, etc.)

📄 **File:** `src/lib/data.ts` → the `socials` array.

Each link looks like this:

```ts
{
  label: "GitHub",                                   // ← name shown
  handle: "your-username",                           // ← small text under it
  href: "https://github.com/your-username",          // ← where it links to
  icon: Github,                                       // ← the icon (see note)
},
```

- Change `handle` and `href` to your own profiles.
- **To remove a link** (e.g. you don't have Medium): delete its block, or put
  `//` in front of each line.
- **Icons:** the available icons are imported at the very top of the file
  (`Github, Linkedin, Mail, Phone, PenLine, Code2`). To use a different one,
  browse [lucide.dev/icons](https://lucide.dev/icons), then add its name to that
  import line at the top.

---

## 3. The stat numbers (under the hero)

📄 **File:** `src/lib/data.ts` → the `stats` array.

```ts
export const stats = [
  { value: "200+", label: "LeetCode solved" },
  { value: "Open", label: "to opportunities" },
  { value: "Active", label: "Medium writer" },
];
```

Change `value` (the big text) and `label` (the small text). Add or remove blocks
as you like.

---

## 4. Skills

📄 **File:** `src/lib/data.ts` → the `skillGroups` array.

```ts
export const skillGroups = [
  { title: "Languages", items: ["Java", "Python", "JavaScript"] },
  { title: "Frontend",  items: ["React", "Tailwind CSS"] },
  // ...add or edit groups here
];
```

- `title` = the category heading.
- `items` = the skill chips (comma-separated, each in quotes).
- Add a new category by copying a line and changing the values.

---

## 5. Projects (the "Selected Work" section)

📄 **File:** `src/lib/data.ts` → the `projects` array.

Each project card:

```ts
{
  name: "AI IPO Assistant",                  // ← project title
  blurb: "An AI assistant that helps...",    // ← one or two line description
  tags: ["TypeScript", "AI", "LLM"],         // ← the small tag chips
  href: `${GH}/ai-ipo-assistant`,            // ← link (see note below)
  status: "wip",                             // ← "live" | "wip" | "repo"
},
```

**`status` controls the little label & color:**
| value | shows as |
|---|---|
| `"live"` | ● Live (teal) — for deployed projects |
| `"wip"` | ◐ In progress (amber) |
| `"repo"` | ○ Repo (grey) — code only |

**About `href` and `${GH}`:** there's a shortcut near the top of the projects:
```ts
const GH = "https://github.com/malharjadhav8999";
```
Change that to your GitHub URL once, and every `${GH}/repo-name` link updates.
Or just write the full URL directly: `href: "https://github.com/you/project"`.

**To show/hide projects:**
- **Hide** one: put `//` in front of each of its lines (we did this for 4 extra
  projects already — they're sitting commented-out, ready to restore).
- **Show** a hidden one: remove the `//` from its lines.
- **Add** a new one: copy an existing `{ ... },` block and edit it.

---

## 6. Your résumé (the PDF)

1. Put your PDF in the **`public/`** folder (e.g. `public/Jane-Doe-Resume.pdf`).
2. In `src/lib/data.ts`, set `resumeUrl` to match, with a leading slash:
   ```ts
   resumeUrl: "/Jane-Doe-Resume.pdf",
   ```
3. Delete the old `public/Malhar-Jadhav-Resume.pdf`.

The Résumé buttons (nav + contact) and the AI will use the new file
automatically.

---

## 7. Blog posts / writing

📄 **File:** `src/lib/data.ts` → the `writing` array.

```ts
export const writing = [
  {
    title: "My article title",
    excerpt: "A one-line summary of the post.",
    href: "https://medium.com/@you/the-post",
    date: "Jun 2026",
  },
];
```

Edit, add, or remove entries. To hide the whole section, see Section 10.

---

## 8. Theme colors & fonts (optional)

📄 **File:** `src/index.css` → the `:root` (day) and `html.dark` (night) blocks.

Colors are defined as variables you can change in one place:

```css
html.dark {
  --background: #07070d;   /* page background (night) */
  --foreground: #e8e6f0;   /* main text color */
  --teal:       #2dd4bf;   /* main accent color */
  --amber:      #f5b14c;   /* secondary accent */
  /* ...more... */
}
```

Change the hex codes (`#07070d` etc.) to recolor the whole site. The `:root`
block is the light/day version.

**Fonts** are set in `tailwind.config.js` under `fontFamily`, and loaded at the
top of `src/index.css`. To swap a font, change the import URL there and the name
in the config.

**Default theme:** to make the site open in *light* mode by default, edit
`src/hooks/use-theme.tsx` and change the last line of `getInitialTheme` from
`return "dark";` to `return "light";`.

---

## 9. The AI chatbot ("Ask Aether")

The chatbot answers questions about you. It has **two layers** — update both so
they tell *your* story:

### a) The smart AI answers (Groq)
📄 **File:** `api/aether.ts` → the `SYSTEM_PROMPT` text.

This is a paragraph of facts the AI is allowed to use. Replace the facts about
Malhar with **your** facts (role, skills, projects, contact). Keep the RULES
section as-is.

To turn the real AI on, you need a **free Groq key**:
1. Get one at [console.groq.com/keys](https://console.groq.com/keys).
2. In Vercel: your project → **Settings → Environment Variables** → add
   `GROQ_API_KEY` = your key. Redeploy.

### b) The offline fallback answers
📄 **File:** `src/lib/ai-brain.ts` → the `knowledge` array.

These are pre-written answers used when the AI is unavailable (or in local dev).
Each entry matches keywords to a reply:

```ts
{ match: /(skill|stack|tech)/i, answer: "Your answer here..." },
```

Most answers here pull from `data.ts` automatically, so updating `data.ts`
covers a lot. Edit the `answer` text to match your voice.

You can also change the **suggested question chips** in the same file
(`suggestedQuestions` array).

> If you don't set up Groq, the chat still works — it just uses these fallback
> answers. That's totally fine.

---

## 10. Hiding a whole section (optional)

📄 **File:** `src/App.tsx`

You'll see the page assembled like this:

```tsx
<Hero />
<About />
<Skills />
<Work />
<Writing />
<Contact />
```

To hide a section, comment it out (and its matching nav link in
`src/components/nav.tsx` → the `links` array):

```tsx
{/* <Writing /> */}
```

---

## 11. Putting it online (deploy)

The easiest free host is **[Vercel](https://vercel.com)**:

1. Push your code to a GitHub repo.
2. On Vercel: **Add New → Project → Import** your GitHub repo.
3. Vercel auto-detects the settings (Vite) — just click **Deploy**.
4. Add your `GROQ_API_KEY` in Settings → Environment Variables (for the chat).

**After that, every `git push` auto-rebuilds and updates your live site.** Your
workflow becomes:

```bash
git add -A
git commit -m "update my details"
git push          # → site updates in ~30 seconds
```

---

## 12. Quick reference — "I want to change X"

| I want to change… | Open this file | Look for |
|---|---|---|
| Name, title, bio, contact | `src/lib/data.ts` | `profile` |
| Social links | `src/lib/data.ts` | `socials` |
| Stat numbers | `src/lib/data.ts` | `stats` |
| Skills | `src/lib/data.ts` | `skillGroups` |
| Projects (show/hide/add) | `src/lib/data.ts` | `projects` |
| Blog posts | `src/lib/data.ts` | `writing` |
| Résumé PDF | `public/` folder + `data.ts` | `resumeUrl` |
| Colors | `src/index.css` | `:root` / `html.dark` |
| Fonts | `tailwind.config.js` + `index.css` | `fontFamily` |
| Default light/dark | `src/hooks/use-theme.tsx` | `getInitialTheme` |
| What the AI knows | `api/aether.ts` | `SYSTEM_PROMPT` |
| Offline AI answers | `src/lib/ai-brain.ts` | `knowledge` |
| Show/hide a section | `src/App.tsx` + `nav.tsx` | the section tags |

---

## 13. Common mistakes to avoid

- ⚠️ **Keep the quotes and commas.** Text must stay inside `"quotes"`, and each
  item usually ends with a comma `,`. If the site breaks, you probably removed
  one — the error message will point to the line.
- ⚠️ **Don't commit your API key.** Put `GROQ_API_KEY` only in Vercel's settings,
  never in the code. (The `.env` file is already ignored by git.)
- ⚠️ **Image/PDF paths start with `/`** and the file must be in `public/`.
- ✅ **When in doubt, just edit `data.ts`** — it's safe and covers 90% of changes.

That's it — change the text, save, push. Enjoy your portfolio! ✦
