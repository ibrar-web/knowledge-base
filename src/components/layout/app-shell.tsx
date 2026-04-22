"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { storageKeys } from "@/utils/storage";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(storageKeys.sidebarCollapsed) === "true";
  });

  useEffect(() => {
    window.localStorage.setItem(storageKeys.sidebarCollapsed, String(collapsed));
  }, [collapsed]);

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <AppSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <AppHeader onMenuToggle={() => setMobileOpen(true)} />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
