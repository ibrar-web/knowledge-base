export type CloudDevopsQuestion = {
  question: string;
  shortAnswer: string;
  deepExplanation: string;
  useCase: string;
};

export type AwsInterviewQuestion = {
  q: string;
  a: string;
  code?: string;
};

export type AwsInterviewSection = {
  section:
    | "Core Concepts"
    | "Architecture & Core Services"
    | "Advanced Cloud Architecture, Scaling & Production Systems";
  questions: AwsInterviewQuestion[];
};

export type GcpInterviewQuestion = {
  q: string;
  a: string;
  code?: string;
};

export type GcpInterviewSection = {
  section:
    | "Core Concepts"
    | "Architecture & Core Services"
    | "Advanced Cloud Architecture, Scaling & Production Systems";
  questions: GcpInterviewQuestion[];
};

export type DockerInterviewQuestion = {
  q: string;
  a: string;
  code?: string;
};

export type DockerInterviewSection = {
  section: "Docker";
  questions: DockerInterviewQuestion[];
};

export type CicdInterviewQuestion = {
  q: string;
  a: string;
  code?: string;
};

export type CicdInterviewSection = {
  section: "CI/CD";
  questions: CicdInterviewQuestion[];
};

export type CloudDevopsTopic = {
  id: "aws" | "gcp";
  label: string;
  accent: string;
  commands: string[];
  concepts: string[];
  questions: CloudDevopsQuestion[];
};

