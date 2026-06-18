import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CornerDownLeft, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  askAether,
  fetchAetherAnswer,
  suggestedQuestions,
  type ChatTurn,
} from "@/lib/ai-brain";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

/* ---------- open-from-anywhere context ---------- */
type Ctx = { open: () => void };
const AiTwinContext = createContext<Ctx | null>(null);
export function useAiTwin() {
  const c = useContext(AiTwinContext);
  if (!c) throw new Error("useAiTwin must be used within AiTwinProvider");
  return c;
}

type Msg = { role: "user" | "aether"; text: string; streaming?: boolean };

export function AiTwinProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K to open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  function typeOut(answer: string) {
    setMessages((m) => [...m, { role: "aether", text: "", streaming: true }]);
    let i = 0;
    const tick = () => {
      i += 2;
      setMessages((m) => {
        const next = [...m];
        const last = next[next.length - 1];
        if (last?.role === "aether") {
          last.text = answer.slice(0, i);
          last.streaming = i < answer.length;
        }
        return next;
      });
      if (i < answer.length) {
        window.setTimeout(tick, 12);
      } else {
        setBusy(false);
      }
    };
    window.setTimeout(tick, 120);
  }

  async function send(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    setValue("");
    setBusy(true);

    // conversation history (before this turn) for the LLM
    const history: ChatTurn[] = messages.map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    }));

    // show the user's message + an empty "thinking" bubble with a caret
    setMessages((m) => [
      ...m,
      { role: "user", text: q },
      { role: "aether", text: "", streaming: true },
    ]);

    // Groq via /api/aether → fall back to the local brain on any failure
    let answer: string;
    try {
      answer = await fetchAetherAnswer(q, history);
    } catch {
      answer = askAether(q);
    }

    // remove the placeholder, then typewriter the real answer
    setMessages((m) => {
      const next = [...m];
      if (next[next.length - 1]?.role === "aether") next.pop();
      return next;
    });
    typeOut(answer);
  }

  return (
    <AiTwinContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="overflow-hidden p-0">
          {/* header (pr-12 leaves room for the built-in close button) */}
          <div className="flex items-center gap-3 border-b border-border px-5 py-4 pr-12">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full [background:linear-gradient(135deg,var(--teal),var(--amber))]">
              <Sparkles className="h-4 w-4 text-background" />
            </span>
            <div className="min-w-0">
              <DialogTitle className="font-display text-base leading-none">
                Ask Aether
              </DialogTitle>
              <DialogDescription className="mt-1 text-xs text-muted-foreground">
                {profile.name}'s AI twin · ask me anything
              </DialogDescription>
            </div>
          </div>

          {/* conversation */}
          <div
            ref={scrollRef}
            className="max-h-[44vh] min-h-[180px] space-y-4 overflow-y-auto px-5 py-5"
          >
            {messages.length === 0 ? (
              <Empty onPick={send} />
            ) : (
              messages.map((m, idx) => <Bubble key={idx} msg={m} />)
            )}
          </div>

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(value);
            }}
            className="flex items-center gap-2 border-t border-border bg-muted/40 px-3 py-3"
          >
            <Zap className="ml-2 h-4 w-4 shrink-0 text-teal" />
            <Input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask about skills, projects, experience…"
              className="flex-1"
            />
            <button
              type="submit"
              disabled={busy || !value.trim()}
              className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-medium text-background transition disabled:opacity-40 [background:linear-gradient(90deg,var(--teal),var(--amber))]"
            >
              Send <CornerDownLeft className="h-3.5 w-3.5" />
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </AiTwinContext.Provider>
  );
}

function Empty({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        I'm an AI version of {profile.name.split(" ")[0]}. Try one of these:
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => onPick(q)}
            className="rounded-lg border border-border bg-background/60 px-3 py-2.5 text-left text-sm transition hover:border-teal hover:text-teal"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm border border-border bg-background/70 text-foreground"
        )}
      >
        {msg.text}
        {msg.streaming && (
          <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-caret-blink bg-teal" />
        )}
      </div>
    </motion.div>
  );
}

/* floating launcher button (bottom-right) */
export function AiTwinFab() {
  const { open } = useAiTwin();
  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={open}
        aria-label="Ask Aether — AI twin"
        className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full text-background shadow-[0_18px_50px_-12px_var(--glow)] [background:linear-gradient(135deg,var(--teal),var(--amber))]"
      >
        <Sparkles className="h-6 w-6" />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full opacity-30 [background:var(--teal)]" />
      </motion.button>
    </AnimatePresence>
  );
}
