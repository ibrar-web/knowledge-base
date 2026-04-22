import type { IconName } from "@/types/navigation";

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className = "h-5 w-5" }: IconProps) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "dashboard":
      return <svg {...common}><path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" /></svg>;
    case "frontend":
      return <svg {...common}><path d="M8 6l-5 6 5 6" /><path d="M16 6l5 6-5 6" /><path d="M14 4l-4 16" /></svg>;
    case "backend":
      return <svg {...common}><rect x="3" y="4" width="18" height="6" rx="2" /><rect x="3" y="14" width="18" height="6" rx="2" /><path d="M7 7h.01M7 17h.01" /></svg>;
    case "cloud":
      return <svg {...common}><path d="M7 18a4 4 0 010-8 5 5 0 019.7-1.4A4 4 0 1117 18H7z" /></svg>;
    case "devops":
      return <svg {...common}><path d="M12 3l2.1 4.3 4.7.7-3.4 3.3.8 4.7L12 14l-4.2 2.2.8-4.7-3.4-3.3 4.7-.7z" /></svg>;
    case "ai":
      return <svg {...common}><path d="M12 3v4" /><path d="M12 17v4" /><path d="M3 12h4" /><path d="M17 12h4" /><circle cx="12" cy="12" r="5" /></svg>;
    case "git":
      return <svg {...common}><path d="M12 3v12" /><path d="M12 8a3 3 0 103 3" /><circle cx="12" cy="18" r="3" /><circle cx="12" cy="5" r="2" /></svg>;
    case "system":
      return <svg {...common}><path d="M4 6h16" /><path d="M4 12h10" /><path d="M4 18h7" /><path d="M18 10l3 2-3 2" /></svg>;
    case "commands":
      return <svg {...common}><path d="M8 9l-4 3 4 3" /><path d="M16 9l4 3-4 3" /><path d="M10 19h4" /></svg>;
    case "menu":
      return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case "sun":
      return <svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>;
    case "moon":
      return <svg {...common}><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" /></svg>;
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>;
    case "logout":
      return <svg {...common}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>;
    case "bookmark":
      return <svg {...common}><path d="M6 4h12v16l-6-4-6 4z" /></svg>;
    case "check":
      return <svg {...common}><path d="M5 13l4 4L19 7" /></svg>;
    case "spark":
      return <svg {...common}><path d="M12 3l1.8 4.7L18 9.5l-4.2 1.8L12 16l-1.8-4.7L6 9.5l4.2-1.8z" /></svg>;
    case "plus":
      return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
    case "edit":
      return <svg {...common}><path d="M4 20l4.5-1 9-9a2 2 0 00-2.8-2.8l-9 9L4 20z" /></svg>;
    case "trash":
      return <svg {...common}><path d="M4 7h16" /><path d="M10 11v6M14 11v6" /><path d="M6 7l1 13h10l1-13" /><path d="M9 7V4h6v3" /></svg>;
    default:
      return null;
  }
}
