import type { ModuleContent } from "@/types/interview";

export const backendModule: ModuleContent = {
  key: "backend",
  title: "Backend Engineering",
  route: "/backend",
  icon: "backend",
  accent: "from-emerald-500/24 via-teal-500/12 to-transparent",
  description:
    "Node.js, NestJS, FastAPI, and language-level reasoning for service-oriented systems.",
  overview:
    "Focused on API boundaries, concurrency models, service composition, and implementation tradeoffs expected in full stack and backend rounds.",
  topics: [
    {
      id: "nodejs",
      title: "Node.js",
      summary: "Runtime model, event loop behavior, and building dependable services.",
      questions: [
        {
          id: "node-1",
          question: "How do you explain the event loop in a way that is operationally useful?",
          answer:
            "It is the scheduling model that determines when callbacks, timers, promises, and I/O handlers run. The useful interview answer is how that affects latency, throughput, and blocking behavior in real services.",
          difficulty: "medium",
          tags: ["runtime"],
        },
      ],
      keyConcepts: [
        {
          title: "Non-blocking I/O",
          description: "Good Node services avoid CPU-heavy work in the request path.",
        },
      ],
      codeExamples: [
        {
          title: "Abortable fetch",
          language: "ts",
          snippet: `const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 3000);
const response = await fetch(url, { signal: controller.signal });
clearTimeout(timeout);`,
          explanation:
            "Timeouts and cancellation are expected in resilient service design.",
        },
      ],
      commands: [
        {
          label: "Run tests",
          command: "npm test",
          context: "Use as an example when discussing safety nets around service changes.",
        },
      ],
    },
    {
      id: "nestjs",
      title: "NestJS",
      summary: "Dependency injection, modular design, and convention-driven APIs.",
      questions: [
        {
          id: "nest-1",
          question: "Why do larger teams often prefer NestJS over bare Express?",
          answer:
            "The structure is opinionated, dependency injection is built in, and it scales better for consistent testing, modularization, and onboarding across larger codebases.",
          difficulty: "easy",
          tags: ["frameworks"],
        },
      ],
      keyConcepts: [
        {
          title: "Modules as boundaries",
          description: "Use modules to separate domains and keep provider ownership explicit.",
        },
      ],
      codeExamples: [
        {
          title: "DTO validation",
          language: "ts",
          snippet: `export class CreateUserDto {
  @IsEmail()
  email!: string;

  @MinLength(8)
  password!: string;
}`,
          explanation:
            "Validation near the transport layer protects service internals from malformed input.",
        },
      ],
      commands: [
        {
          label: "Generate resource",
          command: "nest g resource users",
          context: "Useful for discussing convention and scaffolding productivity.",
        },
      ],
    },
    {
      id: "fastapi-python",
      title: "FastAPI and Python",
      summary: "Typed API design, async I/O, and Python language depth for backend interviews.",
      questions: [
        {
          id: "fastapi-1",
          question: "What makes FastAPI productive for typed backend services?",
          answer:
            "The framework uses Python type hints for validation, OpenAPI generation, and editor tooling, which reduces boilerplate while keeping contracts explicit.",
          difficulty: "medium",
          tags: ["python", "fastapi"],
        },
        {
          id: "python-1",
          question: "What advanced JavaScript and Python topics are worth preparing for full stack interviews?",
          answer:
            "In JavaScript: closures, prototypes, event loop, async control flow, and memory behavior. In Python: iterators, generators, decorators, async primitives, data model methods, and packaging decisions.",
          difficulty: "hard",
          tags: ["javascript", "python"],
        },
      ],
      keyConcepts: [
        {
          title: "Contract-first typing",
          description: "Typed request and response models speed review and reduce integration ambiguity.",
        },
      ],
      codeExamples: [
        {
          title: "Typed FastAPI endpoint",
          language: "py",
          snippet: `@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}`,
          explanation:
            "Simple, typed endpoints make framework ergonomics easy to demonstrate in interviews.",
        },
      ],
      commands: [
        {
          label: "Run FastAPI",
          command: "uvicorn app.main:app --reload",
          context: "Useful for developer workflow and local API iteration examples.",
        },
      ],
    },
  ],
};