export const cloudDevopsPrepTopics: CloudDevopsTopic[] = [
  {
    id: "aws",
    label: "AWS",
    accent: "from-amber-500/20 via-orange-500/10 to-yellow-500/20",
    commands: [
      "aws configure",
      "aws s3 ls",
      "aws ec2 describe-instances",
      "aws ecs list-services",
      "aws cloudwatch logs tail",
    ],
    concepts: [
      "EC2 architecture",
      "S3 storage system",
      "IAM security model",
      "Load balancing",
      "Auto scaling",
      "Cloud monitoring",
    ],
    questions: [
      {
        question: "What is AWS and how does cloud computing work?",
        shortAnswer:
          "AWS is a cloud platform that provides on-demand infrastructure and managed services so teams can build and run systems without owning physical hardware.",
        deepExplanation:
          "Cloud computing shifts compute, storage, networking, and platform operations into service-based infrastructure accessed over APIs. AWS offers these capabilities across many regions and service models, from raw virtual machines to managed serverless execution. Senior engineers care less about the marketing definition and more about the operating model: elasticity, regional architecture, failure domains, cost visibility, shared responsibility, and infrastructure as code. AWS is valuable because it lets teams provision resources quickly, but it also introduces architectural decisions around resilience, security boundaries, and operational maturity.",
        useCase:
          "A SaaS startup can deploy its API, object storage, monitoring, and queueing stack on AWS, expanding usage as customer traffic grows without buying and managing physical servers.",
      },
      {
        question: "Difference between EC2, ECS, and Lambda?",
        shortAnswer:
          "EC2 gives raw virtual machines, ECS orchestrates containers, and Lambda runs event-driven code without managing servers directly.",
        deepExplanation:
          "These services operate at different abstraction levels. EC2 gives maximum control but also the most operational responsibility. ECS runs containerized workloads and handles task scheduling and service management, reducing some host-level burden. Lambda abstracts infrastructure even further and is best for event-driven or bursty workloads with short execution patterns. Senior engineers choose based on runtime control, startup behavior, scaling characteristics, observability needs, and the operational model the team can sustain.",
        useCase:
          "A legacy service with custom OS dependencies may stay on EC2, a stateless API can run on ECS, and image thumbnail generation triggered by uploads can be implemented with Lambda.",
      },
      {
        question: "How does auto scaling work in AWS?",
        shortAnswer:
          "Auto scaling adjusts capacity based on demand, health, or schedules to maintain performance while avoiding overprovisioning.",
        deepExplanation:
          "AWS supports scaling at several layers including EC2 Auto Scaling Groups, ECS service scaling, and serverless concurrency behavior. Policies can respond to metrics like CPU, memory, request count, queue depth, or schedules. The senior-level challenge is selecting the right scaling signal and cooldown behavior so systems react to load without oscillating or scaling too late. Good auto scaling is not just about adding capacity; it also depends on instance warm-up, statelessness, readiness checks, and cost awareness.",
        useCase:
          "An ecommerce API can scale ECS tasks based on request rate during traffic spikes while background workers scale off queue depth during batch order ingestion windows.",
      },
      {
        question: "What is S3 and how is it used in production?",
        shortAnswer:
          "S3 is AWS object storage used for durable file storage, backups, logs, static assets, and data lake style workloads.",
        deepExplanation:
          "S3 stores objects in buckets with high durability and broad integration across AWS services. It is not a filesystem or low-latency database; it is object storage optimized for scalable access patterns and lifecycle management. Senior engineers use S3 with design considerations like access policy boundaries, lifecycle tiering, multipart uploads, event triggers, and consistency with upstream systems. It often becomes a central storage layer for assets, analytics inputs, and cross-service exchange.",
        useCase:
          "A media platform can store user uploads in S3, serve processed assets through a CDN, and archive old media into cheaper storage tiers automatically.",
      },
      {
        question: "What is IAM and how do you secure AWS resources?",
        shortAnswer:
          "IAM is AWS’s identity and access management system used to control who or what can access resources and under what permissions.",
        deepExplanation:
          "IAM governs users, roles, policies, trust relationships, and service permissions. The senior mindset is least privilege plus operational safety. That means avoiding long-lived credentials, using roles for workloads, scoping policies tightly, separating human and machine access, and auditing permission drift over time. IAM mistakes can become account-wide security incidents, so engineers should design access with boundaries, inheritance awareness, and strong review practices rather than broad administrative shortcuts.",
        useCase:
          "An ECS task that only uploads files to a specific S3 bucket should assume a tightly scoped task role instead of using broad account credentials baked into environment variables.",
      },
      {
        question: "How does AWS networking (VPC) work?",
        shortAnswer:
          "A VPC is an isolated virtual network where you define subnets, routing, gateways, and security boundaries for AWS resources.",
        deepExplanation:
          "VPC design is foundational because it determines how services communicate internally and externally. You define public and private subnets, route tables, security groups, network ACLs, internet gateways, NAT behavior, and peering or transit patterns between networks. Senior engineers design for segmentation, egress control, blast radius reduction, and service-to-service connectivity rather than just getting traffic to flow. Networking mistakes often become security or availability problems later.",
        useCase:
          "A production system can place load balancers in public subnets, application containers in private subnets, and databases in isolated private subnets with tightly controlled ingress paths.",
      },
      {
        question: "What is CloudWatch used for?",
        shortAnswer:
          "CloudWatch is AWS’s monitoring and observability service for metrics, logs, alarms, dashboards, and events.",
        deepExplanation:
          "CloudWatch helps teams track the health and behavior of AWS resources and applications. It collects infrastructure metrics, centralizes logs, emits alarms, and supports event-driven automation. Senior engineers go beyond default dashboards and define service-level indicators, alert thresholds, structured logging, and actionable alarms tied to real operational risk. Monitoring is only useful if it helps teams detect, diagnose, and respond to incidents quickly.",
        useCase:
          "A platform team can track ECS CPU saturation, ALB latency, error rates, and application logs in CloudWatch to detect degraded releases before customers escalate issues.",
      },
      {
        question: "How do you design a highly available system on AWS?",
        shortAnswer:
          "Design for high availability by removing single points of failure, spreading resources across failure domains, and automating recovery.",
        deepExplanation:
          "Highly available systems in AWS typically span multiple Availability Zones, use redundant load-balanced compute, managed databases with failover, durable storage, and health-aware deployment patterns. Senior engineers also consider dependency resilience, retries, queueing, graceful degradation, and disaster recovery posture beyond just uptime in one region. Availability is an architectural property that emerges from redundancy, failure handling, and operational readiness together.",
        useCase:
          "A customer-facing API can run ECS services in multiple AZs behind an ALB, use Multi-AZ database failover, and rely on S3 plus queue buffering so transient node failures do not take the platform down.",
      },
      {
        question: "What is load balancing in AWS?",
        shortAnswer:
          "Load balancing distributes traffic across multiple targets to improve availability, performance, and failure tolerance.",
        deepExplanation:
          "AWS provides different load balancer types such as Application Load Balancer, Network Load Balancer, and Gateway Load Balancer for different traffic profiles. Senior engineers think about protocol support, health checks, stickiness, TLS termination, path-based routing, and observability when selecting one. Load balancers are not just traffic splitters; they are critical control points for scaling, rollout patterns, and availability management.",
        useCase:
          "A multi-service platform can use an ALB to route `/api`, `/admin`, and `/webhooks` traffic to different ECS services with independent scaling and health checks.",
      },
      {
        question: "How do you optimize AWS cost in production systems?",
        shortAnswer:
          "Optimize AWS cost by matching service choice and capacity to workload behavior, eliminating waste, and monitoring spend continuously.",
        deepExplanation:
          "Cost optimization is a continuous engineering discipline, not a one-time review. Senior engineers right-size compute, use auto scaling effectively, choose reserved or savings plans where stable usage exists, lifecycle old storage, reduce noisy logs, and avoid overbuilding highly managed services where simpler options suffice. They also pair cost with performance and reliability, because the cheapest design is often unacceptable if it increases operational risk or slows product delivery.",
        useCase:
          "A mature SaaS workload may move stable baseline ECS usage to savings plans, archive old logs, downsize underutilized databases, and use spot workers for non-critical background jobs.",
      },
    ],
  },
  {
    id: "gcp",
    label: "GCP",
    accent: "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
    commands: [
      "gcloud auth login",
      "gcloud config set project my-project",
      "gcloud run deploy",
      "gcloud pubsub topics list",
      "gcloud compute instances list",
    ],
    concepts: [
      "Cloud Run architecture",
      "Pub/Sub messaging system",
      "Compute Engine",
      "Serverless model",
      "GCP networking",
    ],
    questions: [
      {
        question: "What is Google Cloud Platform?",
        shortAnswer:
          "Google Cloud Platform is Google’s cloud service ecosystem for compute, storage, networking, analytics, and managed application infrastructure.",
        deepExplanation:
          "GCP provides infrastructure and platform services similar to other major clouds, with notable strengths in data tooling, container operations, and Google-style managed services. Senior engineers evaluate GCP based on workload fit, operational ergonomics, networking patterns, IAM model, and service maturity relative to team expertise. Cloud choice is rarely about feature checklists alone; it is about how well the provider supports delivery speed, reliability, and cost goals for your system.",
        useCase:
          "A team with strong Kubernetes and data-processing workloads may choose GCP for services like Cloud Run, Pub/Sub, and BigQuery while standardizing deployment automation around gcloud and IaC.",
      },
      {
        question: "What is Cloud Run and how does it work?",
        shortAnswer:
          "Cloud Run is a serverless container platform that runs stateless services and scales them automatically based on incoming traffic or events.",
        deepExplanation:
          "Cloud Run lets teams deploy containers without managing servers or cluster orchestration directly. It scales instances up and down, including scale-to-zero for idle services, while abstracting much of the runtime management. Senior engineers still need to design around cold starts, request concurrency settings, stateless service assumptions, startup latency, and externalized state. Cloud Run is powerful for APIs and background services, but the service model has to fit the workload.",
        useCase:
          "A webhook processing service can run on Cloud Run, scaling up quickly during burst traffic and scaling back down when idle without dedicated host management.",
      },
      {
        question: "Difference between GCP and AWS?",
        shortAnswer:
          "Both are major cloud platforms, but they differ in service naming, operational ergonomics, ecosystem strengths, pricing behavior, and how teams typically approach architecture on them.",
        deepExplanation:
          "At a system level, the differences matter in IAM patterns, networking defaults, service integrations, and the relative maturity of specific offerings. AWS often provides broader service breadth and more granular infrastructure options, while GCP is frequently favored for data platforms, managed container workflows, and certain developer ergonomics. Senior engineers choose based on platform fit, team familiarity, and long-term operational tradeoffs rather than vendor branding.",
        useCase:
          "A data-heavy product may prefer GCP for analytics ecosystems, while a large enterprise with broad multi-service requirements and existing AWS experience may stay on AWS for operational consistency.",
      },
      {
        question: "What is Pub/Sub and how is it used?",
        shortAnswer:
          "Pub/Sub is GCP’s managed messaging service for decoupled event-driven communication between producers and consumers.",
        deepExplanation:
          "Pub/Sub enables asynchronous systems where publishers send messages to topics and subscribers consume them independently. This improves decoupling, resilience, and scalability by avoiding direct request chaining. Senior engineers design around delivery semantics, ordering, retries, dead-letter handling, idempotency, and subscriber scaling. Messaging helps absorb burst traffic and separate service lifecycles, but it also introduces distributed systems complexity that needs explicit handling.",
        useCase:
          "An order service can publish purchase events to Pub/Sub, allowing billing, notifications, and analytics consumers to process the same event independently.",
      },
      {
        question: "What is Compute Engine?",
        shortAnswer:
          "Compute Engine is GCP’s virtual machine service for running workloads that need operating system level control.",
        deepExplanation:
          "Compute Engine is closest to traditional infrastructure and is suitable when workloads need custom runtimes, specialized networking, or long-running process control that does not fit fully managed serverless models. Senior engineers still handle patching, instance lifecycle, scaling groups, and operational automation. The key decision is whether you truly need VM-level control or whether a higher-level service would reduce operational burden.",
        useCase:
          "A legacy backend with custom OS dependencies and long-lived background processes may run on Compute Engine while newer stateless APIs run on Cloud Run.",
      },
      {
        question: "How does GCP auto scaling work?",
        shortAnswer:
          "GCP auto scaling adjusts instance or service capacity based on metrics such as traffic, CPU, concurrency, or custom signals depending on the platform used.",
        deepExplanation:
          "Different GCP services scale differently. Cloud Run scales per request concurrency and load, while managed instance groups scale virtual machines based on compute or custom metrics. Senior engineers choose scaling signals that represent real workload pressure, then tune warm-up behavior and capacity limits to avoid instability. Good scaling requires understanding the application’s startup profile, queueing, and downstream dependency limits, not just setting a target CPU number.",
        useCase:
          "A bursty API on Cloud Run can scale rapidly with incoming traffic, while a compute-heavy batch processor on VMs may scale based on queue depth and CPU pressure together.",
      },
      {
        question: "What is Cloud Storage?",
        shortAnswer:
          "Cloud Storage is GCP’s object storage service for durable storage of files, assets, logs, backups, and data processing inputs.",
        deepExplanation:
          "Like other object storage systems, Cloud Storage is built for scalable object access rather than filesystem semantics. Senior engineers use it for artifact storage, media hosting, archival data, and service integration patterns where files need to move through asynchronous workflows. The deeper concerns include access control, lifecycle policies, storage classes, event triggers, and how data moves from ingestion to serving or processing pipelines.",
        useCase:
          "A document processing platform can upload incoming PDFs to Cloud Storage, trigger downstream processing, and archive older source files into cheaper classes automatically.",
      },
      {
        question: "How do you design microservices in GCP?",
        shortAnswer:
          "Design GCP microservices with clear service boundaries, managed runtime choices, async messaging, observability, and secure network and identity controls.",
        deepExplanation:
          "Microservices on GCP are less about picking products and more about defining reliable service contracts, ownership boundaries, and communication models. Cloud Run or GKE may host services, Pub/Sub may carry events, and managed data stores may hold state, but the senior design work is around consistency boundaries, retries, idempotency, tracing, and failure isolation. A weak service decomposition will fail regardless of platform quality.",
        useCase:
          "A marketplace platform can run separate catalog, checkout, and notification services on Cloud Run, using Pub/Sub for event propagation and centralized monitoring for request tracing.",
      },
      {
        question: "How does GCP handle networking?",
        shortAnswer:
          "GCP networking uses global and regional network services, VPCs, subnets, firewalls, load balancers, and private connectivity to control traffic flow.",
        deepExplanation:
          "GCP’s networking model differs from AWS in some important structural ways, including global VPC behavior and load balancer design. Senior engineers need to understand subnet layout, firewall policies, service exposure, private access, egress design, and inter-service communication patterns. Networking is where security, latency, and availability often intersect, so decisions here have long-term impact on architecture and operations.",
        useCase:
          "A production setup can expose public APIs through managed load balancers while keeping internal workloads on private subnets with controlled egress and service-to-service access rules.",
      },
      {
        question: "How do you monitor applications in GCP?",
        shortAnswer:
          "Applications in GCP are monitored through logs, metrics, traces, and alerting systems integrated into Google Cloud’s observability tooling.",
        deepExplanation:
          "Monitoring involves collecting infrastructure and application metrics, centralizing logs, tracing requests, and defining alerts tied to meaningful service health indicators. Senior engineers focus on operational usefulness: dashboards for diagnosis, alerts that reflect user impact, and correlation across services during incidents. Tools matter, but signal quality matters more. Poor alert design creates noise and hides real failures.",
        useCase:
          "A microservices platform can emit service latency, error rates, and structured logs into GCP monitoring tools so engineers can diagnose a failing rollout across multiple services quickly.",
      },
    ],
  },
];

