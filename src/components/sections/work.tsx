import { ArrowUpRight, Github } from "lucide-react";
import { Reveal, SectionHeading } from "../reveal";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  live: "text-teal",
  wip: "text-amber",
  repo: "text-muted-foreground",
};
const statusLabel: Record<string, string> = {
  live: "● Live",
  wip: "◐ In progress",
  repo: "○ Repo",
};

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading
        eyebrow="03 - Launches"
        title="Selected work"
        intro="A couple of things I've been building lately."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-teal hover:glow-teal"
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-wider",
                    statusStyles[p.status]
                  )}
                >
                  {statusLabel[p.status]}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal" />
              </div>

              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.blurb}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <a
          href="https://github.com/malharjadhav8999"
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-teal"
        >
          <Github className="h-4 w-4" />
          See everything on GitHub
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </Reveal>
    </section>
  );
}
