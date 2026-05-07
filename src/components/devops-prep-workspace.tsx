"use client";

import { useState } from "react";

import {
  cicdInterviewSections,
  devopsTopics,
  dockerInterviewSections,
  gitInterviewSections,
  type CommandReference,
  type CodeReference,
  type DeploymentStep,
} from "@/data/devops-prep";

export function DevopsPrepWorkspace() {
  const [activeTab, setActiveTab] = useState(devopsTopics[0].id);
  const [dockerPanel, setDockerPanel] = useState<"commands" | "concepts" | "questions">(
    "questions"
  );
  const [cicdPanel, setCicdPanel] = useState<"commands" | "concepts" | "questions">(
    "questions"
  );
  const [gitPanel, setGitPanel] = useState<"commands" | "concepts" | "questions">("questions");
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
            Switch between Docker, CI/CD, PostgreSQL deployment, and Git to review
            production-oriented commands, collaboration workflows, Docker artifacts,
            troubleshooting patterns, and senior DevOps interview questions in one workspace.
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
                <CommandListSection
                  title="Docker Commands"
                  description="Practical Docker CLI references with clear operational context for platform and DevOps interviews."
                  commands={activeTopic.commands}
                />
              ) : null}

              {dockerPanel === "commands" && activeTopic.references ? (
                <ReferenceSection
                  title="Docker Build References"
                  description="Production-oriented Docker artifacts for containerized application builds and local multi-service environments."
                  references={activeTopic.references}
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
          ) : activeTopic.id === "cicd" ? (
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
                activeTopic.references ? (
                  <ReferenceSection
                    title="CI/CD Workflow References"
                    description="GitHub Actions workflow plus the VM deployment script needed to run a FastAPI app on a GCP VM via systemd."
                    references={activeTopic.references}
                  />
                ) : (
                  <CommandSection
                    title="CI/CD Workflow"
                    description="Practical workflow reference for delivery and platform interviews."
                    code={activeTopic.commands.map((item) => item.command).join("\n")}
                    codeLabel="yaml/bash"
                  />
                )
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
          ) : activeTopic.id === "postgres" ? (
            <DeploymentStepSection
              title="PostgreSQL Deployment On AWS"
              description="Step-by-step RDS or Aurora PostgreSQL setup for creating a database instance and allowing local pgAdmin access."
              steps={activeTopic.deploymentSteps ?? []}
            />
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {[
                  { id: "commands", label: "Commands" },
                  { id: "concepts", label: "Core Concepts" },
                  { id: "questions", label: "Interview Bank" },
                ].map((panel) => {
                  const isActive = gitPanel === panel.id;

                  return (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() =>
                        setGitPanel(panel.id as "commands" | "concepts" | "questions")
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

              {gitPanel === "commands" ? (
                <CommandListSection
                  title="Git Daily Commands"
                  description="Practical Git commands with workflow context for repository setup, collaboration, history management, and recovery."
                  commands={activeTopic.commands}
                />
              ) : null}

              {gitPanel === "concepts" ? (
                <ConceptSection
                  title="Git Core Concepts"
                  description="Fast review topics for senior engineering collaboration, branching strategy, and source-control recovery."
                  concepts={activeTopic.concepts}
                />
              ) : null}

              {gitPanel === "questions" ? (
                <QuestionSection
                  title="Git Interview Question Bank"
                  description="Senior-level Git topics covering distributed version control, daily collaboration workflows, history rewriting, and advanced troubleshooting commands."
                  sections={gitInterviewSections}
                  openQuestion={openQuestion}
                  setOpenQuestion={setOpenQuestion}
                  prefix="git"
                />
              ) : null}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function DeploymentStepSection({
  title,
  description,
  steps,
}: {
  title: string;
  description: string;
  steps: DeploymentStep[];
}) {
  return (
    <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{description}</p>
      <ol className="mt-6 grid gap-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-[24px] border border-[var(--color-border)] bg-[#09111f] p-5"
          >
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white/5 font-mono text-sm font-semibold text-slate-200">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold leading-6 text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                  {step.description}
                </p>
                {step.details ? (
                  <ul className="mt-3 space-y-2">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex gap-2 text-sm leading-6 text-[var(--color-text-muted)]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary-blue)]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
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

function CommandListSection({
  title,
  description,
  commands,
}: {
  title: string;
  description: string;
  commands: CommandReference[];
}) {
  return (
    <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{description}</p>
      <div className="mt-6 grid gap-4">
        {commands.map((item) => (
          <article
            key={item.command}
            className="overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[#09111f]"
          >
            <div className="border-b border-[var(--color-border)] px-4 py-3">
              <span className="font-mono text-sm text-slate-200">{item.command}</span>
            </div>
            <div className="px-4 py-4">
              <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReferenceSection({
  title,
  description,
  references,
}: {
  title: string;
  description: string;
  references: CodeReference[];
}) {
  return (
    <section className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{description}</p>
      <div className="mt-6 grid gap-5">
        {references.map((reference) => (
          <article
            key={reference.title}
            className="overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[#09111f]"
          >
            <div className="border-b border-[var(--color-border)] px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                  {reference.title}
                </h3>
                <span className="font-mono text-xs text-[var(--color-text-secondary)]">
                  {reference.language}
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                {reference.description}
              </p>
            </div>
            <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-7 text-slate-200">
              <code>{reference.code}</code>
            </pre>
          </article>
        ))}
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
  sections: Array<{
    section: string;
    questions: Array<{ q: string; a: string; code?: string; command?: string }>;
  }>;
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
                        {question.command ? (
                          <div className="mt-4 overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-[#09111f]">
                            <div className="border-b border-[var(--color-border)] px-4 py-2.5">
                              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                Command
                              </span>
                            </div>
                            <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-6 text-slate-200">
                              <code>{question.command}</code>
                            </pre>
                          </div>
                        ) : null}
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