export const awsInterviewSections: AwsInterviewSection[] = [
  {
    section: "Core Concepts",
    questions: [
      {
        q: "What is AWS and why is it used?",
        a: "AWS is a large-scale cloud platform used to provision infrastructure and managed services on demand. Teams use it to move faster operationally, scale globally, and avoid owning physical infrastructure.",
      },
      {
        q: "What is cloud computing and how do IaaS, PaaS, and SaaS differ?",
        a: "IaaS gives raw infrastructure control, PaaS gives managed application platforms, and SaaS delivers finished software. Real architectures often mix all three depending on control and operational burden.",
      },
      {
        q: "Regions vs Availability Zones vs Edge Locations",
        a: "Regions are isolated geographic areas, Availability Zones are separate failure domains inside a region, and Edge Locations bring caching or edge execution closer to users. They serve different resilience and latency goals.",
      },
      {
        q: "What is the Shared Responsibility Model in AWS?",
        a: "AWS secures the cloud infrastructure itself, while customers secure workloads, identities, data, and configuration inside that environment. Managed services reduce work, but never eliminate responsibility.",
      },
      {
        q: "How does AWS pricing work in practice?",
        a: "AWS pricing is usage-based, but real cost depends on traffic shape, data transfer, storage class, idle capacity, and architectural decisions. Pay-as-you-go is only efficient when systems are designed intentionally.",
      },
      {
        q: "What is high availability and fault tolerance on AWS?",
        a: "High availability aims to keep service accessible during failures, while fault tolerance aims to continue operating despite failures. On AWS, that usually means redundancy across AZs, automated recovery, and dependency-aware design.",
      },
    ],
  },
  {
    section: "Architecture & Core Services",
    questions: [
      {
        q: "How should you think about EC2 and instance types?",
        a: "EC2 gives VM-level control, and instance type selection is a workload decision around CPU, memory, storage, network performance, and cost. Right-sizing is both a performance and finance concern.",
      },
      {
        q: "What do Auto Scaling Groups actually solve?",
        a: "ASGs maintain desired capacity, replace unhealthy instances, and adjust fleet size with demand. They are effective only when the workload is stateless enough and scaling signals are chosen well.",
      },
      {
        q: "ALB vs NLB vs CLB differences",
        a: "ALB is best for Layer 7 HTTP routing, NLB suits high-performance Layer 4 traffic, and CLB is older legacy infrastructure. The choice depends on protocol needs, routing complexity, and operational features.",
      },
      {
        q: "When does Lambda fit well architecturally?",
        a: "Lambda fits event-driven, bursty, or operational workloads where infrastructure management should disappear. It is less ideal when startup latency, execution duration, or runtime control become dominant constraints.",
      },
      {
        q: "ECS vs EKS vs Fargate tradeoffs",
        a: "ECS is simpler for AWS-native container orchestration, EKS is better when Kubernetes portability or ecosystem depth matters, and Fargate removes host management but reduces some low-level control and cost efficiency options.",
      },
      {
        q: "How should you think about S3 architecture and use cases?",
        a: "S3 is durable object storage for assets, backups, logs, analytics inputs, and cross-service file exchange. It is not a low-latency database or general-purpose filesystem replacement.",
      },
      {
        q: "What matters about the S3 consistency model?",
        a: "S3 now provides strong read-after-write consistency for object operations, which simplifies many application patterns. Engineers still need to think about event timing and downstream system consistency.",
      },
      {
        q: "EBS vs EFS differences",
        a: "EBS is block storage attached to instances, optimized for single-instance persistence and performance tuning. EFS is network file storage for shared access across multiple compute nodes.",
      },
      {
        q: "Why do lifecycle policies and versioning matter in S3?",
        a: "They control retention, rollback, archival cost, and data safety. Without them, storage cost and accidental deletion risk grow quietly over time.",
      },
      {
        q: "How should VPC architecture be designed?",
        a: "A good VPC design separates public and private workloads, controls egress, constrains blast radius, and makes service communication explicit through subnets, route tables, gateways, and security rules.",
      },
      {
        q: "Security Groups vs NACLs",
        a: "Security Groups are stateful instance or ENI-level controls, while NACLs are stateless subnet-level controls. In practice, Security Groups are the main control and NACLs are coarser secondary controls.",
      },
      {
        q: "What role does Route 53 play beyond DNS?",
        a: "Route 53 is not just domain resolution; it is also part of traffic routing, failover, weighted rollout, latency-based policies, and health-aware endpoint selection.",
      },
      {
        q: "When do VPC peering and Transit Gateway matter?",
        a: "Peering works for simpler point-to-point network relationships. Transit Gateway is better when many VPCs, accounts, or hybrid routes need centralized connectivity governance.",
      },
      {
        q: "RDS vs DynamoDB tradeoffs",
        a: "RDS suits relational workloads with joins and transactional consistency. DynamoDB suits high-scale key-value or document access with predictable access patterns and distributed scaling needs.",
      },
      {
        q: "Read replicas vs Multi-AZ deployments",
        a: "Read replicas help scale read traffic and offload queries, while Multi-AZ improves failover and availability. They solve different problems and are often used together.",
      },
      {
        q: "Why use ElastiCache with Redis or Memcached?",
        a: "ElastiCache reduces latency and backend pressure for hot data. Redis adds richer data structures and durability options, while Memcached stays simpler for pure ephemeral cache workloads.",
      },
      {
        q: "How should IAM users, roles, and policies be designed?",
        a: "Prefer roles and temporary credentials over long-lived user secrets for workloads. Policies should follow least privilege and be shaped around real access boundaries, not convenience.",
      },
      {
        q: "What is STS and why do temporary credentials matter?",
        a: "STS issues short-lived credentials, which reduce blast radius and support secure workload identity patterns across accounts and services.",
      },
      {
        q: "How should Cognito be evaluated architecturally?",
        a: "Cognito can accelerate identity flows, but teams should evaluate whether its customization model, auth UX needs, and operational tradeoffs fit the product rather than adopting it by default.",
      },
      {
        q: "KMS encryption and key management tradeoffs",
        a: "KMS centralizes key policy and auditability, but key design still matters: who can decrypt, how cross-account access works, and whether envelope encryption or service-managed integration is sufficient.",
      },
      {
        q: "Secrets Manager vs Parameter Store",
        a: "Secrets Manager is better for managed secret rotation and secret-focused workflows, while Parameter Store works well for broader configuration storage with lighter requirements.",
      },
      {
        q: "What does good VPC security architecture look like?",
        a: "Sensitive systems belong in private networks, ingress is minimized, east-west access is explicit, egress is controlled, and identity plus network policy work together rather than independently.",
      },
    ],
  },
  {
    section: "Advanced Cloud Architecture, Scaling & Production Systems",
    questions: [
      {
        q: "Horizontal vs vertical scaling tradeoffs on AWS",
        a: "Vertical scaling is simpler but limited and risky during instance failure. Horizontal scaling improves resilience and elasticity, but requires statelessness, coordination, and better observability.",
      },
      {
        q: "Multi-AZ vs Multi-region architecture",
        a: "Multi-AZ handles local failure domains inside a region. Multi-region handles regional disasters, sovereignty, or global latency, but adds much more complexity around data, routing, and operations.",
      },
      {
        q: "How should disaster recovery be framed using RPO and RTO?",
        a: "RPO defines acceptable data loss; RTO defines acceptable recovery time. DR architecture should be justified by business impact, not by copying the most expensive resilience pattern everywhere.",
      },
      {
        q: "What load balancing strategies matter at scale?",
        a: "Use layered load balancing intentionally: edge/CDN for global entry, regional L7 balancing for app routing, and internal balancing for service traffic. Each layer solves a different problem.",
      },
      {
        q: "How does CloudFront fit into global architecture?",
        a: "CloudFront reduces latency, offloads origin traffic, and adds edge security and caching policy control. It is most effective when cache strategy is designed around asset and API behavior.",
      },
      {
        q: "How should microservices be designed on AWS?",
        a: "Use clear service boundaries, independent deployability, asynchronous messaging where it helps, and strong observability. AWS services help, but weak boundaries still create distributed monoliths.",
      },
      {
        q: "How do SQS, SNS, and EventBridge differ for service communication?",
        a: "SQS is queue-based decoupling, SNS is pub-sub fanout, and EventBridge is event bus routing across systems and accounts. The choice depends on delivery shape, fanout, and event governance needs.",
      },
      {
        q: "What is the API Gateway role in microservices?",
        a: "API Gateway is the edge boundary for routing, authentication, throttling, and client-facing API policies. It should simplify client access, not become a business-logic dumping ground.",
      },
      {
        q: "What do event-driven architectures look like at scale on AWS?",
        a: "They rely on durable messaging, idempotent consumers, retry policy, dead-letter handling, and well-defined event contracts. AWS provides the building blocks, but correctness comes from architecture discipline.",
      },
      {
        q: "How should serverless microservices be evaluated?",
        a: "They can accelerate delivery and reduce ops burden, but cold starts, debugging complexity, service sprawl, and event choreography become real concerns at scale.",
      },
      {
        q: "What caching strategies matter across AWS systems?",
        a: "Use CloudFront for edge caching, Redis for shared low-latency application data, and local caches only when per-instance inconsistency is acceptable. Invalidation strategy is the hard part.",
      },
      {
        q: "How do you optimize latency on AWS?",
        a: "Reduce network hops, place workloads near users or dependencies, cache aggressively where safe, choose the right storage or database model, and avoid cross-region chatter in hot paths.",
      },
      {
        q: "How should AWS cost optimization be approached in production?",
        a: "Optimize architecture, not just invoices: right-size services, remove idle resources, tune logging and storage retention, use reserved or savings plans intentionally, and choose managed vs self-managed tradeoffs carefully.",
      },
      {
        q: "Spot vs On-Demand vs Reserved tradeoffs",
        a: "Spot is cheapest but interruptible, On-Demand is flexible but expensive, and Reserved or Savings Plans lower cost for predictable usage. Mature systems mix them by workload criticality.",
      },
      {
        q: "CloudFormation vs Terraform tradeoffs",
        a: "CloudFormation is tightly integrated with AWS and often simpler for AWS-only shops. Terraform is stronger for multi-cloud or broader ecosystem workflows, but introduces another abstraction layer to manage.",
      },
      {
        q: "What does good CI/CD on AWS look like?",
        a: "Pipelines should build immutable artifacts, validate infrastructure and application changes, deploy safely with health checks, and support rollback without relying on manual heroics.",
      },
      {
        q: "Blue/Green vs Canary vs Rolling updates",
        a: "Blue/Green gives clean cutover and easier rollback, Canary reduces blast radius gradually, and Rolling is simpler but riskier when health verification is weak. Use the strategy that matches system criticality and state coupling.",
      },
      {
        q: "What are good Infrastructure as Code practices on AWS?",
        a: "Keep modules composable, validate plans, avoid manual drift, separate environment concerns cleanly, and treat infrastructure reviews with the same rigor as application code.",
      },
      {
        q: "How should CloudWatch, CloudTrail, and X-Ray be used together?",
        a: "CloudWatch gives metrics and logs, CloudTrail gives audit history, and X-Ray helps trace distributed request paths. Together they create operational visibility across runtime, control plane, and request flow.",
      },
      {
        q: "What does good centralized logging architecture look like?",
        a: "Use structured logs, centralized aggregation, correlation IDs, retention policy, and searchable contexts tied to services and environments. Logging should support incident response, not just storage.",
      },
      {
        q: "How should alerting be designed in production AWS systems?",
        a: "Alert on user-impacting symptoms and dependency saturation, not every low-level metric. Good alerts are actionable, low-noise, and mapped to ownership.",
      },
      {
        q: "How would you think about Netflix/Uber/WhatsApp scale on AWS?",
        a: "At that scale, the challenge is not choosing services but controlling failure domains, global traffic routing, async workflows, observability, cost, and team ownership across many independent subsystems.",
      },
      {
        q: "How should a multi-tenant SaaS architecture be designed on AWS?",
        a: "Tenant isolation can be logical or physical depending on risk, scale, and compliance. Identity, data access, caching, and observability all need tenant-aware boundaries.",
      },
      {
        q: "How do you handle millions of concurrent users on AWS?",
        a: "Use horizontally scalable ingress, aggressive edge caching, stateless compute tiers, async processing, partitioned data design, and constant load testing against real bottlenecks.",
      },
      {
        q: "How do consistency vs availability tradeoffs show up on AWS systems?",
        a: "The CAP theorem appears in replicated data systems, cross-region workflows, and event-driven processing. Engineers must choose where strong consistency matters and where eventual consistency is acceptable.",
      },
      {
        q: "When does hybrid cloud architecture make sense?",
        a: "Hybrid cloud is justified when regulatory, latency, legacy, or migration realities require it. It adds operational complexity, so it should be a constraint-driven decision, not a default aspiration.",
      },
      {
        q: "What is Lambda@Edge useful for?",
        a: "Lambda@Edge lets you execute logic near the user for request or response manipulation, auth hints, and content adaptation. It is powerful, but debugging and rollout discipline matter because it runs globally.",
      },
    ],
  },
];

