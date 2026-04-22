import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";

import { AppHeader } from "@/components/app-header";
import { theme } from "../../styles/theme";

import "./globals.css";

export const metadata: Metadata = {
  title: "Interview Prep Hub",
  description: "Developer profile dashboard and interview preparation workspace for Ibrar Hussain.",
};

const cssVariables: CSSProperties = {
  ["--color-background-main" as string]: theme.colors.background.main,
  ["--color-card" as string]: theme.colors.background.card,
  ["--color-sidebar" as string]: theme.colors.background.sidebar,
  ["--color-primary-blue" as string]: theme.colors.primary.blue,
  ["--color-primary-indigo" as string]: theme.colors.primary.indigo,
  ["--color-text-primary" as string]: theme.colors.text.primary,
  ["--color-text-secondary" as string]: theme.colors.text.secondary,
  ["--color-text-muted" as string]: theme.colors.text.muted,
  ["--color-border" as string]: theme.colors.border,
  ["--font-sans" as string]: theme.typography.fontFamily,
  ["--shadow-card" as string]: theme.shadows.card,
  ["--shadow-panel" as string]: theme.shadows.panel,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={cssVariables} className="antialiased">
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
