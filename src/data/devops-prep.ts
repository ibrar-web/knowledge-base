import { cicdInterviewSections, dockerInterviewSections } from "@/data/cloud-devops-prep";

export type CodeReference = {
  title: string;
  description: string;
  language: string;
  code: string;
};

export type CommandReference = {
  command: string;
  description: string;
};

export type DeploymentStep = {
  title: string;
  description: string;
  details?: string[];
};

export type DevopsTopic = {
  id: "docker" | "cicd" | "postgres" | "git";
  label: string;
  accent: string;
  commands: CommandReference[];
  concepts: string[];
  deploymentSteps?: DeploymentStep[];
  references?: CodeReference[];
};

export type GitInterviewQuestion = {
  q: string;
  a: string;
  command?: string;
};

export type GitInterviewSection = {
  section: "Git";
  questions: GitInterviewQuestion[];
};

export const devopsTopics: DevopsTopic[] = [
  {
    id: "docker",
    label: "Docker",
    accent: "from-cyan-500/20 via-sky-500/10 to-teal-500/20",
    commands: [
      {
        command: "docker build -t my-app .",
        description: "Builds a Docker image from the current directory and tags it as `my-app`.",
      },
      {
        command: "docker run -d -p 3000:3000 --name my-app-container my-app",
        description:
          "Starts the container in detached mode, maps the app port, and assigns a stable container name.",
      },
      {
        command: "docker ps",
        description: "Lists running containers so you can verify status, ports, and container names.",
      },
      {
        command: "docker ps -a",
        description:
          "Shows all containers including stopped ones, which is useful for debugging failed startups.",
      },
      {
        command: "docker logs -f my-app-container",
        description:
          "Streams live logs from a specific container so you can inspect runtime output and failures.",
      },
      {
        command: "docker inspect my-app-container",
        description:
          "Prints low-level container metadata such as mounts, network settings, health, and environment.",
      },
      {
        command: "docker inspect my-app",
        description:
          "Shows image-level metadata including layers, entrypoint, environment, and build configuration.",
      },
      {
        command: "docker images",
        description: "Lists locally available images with repository, tag, image ID, and size.",
      },
      {
        command: "docker compose up -d",
        description:
          "Starts a multi-container stack in detached mode using `docker-compose.yml` or `compose.yaml`.",
      },
      {
        command: "docker compose logs -f",
        description:
          "Tails logs across Compose-managed services to debug service coordination issues quickly.",
      },
      {
        command: "docker compose down",
        description: "Stops and removes the Compose stack resources created for the environment.",
      },
    ],
    concepts: [
      "Containerization",
      "Image layering",
      "Networking",
      "Orchestration basics",
      "Deployment strategies",
    ],
    references: [
      {
        title: "Production Dockerfile",
        description:
          "Use a multi-stage Dockerfile to keep runtime images smaller and avoid shipping build tooling to production.",
        language: "dockerfile",
        code: `FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
EXPOSE 3000
CMD ["npm", "start"]`,
      },
      {
        title: "Docker Compose Stack",
        description:
          "Compose is useful for local integration environments where the app, database, and cache need to boot together.",
        language: "yaml",
        code: `version: "3.9"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://postgres:postgres@db:5432/interview_hub
      REDIS_URL: redis://cache:6379
    depends_on:
      - db
      - cache

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: interview_hub
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:`,
      },
    ],
  },
  {
    id: "cicd",
    label: "CI/CD",
    accent: "from-violet-500/20 via-fuchsia-500/10 to-pink-500/20",
    commands: [
      {
        command: "See workflow references below.",
        description:
          "This module uses full workflow files instead of one-line shell commands because CI/CD is defined declaratively.",
      },
    ],
    concepts: [
      "Continuous Integration",
      "Continuous Deployment",
      "Pipeline architecture",
      "Automation workflows",
      "Release strategies",
    ],
    references: [
      {
        title: "GitHub Actions Workflow For GCP VM",
        description:
          "Use this workflow to run CI on pull requests and deploy to a GCP VM over SSH on `main`.",
        language: "yaml",
        code: `name: CI/CD to GCP VM

on:
  pull_request:
  push:
    branches:
      - main
  workflow_dispatch:

env:
  PYTHON_VERSION: "3.11"
  APP_DIR: \${{ vars.GCP_VM_APP_DIR || format('/home/{0}/psvbot', secrets.GCP_VM_USER) }}
  SERVICE_NAME: \${{ vars.GCP_VM_SERVICE_NAME || 'psvbot' }}
  SSH_PORT: \${{ vars.GCP_VM_SSH_PORT || '22' }}
  APP_HOST: \${{ vars.GCP_VM_APP_HOST || '127.0.0.1' }}
  APP_PORT: \${{ vars.GCP_VM_APP_PORT || '8001' }}

jobs:
  ci:
    name: CI
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: \${{ env.PYTHON_VERSION }}
          cache: pip

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Run smoke checks
        run: |
          python -m compileall app main.py
          python -c "import main"

  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    needs: ci
    if: github.event_name != 'pull_request' && github.ref == 'refs/heads/main'
    environment: production

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Copy project to VM
        uses: appleboy/scp-action@v1.0.0
        with:
          host: \${{ secrets.GCP_VM_HOST }}
          username: \${{ secrets.GCP_VM_USER }}
          key: \${{ secrets.VM_SSH_KEY }}
          port: \${{ env.SSH_PORT }}
          source: "app,scripts,.github,main.py,requirements.txt,README.md,run.sh,dockerfile,.env.example"
          target: \${{ env.APP_DIR }}
          overwrite: true
          rm: false
          strip_components: 0
          tar_dereference: true

      - name: Deploy on VM
        uses: appleboy/ssh-action@v1.2.4
        env:
          APP_DIR: \${{ env.APP_DIR }}
          SERVICE_NAME: \${{ env.SERVICE_NAME }}
          APP_HOST: \${{ env.APP_HOST }}
          APP_PORT: \${{ env.APP_PORT }}
          APP_ENV_FILE: \${{ secrets.APP_ENV_FILE }}
          EXPECTED_BUILD_SHA: \${{ github.sha }}
        with:
          host: \${{ secrets.GCP_VM_HOST }}
          username: \${{ secrets.GCP_VM_USER }}
          key: \${{ secrets.VM_SSH_KEY }}
          port: \${{ env.SSH_PORT }}
          envs: APP_DIR,SERVICE_NAME,APP_HOST,APP_PORT,APP_ENV_FILE,EXPECTED_BUILD_SHA
          script: |
            cd "$APP_DIR"
            chmod +x scripts/deploy_gcp_vm.sh
            ./scripts/deploy_gcp_vm.sh`,
      },
      {
        title: "GCP VM Deploy Script",
        description:
          "Place this at `scripts/deploy_gcp_vm.sh`. It provisions the virtualenv, installs dependencies, writes a systemd service, and verifies health after deploy.",
        language: "bash",
        code: `#!/usr/bin/env bash
set -euo pipefail

APP_DIR="\${APP_DIR:?APP_DIR is required}"
SERVICE_NAME="\${SERVICE_NAME:?SERVICE_NAME is required}"
APP_MODULE="\${APP_MODULE:-main:app}"
APP_HOST="\${APP_HOST:-127.0.0.1}"
APP_PORT="\${APP_PORT:-8000}"
VENV_DIR="\${VENV_DIR:-$APP_DIR/venv}"
SERVICE_FILE="/etc/systemd/system/\${SERVICE_NAME}.service"
HEALTHCHECK_HOST="\${HEALTHCHECK_HOST:-127.0.0.1}"
HEALTHCHECK_URL="\${HEALTHCHECK_URL:-http://\${HEALTHCHECK_HOST}:\${APP_PORT}/health}"
EXPECTED_BUILD_SHA="\${EXPECTED_BUILD_SHA:-}"
LOG_LINES="\${LOG_LINES:-100}"

run_as_root() {
  if [ "$(id -u)" -eq 0 ]; then
    "$@"
  else
    sudo -n "$@"
  fi
}

print_failure_logs() {
  echo "----- systemctl status \${SERVICE_NAME} -----"
  run_as_root systemctl --no-pager --full status "\${SERVICE_NAME}" || true
  echo "----- journalctl \${SERVICE_NAME} -----"
  run_as_root journalctl -u "\${SERVICE_NAME}" -n "\${LOG_LINES}" --no-pager || true
}

wait_for_healthcheck() {
  local attempts=15
  local sleep_seconds=2
  local response=""

  for _ in $(seq 1 "\${attempts}"); do
    response="$(curl -fsS "\${HEALTHCHECK_URL}" 2>/dev/null || true)"
    if [ -n "\${response}" ]; then
      if [ -z "\${EXPECTED_BUILD_SHA}" ] || printf '%s' "\${response}" | grep -F "\\"build_sha\\":\\"\${EXPECTED_BUILD_SHA}\\"" >/dev/null 2>&1; then
        echo "Health check passed: \${HEALTHCHECK_URL}"
        return 0
      fi
    fi
    sleep "\${sleep_seconds}"
  done

  echo "Health check failed: \${HEALTHCHECK_URL}"
  [ -n "\${response}" ] && echo "Last health response: \${response}"
  return 1
}

stop_port_processes() {
  local pids=""

  if command -v lsof >/dev/null 2>&1; then
    pids="$(lsof -tiTCP:\${APP_PORT} -sTCP:LISTEN 2>/dev/null || true)"
  elif command -v fuser >/dev/null 2>&1; then
    pids="$(fuser "\${APP_PORT}/tcp" 2>/dev/null || true)"
  fi

  if [ -n "\${pids}" ]; then
    echo "Stopping existing process(es) on port \${APP_PORT}: \${pids}"
    for pid in \${pids}; do
      run_as_root kill -9 "\${pid}" >/dev/null 2>&1 || true
    done
  fi
}

setup_venv() {
  if [ ! -d "\${VENV_DIR}" ]; then
    python3 -m venv "\${VENV_DIR}"
  fi

  . "\${VENV_DIR}/bin/activate"
  python -m pip install --upgrade pip
  python -m pip install -r "\${APP_DIR}/requirements.txt"
  python -m playwright install chromium

  if [ ! -x "\${VENV_DIR}/bin/uvicorn" ]; then
    echo "uvicorn is not installed in \${VENV_DIR}"
    exit 1
  fi
}

deploy_systemd() {
  local tmp_service_file
  tmp_service_file="$(mktemp)"

  cat > "\${tmp_service_file}" <<EOF
[Unit]
Description=\${SERVICE_NAME} FastAPI service
After=network.target

[Service]
Type=simple
User=$(id -un)
WorkingDirectory=\${APP_DIR}
Environment=PATH=\${VENV_DIR}/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
EnvironmentFile=-\${APP_DIR}/.env
ExecStart=\${VENV_DIR}/bin/uvicorn \${APP_MODULE} --host \${APP_HOST} --port \${APP_PORT}
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

  run_as_root install -m 0644 "\${tmp_service_file}" "\${SERVICE_FILE}"
  rm -f "\${tmp_service_file}"

  run_as_root systemctl stop "\${SERVICE_NAME}" || true
  stop_port_processes
  run_as_root systemctl daemon-reload
  run_as_root systemctl enable "\${SERVICE_NAME}"
  run_as_root systemctl start "\${SERVICE_NAME}"

  if ! run_as_root systemctl is-active --quiet "\${SERVICE_NAME}"; then
    print_failure_logs
    exit 1
  fi

  if ! wait_for_healthcheck; then
    print_failure_logs
    exit 1
  fi

  echo "Deployment completed successfully."
}

main() {
  [ ! -d "\${APP_DIR}" ] && echo "App directory not found: \${APP_DIR}" && exit 1
  [ ! -f "\${APP_DIR}/main.py" ] && echo "main.py not found in \${APP_DIR}" && exit 1
  [ ! -f "\${APP_DIR}/requirements.txt" ] && echo "requirements.txt not found in \${APP_DIR}" && exit 1

  cd "\${APP_DIR}"

  if [ -n "\${APP_ENV_FILE:-}" ]; then
    printf '%s' "\${APP_ENV_FILE}" > "\${APP_DIR}/.env"
    chmod 600 "\${APP_DIR}/.env"
  fi

  if [ -n "\${EXPECTED_BUILD_SHA}" ]; then
    if [ -f "\${APP_DIR}/.env" ]; then
      grep -v '^APP_BUILD_SHA=' "\${APP_DIR}/.env" > "\${APP_DIR}/.env.tmp" || true
      mv "\${APP_DIR}/.env.tmp" "\${APP_DIR}/.env"
    fi
    printf '\\nAPP_BUILD_SHA=%s\\n' "\${EXPECTED_BUILD_SHA}" >> "\${APP_DIR}/.env"
    chmod 600 "\${APP_DIR}/.env"
  fi

  find "\${APP_DIR}" -type d -name __pycache__ -prune -exec rm -rf {} +
  find "\${APP_DIR}" -type f \\( -name '*.pyc' -o -name '*.pyo' \\) -delete

  setup_venv
  deploy_systemd
}

trap 'print_failure_logs' ERR
main "$@"`,
      },
    ],
  },
  {
    id: "postgres",
    label: "PostgreSQL Deployment",
    accent: "from-sky-500/20 via-cyan-500/10 to-emerald-500/20",
    commands: [
      {
        command: "AWS Console > RDS > Create database",
        description:
          "Use the AWS console flow to create a managed PostgreSQL database through RDS or Aurora PostgreSQL.",
      },
      {
        command: "Inbound rule: Custom TCP 5432 from <your-public-ip>/32",
        description:
          "Allow local pgAdmin access through the database security group. Prefer a single trusted IP over public access.",
      },
    ],
    concepts: [
      "Amazon RDS",
      "Aurora PostgreSQL",
      "Database instance sizing",
      "Security groups",
      "pgAdmin connectivity",
    ],
    deploymentSteps: [
      {
        title: "Search for RDS or Aurora",
        description:
          "Open the AWS console and search for RDS or Aurora, depending on whether you need standard managed PostgreSQL or the Aurora PostgreSQL engine.",
      },
      {
        title: "Create the PostgreSQL database",
        description:
          "Select Create database, choose the database creation method, and select PostgreSQL from the engine options. Use Aurora PostgreSQL only when the project requires Aurora features.",
      },
      {
        title: "Configure the database requirements",
        description:
          "Set the DB instance identifier, master username, password, instance class, storage, network, backups, monitoring, and any environment-specific requirements.",
        details: [
          "Keep production databases in private subnets when possible.",
          "Store passwords in a secret manager instead of sharing them in plain text.",
        ],
      },
      {
        title: "Create the instance and wait",
        description:
          "Create the DB instance and wait until AWS shows the status as Available before trying to connect or update application configuration.",
      },
      {
        title: "Allow local pgAdmin access",
        description:
          "Update the database security group inbound rules so your local machine can connect from pgAdmin.",
        details: [
          "Use PostgreSQL or Custom TCP as the rule type.",
          "Set the port to 5432.",
          "Use your public IP with /32 as the source for normal access.",
          "Use 0.0.0.0/0 only for temporary testing, then remove it immediately because it allows all IPs.",
        ],
      },
    ],
  },
  {
    id: "git",
    label: "Git",
    accent: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    commands: [
      {
        command: "git init",
        description: "Initializes a new local Git repository in the current project directory.",
      },
      {
        command: "git clone <url>",
        description:
          "Clones a remote repository locally with its branches, refs, and full commit history.",
      },
      {
        command: "git status",
        description:
          "Shows the working tree, staged changes, and untracked files before you commit or switch branches.",
      },
      {
        command: "git add .",
        description: "Stages current changes so they become part of the next commit snapshot.",
      },
      {
        command: "git commit -m \"message\"",
        description:
          "Creates a commit from staged changes with a message that explains the purpose of the change.",
      },
      {
        command: "git commit --amend",
        description:
          "Rewrites the last local commit, commonly used to fix the message or include forgotten files.",
      },
      {
        command: "git switch -c feature/auth",
        description:
          "Creates a new feature branch and switches to it immediately for isolated implementation work.",
      },
      {
        command: "git branch -m old-name new-name",
        description: "Renames a branch locally without changing its commit history.",
      },
      {
        command: "git push -u origin main",
        description:
          "Pushes the branch to the remote and sets upstream tracking for simpler future push and pull commands.",
      },
      {
        command: "git fetch --all",
        description:
          "Fetches updates from all remotes without merging them into your current branch automatically.",
      },
      {
        command: "git rebase main",
        description:
          "Replays your branch commits on top of `main` to reduce merge noise before opening or updating a PR.",
      },
      {
        command: "git reflog",
        description:
          "Shows local reference movements so you can recover commits after resets, rebases, or detached HEAD mistakes.",
      },
    ],
    concepts: [
      "Distributed version control",
      "Branching workflows",
      "History management",
      "Remote collaboration",
      "Recovery and troubleshooting",
    ],
  },
];

