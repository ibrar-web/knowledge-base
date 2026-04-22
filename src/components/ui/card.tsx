import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-1)] shadow-[0_24px_80px_rgba(0,0,0,0.12)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
