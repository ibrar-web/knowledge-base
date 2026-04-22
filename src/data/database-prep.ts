export type DatabaseQuestion = {
  q: string;
  a: string;
};

export type DatabaseSection = {
  section: string;
  questions: DatabaseQuestion[];
};

export const databaseCoverage = ["MySQL", "PostgreSQL", "MongoDB", "Transactions", "Indexing", "Replication", "Sharding", "Migrations"] as const;

export const databaseSections: DatabaseSection[] = [
  {
    section: "Core Database Concepts",
    questions: [
      {
        q: "What is a database?",
        a: "A database is a system for storing, retrieving, and maintaining data with rules around consistency, concurrency, durability, and access patterns. In interviews, the real question is usually which guarantees the workload actually needs.",
      },
      {
        q: "SQL vs NoSQL differences",
        a: "SQL systems optimize for relational integrity, joins, and transactional guarantees. NoSQL systems often prioritize distribution, schema flexibility, or workload-specific scaling. The right choice depends on access patterns and invariants, not on ideology.",
      },
      {
        q: "Row-based vs document-based storage",
        a: "Row stores are strong when data is relational and queried across entities. Document stores are strong when aggregates are naturally stored and read as a unit. The tradeoff is join flexibility versus write/read locality.",
      },
      {
        q: "What do ACID properties really mean?",
        a: "ACID protects correctness for transactional workloads through atomicity, consistency, isolation, and durability. The important part architecturally is deciding which flows truly require these guarantees because they carry latency and coordination cost.",
      },
      {
        q: "What is the BASE model?",
        a: "BASE reflects systems that prioritize availability and eventual convergence over immediate strong consistency. It can work well for feeds, analytics, and distributed event systems, but it is dangerous when business invariants must hold immediately.",
      },
      {
        q: "How should CAP theorem be interpreted?",
        a: "CAP is about tradeoffs during network partitions, not a universal summary of database quality. In practice, the design question is which operations remain available and which ones must preserve correctness under failure.",
      },
      {
        q: "OLTP vs OLAP",
        a: "OLTP systems optimize for many small, concurrent transactional operations. OLAP systems optimize for large scans, aggregations, and analytical queries. Mature systems usually separate them rather than forcing one store to do both badly.",
      },
      {
        q: "Primary key vs Unique key",
        a: "A primary key is the main row identity and typically drives clustering or core access patterns. Unique keys enforce alternate uniqueness constraints. The design question is which identifier is stable, query-friendly, and operationally safe.",
      },
      {
        q: "Why do foreign keys matter?",
        a: "Foreign keys enforce referential integrity at the database level, which prevents orphaned or inconsistent relationships. They improve correctness, but some high-scale systems relax them to reduce coupling and enforce integrity in application workflows instead.",
      },
      {
        q: "Normalization vs Denormalization",
        a: "Normalization reduces redundancy and update anomalies, while denormalization improves read performance and reduces join cost. The tradeoff is consistency complexity versus query efficiency.",
      },
      {
        q: "1NF, 2NF, 3NF basics",
        a: "These normal forms are practical tools for reducing duplicate data and dependency anomalies, not rules to apply blindly. Senior engineers normalize until the model is correct, then denormalize deliberately for specific read paths.",
      },
      {
        q: "Why do transactions matter?",
        a: "Transactions protect multi-step state changes so partial failure does not leave the system inconsistent. They are especially critical in money movement, inventory, booking, and identity flows.",
      },
      {
        q: "How should isolation levels be discussed?",
        a: "Isolation levels are tradeoffs between correctness anomalies and concurrency. Stronger isolation reduces anomalies like dirty or phantom reads, but it can also increase locking, contention, and latency.",
      },
      {
        q: "What causes deadlocks?",
        a: "Deadlocks occur when concurrent transactions wait on each other’s locks in incompatible order. The real mitigation is consistent lock ordering, shorter transactions, and retry logic for deadlock victims.",
      },
      {
        q: "Row locks vs table locks vs advisory locks",
        a: "Row locks maximize concurrency for transactional updates, table locks are blunt and usually harmful under load, and advisory locks are application-coordinated mechanisms for distributed coordination. Each has different contention and failure behavior.",
      },
    ],
  },
  {
    section: "SQL Databases (MySQL / PostgreSQL)",
    questions: [
      {
        q: "Why use relational databases?",
        a: "Relational databases remain the best fit when data has strong relationships, integrity requirements, and transactional workflows. They reduce application complexity when correctness matters more than raw schema flexibility.",
      },
      {
        q: "How should joins be explained in interviews?",
        a: "Joins combine related datasets with different semantics around inclusion and nullability. Senior discussion should focus less on syntax and more on cost, indexing, join order, and whether the access pattern should be denormalized instead.",
      },
      {
        q: "How do indexes really work?",
        a: "Indexes create alternate access paths so the engine can avoid full scans. They improve read performance, but they add write amplification, storage cost, and maintenance overhead, so every index must justify itself.",
      },
      {
        q: "Clustered vs non-clustered indexes",
        a: "A clustered index affects physical row organization or primary storage order, while non-clustered indexes are secondary structures pointing to rows. This matters for range scans, locality, and update cost.",
      },
      {
        q: "Why do composite indexes matter?",
        a: "Composite indexes support multi-column predicates efficiently when column order matches actual filter and sort usage. A bad order turns an expensive index into a false sense of optimization.",
      },
      {
        q: "What is a covering index?",
        a: "A covering index contains all columns needed by a query so the engine can answer from the index alone. It can dramatically reduce I/O, but wide covering indexes increase write and storage overhead.",
      },
      {
        q: "How do you use EXPLAIN query plans?",
        a: "Query plans show how the optimizer actually intends to execute a query, including scan type, join order, and estimated rows. Senior engineers use them to validate assumptions instead of guessing at performance.",
      },
      {
        q: "Query optimization strategies",
        a: "Good optimization starts with schema design, indexing, and query shape before hardware. The common failures are N+1 access, missing composite indexes, poor cardinality assumptions, and pulling more data than the endpoint needs.",
      },
      {
        q: "Offset vs cursor pagination",
        a: "Offset pagination is easy but degrades on large datasets and behaves poorly under concurrent writes. Cursor pagination is more stable and scalable, but it requires deterministic ordering and more careful API design.",
      },
      {
        q: "InnoDB vs MyISAM",
        a: "InnoDB is the modern default because it supports transactions, row-level locking, crash recovery, and MVCC-like behavior. MyISAM is largely a legacy choice and is a poor fit for modern write-heavy or correctness-sensitive systems.",
      },
      {
        q: "Auto increment strategy tradeoffs",
        a: "Auto increment is simple and index-friendly, but it can create write hotspots and makes multi-writer distribution harder. Distributed ID strategies trade locality for coordination independence.",
      },
      {
        q: "How does MySQL replication work?",
        a: "MySQL commonly uses leader-follower replication via binlogs. It scales reads and supports failover, but architects must account for replica lag, failover consistency, and topology drift.",
      },
      {
        q: "Read replicas in production",
        a: "Read replicas are useful for offloading reads, analytics, and non-critical traffic, but they do not eliminate the primary write bottleneck. They also create correctness issues if the application assumes read-after-write consistency.",
      },
      {
        q: "What is GTID replication?",
        a: "GTID replication tags transactions with global IDs to simplify failover and replica promotion. It improves operational reliability, especially in automated recovery scenarios.",
      },
      {
        q: "MySQL partitioning tradeoffs",
        a: "Partitioning helps with pruning, lifecycle management, and very large tables, but it does not automatically fix poor indexing or bad query design. It adds operational complexity and should follow real access patterns.",
      },
      {
        q: "Why is PostgreSQL often preferred for advanced systems?",
        a: "PostgreSQL combines strong relational capabilities with rich SQL features, extensibility, JSONB, and mature concurrency behavior. It often becomes the default when teams want one database that can handle both correctness and flexible querying well.",
      },
      {
        q: "What is MVCC in PostgreSQL?",
        a: "MVCC allows readers and writers to proceed with less blocking by maintaining transaction visibility rules across row versions. It improves concurrency, but it requires vacuuming and disciplined transaction management.",
      },
      {
        q: "When is JSONB useful in PostgreSQL?",
        a: "JSONB is useful when part of the model is relational but some attributes are flexible or semi-structured. It enables hybrid design, but if everything becomes JSONB, teams often lose the advantages of relational modeling.",
      },
      {
        q: "Why do window functions matter?",
        a: "Window functions let you compute rankings, running totals, and partitioned analytics without collapsing row-level detail. They are often the cleanest way to express complex reporting logic directly in SQL.",
      },
      {
        q: "CTEs and materialized views",
        a: "CTEs help structure complex queries and sometimes optimize readability more than performance. Materialized views trade freshness for speed and are useful when repeated heavy queries can tolerate controlled refresh lag.",
      },
      {
        q: "PostgreSQL full text search and extensions",
        a: "PostgreSQL can handle moderate search and domain-specific capabilities through built-in FTS and extensions like PostGIS. The tradeoff is convenience versus pushing specialized workloads to dedicated systems like Elasticsearch.",
      },
      {
        q: "PostgreSQL partitioning in production",
        a: "PostgreSQL partitioning works well for time-series or lifecycle-managed data, but query planning, index strategy, and operational tooling still matter. Partitioning is effective when it aligns with retention and access patterns.",
      },
    ],
  },
  {
    section: "NoSQL Databases (MongoDB)",
    questions: [
      {
        q: "What is MongoDB?",
        a: "MongoDB is a document database optimized around BSON documents and aggregate-style data access. It is strongest when application data is naturally document-shaped and does not require heavy relational joins.",
      },
      {
        q: "Collections vs Tables; Documents vs Rows",
        a: "Collections are logical groupings of documents, similar to tables, but documents can vary in shape. This flexibility helps fast-moving product models, but it pushes more schema discipline into engineering teams and validation layers.",
      },
      {
        q: "What is BSON and why does it matter?",
        a: "BSON is a binary JSON-like format that supports richer types and efficient transport/storage for MongoDB internals. The architectural point is that the physical representation influences index behavior, wire format cost, and document limits.",
      },
      {
        q: "What does schema-less actually mean?",
        a: "Schema-less does not mean structure-less. MongoDB lets documents evolve flexibly, but production systems still need validation, versioning, and clear ownership of document shape or the data model decays quickly.",
      },
      {
        q: "Embedding vs referencing",
        a: "Embed when data is read together and lifecycle is shared; reference when relationships grow independently or documents would become too large or frequently rewritten. This is the central MongoDB modeling tradeoff.",
      },
      {
        q: "When is denormalization good in MongoDB?",
        a: "Denormalization is good when it avoids repeated joins-like lookups and aligns with dominant read patterns. It becomes dangerous when duplicated fields change often and the update fan-out is hard to control.",
      },
      {
        q: "One-to-many and many-to-many modeling",
        a: "One-to-many can often be embedded or referenced depending on cardinality and update patterns. Many-to-many is usually reference-based because embedding both sides creates duplication and maintenance complexity.",
      },
      {
        q: "What is ObjectId structure?",
        a: "ObjectId encodes timestamp and uniqueness components, which makes it useful for distributed insert generation and rough temporal ordering. It is convenient, but it should not be confused with a universal business identifier.",
      },
      {
        q: "Indexes in MongoDB",
        a: "MongoDB indexing principles are similar to SQL in that they accelerate reads but add write cost. Compound index order, cardinality, and query shape still determine whether the index is actually useful.",
      },
      {
        q: "What is the aggregation pipeline?",
        a: "The aggregation pipeline is MongoDB’s structured way to process, transform, and aggregate documents. It is powerful for document-centric analytics, but overly complex pipelines can become hard to tune and reason about.",
      },
      {
        q: "Replica sets in MongoDB",
        a: "Replica sets provide redundancy, automatic failover, and read distribution. They improve availability, but architects must still plan for lag, election events, and write concern tradeoffs under failure.",
      },
      {
        q: "How does sharding work in MongoDB?",
        a: "MongoDB shards collections across nodes using a shard key. Sharding helps scale writes and storage, but a poor shard key creates hotspots, uneven growth, and expensive rebalancing.",
      },
      {
        q: "Write concern and read preference",
        a: "Write concern controls how much acknowledgement is required before a write is considered successful, while read preference determines where reads are served from. They are reliability and latency knobs, not just driver options.",
      },
      {
        q: "When is MongoDB better than SQL?",
        a: "MongoDB is often better when data is naturally document-shaped, schemas evolve quickly, and the dominant access pattern is aggregate retrieval rather than cross-entity joins. It is particularly strong for content, catalog, and event-style documents.",
      },
      {
        q: "When is MongoDB a bad choice?",
        a: "MongoDB is a poor fit when strict relational integrity, complex multi-entity reporting, or hard transactional guarantees dominate the workload. For money, reservations, and deeply relational models, SQL is often the safer default.",
      },
    ],
  },
  {
    section: "Scaling, Performance & Production Systems",
    questions: [
      {
        q: "How do you diagnose slow queries?",
        a: "Start with query plans, execution timing, row counts, lock waits, and whether the query shape matches available indexes. Slow queries are often symptoms of schema mismatch or access-pattern drift, not just missing hardware.",
      },
      {
        q: "What is the N+1 query problem?",
        a: "N+1 happens when one query is followed by many per-row follow-up queries, multiplying latency and load. It often appears in ORMs and API resolvers, and the fix is usually batching, preloading, or changing the access pattern.",
      },
      {
        q: "Why does connection pooling matter?",
        a: "Creating database connections is expensive and databases have finite concurrency limits. Pooling stabilizes throughput, but oversized pools can overload the database and increase contention instead of improving performance.",
      },
      {
        q: "Query caching strategies",
        a: "Caching is useful for expensive, repeated reads with acceptable staleness, but it only works if invalidation strategy is explicit. Blind caching often shifts correctness problems into another layer.",
      },
      {
        q: "Batch writes vs single writes",
        a: "Batching improves throughput and reduces round-trips, but larger batches increase transaction time, lock scope, and failure blast radius. The correct size depends on latency tolerance and contention patterns.",
      },
      {
        q: "What are hot partitions?",
        a: "Hot partitions happen when disproportionate traffic hits a small subset of keys or shards. They are usually caused by poor shard keys or skewed usage patterns and can break horizontal scale assumptions completely.",
      },
      {
        q: "Leader-follower replication and multi-primary tradeoffs",
        a: "Leader-follower is simpler and safer for consistency, while multi-primary improves write locality and availability but introduces conflict resolution and operational complexity. Most teams should default to single-writer unless they truly need distributed writes.",
      },
      {
        q: "Failover strategies",
        a: "Failover must be evaluated on promotion speed, data freshness, client retry behavior, and split-brain risk. A fast failover that promotes stale data can be worse than a slower but correct one.",
      },
      {
        q: "Backup and restore strategy",
        a: "Backups are only useful if restore is tested. Senior engineers think in terms of backup cadence, point-in-time recovery, retention, compliance, and realistic restore time under incident pressure.",
      },
      {
        q: "Horizontal partitioning and shard key design",
        a: "A good shard key distributes load evenly, supports dominant access patterns, and minimizes cross-shard operations. Time-based or sequential keys often fail under scale because they concentrate writes.",
      },
      {
        q: "Rebalancing challenges in sharded systems",
        a: "Rebalancing moves data while traffic is live, so it can affect latency, cache locality, and operational safety. Systems that shard late often underestimate how expensive redistribution becomes.",
      },
      {
        q: "How do you prevent SQL injection?",
        a: "Use parameterized queries, validated inputs, least privilege accounts, and avoid dynamic SQL string construction. The architectural point is reducing the space where untrusted input can influence query structure.",
      },
      {
        q: "RBAC, encryption, and secrets management in databases",
        a: "Database security is layered: least privilege access, encryption at rest and in transit, audited role boundaries, and controlled secret rotation. Breaches often happen through operational shortcuts rather than cryptography failure.",
      },
      {
        q: "Choose MySQL vs PostgreSQL vs MongoDB for an ecommerce system",
        a: "PostgreSQL is usually the safest default because orders, payments, and inventory need relational integrity and transactional correctness. MongoDB may fit catalog flexibility, but the core transaction system still wants relational guarantees.",
      },
      {
        q: "Choose a database for a chat app",
        a: "Chat often uses polyglot persistence: relational or key-value systems for users and metadata, document or wide-column models for messages, and search/index systems for retrieval. The right answer depends on ordering, retention, and fan-out requirements.",
      },
      {
        q: "Choose a database for an analytics platform",
        a: "Analytics platforms usually need columnar or OLAP-oriented storage rather than OLTP databases. PostgreSQL can help for small to medium workloads, but large analytics systems typically separate transactional and analytical data stores.",
      },
      {
        q: "How would you design schema for a social media app?",
        a: "Core relational entities like users, follows, posts, and interactions usually start normalized, while feed generation and counters are often denormalized or cached. The schema must support both correctness and derived-read optimization.",
      },
      {
        q: "How would you design a payment transaction system?",
        a: "Use a relational database with strict transactional guarantees, immutable ledger patterns, idempotency keys, and audit history. This is a domain where correctness, traceability, and reconciliation matter more than raw write scale.",
      },
      {
        q: "How would you design a booking or reservation database?",
        a: "Bookings require strong concurrency control to avoid double allocation. The hard part is not table design; it is combining transaction boundaries, locking strategy, and timeout or hold semantics correctly.",
      },
      {
        q: "What is polyglot persistence?",
        a: "Polyglot persistence means using different data stores for different workload shapes instead of forcing one database to solve everything. It improves fit, but increases data movement, consistency complexity, and operational burden.",
      },
      {
        q: "Zero downtime schema migrations",
        a: "Zero downtime migrations use expand-and-contract patterns, backfills, compatibility windows, and staged rollouts. Direct destructive changes in hot systems are how teams create production outages.",
      },
      {
        q: "Soft delete vs hard delete",
        a: "Soft delete helps recovery, auditing, and compliance workflows, but it adds query complexity and storage bloat. Hard delete is simpler operationally, but it removes easy recovery and historical traceability.",
      },
      {
        q: "Auditing tables and history logs",
        a: "Audit history is critical for regulated domains, debugging, and user trust. The main design decision is whether history is captured inline, through CDC, or via event sourcing, and how immutable that record truly is.",
      },
      {
        q: "What is the database role in event sourcing and CQRS?",
        a: "In event sourcing, the database may store immutable events rather than only current state. In CQRS, write and read stores may diverge entirely. These patterns improve auditability and scale for some systems, but add operational and modeling complexity quickly.",
      },
    ],
  },
];
