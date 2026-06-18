import { Reveal, SectionHeading } from "../reveal";
import { profile } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-28">
      <SectionHeading
        eyebrow="01 - The Observer"
        title="A bit about me"
      />

      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              I'm <span className="text-foreground">{profile.name}</span>, a{" "}
              {profile.role} at {profile.company} with 4.6 years building web
              apps. I care about interfaces that are fast on the outside and
              clean underneath.
            </p>
            <p>
              Most of my time goes to frontend engineering with React.js, Next.js
              and TypeScript - micro-frontends, performance optimization, and
              lately a lot of AI-driven development (GenAI apps, RAG pipelines,
              vector databases). When I'm not shipping, I'm writing on Medium or
              grinding LeetCode.
            </p>
            <p className="text-foreground">
              The fastest way to know me? Talk to my AI twin - bottom-right, or
              hit <span className="font-mono text-teal">⌘K</span>.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glow-teal relative overflow-hidden rounded-2xl border border-border bg-card p-7">
            <div className="aurora pointer-events-none absolute -right-10 -top-10 h-40 w-40 opacity-60" />
            <dl className="relative space-y-5">
              {[
                ["Role", profile.role],
                ["Company", profile.company],
                ["Based in", profile.location],
                ["Focus", "Frontend · AI · Performance"],
                ["Status", "Open to opportunities"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="text-right text-sm text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
