import { useEffect, useState } from "react";
import { Command, FileText } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useAiTwin } from "./ai-twin";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { open } = useAiTwin();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2 font-display text-lg">
          <span className="text-amber">✦</span>
          <span className="font-semibold tracking-tight">{profile.initials}</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-2 text-sm transition hover:border-teal hover:text-teal sm:flex"
          >
            <FileText className="h-3.5 w-3.5" />
            Résumé
          </a>
          <ThemeToggle />
          <button
            onClick={open}
            className="group flex items-center gap-2 rounded-full border border-border bg-muted/50 py-2 pl-3 pr-2 text-sm transition hover:border-teal"
          >
            <span className="hidden sm:inline">Ask Aether</span>
            <span className="flex items-center gap-0.5 rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              <Command className="h-3 w-3" />K
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
