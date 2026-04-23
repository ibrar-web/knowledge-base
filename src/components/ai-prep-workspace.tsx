"use client";

import { useState } from "react";

import { aiInterviewSections, aiPrepTopics } from "@/data/ai-prep";

export function AIPrepWorkspace() {
  const [activePanel, setActivePanel] = useState<"commands" | "concepts" | "questions">(
    "questions"
  );
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    `ai-${aiInterviewSections[0]?.section}-0`
  );

  const topic = aiPrepTopics[0];

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
      <section className="rounded-[32px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_84%,transparent)] p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8">
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            AI Interview Preparation Page
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Senior AI Engineer Interview Master System
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
            Review core AI concepts, modern ML and LLM systems, production AI engineering, and
            advanced architecture tradeoffs in a single workspace built for senior interviews.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            aria-pressed="true"
            className="rounded-2xl border border-[var(--color-primary-blue)] bg-[color-mix(in_srgb,var(--color-primary-blue)_18%,transparent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(59,130,246,0.16)]"
          >
            {topic.label}
          </button>
        </div>
      </section>

      <section
        className={`mt-8 rounded-[32px] border border-[var(--color-border)] bg-gradient-to-br ${topic.accent} p-[1px] shadow-[var(--shadow-card)] transition duration-300`}
      >
        <div className="rounded-[31px] bg-[color-mix(in_srgb,var(--color-background-main)_94%,transparent)] p-6 backdrop-blur-sm sm:p-8">
          <div className="flex flex-wrap gap-3">
            {[
              { id: "commands", label: "Commands" },
              { id: "concepts", label: "Core Concepts" },
              { id: "questions", label: "Interview Bank" },
            ].map((panel) => {
              const isActive = activePanel === panel.id;

              return (
                <button
                  key={panel.id}
                  type="button"
                  onClick={() =>
                    setActivePanel(panel.id as "commands" | "concepts" | "questions")
                  }
                  className={`rounded-2xl border px-4 py-2.5 text-sm font-semibold transition duration-200 ${
                    isActive
                      ? "border-[var(--color-primary-blue)] bg-[color-mix(in_srgb,var(--color-primary-blue)_18%,transparent)] text-white"
                      : "border-[var(--color-border)] bg-white/5 text-[var(--color-text-secondary)] hover:border-[var(--color-primary-indigo)] hover:bg-white/10 hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {panel.label}
                </button>
              );
            })}
          </div>

          {activePanel === "commands" ? (
            <section className="mt-6 rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-white">AI Commands</h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Baseline training, evaluation, and serving commands for fast interview review.
              </p>
              <div className="mt-5 overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[#09111f]">
                <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    Terminal
                  </span>
                  <span className="font-mono text-xs text-[var(--color-text-secondary)]">
                    bash
                  </span>
                </div>
                <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-7 text-slate-200">
                  <code>{topic.commands.join("\n")}</code>
                </pre>
              </div>
            </section>
          ) : null}

          {activePanel === "concepts" ? (
            <section className="mt-6 rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                AI Core Concepts
              </h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Fast review topics for staff-level AI engineering and system design interviews.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {topic.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-2 text-sm text-[var(--color-text-secondary)]"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {activePanel === "questions" ? (
            <section className="mt-6 rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                AI Interview Question Bank
              </h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Senior-level AI questions grouped around fundamentals, modern ML systems, LLM
                architecture, production operations, and responsible deployment.
              </p>

              <div className="mt-6 space-y-5">
                {aiInterviewSections.map((section) => (
                  <div
                    key={section.section}
                    className="rounded-[26px] border border-[var(--color-border)] bg-slate-950/25 p-5"
                  >
                    <h3 className="text-lg font-semibold text-white">{section.section}</h3>
                    <div className="mt-4 space-y-3">
                      {section.questions.map((question, index) => {
                        const itemKey = `ai-${section.section}-${index}`;
                        const isOpen = openQuestion === itemKey;

                        return (
                          <article
                            key={itemKey}
                            className="overflow-hidden rounded-[22px] border border-[var(--color-border)] bg-white/[0.03]"
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setOpenQuestion((current) =>
                                  current === itemKey ? null : itemKey
                                )
                              }
                              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                            >
                              <span className="text-sm font-semibold leading-6 text-white">
                                {question.q}
                              </span>
                              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                {isOpen ? "Hide" : "Open"}
                              </span>
                            </button>

                            {isOpen ? (
                              <div className="border-t border-[var(--color-border)] px-4 py-4">
                                <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
                                  {question.a}
                                </p>
                              </div>
                            ) : null}
                          </article>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}
