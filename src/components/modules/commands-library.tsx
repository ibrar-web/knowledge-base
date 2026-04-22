"use client";

import { useMemo, useState } from "react";
import type { CommandLibraryItem } from "@/types/interview";
import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

export default function CommandsLibrary({ commands }: { commands: CommandLibraryItem[] }) {
  const [query, setQuery] = useState("");

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return commands;
    }

    return commands.filter((command) =>
      [
        command.category,
        command.command,
        command.explanation,
        command.useCase,
        command.interviewRelevance,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [commands, query]);

  const categories = Array.from(new Set(commands.map((command) => command.category)));

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[32px] border border-[var(--border-soft)] bg-gradient-to-br from-slate-500/14 via-transparent to-transparent p-6 md:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted-foreground)]">Reference</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[var(--foreground)]">
          Commands Library
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted-foreground)]">
          Search Git, Docker, AWS CLI, and GCP CLI commands with concise explanation, use case, and interview relevance.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_260px]">
          <div className="relative">
            <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <Input
              className="pl-11"
              placeholder="Search commands or tooling"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Card className="flex items-center justify-between p-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Categories</p>
              <p className="mt-2 text-xl font-semibold text-[var(--foreground)]">{categories.length}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Results</p>
              <p className="mt-2 text-xl font-semibold text-[var(--foreground)]">{filteredCommands.length}</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {filteredCommands.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">{item.category}</p>
                <p className="mt-3 font-mono text-sm text-cyan-300">{item.command}</p>
              </div>
              <CopyButton value={item.command} />
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">{item.explanation}</p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--muted-foreground)]">
              <p>
                <span className="font-medium text-[var(--foreground)]">Use case:</span> {item.useCase}
              </p>
              <p>
                <span className="font-medium text-[var(--foreground)]">Interview relevance:</span> {item.interviewRelevance}
              </p>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
