import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

export function Section({
  title,
  description,
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("space-y-4", className)} {...props}>
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--foreground)]">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
