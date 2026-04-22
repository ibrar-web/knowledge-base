import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-[var(--accent-strong)] text-white shadow-lg shadow-cyan-950/20 hover:opacity-90",
        variant === "secondary" &&
          "border border-[var(--border-strong)] bg-[var(--surface-2)] text-[var(--foreground)] hover:bg-[var(--surface-3)]",
        variant === "ghost" && "text-[var(--muted-foreground)] hover:bg-[var(--surface-2)]",
        variant === "danger" && "bg-rose-500 text-white hover:bg-rose-600",
        className,
      )}
      {...props}
    />
  );
}
