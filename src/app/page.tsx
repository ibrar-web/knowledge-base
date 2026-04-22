import Link from "next/link";
import { navigationSections } from "@/data/navigation";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

export default function HomePage() {
  const quickLinks = navigationSections[0]?.items ?? [];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[32px] border border-[var(--border-soft)] bg-gradient-to-br from-cyan-500/18 via-sky-500/10 to-transparent p-6 md:p-10">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Documentation-style interview prep</p>
        <h2 className="mt-4 font-display text-5xl font-semibold tracking-tight text-[var(--foreground)] md:text-6xl">
          Interview Prep Hub
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
          All interview questions, commands, and system design in one place.
          Browse focused modules for frontend, backend, cloud, DevOps, AI, Git, and system design with static content optimized for fast reading.
        </p>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-sm font-semibold text-[var(--foreground)]">Browse sections</p>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Jump directly into the topic you want to revise.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="h-full p-5 transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--surface-3)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-2)] text-[var(--foreground)]">
                  <Icon name={item.icon} className="h-5 w-5" />
                </div>
                <p className="mt-4 text-lg font-semibold text-[var(--foreground)]">{item.label}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">{item.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
