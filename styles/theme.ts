export const theme = {
  colors: {
    background: {
      main: "#0B1220",
      card: "#111A2E",
      sidebar: "#0F172A",
    },
    primary: {
      blue: "#3B82F6",
      indigo: "#6366F1",
    },
    text: {
      primary: "#E5E7EB",
      secondary: "#94A3B8",
      muted: "#64748B",
    },
    border: "#1F2A44",
  },
  typography: {
    fontFamily: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"].join(", "),
    name: "text-5xl font-bold tracking-tight",
    sectionTitle: "text-2xl font-semibold tracking-tight",
    body: "text-base",
    small: "text-sm",
  },
  shadows: {
    card: "0 24px 60px rgba(15, 23, 42, 0.28)",
    panel: "0 20px 45px rgba(2, 6, 23, 0.4)",
  },
  radius: {
    card: "1.5rem",
    panel: "1.25rem",
  },
} as const;

export type AppTheme = typeof theme;
