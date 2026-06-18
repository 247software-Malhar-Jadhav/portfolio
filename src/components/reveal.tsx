import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <div className="eyebrow mb-3">{eyebrow}</div>
      <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
