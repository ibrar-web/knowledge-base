export type IconName =
  | "dashboard"
  | "frontend"
  | "backend"
  | "cloud"
  | "devops"
  | "ai"
  | "git"
  | "system"
  | "commands"
  | "menu"
  | "sun"
  | "moon"
  | "search"
  | "logout"
  | "bookmark"
  | "check"
  | "spark"
  | "plus"
  | "edit"
  | "trash";

export type NavigationItem = {
  label: string;
  href: string;
  icon: IconName;
  description: string;
};

export type NavigationSection = {
  title: string;
  items: NavigationItem[];
};
