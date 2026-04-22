import type { ModuleContent } from "@/types/interview";

export const gitModule: ModuleContent = {
  key: "git",
  title: "Git & GitHub",
  route: "/git",
  icon: "git",
  accent: "from-zinc-500/24 via-stone-500/10 to-transparent",
  description:
    "Version control, collaboration workflows, branching strategy, and CI integration.",
  overview:
    "Covers the commands and reasoning interviewers expect when teams care about delivery quality and collaboration hygiene.",
  topics: [
    {
      id: "git-core",
      title: "Git Commands and Workflows",
      summary: "Branch hygiene, rebasing, cherry-picking, history management, and pull request readiness.",
      questions: [
        {
          id: "git-1",
          question: "When is rebasing useful and when is it risky?",
          answer:
            "Rebasing is useful for cleaning private history before sharing. It becomes risky when rewriting commits others already depend on.",
          difficulty: "easy",
        },
      ],
      keyConcepts: [
        {
          title: "Shared history discipline",
          description: "Teams need clear rules around when history is mutable and when it is not.",
        },
      ],
      codeExamples: [
        {
          title: "Interactive review sequence",
          language: "bash",
          snippet: `git fetch origin
git rebase origin/main
git status`,
          explanation: "Shows a simple sync loop before opening or updating a pull request.",
        },
      ],
      commands: [
        {
          label: "Inspect graph",
          command: "git log --oneline --graph --decorate --all",
          context: "Strong command for explaining repository state during interviews.",
        },
      ],
    },
  ],
};
