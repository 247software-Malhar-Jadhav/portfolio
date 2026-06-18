import { Sparkles, FileText } from "lucide-react";
import { Reveal } from "../reveal";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAiTwin } from "../ai-twin";
import { profile, socials } from "@/lib/data";

export function Contact() {
  const { open } = useAiTwin();

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 aurora opacity-50" />
      <div className="relative mx-auto max-w-6xl px-5 py-32 text-center">
        <Reveal>
          <div className="eyebrow mb-5 flex items-center justify-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal" />
            05 - Signal
          </div>
          <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
            Let's build something
            <br />
            <span className="text-glow text-teal">worth remembering.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
            Open to roles, collaborations, and good problems. Reach out - or
            interrogate my AI twin first.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href={`mailto:${profile.email}`}>
              <Button variant="accent" size="lg">
                {profile.email}
              </Button>
            </a>
            <Button variant="outline" size="lg" onClick={open}>
              <Sparkles className="h-5 w-5" /> Ask Aether
            </Button>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <FileText className="h-5 w-5" /> Résumé
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
            {socials.map(({ label, handle, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border bg-card/70 px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-teal"
              >
                <Icon className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-teal" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{label}</span>
                  <span className="block truncate font-mono text-xs text-muted-foreground">
                    {handle}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <footer className="border-t border-border py-8 text-center font-mono text-xs text-muted-foreground">
        © {profile.name} · Built with React · Designed in the dark.
      </footer>
    </section>
  );
}
