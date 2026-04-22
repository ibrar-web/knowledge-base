"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { navigationItems } from "@/lib/navigation";

export function TopNavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="top-navigation-panel"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_72%,transparent)] text-[var(--color-text-primary)] transition duration-200 hover:border-[var(--color-primary-blue)] hover:bg-[color-mix(in_srgb,var(--color-card)_88%,transparent)]"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm transition duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      />

      <div
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition duration-300 sm:px-6 ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        }`}
      >
        <div
          id="top-navigation-panel"
          ref={panelRef}
          className="pointer-events-auto w-full max-w-5xl rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-sidebar)_92%,transparent)] p-5 shadow-[var(--shadow-panel)] backdrop-blur-xl"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                Navigate
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Interview Prep Hub sections
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white/5 text-[var(--color-text-primary)] transition duration-200 hover:border-[var(--color-primary-indigo)] hover:bg-white/10"
              aria-label="Close navigation menu"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition duration-200 ${
                    isActive
                      ? "border-[var(--color-primary-blue)] bg-[color-mix(in_srgb,var(--color-primary-blue)_16%,transparent)] text-white"
                      : "border-[var(--color-border)] bg-white/5 text-[var(--color-text-secondary)] hover:border-[var(--color-primary-indigo)] hover:bg-white/10 hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 transition duration-200 group-hover:scale-105"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}
