export type SystemDesignQuestion = {
  q: string;
  a: string;
};

export type SystemDesignSection = {
  section: string;
  questions: SystemDesignQuestion[];
};

export const systemDesignSections: SystemDesignSection[] = [
  {
    section: "Core Concepts",
    questions: [
      {
        q: "What is System Design?",
        a: "System design is the process of translating product and operational requirements into an architecture that can meet scale, reliability, security, and cost constraints in production. The real skill is making explicit tradeoffs, not listing components.",
      },
      {
        q: "What is HLD vs LLD?",
        a: "High-level design defines system boundaries, services, data flow, and major infrastructure choices. Low-level design focuses on schemas, APIs, state models, and component internals. Senior interviews usually start in HLD and drill into one or two LLD areas.",
      },
      {
        q: "Functional vs Non-functional requirements",
        a: "Functional requirements describe what the system must do; non-functional requirements describe how well it must do it under constraints like latency, durability, availability, and cost. Most architecture decisions are driven by non-functional pressure.",
      },
      {
        q: "Scalability vs Performance",
        a: "Performance is how efficiently the system behaves at a given load; scalability is how well it continues to behave as load grows. A fast system that collapses at 10x traffic is performant but not scalable.",
      },
      {
        q: "Throughput vs Latency",
        a: "Throughput is how much work the system completes per unit time, while latency is how long one request takes. Optimizing one can hurt the other, so the right target depends on workload shape and user expectations.",
      },
      {
        q: "Horizontal vs Vertical scaling",
        a: "Vertical scaling increases capacity on one node and is operationally simple but has hard ceilings. Horizontal scaling adds nodes and improves fault tolerance, but it forces you to solve state distribution, coordination, and consistency.",
      },
      {
        q: "Stateless vs Stateful services",
        a: "Stateless services scale and replace easily because request state lives outside the instance. Stateful services can be necessary for sessions, streams, or caches, but they are harder to rebalance, fail over, and reason about under partition.",
      },
      {
        q: "What is an SPOF?",
        a: "A single point of failure is any component whose failure can take down a critical path. In interviews, naming the SPOF is not enough; you should explain how failover, redundancy, or graceful degradation removes it.",
      },
      {
        q: "Why does idempotency matter in APIs?",
        a: "Idempotency allows retries without duplicating side effects, which is critical when networks, clients, or payment flows retry requests. It is a reliability control, not just an HTTP semantics detail.",
      },
      {
        q: "What is backpressure?",
        a: "Backpressure is the mechanism that slows producers when consumers cannot keep up. Without it, queues grow unbounded, latency explodes, and the system fails by saturation instead of controlled shedding.",
      },
    ],
  },
  {
    section: "Scalability & Reliability",
    questions: [
      {
        q: "Load balancers and their types",
        a: "L4 load balancers route by connection metadata and are efficient for raw TCP or TLS pass-through. L7 load balancers route by request semantics and support richer controls like path routing, auth, and rate limiting. The tradeoff is power versus overhead.",
      },
      {
        q: "Auto scaling strategies",
        a: "Good auto scaling uses leading indicators like queue depth, concurrency, or CPU trends instead of reacting only after saturation. Scaling policies must account for cold start time, burst shape, and downstream dependencies or they simply move bottlenecks.",
      },
      {
        q: "Rate limiting techniques",
        a: "Token bucket is good for burst tolerance, leaky bucket smooths traffic, and fixed windows are simple but can be unfair at boundaries. The right choice depends on whether you optimize for fairness, burst handling, or implementation simplicity.",
      },
      {
        q: "What is the circuit breaker pattern?",
        a: "A circuit breaker stops sending work to a failing dependency after a threshold and periodically probes for recovery. It prevents cascading latency and protects resources, but it must be tuned carefully or it can amplify instability.",
      },
      {
        q: "Why use retries with exponential backoff?",
        a: "Retries recover from transient failures, but naive retries can create retry storms. Exponential backoff with jitter spreads retry load and reduces synchronized pressure on already degraded dependencies.",
      },
      {
        q: "What is the bulkhead pattern?",
        a: "Bulkheads isolate resource pools so one failing workload cannot exhaust the entire system. It is especially useful for thread pools, queues, or downstream dependency classes with very different failure profiles.",
      },
      {
        q: "How do failover systems work?",
        a: "Failover systems shift traffic or leadership from an unhealthy component to a healthy one using health checks, replication, and routing control. The hard part is avoiding split-brain and ensuring the standby is actually current enough to serve.",
      },
      {
        q: "Active-active vs active-passive",
        a: "Active-active improves utilization and failover speed but introduces conflict resolution, consistency, and traffic steering complexity. Active-passive is simpler operationally but wastes capacity and often has slower recovery.",
      },
      {
        q: "How should multi-region deployments be evaluated?",
        a: "Multi-region improves resilience and latency distribution, but it raises cost and makes data consistency, rollout safety, and debugging much harder. You choose it when business continuity or geography actually justifies the operational burden.",
      },
      {
        q: "Disaster recovery: RPO vs RTO",
        a: "RPO defines acceptable data loss; RTO defines acceptable recovery time. These numbers should drive architecture directly because the gap between minutes and seconds often determines whether backups are enough or synchronous redundancy is required.",
      },
    ],
  },
  {
    section: "Databases & Storage",
    questions: [
      {
        q: "SQL vs NoSQL tradeoffs",
        a: "SQL systems are strong when joins, transactions, and relational integrity are central. NoSQL systems often trade relational flexibility for distribution, write scalability, or schema agility. The correct choice depends on access patterns, not trend preference.",
      },
      {
        q: "Sharding strategies",
        a: "Sharding distributes data across partitions using a shard key. The shard key choice is critical because a bad key creates hotspots, expensive rebalancing, and uneven growth that no amount of hardware will hide.",
      },
      {
        q: "Replication strategies",
        a: "Synchronous replication improves consistency but increases write latency; asynchronous replication improves write performance but accepts replica lag and failover data loss risk. This is a business tradeoff, not just a database setting.",
      },
      {
        q: "When do read replicas help?",
        a: "Read replicas are useful when read traffic dominates and staleness is acceptable. They do not solve write bottlenecks, and they can create correctness bugs if engineers forget replica lag in user flows.",
      },
      {
        q: "Partitioning vs sharding",
        a: "Partitioning is the broader act of splitting data; sharding usually implies distributing partitions across multiple nodes. The design question is whether you need organizational separation inside one system or horizontal distribution across many.",
      },
      {
        q: "ACID vs BASE",
        a: "ACID prioritizes transactional correctness and strong consistency guarantees. BASE systems accept looser consistency for availability and scale. Mature system design is knowing which invariants must never be violated and isolating those paths.",
      },
      {
        q: "How should CAP theorem be used in interviews?",
        a: "CAP is about tradeoffs under network partition, not everyday database marketing. In practice, the question is which operations must remain available versus which must remain strongly correct when communication breaks.",
      },
      {
        q: "What is eventual consistency?",
        a: "Eventual consistency means replicas converge over time if no new writes occur. It is often acceptable for feeds, counters, and caches, but dangerous for balances, inventory, or workflows that require immediate invariants.",
      },
      {
        q: "When does CQRS make sense?",
        a: "CQRS makes sense when read and write models have very different shapes, scale characteristics, or latency goals. It adds cognitive and operational overhead, so it should be used for asymmetric workloads, not for architecture theater.",
      },
      {
        q: "How should data archival be designed?",
        a: "Archival strategies move cold data to cheaper storage while preserving retention, compliance, and retrieval paths. The mistake is optimizing storage cost without a realistic restore and discoverability strategy.",
      },
      {
        q: "Blob/object storage use cases",
        a: "Object storage is ideal for large immutable assets like media, backups, logs, and exports. It scales well and is cheap, but it is not a replacement for transactional databases or low-latency secondary indexing.",
      },
    ],
  },
  {
    section: "Networking & APIs",
    questions: [
      {
        q: "REST vs GraphQL vs gRPC",
        a: "REST is simple and cache-friendly, GraphQL is flexible for client-driven reads but can complicate authorization and performance, and gRPC is efficient for internal low-latency service communication. The best choice depends on client diversity and operational constraints.",
      },
      {
        q: "What is the role of an API Gateway?",
        a: "An API gateway centralizes cross-cutting concerns like auth, routing, throttling, observability, and protocol translation. It simplifies clients, but it can also become a choke point or organizational bottleneck if overloaded with business logic.",
      },
      {
        q: "Reverse proxy vs load balancer",
        a: "A reverse proxy primarily mediates requests to backend services and can provide caching or routing, while a load balancer focuses on distributing load across multiple targets. In practice, one product may do both, but the architectural roles are different.",
      },
      {
        q: "WebSockets vs polling vs SSE",
        a: "Polling is simple but wasteful, SSE is good for one-way streaming, and WebSockets are better for bidirectional low-latency communication. The tradeoff is operational complexity versus interactivity requirements.",
      },
      {
        q: "Pagination strategies",
        a: "Offset pagination is simple but degrades on large datasets and can skip or duplicate results under concurrent writes. Cursor pagination is more stable and scalable, but it requires deterministic ordering and slightly more complex clients.",
      },
      {
        q: "How should APIs be versioned?",
        a: "Versioning is really a compatibility strategy. URL, header, and schema evolution models all work if the organization enforces deprecation discipline, migration paths, and compatibility testing.",
      },
      {
        q: "What is service discovery?",
        a: "Service discovery lets clients or proxies locate healthy service instances dynamically. It becomes essential in elastic environments where IPs and instances change continuously.",
      },
    ],
  },
  {
    section: "Messaging & Event Systems",
    questions: [
      {
        q: "Kafka vs RabbitMQ",
        a: "Kafka is strong for durable event streams, replay, and high-throughput log-based architectures. RabbitMQ is better for flexible routing and traditional task queues. The choice depends on whether you need stream history or queue semantics.",
      },
      {
        q: "What are Pub/Sub systems good for?",
        a: "Pub/Sub decouples producers from consumers and enables fan-out, asynchronous workflows, and independent scaling. The tradeoff is weaker end-to-end visibility and more eventual consistency in business flows.",
      },
      {
        q: "Event-driven architecture tradeoffs",
        a: "Event-driven architecture improves decoupling and resilience to spikes, but it makes debugging, data consistency, and ownership boundaries harder. It is valuable when asynchronous independence matters more than linear simplicity.",
      },
      {
        q: "Queue vs stream systems",
        a: "Queues focus on work consumption, usually with one consumer handling one message. Streams preserve ordered event history for multiple consumers and replay. This changes both storage design and recovery strategy.",
      },
      {
        q: "Exactly once vs at least once delivery",
        a: "Exactly once is expensive and often partially scoped; most real systems achieve at-least-once delivery plus idempotent consumers. That is usually the more practical and honest design.",
      },
      {
        q: "Why use dead letter queues?",
        a: "Dead letter queues isolate poison messages so the main pipeline keeps moving. They are useful only if teams also have a policy for inspection, replay, and permanent failure handling.",
      },
      {
        q: "What is the outbox pattern?",
        a: "The outbox pattern ensures database writes and event publication stay consistent by persisting events in the same transaction and publishing them asynchronously. It is a common answer to dual-write problems.",
      },
      {
        q: "What is the saga pattern?",
        a: "Sagas coordinate multi-step distributed workflows through compensating actions instead of global transactions. They improve scalability, but the cost is more explicit failure handling and more complex business reasoning.",
      },
    ],
  },
  {
    section: "Security & Authentication",
    questions: [
      {
        q: "JWT vs Sessions",
        a: "JWTs reduce server-side session storage and work well across distributed services, but revocation and token sprawl are harder. Sessions provide tighter server control, but they require shared session infrastructure at scale.",
      },
      {
        q: "What matters about OAuth2 in system design?",
        a: "OAuth2 is a delegated authorization framework, not just a login checkbox. The design concern is token issuance, trust boundaries, scope design, refresh policy, and how identity providers fit into service boundaries.",
      },
      {
        q: "RBAC vs ABAC",
        a: "RBAC is simpler and easier to reason about operationally, while ABAC is more expressive for context-sensitive rules. ABAC scales better for nuanced policy but is harder to audit and debug if overused.",
      },
      {
        q: "Why is rate limiting also a security control?",
        a: "Rate limiting is not just a performance guard; it is also a defense against abuse, brute force attempts, scraping, and accidental client storms. Good limits are identity-aware, not just IP-based.",
      },
      {
        q: "Encryption at rest vs in transit",
        a: "Encryption in transit protects data moving across networks; encryption at rest protects stored data and media exposure. Serious systems need both, plus correct key rotation and access policy around the keys themselves.",
      },
      {
        q: "How should secrets be managed?",
        a: "Secrets should live in dedicated secret stores with controlled access, auditability, and rotation support. The failure mode is not just plaintext leaks but uncontrolled secret replication across CI, config files, and developer machines.",
      },
      {
        q: "What is zero trust conceptually?",
        a: "Zero trust means no network location or internal identity is implicitly trusted. Every request path should be authenticated, authorized, and observable, which becomes more important as systems grow more distributed.",
      },
    ],
  },
  {
    section: "Real-world Design Problems",
    questions: [
      {
        q: "How would you design a URL Shortener?",
        a: "Focus on write path simplicity, unique ID generation, hot read caching, redirect latency, and abuse prevention. The bottlenecks are key-generation collisions, read amplification on viral links, and analytics fan-out.",
      },
      {
        q: "How would you design WhatsApp or a chat application?",
        a: "Prioritize low-latency delivery, presence, fan-out strategy, offline message storage, and multi-device sync. The hard problems are ordering guarantees, delivery acknowledgements, and regional connectivity variability.",
      },
      {
        q: "How would you design Uber or a ride matching system?",
        a: "This is fundamentally a geo-distributed matching and state machine problem. The critical areas are location freshness, matching latency, surge pricing inputs, and handling stale driver state during spikes.",
      },
      {
        q: "How would you design Twitter/X?",
        a: "The key decision is fan-out on write versus fan-out on read for timelines. The design must address celebrity skew, ranking, storage growth, and how consistency expectations differ between tweets, likes, and counters.",
      },
      {
        q: "How would you design an Instagram feed?",
        a: "Feed design is a mix of write amplification, ranking, caching, and media delivery. Storage is rarely the main bottleneck; ranking freshness and fan-out cost usually dominate.",
      },
      {
        q: "How would you design Netflix or YouTube?",
        a: "Video systems separate control plane from media delivery plane. You need ingestion, transcoding, metadata storage, CDN distribution, playback reliability, and recommendation pipelines with very different scaling profiles.",
      },
      {
        q: "How would you design Google Docs collaborative editing?",
        a: "The hard part is concurrent editing with low perceived latency. Operational Transform or CRDT-style approaches handle conflict convergence, but they come with complexity in ordering, offline edits, and document version history.",
      },
      {
        q: "How would you design a Payment Gateway?",
        a: "Payment systems prioritize correctness over raw throughput. Idempotency, ledgering, reconciliation, fraud controls, PCI boundaries, and compensating flows matter more than elegant microservice decomposition.",
      },
      {
        q: "How would you design a Notification System?",
        a: "A notification platform needs channel abstraction, preference management, prioritization, retry policy, rate control, and provider failover. The real complexity is not sending; it is delivery policy and user fatigue control.",
      },
      {
        q: "How would you design a Search Engine or internal search system?",
        a: "Search systems depend on indexing pipelines, ranking, freshness guarantees, and query latency control. The design must separate ingestion from serving and decide how much staleness is acceptable in indexed results.",
      },
    ],
  },
  {
    section: "Advanced Architecture Patterns",
    questions: [
      {
        q: "Microservices vs Monolith",
        a: "Monoliths are often faster to build and easier to reason about early on, while microservices help when team boundaries, scaling asymmetry, or deployment independence justify the operational complexity. The wrong split creates more coordination cost than value.",
      },
      {
        q: "What is event sourcing?",
        a: "Event sourcing stores state changes as an append-only event log rather than only persisting current state. It improves auditability and replay, but it increases rebuild complexity, schema evolution burden, and read-model design work.",
      },
      {
        q: "When should CQRS be introduced?",
        a: "CQRS should be introduced when different read/write models unlock tangible performance or team benefits. If the workload is simple, it often adds conceptual and operational overhead without enough return.",
      },
      {
        q: "What is the sidecar pattern?",
        a: "A sidecar runs alongside an application instance to handle cross-cutting concerns like proxying, policy, or telemetry. It improves separation, but increases per-pod overhead and operational surface area.",
      },
      {
        q: "What is the strangler pattern?",
        a: "The strangler pattern replaces legacy functionality incrementally by routing slices of traffic or capability to new components over time. It reduces migration risk, but requires discipline around boundaries and coexistence complexity.",
      },
      {
        q: "What is hexagonal architecture?",
        a: "Hexagonal architecture isolates domain logic from infrastructure through ports and adapters. It improves testability and long-term changeability, but only if teams avoid turning the abstraction into ceremony.",
      },
      {
        q: "What is a service mesh conceptually?",
        a: "A service mesh externalizes service-to-service networking concerns like mTLS, retries, traffic policy, and observability. It can be powerful at scale, but it is a platform choice that adds significant operational depth.",
      },
      {
        q: "Why do leader election and distributed locks matter?",
        a: "They coordinate exclusive work like schedulers, failover controllers, or singleton tasks in distributed environments. The design concern is not just getting a lock, but handling lease expiry, clock assumptions, and partial failures safely.",
      },
      {
        q: "What role does Kubernetes play in system design?",
        a: "Kubernetes is not the architecture itself; it is an execution platform for packaging, scaling, and operating distributed services. It helps with rollout and resiliency mechanics, but it does not remove the need for good service boundaries.",
      },
      {
        q: "Why do CI/CD, blue-green, and canary deployments matter architecturally?",
        a: "Delivery strategy affects blast radius, rollback time, and how safely teams can evolve critical systems. Deployment design is part of system design because operational change is one of the main failure vectors in production.",
      },
    ],
  },
];