export const gcpInterviewSections: GcpInterviewSection[] = [
  {
    section: "Core Concepts",
    questions: [
      {
        q: "What is GCP and how does it differ from AWS and Azure?",
        a: "GCP is Google’s cloud platform with strong strengths in global networking, data platforms, and managed container/serverless services. Compared with AWS and Azure, it often feels more opinionated around global infrastructure and data-first workloads.",
      },
      {
        q: "How do IaaS, PaaS, and SaaS appear in a GCP context?",
        a: "IaaS is services like Compute Engine, PaaS is services like App Engine or Cloud Run, and SaaS is finished software offerings. Real systems often mix layers rather than choosing one model exclusively.",
      },
      {
        q: "Regions, zones, and multi-region architecture in GCP",
        a: "Regions group zones, zones are failure domains, and multi-region design spans geographic areas for resilience or latency goals. Each level carries different cost and consistency tradeoffs.",
      },
      {
        q: "What is the Shared Responsibility Model in GCP?",
        a: "Google secures the underlying platform, while customers own workload configuration, identity policy, data handling, and application-layer security. Managed services reduce effort, not accountability.",
      },
      {
        q: "What is distinctive about GCP’s global infrastructure design philosophy?",
        a: "GCP emphasizes globally designed networking and managed control planes. That changes how architects think about load balancing, VPC scope, and cross-region traffic compared with more region-first mental models.",
      },
      {
        q: "How should billing and cost structure be approached in GCP?",
        a: "Cost should be evaluated through workload shape, egress, managed service pricing, idle capacity, and operational overhead. The cheapest architecture on paper can still be expensive if it creates inefficiency elsewhere.",
      },
    ],
  },
  {
    section: "Architecture & Core Services",
    questions: [
      {
        q: "When should you use Compute Engine?",
        a: "Use Compute Engine when you need VM-level control, custom runtimes, specific OS behavior, or workloads that do not fit managed serverless or container platforms cleanly.",
      },
      {
        q: "When does GKE make sense architecturally?",
        a: "GKE fits when teams need Kubernetes-level control, advanced scheduling, platform standardization, or complex multi-service orchestration that exceeds simpler serverless models.",
      },
      {
        q: "When should you choose Cloud Run?",
        a: "Cloud Run is strong for stateless containerized services where teams want fast delivery, autoscaling, and minimal infrastructure management. It is less ideal when deep runtime control or heavyweight always-on processes dominate.",
      },
      {
        q: "What is the right use case for Cloud Functions?",
        a: "Cloud Functions fit smaller event-driven handlers and lightweight integrations. For larger service boundaries, Cloud Run often becomes the more maintainable serverless choice.",
      },
      {
        q: "Where does App Engine still fit?",
        a: "App Engine can still work well when teams want a managed application platform with minimal operational control, but many modern architectures choose Cloud Run or GKE for greater flexibility.",
      },
      {
        q: "Cloud Run vs GKE tradeoffs",
        a: "Cloud Run optimizes for simplicity and speed of operation, while GKE optimizes for control and complex platform needs. The tradeoff is operational burden versus runtime flexibility.",
      },
      {
        q: "How should Cloud Storage be used architecturally?",
        a: "Cloud Storage is durable object storage for assets, logs, backups, and data lake foundations. It works best as a durable storage layer, not as a replacement for transactional databases.",
      },
      {
        q: "What is important about BigQuery architecture?",
        a: "BigQuery separates storage from compute and is optimized for analytical workloads at scale. It is excellent for large aggregations and analytics, but not a transactional OLTP database.",
      },
      {
        q: "Cloud SQL vs Spanner vs Firestore tradeoffs",
        a: "Cloud SQL fits managed relational workloads, Spanner fits globally distributed strong-consistency needs with high complexity and cost, and Firestore fits document-oriented applications needing flexible scaling patterns.",
      },
      {
        q: "When does Bigtable make sense?",
        a: "Bigtable is for massive low-latency wide-column workloads such as telemetry, time-series, personalization, or high-throughput key access. It is specialized, not a general-purpose default.",
      },
      {
        q: "How do consistency models differ across GCP databases?",
        a: "Relational services emphasize stronger transactional guarantees, while distributed or document systems may trade strict consistency for global scale or simpler access models depending on service and query path.",
      },
      {
        q: "What is unique about VPC design in GCP?",
        a: "GCP VPCs are global, which changes how network architecture is reasoned about compared with region-scoped models. That can simplify some topologies but still requires careful subnet and firewall design.",
      },
      {
        q: "How should subnets and firewall rules be designed?",
        a: "Design them around environment boundaries, service exposure, and blast radius control. Firewall rules should reflect intended trust paths, not broad convenience access.",
      },
      {
        q: "How should GCP load balancing be evaluated?",
        a: "Use global HTTP(S) load balancing when global routing, TLS termination, and advanced traffic policy matter. Lower-layer load balancers fit protocol-specific or infrastructure-level requirements.",
      },
      {
        q: "What role does Cloud CDN play?",
        a: "Cloud CDN reduces origin load and global latency, but its effectiveness depends on cacheability strategy and how well content behavior is designed for edge delivery.",
      },
      {
        q: "Why does Cloud DNS matter architecturally?",
        a: "Cloud DNS is part of traffic control, failover, and environment architecture, not just name resolution. DNS decisions affect cutover strategy and user-perceived resilience.",
      },
      {
        q: "When does hybrid networking with VPN or Interconnect matter?",
        a: "It matters when enterprise, migration, compliance, or latency constraints require connectivity between on-prem systems and GCP. The complexity is justified only when those constraints are real.",
      },
      {
        q: "How should IAM roles, policies, and service accounts be designed?",
        a: "Design them around least privilege, clear workload identity boundaries, and separation of human vs machine access. Service accounts should reflect service responsibility, not team shortcuts.",
      },
      {
        q: "Why is Workload Identity important in GKE?",
        a: "Workload Identity lets Kubernetes workloads authenticate to GCP services without long-lived key files, which materially improves security posture and operational hygiene.",
      },
      {
        q: "Secret Manager vs environment variables",
        a: "Environment variables are easy but weak for sensitive lifecycle management. Secret Manager gives controlled access, auditability, and better operational handling for real secrets.",
      },
      {
        q: "What matters about KMS and encryption on GCP?",
        a: "Encryption is not just a checkbox. Key ownership, access policy, rotation, and service integration determine whether encryption actually improves security in practice.",
      },
      {
        q: "Why does the organization / folders / projects hierarchy matter?",
        a: "It defines governance boundaries for billing, IAM, policy inheritance, and environment separation. Poor hierarchy design creates long-term security and operational friction.",
      },
    ],
  },
  {
    section: "Advanced Cloud Architecture, Scaling & Production Systems",
    questions: [
      {
        q: "How does GCP global load balancing change system design?",
        a: "Global load balancing lets architects think at global entry-point scope instead of stitching together regional ingress patterns manually. That simplifies some designs, but backend data consistency still remains a separate problem.",
      },
      {
        q: "What does a multi-region active-active system look like on GCP?",
        a: "It uses globally aware traffic distribution, replicated or partitioned data strategy, and operational playbooks for region isolation. The hardest part is data and failure coordination, not routing.",
      },
      {
        q: "How should disaster recovery be framed using RPO and RTO in GCP?",
        a: "RPO and RTO define acceptable data loss and recovery time. GCP DR patterns should be justified by business impact rather than copied from reference diagrams blindly.",
      },
      {
        q: "What are strong high-availability design patterns on GCP?",
        a: "Use zonal redundancy, global ingress where appropriate, managed failover, stateless application layers, queue-based resilience, and observability aligned with dependency health.",
      },
      {
        q: "How do autoscaling patterns differ between GKE and Cloud Run?",
        a: "Cloud Run scales around request-driven service behavior, while GKE gives broader control over pod autoscaling, cluster resources, and scheduling. One favors simplicity, the other favors platform depth.",
      },
      {
        q: "How should Pub/Sub be used in distributed systems?",
        a: "Pub/Sub is for asynchronous decoupling, fanout, and burst absorption. It works well when consumers are idempotent and systems are designed for eventual consistency and retry behavior.",
      },
      {
        q: "What does event-driven microservices design look like on GCP?",
        a: "Use Pub/Sub or similar messaging to decouple producers and consumers, keep contracts explicit, and design around retries, dead-lettering, and observability rather than assuming pub-sub alone creates good architecture.",
      },
      {
        q: "When should you use Dataflow?",
        a: "Use Dataflow for scalable batch or streaming pipelines when transformation logic, autoscaling, and managed execution matter more than direct cluster control.",
      },
      {
        q: "How should event streaming architecture be approached on GCP?",
        a: "Architect around message durability, ordering needs, replay semantics, and consumer isolation. Service choice is only one part; system behavior under failure matters more.",
      },
      {
        q: "How do async processing systems scale on GCP?",
        a: "They scale by decoupling request ingress from processing, using queues or streams, autoscaling workers appropriately, and protecting downstream dependencies from burst pressure.",
      },
      {
        q: "What should a senior engineer know about BigQuery internals?",
        a: "BigQuery’s power comes from columnar storage and separation of compute and storage, which makes it excellent for analytical scans and poor for OLTP-style workloads.",
      },
      {
        q: "Dataflow vs Dataproc vs Data Fusion tradeoffs",
        a: "Dataflow is managed pipeline execution, Dataproc suits Spark/Hadoop-style control, and Data Fusion is more integration-oriented. The choice depends on team skills and workload complexity.",
      },
      {
        q: "How do real-time analytics pipelines look on GCP?",
        a: "They often combine Pub/Sub for ingestion, Dataflow for transformation, and BigQuery for analytics serving, with Cloud Storage acting as durable raw data landing or archive.",
      },
      {
        q: "ETL vs ELT tradeoffs in GCP data systems",
        a: "ETL transforms before loading, which can reduce warehouse cost or normalize pipelines earlier. ELT loads rawer data first and uses warehouse compute later, which often fits BigQuery-centric workflows well.",
      },
      {
        q: "How should a data lake be designed on GCS?",
        a: "Use clear storage zones, lifecycle rules, schema governance, partitioning strategy, and separation between raw, curated, and consumption-ready data layers.",
      },
      {
        q: "How should Terraform be used with GCP?",
        a: "Use Terraform for repeatable infrastructure, policy-aware module boundaries, and environment promotion. Good IaC matters more than tool preference alone.",
      },
      {
        q: "Why is Deployment Manager mostly a legacy comparison now?",
        a: "It matters historically, but most modern teams standardize on Terraform or other external IaC tooling because ecosystem maturity and portability are stronger there.",
      },
      {
        q: "What does good CI/CD look like on GCP?",
        a: "Pipelines should build immutable artifacts, validate infra and app changes, support safe rollout strategies, and tie deployment health back into observability and rollback logic.",
      },
      {
        q: "Blue/Green and Canary on GCP tradeoffs",
        a: "Blue/Green simplifies rollback, Canary reduces blast radius gradually, and both depend on health signals and version compatibility. The best choice depends on workload criticality and state coupling.",
      },
      {
        q: "How should GKE deployment strategies be chosen?",
        a: "Choose based on startup time, backward compatibility, traffic risk, and observability maturity. Rolling updates are simple, but not always safe enough for critical workloads.",
      },
      {
        q: "What makes a good production observability design in GCP?",
        a: "Metrics, logs, traces, dashboards, alert policies, and SLO-driven thinking should work together. Observability is successful when incidents become diagnosable and actionable quickly.",
      },
      {
        q: "Why do SLOs, SLIs, and error budgets matter?",
        a: "They connect reliability work to user-facing objectives and help teams balance delivery speed against operational stability with explicit tradeoffs.",
      },
      {
        q: "How would you think about YouTube, Netflix, or Uber scale on GCP?",
        a: "At that scale, the challenge is controlling global traffic, data locality, asynchronous event flow, observability, and cost across many services and organizational boundaries.",
      },
      {
        q: "How should a multi-tenant SaaS architecture be designed on GCP?",
        a: "Tenant isolation, IAM boundaries, quota design, per-tenant observability, and data partitioning matter more than any single managed service choice.",
      },
      {
        q: "How does CAP theorem show up in distributed GCP systems?",
        a: "It appears in globally distributed data, event-driven consumers, and failover design. Engineers still have to choose where consistency matters more than availability or vice versa.",
      },
      {
        q: "What does serverless-first architecture on GCP really mean?",
        a: "It means favoring managed execution like Cloud Run, Functions, and Pub/Sub where it reduces ops burden, while accepting that some workloads still need more explicit platform control.",
      },
      {
        q: "How should data-intensive applications be designed with BigQuery and Dataflow?",
        a: "Use Dataflow for ingestion and transformation, BigQuery for analytical serving, and GCS for durable storage layers. The design should separate raw ingestion from curated analytical models cleanly.",
      },
      {
        q: "What does edge computing look like with Cloud CDN and Cloud Run?",
        a: "Cloud CDN handles global caching and request acceleration, while Cloud Run serves dynamic origin workloads. Edge design is about reducing origin pressure and user latency together.",
      },
    ],
  },
];

