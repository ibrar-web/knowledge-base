type PlaceholderPageProps = {
  title: string;
};

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 pb-12 pt-32 sm:px-6 lg:px-8">
      <section className="w-full rounded-[32px] border border-dashed border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_74%,transparent)] p-10 text-center shadow-[var(--shadow-card)] backdrop-blur-sm">
        <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
          Placeholder
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
      </section>
    </main>
  );
}
