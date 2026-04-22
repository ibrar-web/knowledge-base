import { Card } from "@/components/ui/card";

export function ProfileCard() {
  return (
    <Card className="relative overflow-hidden p-6 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/12 via-transparent to-transparent" />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Interview Mastery Platform</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-5xl">
            Ibrar Hussain
          </h1>
          <p className="mt-3 text-lg text-[var(--muted-foreground)]">
            Full Stack Developer / Team Lead
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted-foreground)]">
            A portfolio-grade interview operating system for structured prep across frontend,
            backend, cloud, DevOps, AI systems, Git workflows, and system design.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-[var(--muted-foreground)]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em]">Target</p>
            <p className="mt-2 text-base text-[var(--foreground)]">Senior / Lead loops</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em]">Mode</p>
            <p className="mt-2 text-base text-[var(--foreground)]">Frontend-only SaaS</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
