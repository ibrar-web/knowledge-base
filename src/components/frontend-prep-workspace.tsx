"use client";

import { useState } from "react";

import {
  frontendPrepTopics,
  nextJsInterviewSections,
  reactInterviewSections,
  reactNativeInterviewSections,
} from "@/data/frontend-prep";

export function FrontendPrepWorkspace() {
  const [activeTab, setActiveTab] = useState(frontendPrepTopics[0].id);
  const [nextJsPanel, setNextJsPanel] = useState<"commands" | "concepts" | "questions">(
    "questions"
  );
  const [reactPanel, setReactPanel] = useState<"commands" | "concepts" | "questions">(
    "questions"
  );
  const [reactNativePanel, setReactNativePanel] = useState<
    "commands" | "concepts" | "questions"
  >("questions");
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    `${nextJsInterviewSections[0]?.section}-0`
  );

  const activeTopic =
    frontendPrepTopics.find((topic) => topic.id === activeTab) ?? frontendPrepTopics[0];

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
      <section className="rounded-[32px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_84%,transparent)] p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            Frontend Interview Preparation Page
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Senior Engineer Interview Preparation Engine
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
            Switch between Next.js, React.js, and React Native to review setup commands,
            senior-level interview questions, and core concepts in a single workspace.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {frontendPrepTopics.map((topic) => {
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
          {activeTopic.id === "nextjs" ? (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {[
                  { id: "commands", label: "Commands" },
                  { id: "concepts", label: "Core Concepts" },
                  { id: "questions", label: "Interview Bank" },
                ].map((panel) => {
                  const isActive = nextJsPanel === panel.id;

                  return (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() =>
                        setNextJsPanel(panel.id as "commands" | "concepts" | "questions")
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

              {nextJsPanel === "commands" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Next.js Commands
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Baseline App Router setup commands for interview preparation.
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

              {nextJsPanel === "concepts" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Next.js Core Concepts
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Fast review topics for senior App Router interviews.
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

              {nextJsPanel === "questions" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Next.js Interview Question Bank
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Concise, senior-level App Router answers grouped for fast interview prep.
                  </p>

                  <div className="mt-6 space-y-5">
                    {nextJsInterviewSections.map((section) => (
                      <div
                        key={section.section}
                        className="rounded-[26px] border border-[var(--color-border)] bg-slate-950/25 p-5"
                      >
                        <h3 className="text-lg font-semibold text-white">{section.section}</h3>
                        <div className="mt-4 space-y-3">
                          {section.questions.map((question, index) => {
                            const itemKey = `${section.section}-${index}`;
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
          ) : activeTopic.id === "react" ? (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {[
                  { id: "commands", label: "Commands" },
                  { id: "concepts", label: "Core Concepts" },
                  { id: "questions", label: "Interview Bank" },
                ].map((panel) => {
                  const isActive = reactPanel === panel.id;

                  return (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() =>
                        setReactPanel(panel.id as "commands" | "concepts" | "questions")
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

              {reactPanel === "commands" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    React Commands
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Baseline React project setup commands for interview review.
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

              {reactPanel === "concepts" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    React Core Concepts
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Fast review topics for senior React interviews.
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

              {reactPanel === "questions" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    React Interview Question Bank
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Concise, senior-level React answers grouped by concept depth and architecture.
                  </p>

                  <div className="mt-6 space-y-5">
                    {reactInterviewSections.map((section) => (
                      <div
                        key={section.section}
                        className="rounded-[26px] border border-[var(--color-border)] bg-slate-950/25 p-5"
                      >
                        <h3 className="text-lg font-semibold text-white">{section.section}</h3>
                        <div className="mt-4 space-y-3">
                          {section.questions.map((question, index) => {
                            const itemKey = `react-${section.section}-${index}`;
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
          ) : activeTopic.id === "react-native" ? (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {[
                  { id: "commands", label: "Commands" },
                  { id: "concepts", label: "Core Concepts" },
                  { id: "questions", label: "Interview Bank" },
                ].map((panel) => {
                  const isActive = reactNativePanel === panel.id;

                  return (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() =>
                        setReactNativePanel(
                          panel.id as "commands" | "concepts" | "questions"
                        )
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

              {reactNativePanel === "commands" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    React Native Commands
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Baseline React Native project setup commands for interview prep.
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

              {reactNativePanel === "concepts" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    React Native Core Concepts
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Fast review topics for senior mobile and cross-platform interviews.
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

              {reactNativePanel === "questions" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    React Native Interview Question Bank
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Principal-level React Native interview topics grouped by product, runtime, and
                    production concerns.
                  </p>

                  <div className="mt-6 space-y-5">
                    {reactNativeInterviewSections.map((section) => (
                      <div
                        key={section.section}
                        className="rounded-[26px] border border-[var(--color-border)] bg-slate-950/25 p-5"
                      >
                        <h3 className="text-lg font-semibold text-white">{section.section}</h3>
                        <div className="mt-4 space-y-3">
                          {section.questions.map((question, index) => {
                            const itemKey = `react-native-${section.section}-${index}`;
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
                        Project Setup Commands
                      </h2>
                      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                        Baseline startup commands for the selected stack.
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
                    Core interview foundations to anchor system-level explanations.
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
                  Each card includes a direct answer, deeper engineering framing, and a production
                  use case.
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
                        <DetailBlock title="Short Answer" content={question.shortAnswer} />
                        <DetailBlock title="Deep Explanation" content={question.deepExplanation} />
                        <DetailBlock title="Production Use Case" content={question.useCase} />
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

function DetailBlock({ title, content }: { title: string; content: string }) {
  return (
    <section className="rounded-[22px] border border-[var(--color-border)] bg-white/[0.03] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
        {title}
      </p>
      <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">{content}</p>
    </section>
  );
}