export const dockerInterviewSections: DockerInterviewSection[] = [
  {
    section: "Docker",
    questions: [
      {
        q: "What is Docker and why is it used in modern DevOps?",
        a: "Docker standardizes packaging and runtime behavior so applications move consistently across developer machines, CI pipelines, and production environments. Its real value is deployment predictability, not just local setup convenience.",
      },
      {
        q: "Docker vs Virtual Machines: what is the real architectural difference?",
        a: "VMs virtualize full guest operating systems on a hypervisor, while Docker containers isolate processes at the OS level and share the host kernel. Containers are lighter, but they are not the same isolation model as full VMs.",
      },
      {
        q: "What problem does containerization solve?",
        a: "Containerization solves environment drift, dependency inconsistency, and release packaging problems by turning applications into immutable runtime artifacts that are easier to build, test, ship, and operate consistently.",
      },
      {
        q: "What is Docker architecture at a high level?",
        a: "Docker consists of the client, the Docker daemon, and image registries. The client talks to the daemon API, and the daemon builds, runs, and manages images, containers, networks, and volumes.",
      },
      {
        q: "What is the difference between a Docker image and a container?",
        a: "An image is an immutable packaged artifact; a container is a running instance created from that image with its own writable runtime layer and process lifecycle.",
      },
      {
        q: "How does Docker work under the hood?",
        a: "Docker relies on Linux namespaces for isolation, cgroups for resource control, layered filesystems for image composition, and container runtimes for process execution. The CLI experience is simple, but the runtime model is OS-level isolation.",
      },
      {
        q: "What is the Docker daemon (dockerd)?",
        a: "The Docker daemon is the background service that handles build, image, container, networking, and storage operations. It is the control plane for local Docker Engine behavior.",
      },
      {
        q: "How does container isolation work in Linux?",
        a: "Isolation comes from namespaces such as PID, mount, network, IPC, and user namespaces, while cgroups limit CPU and memory consumption. Isolation is strong enough for many workloads, but not equivalent to a separate kernel boundary.",
      },
      {
        q: "What is a union filesystem in Docker?",
        a: "A union filesystem lets Docker compose images from multiple read-only layers plus a writable layer at runtime. That layered structure is key to caching, reuse, and distribution efficiency.",
      },
      {
        q: "What is copy-on-write in Docker images?",
        a: "Copy-on-write means containers only write changes into their own writable layer when needed, instead of duplicating base image content up front. This saves space but can affect performance for write-heavy workloads.",
      },
      {
        q: "What happens when you run `docker run` step by step?",
        a: "Docker resolves the image locally or pulls it, creates the container metadata, sets up namespaces and cgroups, attaches networking and volumes, adds a writable layer, then starts the configured process as PID 1 in that container context.",
      },
      {
        q: "What is a Dockerfile and how does it work?",
        a: "A Dockerfile is a declarative build recipe for constructing image layers. Each instruction potentially creates a cached layer that becomes part of the final artifact.",
      },
      {
        q: "Why does instruction order matter in a Dockerfile?",
        a: "Because Docker caches layer results. Stable and expensive steps should appear earlier, while frequently changing content should be copied later to avoid invalidating useful cache layers unnecessarily.",
      },
      {
        q: "What are multi-stage builds and why are they used?",
        a: "Multi-stage builds separate build-time tooling from the final runtime image, reducing image size, attack surface, and deployment cost while keeping build workflows efficient.",
        code: `FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
CMD ["node", "dist/server.js"]`,
      },
      {
        q: "What are production best practices for Dockerfiles?",
        a: "Use minimal runtime images, multi-stage builds, pinned dependencies, non-root users, explicit work directories, and avoid shipping build tools or secrets in the final image.",
      },
      {
        q: "How does image caching work during builds?",
        a: "Docker reuses layers when instructions and their inputs have not changed. Cache efficiency depends heavily on build context design and file-copy ordering.",
      },
      {
        q: "What networking types matter in Docker?",
        a: "Bridge networking is common for single-host isolation, host networking removes network namespace separation, and overlay networking is used for multi-host container networking in orchestrated environments.",
      },
      {
        q: "How do containers communicate with each other?",
        a: "On the same Docker network, containers communicate over virtual networking and DNS-based service discovery. In production, that communication still requires timeouts, retries, and security controls like any distributed system.",
      },
      {
        q: "What is the difference between port mapping and EXPOSE?",
        a: "Port mapping publishes a container port to the host. `EXPOSE` is metadata and documentation for intended ports; it does not publish traffic by itself.",
      },
      {
        q: "Volumes vs bind mounts tradeoffs",
        a: "Volumes are managed by Docker and safer for durable container data, while bind mounts map host paths directly and are useful in development but couple containers more tightly to host filesystem layout.",
      },
      {
        q: "How should persistent storage be handled in containers?",
        a: "Containers should stay ephemeral where possible, and state should live in volumes, object storage, or managed databases. Stateful containers need clear persistence, backup, and failure recovery design.",
      },
      {
        q: "What is Docker Compose and when should you use it?",
        a: "Compose is useful for defining and running multi-container environments, especially local development or simple integration environments. It is not a full production orchestration answer by itself.",
      },
      {
        q: "How should multi-container applications be designed with Compose?",
        a: "Compose should model service boundaries, networking, shared configuration, and dependencies cleanly so the local environment reflects real system interactions without pretending to be production orchestration.",
      },
      {
        q: "What are the limitations of scaling services with Docker Compose?",
        a: "Compose can help locally, but it lacks the scheduling, service discovery depth, health-based orchestration, and rollout controls expected in real production platforms like Kubernetes or ECS.",
      },
      {
        q: "How do you optimize Docker image size in production?",
        a: "Use smaller base images where appropriate, remove build-only dependencies, minimize copied files, and keep the final runtime image focused on exactly what the service needs to execute.",
      },
      {
        q: "How do you reduce build time with Docker caching?",
        a: "Structure Dockerfiles to maximize stable cache reuse, isolate dependency installation from source copies, and avoid invalidating the build context with unnecessary files.",
      },
      {
        q: "How should image security scanning be handled?",
        a: "Images should be scanned in CI and registry pipelines, but scanning only matters if teams also patch base images, track dependency drift, and enforce remediation policies.",
      },
      {
        q: "What are the tradeoffs of minimal base images like Alpine?",
        a: "Smaller images reduce attack surface and transfer time, but Alpine can introduce compatibility and debugging friction because of musl differences and reduced tooling.",
      },
      {
        q: "What are core container security best practices?",
        a: "Run as non-root, minimize capabilities, scan artifacts, avoid baking secrets into images, restrict network paths, and keep runtime and image supply chain controls tight.",
      },
      {
        q: "Why should containers run as non-root?",
        a: "Because root inside a container still increases risk if the isolation boundary is weakened or the runtime is misconfigured. Least privilege still matters inside containers.",
      },
      {
        q: "Why are image vulnerabilities such a common production issue?",
        a: "Because images inherit vulnerabilities from base layers and bundled packages. If the patch cycle is weak, every deployment keeps reproducing known risks.",
      },
      {
        q: "How should secrets be managed in Dockerized systems?",
        a: "Use runtime injection from secret managers or orchestrator-native secret systems. Never bake production secrets into images or source-controlled Compose files.",
      },
      {
        q: "How does Docker fit into CI/CD pipelines?",
        a: "Docker turns application delivery into artifact promotion: build once, scan, push to a registry, then deploy the same immutable image through environments.",
      },
      {
        q: "How do Blue/Green or Canary deployments work with containers?",
        a: "The image becomes the release unit, and the deployment platform controls how traffic shifts between versions. Safe rollout depends more on orchestration and health checks than on Docker alone.",
      },
      {
        q: "What logging strategy works well for Dockerized apps?",
        a: "Containers should emit structured logs to stdout/stderr and let the platform aggregate them. Do not treat the container filesystem as a durable logging destination.",
      },
      {
        q: "How should container monitoring be designed?",
        a: "Monitor container CPU, memory, restart behavior, filesystem pressure, network performance, and service-level metrics together. Container health without application context is not enough.",
      },
      {
        q: "Docker vs Kubernetes: what is the real separation of concerns?",
        a: "Docker is about building and running containers; Kubernetes is about orchestrating containerized workloads across clusters. One packages workloads, the other manages them at system scale.",
      },
      {
        q: "What is containerd vs Docker Engine?",
        a: "Docker Engine is the broader developer-facing platform, while containerd is a lower-level runtime component focused on container execution lifecycle. Modern orchestrators often use containerd directly.",
      },
      {
        q: "What are OCI standards and why do they matter?",
        a: "OCI standards define interoperable image and runtime formats so container tools and platforms do not depend on one proprietary implementation path.",
      },
      {
        q: "How does Kubernetes use Docker containers conceptually?",
        a: "Kubernetes schedules container images, but modern Kubernetes talks to container runtimes via CRI rather than relying on Docker Engine itself. The container artifact remains central even if Docker is not the runtime layer.",
      },
      {
        q: "Docker Hub vs private registry tradeoffs",
        a: "Docker Hub is convenient for public or lightweight use, while private registries are better for internal governance, access control, retention policy, and supply-chain security.",
      },
      {
        q: "Why does garbage collection of images and containers matter?",
        a: "Unused images, stopped containers, and dangling layers consume disk and can destabilize build agents or hosts if cleanup policies are weak.",
      },
      {
        q: "Ephemeral vs persistent container design",
        a: "Containers should usually be treated as disposable compute units. Persistent state belongs in dedicated storage systems unless there is a deliberate operational reason to couple it to the container host.",
      },
    ],
  },
];

