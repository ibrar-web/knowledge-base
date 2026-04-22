import { cn } from "@/utils/cn";
import type { Difficulty } from "@/types/interview";

export function Badge({ label, tone = "neutral" }: { label: string; tone?: Difficulty | "neutral" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize",
        tone === "easy" && "bg-emerald-500/15 text-emerald-300",
        tone === "medium" && "bg-amber-500/15 text-amber-300",
        tone === "hard" && "bg-rose-500/15 text-rose-300",
        tone === "neutral" && "bg-[var(--surface-2)] text-[var(--muted-foreground)]",
      )}
    >
      {label}
    </span>
  );
}
