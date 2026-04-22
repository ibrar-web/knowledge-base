"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationSections } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useTheme } from "@/store/theme-context";

export function AppHeader({ onMenuToggle }: { onMenuToggle: () => void }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const currentItem = navigationSections[0]?.items.find((item) => item.href === pathname);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border-soft)] bg-[var(--background)]/88 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <Button variant="secondary" className="md:hidden" onClick={onMenuToggle} aria-label="Open navigation">
          <Icon name="menu" className="h-4 w-4" />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
            {pathname === "/" ? "Home" : currentItem?.label ?? "Interview Prep"}
          </p>
          <h1 className="truncate font-display text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            {pathname === "/"
              ? "Interview Prep Hub"
              : currentItem?.description ?? "Developer interview preparation notes"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-2 lg:flex">
            <Link href="/commands" className="rounded-2xl px-4 py-2 text-sm text-[var(--muted-foreground)] transition hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]">
              Commands
            </Link>
            <Link href="/system-design" className="rounded-2xl px-4 py-2 text-sm text-[var(--muted-foreground)] transition hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]">
              System Design
            </Link>
          </nav>
          <Button variant="secondary" onClick={toggleTheme} aria-label="Toggle theme">
            <Icon name={theme === "dark" ? "sun" : "moon"} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
