import { cicdInterviewSections, dockerInterviewSections } from "@/data/cloud-devops-prep";

export type DevopsTopic = {
  id: "docker" | "cicd";
  label: string;
  accent: string;
  commands: string[];
  concepts: string[];
};

export const devopsTopics: DevopsTopic[] = [
  {
    id: "docker",
    label: "Docker",
    accent: "from-cyan-500/20 via-sky-500/10 to-teal-500/20",
    commands: [
      "docker build -t my-app .",
      "docker run -p 3000:3000 my-app",
      "docker ps",
      "docker-compose up",
      "docker-compose down",
    ],
    concepts: [
      "Containerization",
      "Image layering",
      "Networking",
      "Orchestration basics",
      "Deployment strategies",
    ],
  },
  {
    id: "cicd",
    label: "CI/CD",
    accent: "from-violet-500/20 via-fuchsia-500/10 to-pink-500/20",
    commands: [
      "name: CI Pipeline",
      "",
      "on:",
      "  push:",
      "    branches: [main]",
      "",
      "jobs:",
      "  build:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v3",
      "      - name: Install dependencies",
      "        run: npm install",
      "      - name: Run tests",
      "        run: npm test",
    ],
    concepts: [
      "Continuous Integration",
      "Continuous Deployment",
      "Pipeline architecture",
      "Automation workflows",
      "Release strategies",
    ],
  },
];

export { dockerInterviewSections, cicdInterviewSections };
