"use client";

import { useState } from "react";

import {
  awsInterviewSections,
  cloudDevopsPrepTopics,
  dockerInterviewSections,
  gcpInterviewSections,
} from "@/data/cloud-devops-prep";

export function CloudDevopsPrepWorkspace() {
  const [activeTab, setActiveTab] = useState(cloudDevopsPrepTopics[0].id);
  const [awsPanel, setAwsPanel] = useState<"commands" | "concepts" | "questions">(
    "questions"
  );
  const [gcpPanel, setGcpPanel] = useState<"commands" | "concepts" | "questions">(
    "questions"
  );
  const [dockerPanel, setDockerPanel] = useState<"commands" | "concepts" | "questions">(
    "questions"
  );
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    `aws-${awsInterviewSections[0]?.section}-0`
  );

  const activeTopic =
    cloudDevopsPrepTopics.find((topic) => topic.id === activeTab) ?? cloudDevopsPrepTopics[0];

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
      <section className="rounded-[32px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_84%,transparent)] p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            Cloud & DevOps Interview Preparation Page
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Senior Cloud & DevOps Interview Master System
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
            Switch between AWS, GCP, Docker, and CI/CD to review production-oriented commands,
            senior interview questions, and core cloud architecture concepts in one workspace.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {cloudDevopsPrepTopics.map((topic) => {
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
          {activeTopic.id === "aws" ? (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {[
                  { id: "commands", label: "Commands" },
                  { id: "concepts", label: "Core Concepts" },
                  { id: "questions", label: "Interview Bank" },
                ].map((panel) => {
                  const isActive = awsPanel === panel.id;

                  return (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() =>
                        setAwsPanel(panel.id as "commands" | "concepts" | "questions")
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

              {awsPanel === "commands" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    AWS Commands
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Practical AWS CLI references for architecture and ops interviews.
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

              {awsPanel === "concepts" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    AWS Core Concepts
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Fast review topics for senior cloud architecture interviews.
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

              {awsPanel === "questions" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    AWS Interview Question Bank
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Principal-level AWS topics grouped by cloud fundamentals, service architecture,
                    and production system design.
                  </p>

                  <div className="mt-6 space-y-5">
                    {awsInterviewSections.map((section) => (
                      <div
                        key={section.section}
                        className="rounded-[26px] border border-[var(--color-border)] bg-slate-950/25 p-5"
                      >
                        <h3 className="text-lg font-semibold text-white">{section.section}</h3>
                        <div className="mt-4 space-y-3">
                          {section.questions.map((question, index) => {
                            const itemKey = `aws-${section.section}-${index}`;
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
          ) : activeTopic.id === "gcp" ? (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {[
                  { id: "commands", label: "Commands" },
                  { id: "concepts", label: "Core Concepts" },
                  { id: "questions", label: "Interview Bank" },
                ].map((panel) => {
                  const isActive = gcpPanel === panel.id;

                  return (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() =>
                        setGcpPanel(panel.id as "commands" | "concepts" | "questions")
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

              {gcpPanel === "commands" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    GCP Commands
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Practical GCP CLI references for architecture and platform interviews.
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

              {gcpPanel === "concepts" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    GCP Core Concepts
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Fast review topics for senior Google Cloud architecture interviews.
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

              {gcpPanel === "questions" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    GCP Interview Question Bank
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Principal-level GCP topics grouped by cloud model, platform services, and
                    production-scale system design.
                  </p>

                  <div className="mt-6 space-y-5">
                    {gcpInterviewSections.map((section) => (
                      <div
                        key={section.section}
                        className="rounded-[26px] border border-[var(--color-border)] bg-slate-950/25 p-5"
                      >
                        <h3 className="text-lg font-semibold text-white">{section.section}</h3>
                        <div className="mt-4 space-y-3">
                          {section.questions.map((question, index) => {
                            const itemKey = `gcp-${section.section}-${index}`;
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
          ) : activeTopic.id === "docker" ? (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {[
                  { id: "commands", label: "Commands" },
                  { id: "concepts", label: "Core Concepts" },
                  { id: "questions", label: "Interview Bank" },
                ].map((panel) => {
                  const isActive = dockerPanel === panel.id;

                  return (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() =>
                        setDockerPanel(panel.id as "commands" | "concepts" | "questions")
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

              {dockerPanel === "commands" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Docker Commands
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Practical Docker CLI references for platform and DevOps interviews.
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

              {dockerPanel === "concepts" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Docker Core Concepts
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Fast review topics for senior container and platform interviews.
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

              {dockerPanel === "questions" ? (
                <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Docker Interview Question Bank
                  </h2>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Senior-level Docker topics covering Linux internals, image architecture,
                    security, and production deployment tradeoffs.
                  </p>

                  <div className="mt-6 space-y-5">
                    {dockerInterviewSections.map((section) => (
                      <div
                        key={section.section}
                        className="rounded-[26px] border border-[var(--color-border)] bg-slate-950/25 p-5"
                      >
                        <h3 className="text-lg font-semibold text-white">{section.section}</h3>
                        <div className="mt-4 space-y-3">
                          {section.questions.map((question, index) => {
                            const itemKey = `docker-${section.section}-${index}`;
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
                        Project / Setup Commands
                      </h2>
                      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                        Practical command references for the selected cloud or DevOps area.
                      </p>
                    </div>
                    <span className="rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                      {activeTopic.label}
                    </span>
                  </div>

                  <div className="mt-5 overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[#09111f]">
                    <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                        Terminal / Workflow
                      </span>
                      <span className="font-mono text-xs text-[var(--color-text-secondary)]">
                        {activeTopic.id === "cicd" ? "yaml" : "bash"}
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
                    Senior-level foundations expected in cloud architecture and DevOps discussions.
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
                  Each card includes a short answer, deeper technical framing, and a production use
                  case.
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
                        <CloudDetailBlock title="Short Answer" content={question.shortAnswer} />
                        <CloudDetailBlock title="Deep Explanation" content={question.deepExplanation} />
                        <CloudDetailBlock title="Production Use Case" content={question.useCase} />
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

function CloudDetailBlock({ title, content }: { title: string; content: string }) {
  return (
    <section className="rounded-[22px] border border-[var(--color-border)] bg-white/[0.03] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
        {title}
      </p>
      <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">{content}</p>
    </section>
  );
}
