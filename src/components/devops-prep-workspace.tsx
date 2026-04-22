"use client";

import { useState } from "react";

import {
  cicdInterviewSections,
  devopsTopics,
  dockerInterviewSections,
} from "@/data/devops-prep";

export function DevopsPrepWorkspace() {
  const [activeTab, setActiveTab] = useState(devopsTopics[0].id);
  const [dockerPanel, setDockerPanel] = useState<"commands" | "concepts" | "questions">(
    "questions"
  );
  const [cicdPanel, setCicdPanel] = useState<"commands" | "concepts" | "questions">(
    "questions"
  );
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    `docker-${dockerInterviewSections[0]?.section}-0`
  );

  const activeTopic = devopsTopics.find((topic) => topic.id === activeTab) ?? devopsTopics[0];

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
      <section className="rounded-[32px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_84%,transparent)] p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            DevOps Interview Preparation Page
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Senior DevOps Interview Master System
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
            Switch between Docker and CI/CD to review production-oriented commands, senior
            interview questions, and core DevOps delivery concepts in one workspace.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {devopsTopics.map((topic) => {
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
          {activeTopic.id === "docker" ? (
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
                <CommandSection
                  title="Docker Commands"
                  description="Practical Docker CLI references for platform and DevOps interviews."
                  code={activeTopic.commands.join("\n")}
                  codeLabel="bash"
                />
              ) : null}

              {dockerPanel === "concepts" ? (
                <ConceptSection
                  title="Docker Core Concepts"
                  description="Fast review topics for senior container and platform interviews."
                  concepts={activeTopic.concepts}
                />
              ) : null}

              {dockerPanel === "questions" ? (
                <QuestionSection
                  title="Docker Interview Question Bank"
                  description="Senior-level Docker topics covering Linux internals, image architecture, security, and production deployment tradeoffs."
                  sections={dockerInterviewSections}
                  openQuestion={openQuestion}
                  setOpenQuestion={setOpenQuestion}
                  prefix="docker"
                />
              ) : null}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {[
                  { id: "commands", label: "Commands" },
                  { id: "concepts", label: "Core Concepts" },
                  { id: "questions", label: "Interview Bank" },
                ].map((panel) => {
                  const isActive = cicdPanel === panel.id;

                  return (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() =>
                        setCicdPanel(panel.id as "commands" | "concepts" | "questions")
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

              {cicdPanel === "commands" ? (
                <CommandSection
                  title="CI/CD Workflow"
                  description="Practical workflow reference for delivery and platform interviews."
                  code={activeTopic.commands.join("\n")}
                  codeLabel="yaml"
                />
              ) : null}

              {cicdPanel === "concepts" ? (
                <ConceptSection
                  title="CI/CD Core Concepts"
                  description="Fast review topics for senior platform and delivery architecture interviews."
                  concepts={activeTopic.concepts}
                />
              ) : null}

              {cicdPanel === "questions" ? (
                <QuestionSection
                  title="CI/CD Interview Question Bank"
                  description="Enterprise-grade CI/CD topics covering pipeline architecture, security, deployment strategy, and large-scale platform design."
                  sections={cicdInterviewSections}
                  openQuestion={openQuestion}
                  setOpenQuestion={setOpenQuestion}
                  prefix="cicd"
                />
              ) : null}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function CommandSection({
  title,
  description,
  code,
  codeLabel,
}: {
  title: string;
  description: string;
  code: string;
  codeLabel: string;
}) {
  return (
    <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{description}</p>
      <div className="mt-5 overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[#09111f]">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Reference
          </span>
          <span className="font-mono text-xs text-[var(--color-text-secondary)]">{codeLabel}</span>
        </div>
        <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-7 text-slate-200">
          <code>{code}</code>
        </pre>
      </div>
    </section>
  );
}

function ConceptSection({
  title,
  description,
  concepts,
}: {
  title: string;
  description: string;
  concepts: string[];
}) {
  return (
    <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{description}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {concepts.map((concept) => (
          <span
            key={concept}
            className="rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-2 text-sm text-[var(--color-text-secondary)]"
          >
            {concept}
          </span>
        ))}
      </div>
    </section>
  );
}

function QuestionSection({
  title,
  description,
  sections,
  openQuestion,
  setOpenQuestion,
  prefix,
}: {
  title: string;
  description: string;
  sections: Array<{ section: string; questions: Array<{ q: string; a: string; code?: string }> }>;
  openQuestion: string | null;
  setOpenQuestion: React.Dispatch<React.SetStateAction<string | null>>;
  prefix: string;
}) {
  return (
    <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{description}</p>
      <div className="mt-6 space-y-5">
        {sections.map((section) => (
          <div
            key={section.section}
            className="rounded-[26px] border border-[var(--color-border)] bg-slate-950/25 p-5"
          >
            <h3 className="text-lg font-semibold text-white">{section.section}</h3>
            <div className="mt-4 space-y-3">
              {section.questions.map((question, index) => {
                const itemKey = `${prefix}-${section.section}-${index}`;
                const isOpen = openQuestion === itemKey;

                return (
                  <article
                    key={itemKey}
                    className="overflow-hidden rounded-[22px] border border-[var(--color-border)] bg-white/[0.03]"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenQuestion((current) => (current === itemKey ? null : itemKey))
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
  );
}
