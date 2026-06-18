import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Constellation } from "../constellation";
import { useAiTwin } from "../ai-twin";
import { Button, buttonVariants } from "@/components/ui/button";
import { profile, stats } from "@/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const { open } = useAiTwin();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 aurora opacity-70" />
      <Constellation />
      <div className="pointer-events-none absolute inset-0 grid-bg" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-6xl px-5 pt-24"
      >
        <motion.div variants={item} className="eyebrow mb-6 flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
          {profile.role}
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-[clamp(2.8rem,9vw,7rem)] font-semibold leading-[0.95] tracking-tight text-glow"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl font-display text-xl italic text-muted-foreground sm:text-2xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground"
        >
          {profile.blurb}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          <Button variant="accent" size="lg" onClick={open}>
            <Sparkles className="h-5 w-5" />
            Talk to my AI twin
          </Button>
          <a href="#work" className={buttonVariants({ variant: "outline", size: "lg" })}>
            See my work <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-8"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-2xl font-semibold text-foreground">
                {s.value}
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        scroll ↓
      </div>
    </section>
  );
}
