import type { ModuleContent } from "@/types/interview";

export const frontendModule: ModuleContent = {
  key: "frontend",
  title: "Frontend Engineering",
  route: "/frontend",
  icon: "frontend",
  accent: "from-cyan-500/25 via-sky-500/12 to-transparent",
  description:
    "React architecture, Next.js App Router decisions, and React Native tradeoffs for production teams.",
  overview:
    "Built for senior frontend and full stack interview loops where implementation detail, rendering strategy, performance, and DX tradeoffs matter.",
  topics: [
    {
      id: "react-architecture",
      title: "React Architecture",
      summary:
        "State design, rendering behavior, composition patterns, and scaling React codebases for product teams.",
      questions: [
        {
          id: "react-1",
          question: "How do you decide between local state, context, and an external store in React?",
          answer:
            "Keep state as close to usage as possible. Use context for stable shared concerns like auth or theme, and move to an external store when updates are frequent, cross-cutting, or need selector-based performance control.",
          difficulty: "medium",
          tags: ["state-management", "architecture"],
        },
        {
          id: "react-2",
          question: "What causes unnecessary rerenders in React and how do you address them?",
          answer:
            "Broad context updates, unstable props, inline object creation, and state stored too high in the tree are common causes. Split components, memoize expensive boundaries, stabilize callbacks only when it changes behavior, and design state ownership carefully.",
          difficulty: "medium",
          tags: ["performance"],
        },
      ],
      keyConcepts: [
        {
          title: "Render ownership",
          description:
            "A component should own only the state it needs to coordinate. This limits rerender blast radius.",
        },
        {
          title: "Composition over inheritance",
          description:
            "Prefer slots, render props, and small composition primitives to keep UI extensible.",
        },
      ],
      codeExamples: [
        {
          title: "Stable derived state",
          language: "tsx",
          snippet: `const visibleItems = useMemo(() => {
  return items.filter((item) => item.status === activeStatus);
}, [items, activeStatus]);`,
          explanation:
            "Use memoization for expensive derivation, not as a default habit. Keep dependencies explicit.",
        },
      ],
      commands: [
        {
          label: "Trace bundle size",
          command: "NEXT_TELEMETRY_DISABLED=1 npm run build",
          context: "Use production builds to verify actual route and bundle behavior before performance claims.",
        },
      ],
    },
    {
      id: "nextjs",
      title: "Next.js App Router",
      summary:
        "RSC boundaries, streaming, route layouts, caching decisions, and client bundle containment.",
      questions: [
        {
          id: "next-1",
          question: "When should a component stay server-side in the App Router?",
          answer:
            "Keep it server-side unless it needs browser APIs, hooks like useEffect/useState, or direct user interaction. This reduces client JavaScript and keeps data-loading close to the route.",
          difficulty: "easy",
          tags: ["rsc", "nextjs"],
        },
        {
          id: "next-2",
          question: "How do you think about client boundaries in a large dashboard?",
          answer:
            "Mark the smallest interactive island as client. Server-render the shell, metadata, static lists, and route scaffolding, then isolate widgets that require local state or browser APIs.",
          difficulty: "hard",
          tags: ["app-router", "bundle-size"],
        },
      ],
      keyConcepts: [
        {
          title: "Server-first rendering",
          description:
            "Pages and layouts are server components by default, which should shape your architecture.",
        },
        {
          title: "Segmented layouts",
          description:
            "Nested layouts preserve shared UI and prevent expensive rerenders during route transitions.",
        },
      ],
      codeExamples: [
        {
          title: "Server page with client island",
          language: "tsx",
          snippet: `import ModuleWorkspace from "@/components/modules/module-workspace";
import { frontendModule } from "@/data/frontendQuestions";

export default function FrontendPage() {
  return <ModuleWorkspace module={frontendModule} />;
}`,
          explanation:
            "Static module data stays server-side, while interactive save/complete/admin controls live in the client workspace.",
        },
      ],
      commands: [
        {
          label: "Run local development",
          command: "npm run dev",
          context: "Fast iteration for route composition, hydration checks, and UI validation.",
        },
      ],
    },
    {
      id: "react-native",
      title: "React Native",
      summary:
        "Cross-platform architecture, performance, and mobile UX decisions.",
      questions: [
        {
          id: "rn-1",
          question: "What usually breaks when a web-first React team moves to React Native?",
          answer:
            "They often assume DOM patterns, overuse large shared components, and ignore mobile navigation, gesture handling, and bridge performance constraints.",
          difficulty: "medium",
          tags: ["mobile", "architecture"],
        },
      ],
      keyConcepts: [
        {
          title: "Platform constraints",
          description:
            "Treat iOS and Android as first-class platforms with distinct performance and UX constraints.",
        },
      ],
      codeExamples: [
        {
          title: "Memoized item renderer",
          language: "tsx",
          snippet: `const renderItem = useCallback(({ item }) => {
  return <QuestionRow item={item} />;
}, []);`,
          explanation:
            "List rendering performance matters more on lower-powered mobile devices.",
        },
      ],
      commands: [
        {
          label: "Run Android build",
          command: "npx react-native run-android",
          context: "Useful for discussing local development workflow and troubleshooting.",
        },
      ],
    },
  ],
};
