"use client";

import { useState } from "react";

import { databaseCoverage, databaseSections } from "@/data/database-prep";

export function DatabasesPrepWorkspace() {
  const [activeSection, setActiveSection] = useState(databaseSections[0]?.section ?? "");
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    `${databaseSections[0]?.section}-0`
  );

  const selectedSection =
    databaseSections.find((section) => section.section === activeSection) ?? databaseSections[0];

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
      <section className="rounded-[32px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_84%,transparent)] p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8">
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            Database Interview Preparation
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Senior Database Interview Bank
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
            Review principal-level database questions covering relational systems, MongoDB,
            transactions, indexing, replication, migrations, and production-scale tradeoffs.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {databaseCoverage.map((area) => (
            <span
              key={area}
              className="rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-2 text-sm text-[var(--color-text-secondary)]"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[32px] border border-[var(--color-border)] bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-emerald-500/20 p-[1px] shadow-[var(--shadow-card)]">
        <div className="rounded-[31px] bg-[color-mix(in_srgb,var(--color-background-main)_94%,transparent)] p-6 backdrop-blur-sm sm:p-8">
          <div className="flex flex-wrap gap-3">
            {databaseSections.map((section) => {
              const isActive = selectedSection.section === section.section;

              return (
                <button
                  key={section.section}
                  type="button"
                  onClick={() => {
                    setActiveSection(section.section);
                    setOpenQuestion(`${section.section}-0`);
                  }}
                  className={`rounded-2xl border px-4 py-2.5 text-sm font-semibold transition duration-200 ${
                    isActive
                      ? "border-[var(--color-primary-blue)] bg-[color-mix(in_srgb,var(--color-primary-blue)_18%,transparent)] text-white"
                      : "border-[var(--color-border)] bg-white/5 text-[var(--color-text-secondary)] hover:border-[var(--color-primary-indigo)] hover:bg-white/10 hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {section.section}
                </button>
              );
            })}
          </div>

          <section className="mt-6 rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              {selectedSection.section}
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-[var(--color-text-muted)]">
              Concise but production-oriented answers focused on correctness, scale, bottlenecks,
              and real-world database tradeoffs.
            </p>

            <div className="mt-6 space-y-3">
              {selectedSection.questions.map((question, index) => {
                const itemKey = `${selectedSection.section}-${index}`;
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
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
