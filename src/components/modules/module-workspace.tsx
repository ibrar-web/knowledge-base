import type { ModuleContent } from "@/types/interview";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";

export default function ModuleWorkspace({ module }: { module: ModuleContent }) {
  return (
    <div className="space-y-6">
      <section className={`overflow-hidden rounded-[32px] border border-[var(--border-soft)] bg-gradient-to-br ${module.accent} p-6 md:p-8`}>
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted-foreground)]">Interview Module</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[var(--foreground)]">
            {module.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--muted-foreground)]">{module.description}</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">{module.overview}</p>
        </div>
      </section>

      <section className="space-y-5">
        {module.topics.map((topic) => (
          <Card key={topic.id} className="p-5 md:p-6">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">{topic.title}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{topic.summary}</p>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-[var(--foreground)]">Interview Questions</p>
                  {topic.questions.map((question) => (
                    <div key={question.id} className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-2)] p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <p className="max-w-xl text-sm font-medium leading-6 text-[var(--foreground)]">
                          {question.question}
                        </p>
                        <Badge label={question.difficulty} tone={question.difficulty} />
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{question.answer}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">Key Concepts</p>
                    <div className="mt-3 space-y-3">
                      {topic.keyConcepts.map((concept) => (
                        <div key={concept.title} className="rounded-2xl border border-[var(--border-soft)] p-4">
                          <p className="text-sm font-medium text-[var(--foreground)]">{concept.title}</p>
                          <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">{concept.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">Code Examples</p>
                    <div className="mt-3 space-y-3">
                      {topic.codeExamples.map((example) => (
                        <div key={example.title} className="overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-2)]">
                          <div className="border-b border-[var(--border-soft)] px-4 py-3 text-sm font-medium text-[var(--foreground)]">
                            {example.title}
                          </div>
                          <pre className="overflow-x-auto px-4 py-4 text-xs leading-6 text-cyan-100">
                            <code>{example.snippet}</code>
                          </pre>
                          <p className="border-t border-[var(--border-soft)] px-4 py-3 text-sm leading-7 text-[var(--muted-foreground)]">
                            {example.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">Commands</p>
                    <div className="mt-3 space-y-3">
                      {topic.commands.map((command) => (
                        <div key={command.command} className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-2)] p-4">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">{command.label}</p>
                              <p className="mt-2 font-mono text-sm text-cyan-300">{command.command}</p>
                            </div>
                            <CopyButton value={command.command} />
                          </div>
                          <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{command.context}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
