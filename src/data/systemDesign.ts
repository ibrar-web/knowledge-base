import type { ModuleContent } from "@/types/interview";

export const systemDesignModule: ModuleContent = {
  key: "system-design",
  title: "System Design",
  route: "/system-design",
  icon: "system",
  accent: "from-violet-500/16 via-slate-500/10 to-transparent",
  description:
    "Senior-level architecture drills covering scale, tradeoffs, data flow, and operational concerns.",
  overview:
    "Use this module to rehearse how you structure a design interview from requirements to bottlenecks, data model, APIs, scaling, and observability.",
  topics: [
    {
      id: "url-shortener",
      title: "URL Shortener",
      summary: "ID generation, redirect performance, analytics, and cache strategy.",
      questions: [
        {
          id: "sd-1",
          question: "What are the first tradeoffs you call out in a URL shortener design?",
          answer:
            "ID generation strategy, redirect latency, read-heavy traffic profile, analytics write amplification, and abuse prevention.",
          difficulty: "medium",
        },
      ],
      keyConcepts: [
        {
          title: "Read-heavy optimization",
          description: "Redirection paths should be extremely fast, usually with aggressive caching.",
        },
      ],
      codeExamples: [
        {
          title: "Base62 encoding sketch",
          language: "ts",
          snippet: `function encodeBase62(value: number): string {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  while (value > 0) {
    result = chars[value % 62] + result;
    value = Math.floor(value / 62);
  }
  return result;
}`,
          explanation: "A small implementation hook for discussing short code generation.",
        },
      ],
      commands: [
        {
          label: "Load test redirects",
          command: "k6 run redirect-test.js",
          context: "Good prompt to discuss traffic assumptions and bottleneck discovery.",
        },
      ],
    },
    {
      id: "chat-instagram-notifications",
      title: "Chat, Feed, and Notifications",
      summary: "Messaging fan-out, feed generation, ranking, and notification delivery paths.",
      questions: [
        {
          id: "sd-2",
          question: "Push or pull model for an Instagram-like feed: how do you decide?",
          answer:
            "Push works for average users with modest follower counts, while pull or hybrid strategies are safer for celebrity-scale fan-out. Interview answers should explicitly discuss both.",
          difficulty: "hard",
        },
      ],
      keyConcepts: [
        {
          title: "Fan-out strategy",
          description: "The workload distribution across users determines whether precomputation is viable.",
        },
      ],
      codeExamples: [
        {
          title: "Notification event envelope",
          language: "json",
          snippet: `{
  "event": "comment.created",
  "recipientId": "user_19",
  "channel": "push",
  "priority": "high"
}`,
          explanation: "Useful for discussing async pipelines and idempotent delivery.",
        },
      ],
      commands: [
        {
          label: "Inspect consumer lag",
          command: "kafka-consumer-groups --describe --group notifications",
          context: "A practical operational angle for event-driven architecture interviews.",
        },
      ],
    },
  ],
};
