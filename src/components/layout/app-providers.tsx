"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/store/theme-context";

export function AppProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
