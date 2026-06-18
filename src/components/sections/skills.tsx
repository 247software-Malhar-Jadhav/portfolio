import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Reveal, SectionHeading } from "../reveal";
import { skillGroups, certifications } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="relative border-y border-border bg-muted/20">
      <div className="mx-auto max-w-6xl px-5 py-28">
        <SectionHeading
          eyebrow="02 - Star Chart"
          title="Skills & constellations"
          intro="The tools I reach for, grouped by orbit. Hover to light them up."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.07}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-teal">
                <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-teal">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber" />
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ y: -3 }}
                      className="cursor-default whitespace-nowrap rounded-full border border-border bg-background px-2.5 py-1.5 text-[13px] text-foreground transition-colors hover:border-teal hover:text-teal"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Certifications — full-width row, three across */}
        <Reveal delay={0.1}>
          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-teal">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber" />
              Certifications
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-background p-4 transition-colors hover:border-teal"
                >
                  <Award className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground transition-colors group-hover:text-teal">
                      {cert.name}
                    </div>
                    <div className="mt-0.5 font-mono text-xs text-muted-foreground">
                      {cert.issuer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
