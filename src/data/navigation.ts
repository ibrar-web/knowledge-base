import type { NavigationSection } from "@/types/navigation";

export const navigationSections: NavigationSection[] = [
  {
    title: "Interview Tracks",
    items: [
      {
        label: "Frontend",
        href: "/frontend",
        icon: "frontend",
        description: "React, Next.js, and React Native interview prep.",
      },
      {
        label: "Backend",
        href: "/backend",
        icon: "backend",
        description: "Node.js, NestJS, FastAPI, JavaScript, and Python.",
      },
      {
        label: "Cloud",
        href: "/cloud",
        icon: "cloud",
        description: "AWS and GCP platform fundamentals.",
      },
      {
        label: "DevOps",
        href: "/devops",
        icon: "devops",
        description: "Docker, Kubernetes basics, and CI/CD workflows.",
      },
      {
        label: "AI",
        href: "/ai",
        icon: "ai",
        description: "Vector databases, embeddings, and RAG architecture.",
      },
      {
        label: "Git",
        href: "/git",
        icon: "git",
        description: "Git, GitHub, and collaboration workflows.",
      },
      {
        label: "System Design",
        href: "/system-design",
        icon: "system",
        description: "URL shortener, chat, feed, and notification design drills.",
      },
      {
        label: "Commands",
        href: "/commands",
        icon: "commands",
        description: "Searchable Git, Docker, AWS CLI, and GCP CLI reference.",
      },
    ],
  },
];
