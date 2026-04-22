const stackGroups = [
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "React Native", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "Python", "FastAPI", "GraphQL", "WebSockets"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "PostgreSQL", "Redis"],
  },
  {
    title: "Cloud/DevOps",
    items: ["AWS (EC2, ECS, ECR, S3)", "GCP (Cloud Run, Pub/Sub)", "Docker", "GitHub Actions", "CI/CD"],
  },
  {
    title: "Integrations",
    items: ["Stripe", "PayPal", "Agora SDK", "Google Maps API"],
  },
  {
    title: "Automation",
    items: ["Playwright", "Selenium", "Web Scraping", "End-to-End Testing"],
  },
] as const;

const skillCards = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "React Native", "TypeScript"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "FastAPI", "GraphQL"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "GCP", "Docker", "CI/CD"],
  },
  {
    title: "Automation",
    items: ["Playwright", "Selenium", "Scraping", "Testing"],
  },
] as const;

const experiences = [
  {
    company: "Blacklion Innovation Group",
    role: "Sr. Software Engineer / Tech Lead",
    duration: "Jan 2024 – Present",
    highlights: [
      "Lead team of 8 engineers",
      "Built scalable microservices using Node.js, Next.js, and GCP Cloud Run",
      "Implemented Docker CI/CD pipelines with GitHub Actions",
      "Built REST and GraphQL APIs",
      "Built Playwright automation pipelines",
    ],
  },
  {
    company: "Tammira",
    role: "Sr. Software Engineer",
    duration: "Oct 2022 – Dec 2023",
    highlights: [
      "Built a React Native healthcare platform",
      "Integrated WebSockets and Agora for real-time workflows",
      "Optimized MongoDB performance",
      "Introduced Jest-based test coverage",
    ],
  },
  {
    company: "JoynDigital",
    role: "Software Engineer",
    duration: "Apr 2021 – Sept 2022",
    highlights: [
      "Built React and Node.js applications",
      "Integrated Stripe and PayPal payment flows",
      "Managed AWS deployments",
    ],
  },
  {
    company: "Alphaverx",
    role: "Junior Developer",
    duration: "2020 – 2021",
    highlights: ["Supported React and Node.js delivery", "Handled API integration and debugging"],
  },
  {
    company: "Webowares",
    role: "Junior Developer",
    duration: "2019 – 2020",
    highlights: ["Contributed to React Native and Node.js support development"],
  },
] as const;

const projects = [
  {
    title: "Healthcare Platform",
    description: "A production-oriented consultation and appointment workflow inspired by Oladoc-style experiences.",
    stack: ["React Native", "Node.js", "WebSockets"],
  },
  {
    title: "Code Debugging & Audit Platform",
    description: "Internal engineering workspace for code review workflows, debugging traces, and architecture audits.",
    stack: ["Next.js", "Node.js", "GraphQL"],
  },
  {
    title: "Song Popularity AI System",
    description: "AI-assisted analysis pipeline for music trend signals, scoring inputs, and reporting dashboards.",
    stack: ["Python", "AI", "Automation"],
  },
  {
    title: "Audit & Inspection Platform",
    description: "Field inspection dashboard with structured workflows, evidence capture, and operational reporting.",
    stack: ["React", "FastAPI", "PostgreSQL"],
  },
  {
    title: "Property Management System",
    description: "Multi-module SaaS product for tenant operations, billing, and maintenance workflows.",
    stack: ["Next.js", "Node.js", "MongoDB"],
  },
  {
    title: "Alpha Graphics Printing Platform",
    description: "Business operations platform for print orders, client management, and production tracking.",
    stack: ["React", "Express", "AWS"],
  },
] as const;

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
      <section className="grid gap-6 lg:grid-cols-[1.45fr_0.95fr]">
        <div className="rounded-[32px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_86%,transparent)] p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                Developer Dashboard
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Ibrar Hussain
              </h1>
              <p className="mt-3 text-lg text-[var(--color-text-secondary)] sm:text-xl">
                Senior Full Stack Engineer / Tech Lead
              </p>
            </div>

            <div className="min-w-[220px] rounded-[28px] border border-[var(--color-border)] bg-slate-950/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                Core Stack
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["MERN Stack", "Node.js", "React", "Angular", "React Native"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-sm text-[var(--color-text-secondary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-base leading-7 text-[var(--color-text-secondary)]">
            Senior Full Stack Engineer with 6+ years of experience building scalable web, mobile,
            and cloud-native applications using React, Next.js, Node.js, React Native, and Python.
            Strong expertise in automation, system design, CI/CD, and production-grade systems.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <InfoTile label="Location" value="Lahore, Pakistan" />
            <InfoTile label="Phone" value="+92 315 6262990" />
            <InfoTile label="Email" value="ibrarjut1997@gmail.com" />
            <InfoTile label="LinkedIn" value="linkedin.com/in/ibrarhussain62" />
          </div>
        </div>

        <div className="grid gap-6">
          <StatCard value="6+" label="Years building production systems" />
          <StatCard value="8" label="Engineers led across delivery streams" />
          <StatCard value="Full Stack" label="Web, mobile, automation, and cloud delivery" />
        </div>
      </section>

      <section className="mt-8 rounded-[32px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_78%,transparent)] p-6 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Technology Overview</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Core capability groups for the portfolio dashboard and interview prep foundation.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stackGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-[26px] border border-[var(--color-border)] bg-slate-950/25 p-5 transition duration-200 hover:-translate-y-1 hover:border-[var(--color-primary-indigo)] hover:bg-slate-950/35"
            >
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-sm text-[var(--color-text-secondary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Skills Focus</h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Four focused SaaS-style cards to frame the hub’s primary interview tracks.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {skillCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_80%,transparent)] p-6 shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-1 hover:border-[var(--color-primary-blue)]"
            >
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-secondary)]">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5">
            <h2 className="text-2xl font-semibold tracking-tight text-white">Experience</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Career timeline presented as a compact operations-focused engineering history.
            </p>
          </div>

          <div className="space-y-4">
            {experiences.map((experience) => (
              <article
                key={`${experience.company}-${experience.duration}`}
                className="relative rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_80%,transparent)] p-6 shadow-[var(--shadow-card)]"
              >
                <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[var(--color-primary-blue)] via-[var(--color-primary-indigo)] to-transparent opacity-50" />
                <div className="relative pl-6">
                  <span className="absolute left-[-5px] top-1 h-3 w-3 rounded-full bg-[var(--color-primary-blue)] shadow-[0_0_0_6px_rgba(59,130,246,0.12)]" />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{experience.company}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)]">{experience.role}</p>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">{experience.duration}</p>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-5">
            <h2 className="text-2xl font-semibold tracking-tight text-white">Projects</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Portfolio cards shaped like product modules inside a developer SaaS workspace.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-[28px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-card)_82%,transparent)] p-6 shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-1 hover:border-[var(--color-primary-indigo)] hover:bg-[color-mix(in_srgb,var(--color-card)_92%,transparent)]"
              >
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-[24px] border border-[var(--color-border)] bg-slate-950/25 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-primary)]">{value}</p>
    </article>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <article className="rounded-[28px] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(17,26,46,0.92)_0%,rgba(8,16,29,0.95)_100%)] p-6 shadow-[var(--shadow-card)]">
      <p className="text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">{label}</p>
    </article>
  );
}