export const cicdInterviewSections: CicdInterviewSection[] = [
  {
    section: "CI/CD",
    questions: [
      {
        q: "What is CI/CD and why is it critical in modern DevOps?",
        a: "CI/CD is the system that turns code changes into validated, releasable artifacts through automated build, test, and deployment workflows. Its real value is reducing delivery risk while increasing release frequency and consistency.",
      },
      {
        q: "What is the difference between CI, Continuous Delivery, and Continuous Deployment?",
        a: "CI validates and integrates changes continuously, Continuous Delivery keeps software deployable at all times, and Continuous Deployment automatically ships approved changes to production without a manual release gate.",
      },
      {
        q: "What problems does CI/CD solve in distributed teams?",
        a: "It standardizes validation, reduces environment drift, shortens feedback loops, enforces release discipline, and lets many teams ship to the same platform without relying on manual coordination.",
      },
      {
        q: "What makes a CI/CD pipeline reliable?",
        a: "Reliable pipelines are deterministic, observable, fast enough for developer trust, secure by default, and designed so failures are actionable rather than noisy or ambiguous.",
      },
      {
        q: "What is a typical CI/CD pipeline architecture?",
        a: "At a high level, a pipeline moves through source trigger, build, test, artifact publication, environment promotion, deployment, verification, and rollback or approval stages. The details vary by system criticality.",
      },
      {
        q: "How do Git-based workflow triggers shape pipeline design?",
        a: "Triggers from pull requests, pushes, tags, schedules, and release branches let teams apply different levels of validation. Strong design means matching pipeline depth to the risk of each event type.",
      },
      {
        q: "How do runners or agents work in CI systems?",
        a: "Runners execute jobs in isolated environments, pull pipeline definitions, run commands, and publish results or artifacts. Their trust model and isolation level are major architecture and security decisions.",
      },
      {
        q: "What happens internally when a pipeline is triggered?",
        a: "The CI control plane resolves the workflow definition, schedules jobs to runners, injects permissions and secrets based on policy, executes stages, stores artifacts and logs, and updates status back to the SCM or deployment system.",
      },
      {
        q: "Why do artifact generation and storage matter?",
        a: "Artifacts are the deployable contract between build and deploy stages. If artifacts are not immutable and traceable, every promotion becomes a hidden rebuild risk instead of a trustworthy release step.",
      },
      {
        q: "What is an immutable build?",
        a: "An immutable build means the exact artifact tested is the artifact deployed. Production should never depend on rebuilding from source at deploy time because that breaks traceability and reproducibility.",
      },
      {
        q: "How should unit, integration, and E2E tests be used in pipelines?",
        a: "Unit tests provide fast developer feedback, integration tests validate boundaries, and E2E tests validate critical user flows. Mature pipelines place them strategically based on speed, confidence, and cost.",
      },
      {
        q: "How do you design parallel test execution well?",
        a: "Parallelization improves speed, but only if tests are isolated, shardable, and not contending on shared environments. Otherwise it just creates more expensive flakiness.",
      },
      {
        q: "How should flaky tests be handled?",
        a: "Flaky tests are a reliability defect in the delivery system. Quarantining may be temporary, but the real fix is root-causing nondeterminism, unstable dependencies, or poor environment assumptions.",
      },
      {
        q: "What are test caching strategies in CI?",
        a: "Cache dependencies, compiled outputs, and reusable test layers where deterministic. Bad caching can create false confidence, so it must be paired with invalidation rules and reproducibility discipline.",
      },
      {
        q: "What are strong build optimization techniques?",
        a: "Fail fast, avoid rebuilding unchanged components, cache dependency layers intelligently, parallelize independent tasks, and use artifact reuse rather than re-running expensive work unnecessarily.",
      },
      {
        q: "Rolling vs Blue/Green vs Canary vs A/B deployment tradeoffs",
        a: "Rolling is simpler but exposes more users during failure, Blue/Green gives safer cutover and rollback, Canary reduces blast radius gradually, and A/B is product experimentation rather than a pure ops strategy.",
      },
      {
        q: "How should risk vs speed be balanced in deployments?",
        a: "High-change systems need fast pipelines, but critical systems need stronger verification. Good delivery architecture matches deployment strategy to blast radius and business criticality rather than enforcing one pattern everywhere.",
      },
      {
        q: "What makes zero-downtime deployment realistic?",
        a: "Stateless app tiers, backward-compatible contracts, health-gated rollout, and data migration discipline. Zero downtime is not just a platform feature; it depends on application design too.",
      },
      {
        q: "What does a good rollback mechanism look like?",
        a: "Rollback should restore the last known good artifact or traffic target quickly, with clear rules around schema changes, config drift, and partial side effects that cannot simply be undone.",
      },
      {
        q: "How should GitHub Actions be evaluated architecturally?",
        a: "GitHub Actions is tightly integrated with GitHub and strong for repo-centric workflows, but large organizations still need to think about runner trust, workflow reuse, and scaling across many repositories.",
      },
      {
        q: "What is the value of GitLab CI/CD in larger platforms?",
        a: "GitLab offers strong integrated SCM and pipeline workflows. Its value increases when teams want one platform for source, CI, and release governance rather than stitching together many tools.",
      },
      {
        q: "Declarative vs scripted Jenkins pipelines",
        a: "Declarative pipelines are easier to standardize and govern; scripted pipelines provide more flexibility but can become difficult to maintain and secure at scale.",
      },
      {
        q: "CircleCI vs ArgoCD vs AWS CodePipeline comparison",
        a: "CircleCI is CI-focused, ArgoCD is GitOps-focused deployment control, and CodePipeline is AWS-native orchestration. The choice depends on platform alignment and how separate CI and CD need to be.",
      },
      {
        q: "Self-hosted vs cloud runners tradeoffs",
        a: "Cloud runners reduce maintenance burden, while self-hosted runners give more control over network access, hardware, and caching. The tradeoff is convenience versus governance and specialized capability.",
      },
      {
        q: "What are build artifacts in real production systems?",
        a: "Artifacts are versioned outputs such as binaries, containers, packages, manifests, or infrastructure plans that become the unit of promotion across environments.",
      },
      {
        q: "What are good Docker image tagging strategies?",
        a: "Use immutable tags tied to commits or build IDs for traceability, and optionally add human-friendly aliases like semantic versions or `stable` only as secondary references.",
      },
      {
        q: "How should semantic versioning be used in CI/CD?",
        a: "SemVer is useful when releases are consumer-visible contracts, but internal delivery systems often rely more on immutable build metadata and Git provenance than on human-friendly version numbers alone.",
      },
      {
        q: "Why do artifact repositories matter?",
        a: "Artifact repositories like Nexus, Artifactory, or ECR provide immutability, retention control, access governance, and supply chain traceability. They are critical release infrastructure, not just storage.",
      },
      {
        q: "How should secrets be managed in pipelines?",
        a: "Secrets should be short-lived where possible, scoped by environment and job purpose, injected only when needed, and never baked into source, images, or long-lived runner state.",
      },
      {
        q: "Environment variables vs secret stores tradeoffs",
        a: "Environment variables are operationally simple, but secret stores are safer and more governable for sensitive credentials. Mature systems usually combine both, with variables referencing retrieved secrets rather than holding them permanently.",
      },
      {
        q: "How do you prevent credential leakage in CI/CD?",
        a: "Use masked secrets, least-privilege tokens, isolated runners, restricted PR execution paths, and explicit review of logs and artifacts so secrets do not leak through command output or cached state.",
      },
      {
        q: "How should SAST, DAST, and dependency scanning fit into pipelines?",
        a: "They should be placed where they reduce risk without making pipelines unusably slow. Not every scan must block every change, but critical findings need a governed response path.",
      },
      {
        q: "Why is supply chain security now a core CI/CD topic?",
        a: "Because the pipeline controls source, artifacts, dependencies, and deployment authority. A compromised CI/CD system can become a direct production compromise.",
      },
      {
        q: "How do matrix builds and parallel pipelines scale delivery?",
        a: "They let teams validate multiple environments, runtimes, or services at once, but they require strong artifact and cache discipline to avoid exploding cost and operational noise.",
      },
      {
        q: "How do you reduce build time in large systems?",
        a: "Use change-based execution, artifact reuse, shared caches, monorepo-aware task graphs, and eliminate unnecessary work before adding more compute.",
      },
      {
        q: "How should pipeline failures be handled gracefully?",
        a: "Failures should fail fast, provide precise context, preserve artifacts or logs for diagnosis, and avoid leaving environments in half-deployed or ambiguous states.",
      },
      {
        q: "When do retry mechanisms help in CI systems?",
        a: "Retries help with transient network or infrastructure instability, but they should not hide deterministic failures or flaky tests. Reliability comes from fixing causes, not retrying everything.",
      },
      {
        q: "Why are idempotent deployments important?",
        a: "Idempotent deployments allow safe retries and reduce the risk of partial failure causing different outcomes on repeated execution. This is essential in distributed and multi-stage release systems.",
      },
      {
        q: "What does pipeline observability look like?",
        a: "It includes execution traces, queue times, stage durations, artifact lineage, runner metrics, and failure classification. CI/CD should be observable like any other production system.",
      },
      {
        q: "How should CI/CD be designed for microservices?",
        a: "Pipelines must support independent service delivery while still validating compatibility, shared platform policies, and cross-service release safety where dependencies exist.",
      },
      {
        q: "How do multi-environment pipelines work well?",
        a: "Use the same artifact across dev, staging, and prod with environment-specific config and approval rules. Rebuilding between environments breaks traceability.",
      },
      {
        q: "GitOps vs traditional CI/CD",
        a: "Traditional CI/CD often pushes deployments directly, while GitOps treats desired state in Git as the deployment source of truth. GitOps improves auditability and pull-based control, but adds operational model changes.",
      },
      {
        q: "What is progressive delivery in Kubernetes?",
        a: "Progressive delivery uses staged rollout strategies such as canary, automated health evaluation, and traffic shaping to reduce release risk in cluster-based systems.",
      },
      {
        q: "How do feature flags fit into deployment pipelines?",
        a: "Feature flags decouple deployment from release. They reduce rollout risk, but they also add operational complexity and require cleanup discipline to avoid flag debt.",
      },
      {
        q: "What should multi-region deployment pipelines account for?",
        a: "They must account for staggered rollout, region-specific health validation, rollback coordination, config parity, and the fact that failures may affect regions differently.",
      },
      {
        q: "What are event-driven CI/CD pipelines?",
        a: "Event-driven pipelines react to repository, registry, or environment events instead of purely linear triggers. They improve automation but require clear orchestration and failure visibility.",
      },
      {
        q: "How should Terraform and IaC integrate with CI/CD?",
        a: "Treat infrastructure changes as versioned code, run plan and policy checks in CI, and apply with controlled approvals and drift awareness. IaC delivery should be held to the same reliability standard as application delivery.",
      },
      {
        q: "Why are ephemeral environments valuable per PR?",
        a: "They let teams validate behavior in realistic isolated environments before merge. The tradeoff is cost, environment orchestration overhead, and cleanup discipline.",
      },
      {
        q: "What are preview deployments and when do they help?",
        a: "Preview deployments are short-lived environments tied to pull requests. They help product, QA, and reviewers validate changes beyond test output, especially for UI and integrated systems.",
      },
      {
        q: "What does pipeline orchestration at scale require?",
        a: "It requires workflow reuse, centralized policy, secret governance, artifact lineage, runner capacity planning, and strong boundaries between team autonomy and platform standards.",
      },
    ],
  },
];
