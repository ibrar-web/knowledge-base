"use client";

import { useEffect } from "react";
import Link from "next/link";
import { SidebarNav } from "@/components/navigation/sidebar-nav";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

export function AppSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}) {
  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [mobileOpen, setMobileOpen]);

  return (
    <>
      <aside
        className={cn(
          "hidden border-r border-[var(--border-soft)] bg-[var(--surface-0)] px-4 py-6 md:flex md:flex-col md:transition-[width]",
          collapsed ? "md:w-[96px]" : "md:w-[320px]",
        )}
      >
        <SidebarBody collapsed={collapsed} onCollapseToggle={() => setCollapsed(!collapsed)} />
      </aside>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[310px] border-r border-[var(--border-soft)] bg-[var(--surface-0)] px-4 py-6 transition md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarBody
          collapsed={false}
          onCollapseToggle={() => setMobileOpen(false)}
          onNavigate={() => setMobileOpen(false)}
        />
      </aside>
    </>
  );
}

function SidebarBody({
  collapsed,
  onCollapseToggle,
  onNavigate,
}: {
  collapsed: boolean;
  onCollapseToggle: () => void;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 px-2">
        <Link href="/" className="min-w-0">
          <p className="font-display text-lg font-semibold tracking-tight text-[var(--foreground)]">
            {collapsed ? "IPH" : "Interview Prep Hub"}
          </p>
          {!collapsed && <p className="text-xs text-[var(--muted-foreground)]">Developer-focused interview docs</p>}
        </Link>
        <Button variant="secondary" className="hidden md:inline-flex" onClick={onCollapseToggle}>
          <Icon name="menu" className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-8 flex-1 overflow-y-auto">
        <SidebarNav collapsed={collapsed} onNavigate={onNavigate} />
      </div>
      <div className="mt-6 rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-1)] p-4">
        <p className="text-sm font-medium text-[var(--foreground)]">Static by design</p>
        <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
          No backend, no auth, and no API calls. Everything is rendered from local TypeScript data files for fast browsing.
        </p>
      </div>
    </div>
  );
}
