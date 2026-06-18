import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

/**
 * Single day/night switch — click anywhere on the pill to flip the theme.
 * A colored knob slides between the sun (day) and moon (night) positions,
 * and the whole site palette morphs via CSS vars. role="switch" keeps it
 * keyboard- and screen-reader-friendly.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      onClick={toggle}
      className="relative flex h-9 w-[68px] items-center rounded-full border border-border bg-muted/60 px-1 backdrop-blur transition-colors hover:border-teal"
    >
      {/* faint track icon on the inactive side */}
      <Sun
        className={cn(
          "pointer-events-none absolute left-2 h-4 w-4 transition-opacity",
          isDark ? "text-muted-foreground opacity-100" : "opacity-0"
        )}
      />
      <Moon
        className={cn(
          "pointer-events-none absolute right-2 h-4 w-4 transition-opacity",
          isDark ? "opacity-0" : "text-muted-foreground opacity-100"
        )}
      />

      {/* sliding knob carrying the active icon */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 480, damping: 34 }}
        className={cn(
          "relative z-10 flex h-7 w-7 items-center justify-center rounded-full shadow-md",
          isDark ? "ml-auto" : "mr-auto"
        )}
        style={{
          background: isDark
            ? "linear-gradient(135deg,#2dd4bf,#1e8a7e)"
            : "linear-gradient(135deg,#f5b14c,#f59e0b)",
        }}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-[#04201c]" />
        ) : (
          <Sun className="h-4 w-4 text-[#3a2606]" />
        )}
      </motion.span>
    </button>
  );
}
