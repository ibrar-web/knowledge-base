"use client";

import { useState } from "react";

import {
  backendPrepTopics,
  expressInterviewSections,
  nestInterviewSections,
} from "@/data/backend-prep";

export function BackendPrepWorkspace() {
  const [activeTab, setActiveTab] = useState(backendPrepTopics[0].id);
  const [expressPanel, setExpressPanel] = useState<"commands" | "concepts" | "questions">(
    "questions"
  );
  const [nestPanel, setNestPanel] = useState<"commands" | "concepts" | "questions">(
    "questions"
  );
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    `express-${expressInterviewSections[0]?.section}-0`
  );

  const activeTopic =
    backendPrepTopics.find((topic) => topic.id === activeTab) ?? backendPrepTopics[0];

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
      <section className="rounded-[32px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_84%,transparent)] p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            Backend Interview Preparation Page
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Senior Backend Engineer Interview Master System
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
            Switch between Node.js, Express.js, NestJS, and FastAPI to study setup commands,
            senior interview questions, and core backend concepts without leaving the page.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {backendPrepTopics.map((topic) => {
            const isActive = topic.id === activeTopic.id;

            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveTab(topic.id)}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition duration-200 ${
                  isActive
                    ? "border-[var(--color-primary-blue)] bg-[color-mix(in_srgb,var(--color-primary-blue)_18%,transparent)] text-white shadow-[0_16px_32px_rgba(59,130,246,0.16)]"
                    : "border-[var(--color-border)] bg-white/5 text-[var(--color-text-secondary)] hover:-translate-y-0.5 hover:border-[var(--color-primary-indigo)] hover:bg-white/10 hover:text-[var(--color-text-primary)]"
                }`}
                aria-pressed={isActive}
              >
                {topic.label}
              </button>
            );
          })}
        </div>
      </section>

      <section
        className={`mt-8 rounded-[32px] border border-[var(--color-border)] bg-gradient-to-br ${activeTopic.accent} p-[1px] shadow-[var(--shadow-card)] transition duration-300`}
      >
        <div className="rounded-[31px] bg-[color-mix(in_srgb,var(--color-background-main)_94%,transparent)] p-6 backdrop-blur-sm sm:p-8">
          {activeTopic.id === "express" ? (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {[
                  { id: "commands", label: "Commands" },
                  { id: "concepts", label: "Core Concepts" },
                  { id: "questions", label: "Interview Bank" },
                ].map((panel) => {
                  const isActive = expressPanel === panel.id;

                  return (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() =>
                        setExpressPanel(panel.id as "commands" | "concepts" | "questions")
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

              {expressPanel === "commands" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Express Commands
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Baseline Express project creation commands for interview review.
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
                      <code>{activeTopic.commands.join("\n")}</code>
                    </pre>
                  </div>
                </section>
              ) : null}

              {expressPanel === "concepts" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Express Core Concepts
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Fast review topics for senior backend and API architecture interviews.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {activeTopic.concepts.map((concept) => (
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

              {expressPanel === "questions" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Express Interview Question Bank
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Senior-level Express questions grouped by transport fundamentals, internals,
                    and production systems thinking.
                  </p>

                  <div className="mt-6 space-y-5">
                    {expressInterviewSections.map((section) => (
                      <div
                        key={section.section}
                        className="rounded-[26px] border border-[var(--color-border)] bg-slate-950/25 p-5"
                      >
                        <h3 className="text-lg font-semibold text-white">{section.section}</h3>
                        <div className="mt-4 space-y-3">
                          {section.questions.map((question, index) => {
                            const itemKey = `express-${section.section}-${index}`;
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
                                    {question.code ? (
                                      <pre className="mt-4 overflow-x-auto rounded-[18px] border border-[var(--color-border)] bg-[#09111f] px-4 py-4 font-mono text-xs leading-6 text-slate-200">
                                        <code>{question.code}</code>
                                      </pre>
                                    ) : null}
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
          ) : activeTopic.id === "nestjs" ? (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {[
                  { id: "commands", label: "Commands" },
                  { id: "concepts", label: "Core Concepts" },
                  { id: "questions", label: "Interview Bank" },
                ].map((panel) => {
                  const isActive = nestPanel === panel.id;

                  return (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() =>
                        setNestPanel(panel.id as "commands" | "concepts" | "questions")
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

              {nestPanel === "commands" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    NestJS Commands
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Baseline NestJS project setup commands for interview review.
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
                      <code>{activeTopic.commands.join("\n")}</code>
                    </pre>
                  </div>
                </section>
              ) : null}

              {nestPanel === "concepts" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    NestJS Core Concepts
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Fast review topics for senior backend architecture and Nest interviews.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {activeTopic.concepts.map((concept) => (
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

              {nestPanel === "questions" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    NestJS Interview Question Bank
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Senior-level NestJS questions grouped by framework model, internals, and
                    distributed backend design.
                  </p>

                  <div className="mt-6 space-y-5">
                    {nestInterviewSections.map((section) => (
                      <div
                        key={section.section}
                        className="rounded-[26px] border border-[var(--color-border)] bg-slate-950/25 p-5"
                      >
                        <h3 className="text-lg font-semibold text-white">{section.section}</h3>
                        <div className="mt-4 space-y-3">
                          {section.questions.map((question, index) => {
                            const itemKey = `nestjs-${section.section}-${index}`;
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
                                    {question.code ? (
                                      <pre className="mt-4 overflow-x-auto rounded-[18px] border border-[var(--color-border)] bg-[#09111f] px-4 py-4 font-mono text-xs leading-6 text-slate-200">
                                        <code>{question.code}</code>
                                      </pre>
                                    ) : null}
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
          ) : (
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="grid gap-6">
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-white">
                        Project Creation Commands
                      </h2>
                      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                        Command sequence to bootstrap the selected backend stack.
                      </p>
                    </div>
                    <span className="rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                      {activeTopic.label}
                    </span>
                  </div>

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
                      <code>{activeTopic.commands.join("\n")}</code>
                    </pre>
                  </div>
                </section>

                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">Core Concepts</h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Architecture areas to anchor senior backend system discussions.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {activeTopic.concepts.map((concept) => (
                      <span
                        key={concept}
                        className="rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-2 text-sm text-[var(--color-text-secondary)]"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  Senior-Level Interview Questions
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Each card includes a short answer, deep explanation, and production-minded
                  scenario.
                </p>

                <div className="mt-6 space-y-4">
                  {activeTopic.questions.map((question, index) => (
                    <article
                      key={question.question}
                      className="rounded-[26px] border border-[var(--color-border)] bg-slate-950/25 p-5 transition duration-200 hover:border-[var(--color-primary-indigo)] hover:bg-slate-950/35"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold leading-7 text-white">
                          {index + 1}. {question.question}
                        </h3>
                        <span className="rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                          Q{index + 1}
                        </span>
                      </div>

                      <div className="mt-5 grid gap-4">
                        <BackendDetailBlock title="Short Answer" content={question.shortAnswer} />
                        <BackendDetailBlock
                          title="Deep Explanation"
                          content={question.deepExplanation}
                        />
                        <BackendDetailBlock title="Production Example" content={question.useCase} />
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function BackendDetailBlock({ title, content }: { title: string; content: string }) {
  return (
    <section className="rounded-[22px] border border-[var(--color-border)] bg-white/[0.03] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
        {title}
      </p>
      <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">{content}</p>
    </section>
  );
}
