"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationSections } from "@/data/navigation";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

export function SidebarNav({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {navigationSections.map((section) => (
        <div key={section.title}>
          <p
            className={cn(
              "mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted-foreground)]",
              collapsed && "sr-only",
            )}
          >
            {section.title}
          </p>
          <div className="space-y-1.5">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition",
                    isActive
                      ? "bg-[var(--surface-3)] text-[var(--foreground)] shadow-inner"
                      : "text-[var(--muted-foreground)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-2xl border border-transparent",
                      isActive && "border-[var(--border-strong)] bg-[var(--surface-1)]",
                    )}
                  >
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  {!collapsed && (
                    <span className="min-w-0">
                      <span className="block font-medium">{item.label}</span>
                      <span className="mt-0.5 block truncate text-xs text-[var(--muted-foreground)]">
                        {item.description}
                      </span>
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
