import type { ModuleContent } from "@/types/interview";

export const cloudModule: ModuleContent = {
  key: "cloud",
  title: "Cloud Architecture",
  route: "/cloud",
  icon: "cloud",
  accent: "from-sky-500/24 via-blue-500/12 to-transparent",
  description:
    "AWS and GCP services mapped to practical interview scenarios for deployment, observability, and event-driven systems.",
  overview:
    "Concentrates on service selection tradeoffs rather than certification-style memorization.",
  topics: [
    {
      id: "aws",
      title: "AWS",
      summary: "EC2, S3, Lambda, ECS, CloudWatch, and CodePipeline core decisions.",
      questions: [
        {
          id: "aws-1",
          question: "When would you choose ECS over Lambda?",
          answer:
            "Choose ECS when you need long-running services, predictable container runtime behavior, or workloads with more complex networking and execution constraints. Lambda is stronger for bursty event-driven tasks.",
          difficulty: "medium",
        },
      ],
      keyConcepts: [
        {
          title: "Managed compute tradeoffs",
          description: "Service choice depends on runtime control, scaling profile, and operational overhead.",
        },
      ],
      codeExamples: [
        {
          title: "Lambda handler",
          language: "ts",
          snippet: `export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
};`,
          explanation: "Good enough to explain cold starts, payload shaping, and event sources.",
        },
      ],
      commands: [
        {
          label: "List S3 buckets",
          command: "aws s3 ls",
          context: "Basic CLI fluency still matters in operational interviews.",
        },
      ],
    },
    {
      id: "gcp",
      title: "GCP",
      summary: "Cloud Run, Compute Engine, Cloud Storage, Pub/Sub, and API Gateway.",
      questions: [
        {
          id: "gcp-1",
          question: "Why is Cloud Run attractive for small platform teams?",
          answer:
            "It offers container deployment with a simpler operational model than managing clusters, while still supporting autoscaling and HTTP-native workloads.",
          difficulty: "easy",
        },
      ],
      keyConcepts: [
        {
          title: "Operational leverage",
          description: "Managed platforms reduce cognitive load when the team is small.",
        },
      ],
      codeExamples: [
        {
          title: "Pub/Sub event payload",
          language: "json",
          snippet: `{
  "message": {
    "data": "eyJldmVudCI6ICJkZXBsb3kifQ=="
  }
}`,
          explanation: "Useful for discussing asynchronous pipelines and event contracts.",
        },
      ],
      commands: [
        {
          label: "Deploy Cloud Run",
          command: "gcloud run deploy interview-api --source . --region us-central1",
          context: "A realistic example for shipping containerized services quickly.",
        },
      ],
    },
  ],
};

export const devopsModule: ModuleContent = {
  key: "devops",
  title: "DevOps Delivery",
  route: "/devops",
  icon: "devops",
  accent: "from-amber-500/24 via-orange-500/12 to-transparent",
  description:
    "Containerization, orchestration basics, CI/CD pipelines, and team delivery practices.",
  overview:
    "Targets the practical DevOps knowledge full stack engineers are expected to explain, not just execute blindly.",
  topics: [
    {
      id: "docker",
      title: "Docker",
      summary: "Images, layers, multi-stage builds, and container runtime basics.",
      questions: [
        {
          id: "docker-1",
          question: "Why are multi-stage builds important in production containers?",
          answer:
            "They reduce image size, remove build-time dependencies from runtime, improve security posture, and shorten deployment transfer times.",
          difficulty: "easy",
        },
      ],
      keyConcepts: [
        {
          title: "Immutable artifacts",
          description: "Build once, ship consistently, and reduce environment drift.",
        },
      ],
      codeExamples: [
        {
          title: "Multi-stage Dockerfile",
          language: "dockerfile",
          snippet: `FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/.next ./.next`,
          explanation: "Enough to discuss image slimming and build/runtime separation.",
        },
      ],
      commands: [
        {
          label: "Build image",
          command: "docker build -t interview-mastery .",
          context: "Core Docker fluency for local and CI pipelines.",
        },
      ],
    },
    {
      id: "kubernetes-github-actions",
      title: "Kubernetes and GitHub Actions",
      summary: "Pods, deployments, services, and CI/CD automation basics.",
      questions: [
        {
          id: "k8s-1",
          question: "What problem does a Deployment solve in Kubernetes?",
          answer:
            "It manages declarative rollout and replacement of Pods, enabling replica management, updates, and recovery without manual intervention.",
          difficulty: "medium",
        },
      ],
      keyConcepts: [
        {
          title: "Declarative release management",
          description: "Desired state lets the platform reconcile failures and rollouts predictably.",
        },
      ],
      codeExamples: [
        {
          title: "GitHub Actions workflow",
          language: "yaml",
          snippet: `name: ci
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint`,
          explanation: "A compact example to explain pipeline gates and automated quality checks.",
        },
      ],
      commands: [
        {
          label: "Inspect pods",
          command: "kubectl get pods -A",
          context: "Baseline cluster inspection command used in troubleshooting conversations.",
        },
      ],
    },
  ],
};
