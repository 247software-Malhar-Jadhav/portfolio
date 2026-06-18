import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "../reveal";
import { writing } from "@/lib/data";

export function Writing() {
  return (
    <section id="writing" className="border-y border-border bg-muted/20">
      <div className="mx-auto max-w-6xl px-5 py-28">
        <SectionHeading
          eyebrow="04 - Field Notes"
          title="Writing"
          intro="Notes on React, Next.js, and the web - published on Medium."
        />

        <div className="divide-y divide-border border-y border-border">
          {writing.map((post, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-6 py-7 transition-colors"
              >
                <div className="min-w-0">
                  <div className="mb-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {post.date} · Medium
                  </div>
                  <h3 className="truncate font-display text-xl font-medium transition-colors group-hover:text-teal sm:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowUpRight className="h-6 w-6 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