export { dockerInterviewSections, cicdInterviewSections };

export const gitInterviewSections: GitInterviewSection[] = [
  {
    section: "Git",
    questions: [
      {
        q: "What is Git and why is it used?",
        a: "Git is a distributed version control system optimized for tracking history, branching safely, and enabling collaborative software delivery with recoverable change management.",
        command: "git init",
      },
      {
        q: "Git vs GitHub vs GitLab",
        a: "Git is the version control engine. GitHub and GitLab are collaboration platforms layered on top for remotes, pull requests, permissions, automation, and code review workflows.",
      },
      {
        q: "What is a repository?",
        a: "A repository is the full tracked project history plus metadata and references. In Git, every clone has the full history, which is why local branching and recovery are powerful.",
      },
      {
        q: "What is commit history?",
        a: "Commit history is the directed graph of snapshots and parent relationships. Senior engineers use it not just to see change order, but to reason about release lineage and recovery paths.",
      },
      {
        q: "What is HEAD in Git?",
        a: "HEAD is the current checkout reference, usually pointing to the current branch tip. In detached HEAD state it points directly to a commit instead of a branch name.",
      },
      {
        q: "Working tree vs staging area vs repository",
        a: "The working tree is your current filesystem state, the index/staging area is the proposed next snapshot, and the repository stores committed history. Understanding those boundaries is essential for safe undo operations.",
        command: "git status",
      },
      {
        q: "Why does distributed version control matter?",
        a: "Because every engineer has local history, branching, and recovery capabilities without round-tripping to a central server. That improves resilience and makes advanced workflows practical.",
      },
      {
        q: "How do you initialize or clone a repository?",
        a: "Use `git init` for a new repository and `git clone` for an existing remote. Cloning brings down branches, refs, and full history, not just files.",
        command: "git clone <url>",
      },
      {
        q: "How do staging and commit flow work daily?",
        a: "You stage the intended snapshot and then commit it with a message that explains why the change exists. High-signal commits make review and rollback materially easier.",
        command: "git add . && git commit -m \"message\"",
      },
      {
        q: "When should you use `git commit --amend`?",
        a: "Use it to fix the most recent local commit before it becomes shared history. After pushing, amend becomes a history rewrite and requires coordination.",
        command: "git commit --amend",
      },
      {
        q: "How do you create, switch, list, delete, or rename branches?",
        a: "Branches are lightweight references, so branch workflows are cheap. Good teams use them intentionally for review isolation, not as long-lived divergence points.",
        command: "git switch -c feature/auth",
      },
      {
        q: "What is a feature branch workflow?",
        a: "A feature branch workflow isolates changes for review and testing before integration. It scales well for many teams, but branch lifetime must stay short to avoid merge pain.",
      },
      {
        q: "GitFlow vs trunk-based development tradeoffs",
        a: "GitFlow adds structure for release management but can slow integration. Trunk-based development optimizes for frequent integration and smaller diffs, but demands stronger automation and discipline.",
      },
      {
        q: "What is a pull request workflow in practice?",
        a: "A PR workflow is not just code review. It is the control point for validation, discussion, ownership, deployment safety, and protected-branch policy enforcement.",
      },
      {
        q: "How do remotes and origin work?",
        a: "A remote is a named reference to another repository location. `origin` is just the default conventional name, not a special Git keyword.",
        command: "git remote -v",
      },
      {
        q: "How do you add, change, or remove a remote?",
        a: "Remote management matters in migrations, forks, and repository moves. It is simple mechanically, but easy to misconfigure in enterprise environments if URLs and permissions drift.",
        command: "git remote set-url origin <new-url>",
      },
      {
        q: "What is the difference between fetch and pull?",
        a: "`fetch` updates remote tracking refs safely without touching your working branch. `pull` fetches and then integrates, which is why many teams prefer fetch-first visibility in shared branches.",
        command: "git fetch --all",
      },
      {
        q: "How should you think about merge vs rebase?",
        a: "Merge preserves branch history exactly; rebase rewrites local commits onto a new base for a cleaner history. Rebase is great before sharing, but dangerous on already shared branches unless coordinated.",
        command: "git rebase main",
      },
      {
        q: "Fast-forward merge vs merge commit",
        a: "Fast-forward keeps history linear when no divergence exists, while a merge commit preserves branch topology explicitly. Teams choose based on readability, auditability, and workflow style.",
      },
      {
        q: "When is cherry-pick useful?",
        a: "Cherry-pick is useful when you need one specific commit without merging an entire branch, such as hotfix backports. Overuse can fragment history and duplicate change paths.",
        command: "git cherry-pick <commit-id>",
      },
      {
        q: "How do you squash commits safely?",
        a: "Squashing is best used to present clean review history before merge. It reduces noise, but over-squashing can erase useful development context for debugging later.",
        command: "git rebase -i HEAD~5",
      },
      {
        q: "How should conflict resolution be handled in teams?",
        a: "Resolve conflicts with semantic understanding, rerun tests, and prefer small frequent integrations so conflicts reflect real logic changes rather than long-lived branch drift.",
      },
      {
        q: "What are protected branches and why do they matter?",
        a: "Protected branches enforce review, status checks, and restricted push rights. They are governance controls that keep shared history stable in larger teams.",
      },
      {
        q: "What is the difference between soft, mixed, and hard reset?",
        a: "Soft reset moves HEAD and keeps index/worktree, mixed reset moves HEAD and resets staging, and hard reset discards staged and working changes. Only hard reset is truly destructive locally.",
        command: "git reset --soft HEAD~1",
      },
      {
        q: "When should you use revert instead of reset?",
        a: "Use `revert` for shared history because it creates a new commit that undoes an earlier one safely. `reset` rewrites local branch state and is usually for unpublished history manipulation.",
        command: "git revert <commit-id>",
      },
      {
        q: "How do you restore a deleted or changed file safely?",
        a: "Use restore when you want to reset file content from HEAD or unstage changes without rewriting commit history.",
        command: "git restore file.txt",
      },
      {
        q: "What is reflog and why is it so important?",
        a: "Reflog records local reference movements, which makes it one of the best recovery tools after bad rebases, resets, or detached HEAD mistakes. It often saves apparently lost work.",
        command: "git reflog",
      },
      {
        q: "What is the difference between `git log` and `git reflog`?",
        a: "`git log` shows reachable commit history; `reflog` shows local reference movement history, including commits that may no longer be reachable from branches.",
      },
      {
        q: "How should stash be used in real workflows?",
        a: "Stash is useful for short-lived context switching, but not as long-term storage. If work matters, a branch or commit is usually safer than relying on stash state.",
        command: "git stash",
      },
      {
        q: "How do you inspect and reapply stashed work?",
        a: "List stashes explicitly, then apply or pop the one you actually want. Blind stash usage becomes risky in long-running multi-task workflows.",
        command: "git stash list",
      },
      {
        q: "How do you undo the last commit but keep the changes?",
        a: "Use a soft reset when you want to rewrite the commit boundary without losing the content. This is a common cleanup move before pushing.",
        command: "git reset --soft HEAD~1",
      },
      {
        q: "How do you remove a file from staging without losing the edit?",
        a: "Restore the file from the index state only, which keeps the working tree change intact while removing it from the next commit.",
        command: "git restore --staged file.txt",
      },
      {
        q: "How do you compare changes between branches?",
        a: "Branch diffs are essential for code review sanity, release verification, and understanding divergence before merge or rebase operations.",
        command: "git diff main..feature/auth",
      },
      {
        q: "How do you find who changed a line?",
        a: "Use blame as a starting point for history investigation, but do not confuse line authorship with actual ownership or design intent without reading surrounding commits and PR context.",
        command: "git blame file.ts",
      },
      {
        q: "What is detached HEAD and when does it matter?",
        a: "Detached HEAD means you are checked out to a commit, not a branch. It is useful for inspection or temporary experimentation, but commits there can be lost unless attached to a branch.",
      },
      {
        q: "Why is `git push --force` dangerous?",
        a: "Because it overwrites remote history without checking whether someone else advanced the branch. On shared branches that can erase teammates’ commits from the visible branch tip.",
      },
      {
        q: "Why is `--force-with-lease` safer than `--force`?",
        a: "It refuses to overwrite remote history if the remote branch changed unexpectedly. It is the safer default when history rewriting is intentionally required.",
        command: "git push --force-with-lease",
      },
      {
        q: "What are submodules and when do they create pain?",
        a: "Submodules let one repository track another at a fixed commit, but they add coordination overhead, onboarding friction, and version drift issues if teams are not disciplined.",
      },
      {
        q: "What are Git hooks useful for?",
        a: "Hooks help enforce local or server-side quality gates such as linting, formatting, signing, or policy checks. They are useful, but local hooks alone are never a substitute for centralized CI enforcement.",
      },
      {
        q: "Why use signed commits?",
        a: "Signed commits improve provenance and trust, especially in regulated or security-sensitive environments. They are part of supply-chain hygiene, not just personal preference.",
      },
    ],
  },
];
