import Link from "next/link";

import { TopNavMenu } from "@/components/top-nav-menu";

export function AppHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-sidebar)_82%,transparent)] px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur-xl sm:px-5">
          <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-white uppercase">
            Interview Prep Hub
          </Link>
          <TopNavMenu />
        </div>
      </div>
    </header>
  );
}
