export type BackendPrepQuestion = {
  question: string;
  shortAnswer: string;
  deepExplanation: string;
  useCase: string;
};

export type NodeInterviewQuestion = {
  q: string;
  a: string;
  code?: string;
};

export type NodeInterviewSection = {
  section:
    | "Core Concepts"
    | "Runtime Internals"
    | "Performance, Scaling & Production Systems"
    | "Advanced Architecture Patterns";
  questions: NodeInterviewQuestion[];
};

export type ExpressInterviewQuestion = {
  q: string;
  a: string;
  code?: string;
};

export type ExpressInterviewSection = {
  section:
    | "Core Concepts"
    | "Architecture & Internals"
    | "Performance, Security & Production Systems";
  questions: ExpressInterviewQuestion[];
};

export type NestInterviewQuestion = {
  q: string;
  a: string;
  code?: string;
};

export type NestInterviewSection = {
  section:
    | "Core Concepts"
    | "Architecture & Internals"
    | "Advanced Backend Systems & Production Design";
  questions: NestInterviewQuestion[];
};

export type FastApiInterviewQuestion = {
  q: string;
  a: string;
  code?: string;
};

export type FastApiInterviewSection = {
  section:
    | "Core Concepts"
    | "Architecture & Internals"
    | "Advanced Backend Systems & Production Design";
  questions: FastApiInterviewQuestion[];
};

export type BackendPrepTopic = {
  id: "nodejs" | "express" | "nestjs" | "fastapi";
  label: string;
  accent: string;
  commands: string[];
  concepts: string[];
  questions: BackendPrepQuestion[];
};

export const backendPrepTopics: BackendPrepTopic[] = [
  {
    id: "nodejs",
    label: "Node.js",
    accent: "from-emerald-500/20 via-green-500/10 to-lime-500/20",
    commands: [
      "mkdir node-app",
      "cd node-app",
      "npm init -y",
      "npm install express",
      "node index.js",
    ],
    concepts: [
      "Event loop architecture",
      "Async programming",
      "Streams",
      "Clustering",
      "Performance optimization",
      "Memory management",
    ],
    questions: [
      {
        question: "What is Node.js and how does it work internally?",
        shortAnswer:
          "Node.js is a JavaScript runtime built on V8 that executes JavaScript outside the browser using an event-driven, non-blocking I/O model.",
        deepExplanation:
          "Internally, Node.js combines the V8 engine for JavaScript execution with native bindings and libuv for asynchronous I/O and event loop orchestration. JavaScript runs on a main thread, while many I/O-heavy tasks are delegated to the operating system or libuv’s worker pool. The key engineering point is that Node.js is not magically multi-threaded for application code. It achieves high throughput by keeping the main thread free from blocking work and coordinating asynchronous operations efficiently.",
        useCase:
          "A gateway service handling thousands of concurrent HTTP requests can stay responsive because most of its time is spent waiting on network and database I/O rather than blocking CPU work.",
      },
      {
        question: "What is the event loop in Node.js?",
        shortAnswer:
          "The event loop is the mechanism that coordinates execution of callbacks, timers, I/O completions, and queued asynchronous work in Node.js.",
        deepExplanation:
          "The event loop processes work in phases such as timers, pending callbacks, poll, check, and close callbacks. Between phases, Node also processes microtasks like resolved promises and `process.nextTick`. A senior engineer should understand that the event loop is what lets one JavaScript thread manage large numbers of outstanding tasks. Problems arise when synchronous CPU-heavy work monopolizes the loop, causing latency spikes for all requests sharing that process.",
        useCase:
          "A real-time notification service can efficiently manage many open connections, but a single expensive JSON transformation on the event loop can delay heartbeats and message delivery across clients.",
      },
      {
        question: "How does asynchronous programming work in Node.js?",
        shortAnswer:
          "Asynchronous programming in Node.js lets operations start now and complete later through callbacks, promises, async/await, and evented APIs.",
        deepExplanation:
          "When Node initiates an async operation such as file access, network I/O, or timer scheduling, JavaScript does not wait idly for completion. Instead, control returns to the event loop and a callback or promise continuation is executed once the underlying work finishes. Senior-level understanding means knowing the difference between concurrency and parallelism, how async errors propagate, and how poorly coordinated promise chains can still create bottlenecks or memory pressure even when the code looks non-blocking.",
        useCase:
          "An API aggregator can call multiple downstream services concurrently with `Promise.all`, reducing total response time compared with sequential request execution.",
      },
      {
        question: "What is the difference between process.nextTick and setImmediate?",
        shortAnswer:
          "`process.nextTick` runs before the event loop continues to the next phase, while `setImmediate` runs in the check phase after I/O polling.",
        deepExplanation:
          "These two APIs are often confused because both defer work, but they have different scheduling semantics. `process.nextTick` places callbacks in a high-priority queue that runs immediately after the current operation finishes, before other queued I/O or timers. Overusing it can starve the event loop. `setImmediate` is lower priority and usually a better fit when you want to defer work without blocking I/O progress. Senior engineers use these intentionally because misusing microtask-like queues can create subtle latency issues.",
        useCase:
          "If a request handler recursively chains `process.nextTick`, it can delay socket reads and make the service appear hung under load; moving deferrable work to `setImmediate` can restore fairness.",
      },
      {
        question: "How does Node.js handle concurrency?",
        shortAnswer:
          "Node.js handles concurrency by interleaving asynchronous tasks on the event loop and delegating certain work to the OS or libuv thread pool.",
        deepExplanation:
          "Concurrency in Node.js means multiple operations can be in progress even though JavaScript execution is single-threaded. Network sockets, timers, and async filesystem calls complete independently, then notify the loop when results are ready. Some operations like crypto or filesystem work may use worker threads in libuv’s pool. The important architectural insight is that concurrency is excellent for I/O-bound systems, but CPU-bound workloads can still saturate the single JavaScript thread unless isolated elsewhere.",
        useCase:
          "A backend-for-frontend service can fan out to several microservices concurrently, but image processing should move to a worker service or worker thread instead of blocking the main Node process.",
      },
      {
        question: "What is libuv?",
        shortAnswer:
          "libuv is the cross-platform C library that powers Node.js event loop behavior, asynchronous I/O, and worker-thread-based background operations.",
        deepExplanation:
          "libuv abstracts operating system differences and provides the low-level machinery Node uses for networking, timers, and selected async workloads. It also supplies the thread pool used for some filesystem, DNS, and crypto operations. Understanding libuv helps explain why not all async work behaves the same way and why thread pool tuning can matter in some environments. It is a foundational part of Node’s throughput model.",
        useCase:
          "A file-heavy ingestion service may saturate the libuv thread pool during bursts, so engineers may adjust pool size or redesign the workload to avoid degraded throughput.",
      },
      {
        question: "What are streams in Node.js?",
        shortAnswer:
          "Streams are abstractions for processing data incrementally instead of loading it all into memory at once.",
        deepExplanation:
          "Node provides readable, writable, duplex, and transform streams. They support backpressure, which prevents producers from overwhelming consumers when data moves through a pipeline. Streams are essential for memory-efficient handling of large payloads such as files, media, or network proxies. Senior engineers use streams not just for performance but also for stability, because naive buffering can quickly turn high-traffic services into memory-bound systems.",
        useCase:
          "A media upload service can stream files directly from incoming HTTP requests to cloud storage and virus scanning pipelines without holding entire files in memory.",
      },
      {
        question: "What is clustering in Node.js?",
        shortAnswer:
          "Clustering lets multiple Node.js processes share the same server port so CPU cores can be used more effectively.",
        deepExplanation:
          "Because a single Node.js process runs JavaScript on one main thread, clustering scales a service horizontally on the same machine by forking multiple workers. Each process has its own memory space and event loop, which improves fault isolation and multicore utilization. However, clustering also requires thinking about sticky sessions, shared state, observability, and graceful restarts. Senior engineers often prefer container-level horizontal scaling, but clustering is still relevant when maximizing host-level resources.",
        useCase:
          "A websocket-heavy service may use clustering with sticky sessions so connections remain pinned to the same worker while still distributing traffic across CPU cores.",
      },
      {
        question: "How do you handle memory leaks in Node.js?",
        shortAnswer:
          "Handle memory leaks by profiling heap growth, identifying retained objects, and fixing long-lived references, unbounded caches, or listener leaks.",
        deepExplanation:
          "Memory leaks in Node often come from closures retaining objects, globally referenced collections, event listeners that are never removed, or caches with no eviction policy. The process may stay healthy for hours and then degrade under production traffic. Senior debugging involves heap snapshots, allocation profiling, and correlating leak patterns with code paths or request types. Preventing leaks also means building bounded data structures and lifecycle-aware cleanup into the architecture.",
        useCase:
          "An Express API that caches per-user results in a plain object with no TTL can slowly consume memory until pods restart repeatedly under load.",
      },
      {
        question: "How does Node.js scale in production systems?",
        shortAnswer:
          "Node.js scales through horizontal replication, process isolation, async I/O efficiency, background job offloading, and careful observability-driven optimization.",
        deepExplanation:
          "Real-world scaling is broader than just adding instances. You separate CPU-heavy work into background workers, use queues for burst absorption, keep API processes stateless, and instrument latency, memory, and event loop lag. For distributed systems, you also consider connection limits, rate limiting, graceful shutdown, and failure handling around downstream services. Node scales very well for I/O-centric systems when these boundaries are designed deliberately.",
        useCase:
          "A SaaS platform can run stateless Node API containers behind a load balancer, queue expensive exports to workers, and autoscale based on latency plus queue depth.",
      },
    ],
  },
  {
    id: "express",
    label: "Express.js",
    accent: "from-sky-500/20 via-cyan-500/10 to-blue-500/20",
    commands: [
      "mkdir express-app",
      "cd express-app",
      "npm init -y",
      "npm install express",
      "node server.js",
    ],
    concepts: [
      "Middleware architecture",
      "Routing system",
      "Error handling",
      "Security patterns",
      "API structure design",
    ],
    questions: [
      {
        question: "What is Express.js and why is it used?",
        shortAnswer:
          "Express.js is a minimalist Node.js web framework used to build APIs and web servers with flexible middleware and routing.",
        deepExplanation:
          "Express sits close to Node’s HTTP primitives while providing ergonomics such as middleware composition, route matching, and request-response helpers. Its minimalism is both a strength and a tradeoff. Teams can shape architecture freely, but they must also impose their own standards for validation, security, testing, and module boundaries. Senior engineers choose Express when they want control and lightweight overhead rather than a highly opinionated framework.",
        useCase:
          "A backend-for-frontend layer that proxies several internal services can be built quickly in Express while keeping request transformation logic explicit and easy to trace.",
      },
      {
        question: "How does middleware work in Express?",
        shortAnswer:
          "Middleware is a sequence of functions that can inspect, modify, short-circuit, or pass along a request and response through `next()`.",
        deepExplanation:
          "Middleware creates a pipeline around the request lifecycle. Each function can perform cross-cutting concerns such as logging, authentication, validation, compression, or rate limiting before handing off to the next layer. Order matters because upstream middleware shapes downstream behavior. Senior design focuses on separating concerns cleanly, avoiding hidden side effects, and keeping middleware predictable so large applications do not turn into hard-to-debug execution chains.",
        useCase:
          "An API can apply request ID generation, structured logging, authentication, and input validation middleware before the actual business handler runs.",
      },
      {
        question: "What is routing in Express?",
        shortAnswer:
          "Routing maps incoming HTTP methods and paths to specific request handlers or middleware chains.",
        deepExplanation:
          "Express routing is simple on the surface, but in larger systems it becomes an organizational concern. Route definitions should reflect resource boundaries, versioning rules, and ownership between modules. Senior engineers avoid dumping every route in a single file and instead build composable routers around domains. Proper routing design also includes handling parameter validation, nested routers, and clear separation between transport concerns and business logic.",
        useCase:
          "A commerce platform might split routes into `orders`, `payments`, and `catalog` modules with shared middleware and domain-specific handler layers.",
      },
      {
        question: "How do you handle error handling middleware?",
        shortAnswer:
          "Express error handling middleware catches propagated errors and converts them into consistent HTTP responses, logs, and observability signals.",
        deepExplanation:
          "Error middleware is identified by four arguments and should live near the end of the middleware chain. In mature systems, it normalizes internal exceptions into safe external responses, preserves trace IDs, and distinguishes operational errors from unexpected faults. Senior engineers ensure async errors are consistently forwarded, avoid leaking stack traces to clients, and design error shapes that clients can rely on without exposing internal implementation details.",
        useCase:
          "A payments API can map validation failures to `400`, authorization issues to `403`, downstream timeouts to `503`, and unexpected exceptions to a generic `500` with full trace logging internally.",
      },
      {
        question: "How do you structure large Express applications?",
        shortAnswer:
          "Large Express apps should be structured by domain with clear layers for routing, validation, services, data access, and shared infrastructure.",
        deepExplanation:
          "Because Express is unopinionated, poor structure quickly leads to route handlers containing validation, business logic, and database calls all mixed together. Senior architecture typically separates transport from application services and infrastructure. You also define shared patterns for configuration, dependency wiring, error handling, and testing. The goal is maintainability under team growth, not just getting endpoints working quickly.",
        useCase:
          "A multi-team API platform can organize modules around domains like billing and user management, each with its own router, service layer, and repository contracts.",
      },
      {
        question: "What is request-response lifecycle?",
        shortAnswer:
          "The request-response lifecycle is the full path from incoming HTTP request through middleware, route execution, response generation, and connection completion.",
        deepExplanation:
          "In Express, a request enters the middleware chain, is transformed or checked by any number of functions, reaches a route handler, and eventually produces a response or error path. Understanding this lifecycle is essential for timing logs, tracing, auth, body parsing, and resource cleanup. Senior engineers also think about what happens when clients disconnect, responses stream, or downstream dependencies time out mid-request.",
        useCase:
          "An observability layer can attach a trace ID at request start, measure handler duration through the entire lifecycle, and emit structured metrics once the response finishes.",
      },
      {
        question: "How do you secure Express APIs?",
        shortAnswer:
          "Secure Express APIs with layered controls including input validation, auth, authorization, headers, rate limits, secret management, and safe error handling.",
        deepExplanation:
          "Security is not a middleware checkbox. Senior engineers combine transport security, payload validation, least-privilege auth, dependency hygiene, secure cookies or token handling, CORS control, and abuse protection. You also harden deployment-level concerns such as reverse proxy trust, logging redaction, and secret rotation. Express gives flexibility, which means security discipline must come from engineering standards rather than framework enforcement.",
        useCase:
          "A public partner API can combine schema validation, HMAC verification, IP-aware throttling, and audit logs to reduce abuse and simplify incident response.",
      },
      {
        question: "How do you handle authentication in Express?",
        shortAnswer:
          "Authentication in Express is typically implemented through middleware that verifies sessions, tokens, or identity assertions before protected handlers run.",
        deepExplanation:
          "In production, authentication design includes credential verification, session lifecycle, refresh strategy, token invalidation, and authorization boundaries. Express itself does not prescribe an approach, so the team must choose between cookie sessions, JWT-based access patterns, external identity providers, or hybrid models. Senior engineers keep the trust decision on the server, centralize auth middleware, and separate authentication from fine-grained authorization checks within domain services.",
        useCase:
          "An internal admin portal might use signed cookie sessions with middleware-based verification and per-route role checks before administrative actions are allowed.",
      },
      {
        question: "What is rate limiting?",
        shortAnswer:
          "Rate limiting controls how many requests a client can make in a given time window to protect systems from abuse and overload.",
        deepExplanation:
          "At a deeper level, rate limiting is part of capacity management and abuse resistance. Strategies include fixed window, sliding window, token bucket, and distributed counters. The right approach depends on whether you care about fairness, burst tolerance, or absolute traffic caps. Senior engineers also decide where limits belong: edge proxy, API gateway, app middleware, or multiple layers together.",
        useCase:
          "A login endpoint can enforce tight IP and account-based limits to slow brute-force attempts without applying the same strict thresholds to general read endpoints.",
      },
      {
        question: "How do you scale Express apps?",
        shortAnswer:
          "Scale Express by keeping instances stateless, replicating horizontally, offloading heavy work, and using shared infrastructure for sessions, queues, and observability.",
        deepExplanation:
          "Scaling Express is mostly about the surrounding architecture. Stateless APIs behind a load balancer scale well, but sticky session dependencies, in-memory state, or blocking operations can limit that path quickly. Senior engineers externalize state, add caching where appropriate, and push long-running jobs to workers. They also build health checks, graceful shutdown, and metrics so autoscaling does not create instability.",
        useCase:
          "A high-traffic API can run many Express containers behind an ingress layer, use Redis for shared rate-limit counters, and delegate exports and webhooks to queue workers.",
      },
    ],
  },
  {
    id: "nestjs",
    label: "NestJS",
    accent: "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20",
    commands: [
      "npm i -g @nestjs/cli",
      "nest new project-name",
      "cd project-name",
      "npm run start",
    ],
    concepts: [
      "Modular architecture",
      "Dependency injection",
      "Decorators system",
      "Microservices support",
      "Enterprise scalability",
    ],
    questions: [
      {
        question: "What is NestJS and why is it used?",
        shortAnswer:
          "NestJS is an opinionated Node.js framework that brings modular architecture, dependency injection, and enterprise-friendly patterns to backend development.",
        deepExplanation:
          "NestJS builds on top of Node platforms like Express or Fastify but adds a structured application model inspired by frameworks such as Angular and Spring. It is used when teams want predictable architecture, testability, and clear boundaries between modules, controllers, and services. Its value becomes more obvious as codebases and team size grow, because conventions reduce architectural drift and improve maintainability across many contributors.",
        useCase:
          "A growing B2B platform with multiple teams can standardize on NestJS so modules, testing patterns, and service boundaries stay consistent across domains.",
      },
      {
        question: "How does dependency injection work in NestJS?",
        shortAnswer:
          "NestJS dependency injection uses an IoC container to instantiate and provide classes based on module registration and metadata.",
        deepExplanation:
          "Providers are registered within modules, and Nest resolves dependencies through constructor injection. This decouples class creation from class usage and improves substitution for testing, configuration, and environment-specific implementations. Senior engineers care because DI encourages cleaner architecture, but it also requires discipline around scopes, circular dependencies, and over-abstracting simple code. The goal is controlled composition, not ceremony for its own sake.",
        useCase:
          "A payment service can depend on an abstract gateway provider that is swapped with a sandbox or mock implementation in different environments and test suites.",
      },
      {
        question: "What are modules, controllers, and providers?",
        shortAnswer:
          "Modules organize features, controllers handle incoming requests, and providers contain injectable business or infrastructure logic.",
        deepExplanation:
          "These building blocks define the basic structure of a Nest application. Modules define boundaries and expose shared providers. Controllers map transport-level requests into application behavior. Providers implement services, repositories, adapters, or domain logic. Senior design treats these as architecture primitives, ensuring transport concerns stay separate from business rules and module boundaries reflect real domain ownership rather than arbitrary folder splits.",
        useCase:
          "An `OrdersModule` can expose an orders controller, an orders service, and a payment integration provider while keeping checkout behavior isolated from unrelated account logic.",
      },
      {
        question: "How does NestJS architecture differ from Express?",
        shortAnswer:
          "NestJS provides an opinionated layered architecture on top of a Node HTTP platform, while Express is minimal and leaves most architecture decisions to the team.",
        deepExplanation:
          "With Express, structure must be invented and enforced manually. NestJS starts with modules, DI, decorators, pipes, guards, and interceptors as first-class concepts. That usually improves consistency, but it can feel heavier for simple apps. Senior engineers choose between them based on lifecycle complexity, team scale, and whether architectural standardization is more valuable than framework minimalism.",
        useCase:
          "A small prototype API may launch faster in Express, but a long-lived enterprise platform with many contributors may benefit from NestJS’s built-in patterns and dependency boundaries.",
      },
      {
        question: "What is the use of decorators in NestJS?",
        shortAnswer:
          "Decorators attach metadata that NestJS uses to define routes, inject dependencies, validate inputs, and apply framework behaviors declaratively.",
        deepExplanation:
          "Decorators are central to Nest’s developer experience. They mark classes and methods as controllers, modules, injectable providers, route handlers, guards, or interceptors. Under the hood, Nest reads metadata to construct the runtime graph. Senior engineers should understand that decorators improve readability and consistency, but the actual behavior still comes from the framework container and lifecycle, not from the syntax alone.",
        useCase:
          "An authenticated route can declare guards, validation pipes, and parameter extraction with decorators, making the controller method concise and self-describing.",
      },
      {
        question: "How does NestJS handle microservices?",
        shortAnswer:
          "NestJS supports microservices through transport abstractions for message brokers and RPC-style communication patterns.",
        deepExplanation:
          "Nest provides adapters for transports such as TCP, Redis, NATS, RMQ, and others so teams can build message-driven services with a consistent programming model. This does not eliminate distributed-systems complexity, but it reduces boilerplate around handlers, serialization, and transport wiring. Senior engineers still need to design idempotency, retries, timeouts, saga boundaries, and observability, because those concerns exist beyond the framework.",
        useCase:
          "An order service can publish events to a broker for inventory and billing services while reusing the same Nest patterns for handler composition and testing.",
      },
      {
        question: "How do guards and interceptors work?",
        shortAnswer:
          "Guards determine whether a request can proceed, while interceptors wrap execution to transform responses, add cross-cutting behavior, or measure execution.",
        deepExplanation:
          "Guards are typically used for auth and authorization decisions before the route handler runs. Interceptors can log timing, map responses, inject metadata, or handle cross-cutting patterns like caching. The distinction matters because each tool belongs at a different stage of the request pipeline. Senior engineers keep these concerns separate so permission logic, response shaping, and instrumentation do not collapse into controller methods.",
        useCase:
          "A platform can use a JWT guard to gate access, then an interceptor to standardize API response envelopes and record latency metrics.",
      },
      {
        question: "How is request lifecycle handled in NestJS?",
        shortAnswer:
          "NestJS processes requests through middleware, guards, interceptors, pipes, controllers, services, and exception filters in a defined lifecycle.",
        deepExplanation:
          "The lifecycle is more structured than raw Express. Middleware runs early, guards decide access, pipes validate and transform input, interceptors wrap execution, controllers delegate to services, and exception filters normalize errors. This layered flow gives teams better separation of concerns. Senior engineers use the lifecycle intentionally to place logic in the right abstraction rather than stacking everything into handlers.",
        useCase:
          "A finance API can validate DTOs with pipes, enforce tenant access in guards, capture request metrics in interceptors, and map domain exceptions through filters.",
      },
      {
        question: "How do you scale NestJS applications?",
        shortAnswer:
          "Scale NestJS by using stateless deployment patterns, modular boundaries, async messaging, caching, and infrastructure-level replication.",
        deepExplanation:
          "NestJS itself does not magically scale applications, but its module system and DI model help organize services for growth. Senior scalability work includes separating hot paths, using queues or event-driven workflows for long-running jobs, moving shared state out of process, and instrumenting dependencies carefully. The framework supports these patterns well, but the architecture still has to be designed around traffic and failure modes.",
        useCase:
          "A customer platform can run multiple NestJS API instances behind a load balancer, use Redis and message queues for coordination, and split reporting workloads into async workers.",
      },
      {
        question: "How do you implement authentication in NestJS?",
        shortAnswer:
          "Authentication in NestJS is commonly implemented with guards, strategies, and provider-backed services that verify identity and manage session or token flow.",
        deepExplanation:
          "Nest’s auth model usually combines guards for route protection, strategies for credential verification, and services for user/session logic. Because of the DI system, auth concerns stay modular and testable. Senior implementation goes beyond login success. It includes token rotation, refresh flow, session invalidation, role checks, secret management, and protecting internal service boundaries from assuming the client is trustworthy.",
        useCase:
          "A SaaS admin suite can use a local or OAuth strategy for login, a JWT guard for protected endpoints, and role-aware providers for permission checks across modules.",
      },
    ],
  },
  {
    id: "fastapi",
    label: "FastAPI",
    accent: "from-rose-500/20 via-orange-500/10 to-amber-500/20",
    commands: ["pip install fastapi uvicorn", "uvicorn main:app --reload"],
    concepts: [
      "Async architecture",
      "Performance model",
      "Dependency injection",
      "Pydantic validation",
      "API design patterns",
    ],
    questions: [
      {
        question: "What is FastAPI and why is it used?",
        shortAnswer:
          "FastAPI is a modern Python web framework used for building APIs with type hints, automatic validation, and strong async support.",
        deepExplanation:
          "FastAPI became popular because it combines developer speed with production-oriented features such as request validation, dependency injection, and OpenAPI generation. It is especially attractive for teams already using Python for data platforms, ML services, or backend APIs. Senior engineers value that it keeps transport and validation concerns explicit while still allowing clean architecture around services and dependencies.",
        useCase:
          "A Python-heavy organization can expose internal ML inference and business APIs through FastAPI while benefiting from consistent validation and documentation generation.",
      },
      {
        question: "How does FastAPI achieve high performance?",
        shortAnswer:
          "FastAPI achieves high performance through ASGI-based async execution, efficient request handling, and fast validation libraries underneath its stack.",
        deepExplanation:
          "FastAPI performance comes from its underlying ASGI ecosystem, lightweight request handling, and efficient serialization and validation behavior. But raw framework speed is only part of the story. Senior engineers know that blocking Python code, slow database access, or poor deployment choices can erase those gains quickly. The framework gives a strong baseline, but production performance still depends on architecture, concurrency patterns, and system bottlenecks.",
        useCase:
          "An internal high-throughput event ingestion API can benefit from async request handling while still needing careful database write batching and queue design to avoid bottlenecks.",
      },
      {
        question: "What is ASGI vs WSGI?",
        shortAnswer:
          "WSGI is the older synchronous Python web server interface, while ASGI supports asynchronous communication, long-lived connections, and modern concurrent workloads.",
        deepExplanation:
          "WSGI was designed for traditional request-response applications, where each request is handled synchronously. ASGI extends that model to support async functions, websockets, background communication, and more flexible concurrency patterns. FastAPI is built for ASGI, which is why it fits modern APIs and real-time services better than older synchronous-only stacks. Senior engineers choose based on workload characteristics, not just framework popularity.",
        useCase:
          "A websocket-driven collaboration backend is much more naturally served through an ASGI stack than a traditional WSGI application.",
      },
      {
        question: "How does dependency injection work in FastAPI?",
        shortAnswer:
          "FastAPI dependency injection lets you declare reusable dependencies for things like auth, DB sessions, config, and shared request logic.",
        deepExplanation:
          "Dependencies are resolved from function signatures and can be layered or scoped per request. This makes shared cross-cutting concerns explicit and testable without wiring everything manually in each endpoint. Senior engineers use this to keep route handlers thin and to control lifecycle-sensitive resources cleanly. The main value is composability with visibility, not just convenience.",
        useCase:
          "An API can inject a current-user dependency, tenant context, and per-request service objects into multiple endpoints without duplicating setup logic.",
      },
      {
        question: "How do you validate data in FastAPI?",
        shortAnswer:
          "FastAPI validates input using typed request models and schema parsing, commonly through Pydantic models.",
        deepExplanation:
          "Validation is built into the request handling flow, so path params, query params, headers, and bodies can all be parsed into typed structures. This reduces boilerplate and creates a contract between client and server. Senior engineers still design validation boundaries carefully, distinguishing transport-level validation from domain rules. A schema may accept valid shape and types while the business layer still rejects invalid business states.",
        useCase:
          "An order creation endpoint can reject malformed payloads automatically through schema validation, then apply separate business rules for inventory or pricing consistency in the service layer.",
      },
      {
        question: "How does async work in FastAPI?",
        shortAnswer:
          "FastAPI supports async route handlers that allow non-blocking I/O operations to run efficiently under an ASGI server.",
        deepExplanation:
          "Async in FastAPI is valuable when handlers spend time waiting on network or database operations. However, CPU-bound work still blocks execution unless moved elsewhere. Senior engineers understand when to use async endpoints, how blocking libraries can sabotage concurrency, and why simply marking everything `async` does not create performance automatically. The real gain comes from pairing async handlers with compatible async dependencies and I/O-heavy workloads.",
        useCase:
          "A service that fans out to external APIs and async databases can handle more concurrent requests efficiently when those dependencies are non-blocking.",
      },
      {
        question: "How do you structure large FastAPI projects?",
        shortAnswer:
          "Large FastAPI projects should be organized by domain with separated routers, schemas, services, configuration, and infrastructure code.",
        deepExplanation:
          "Without structure, Python API projects can devolve into oversized route files with business logic scattered throughout. Senior engineers typically separate router definitions, request and response models, domain services, persistence layers, and shared dependencies. They also standardize settings management, observability, and testing. The aim is a codebase that stays understandable as more teams and features are added.",
        useCase:
          "A platform API can break out modules such as accounts, payments, and reporting, each with its own router, schemas, service layer, and shared infrastructure dependencies.",
      },
      {
        question: "How do you handle authentication?",
        shortAnswer:
          "Authentication in FastAPI is usually handled through reusable dependencies that verify credentials, tokens, or sessions before endpoint logic runs.",
        deepExplanation:
          "FastAPI’s dependency system makes auth checks composable across routes. In real systems, auth design includes token verification, user context loading, permission checks, refresh handling, and secure secret management. Senior engineers separate credential validation from authorization logic and ensure protected services do not rely solely on client claims without server-side verification.",
        useCase:
          "A multi-tenant API can inject the current user and tenant membership through dependencies before allowing access to account-specific resources.",
      },
      {
        question: "How does FastAPI compare to Flask and Django?",
        shortAnswer:
          "FastAPI is more modern and API-focused with strong typing and async support, while Flask is minimal and Django is a larger batteries-included framework.",
        deepExplanation:
          "Flask gives maximum flexibility with fewer built-in opinions. Django provides a full-stack ecosystem with ORM, admin, and many integrated patterns. FastAPI sits in a strong API-focused middle ground, especially for services that benefit from typed contracts and async support. Senior selection depends on team skills, product shape, ecosystem needs, and whether the system is primarily an API service or a broader web platform.",
        useCase:
          "A greenfield internal API platform may choose FastAPI for typed contracts and speed, while a content-heavy business platform with admin tooling may prefer Django.",
      },
      {
        question: "How do you scale FastAPI apps?",
        shortAnswer:
          "Scale FastAPI by running multiple stateless instances, using async-friendly dependencies, externalizing state, and offloading heavy workloads to workers or queues.",
        deepExplanation:
          "Framework-level async support helps, but scaling still depends on architecture. Senior engineers ensure request handlers remain lightweight, background jobs are handled outside request threads, caching is applied strategically, and deployment settings such as worker model and connection limits match workload behavior. They also watch latency percentiles, queue depth, and dependency saturation rather than assuming app-level throughput is the only metric that matters.",
        useCase:
          "A FastAPI service can run behind a load balancer with multiple workers, store shared session or rate-limit data externally, and push report generation to async workers.",
      },
    ],
  },
];

export const nodeInterviewSections: NodeInterviewSection[] = [
  {
    section: "Core Concepts",
    questions: [
      {
        q: "What is Node.js?",
        a: "Node.js is a server-side JavaScript runtime built on V8 and native bindings that exposes an event-driven, non-blocking I/O model. Its value is not that JavaScript runs on servers, but that it can handle I/O-heavy workloads efficiently with relatively simple concurrency semantics.",
      },
      {
        q: "Why is Node.js considered fast?",
        a: "Node is fast for the right workloads because V8 executes JavaScript efficiently and the runtime avoids blocking per-request threads for most I/O. The tradeoff is that CPU-heavy work can still stall the single main event loop badly.",
      },
      {
        q: "Node.js vs browser JavaScript runtime",
        a: "Both execute JavaScript, but the host environment is different. Browsers provide DOM and UI APIs, while Node provides filesystem, network, process, and OS-level interfaces for backend workloads.",
      },
      {
        q: "When should you use Node.js?",
        a: "Use Node for APIs, gateways, BFFs, streaming systems, real-time apps, and I/O-bound services with high concurrency. It is strongest where throughput depends on waiting for network or storage rather than heavy CPU computation.",
      },
      {
        q: "When should you NOT use Node.js?",
        a: "Avoid Node as the primary execution model for CPU-bound analytics, heavy image/video processing, or scientific computation unless you isolate those workloads. The failure mode is event loop starvation that hurts every request in the process.",
      },
      {
        q: "What does single-threaded mean in Node.js?",
        a: "Application JavaScript runs on one main thread per process, so only one piece of JS executes at a time there. That does not mean the system cannot handle concurrency; it means concurrency is coordinated around asynchronous completion rather than many application threads.",
      },
      {
        q: "What is non-blocking I/O?",
        a: "Non-blocking I/O means the process initiates I/O work and continues doing other work instead of waiting synchronously for completion. This is the core reason Node can handle many in-flight operations efficiently.",
      },
      {
        q: "What is event-driven architecture in Node.js?",
        a: "Node is naturally event-driven because progress is triggered by I/O completions, timers, streams, and message callbacks rather than sequential blocking flows. That fits reactive systems well, but it also makes failure propagation and observability more important.",
      },
      {
        q: "Callback vs Promise vs async/await",
        a: "Callbacks are low-level and flexible but can become hard to compose; promises standardize async completion; async/await improves readability over promise chains. The tradeoff is that async/await can hide concurrency mistakes if engineers accidentally serialize independent work.",
      },
    ],
  },
  {
    section: "Runtime Internals",
    questions: [
      {
        q: "What is the event loop?",
        a: "The event loop is the mechanism that coordinates timers, I/O callbacks, promise continuations, and other queued work inside a Node process. Understanding it matters because one blocked loop means one degraded process for every request sharing it.",
      },
      {
        q: "What are the event loop phases in Node.js?",
        a: "At a high level, Node cycles through timers, pending callbacks, idle/prepare, poll, check, and close callbacks, while also draining microtasks between turns. Senior engineers care because scheduling behavior affects fairness and tail latency under load.",
      },
      {
        q: "What happens in the timers phase?",
        a: "The timers phase executes callbacks scheduled by `setTimeout` and `setInterval` whose thresholds have elapsed. It does not guarantee exact timing; delays depend on event loop availability and other queued work.",
      },
      {
        q: "What is the poll phase?",
        a: "The poll phase is where Node waits for and processes I/O events. In many real workloads this is where most useful work becomes ready, so long synchronous handlers elsewhere can delay I/O readiness processing significantly.",
      },
      {
        q: "What is the check phase?",
        a: "The check phase runs callbacks scheduled by `setImmediate`. It is commonly used when work should be deferred until after I/O polling rather than inserted ahead of everything else.",
      },
      {
        q: "What are close callbacks?",
        a: "Close callbacks run when handles such as sockets or streams are closed. They matter in production because cleanup and connection lifecycle bugs often surface around shutdown and network churn.",
      },
      {
        q: "process.nextTick vs setImmediate",
        a: "`process.nextTick` runs before the event loop proceeds to the next phase, while `setImmediate` runs in the check phase. Overusing `nextTick` can starve I/O because it keeps inserting high-priority work ahead of the loop.",
      },
      {
        q: "Microtask queue vs macrotask queue",
        a: "Microtasks such as promise continuations run before the next event loop turn proceeds, while timers and I/O callbacks are macrotask-style scheduled work. This difference is why promise-heavy code can still monopolize execution if abused.",
      },
      {
        q: "What is V8?",
        a: "V8 is the JavaScript engine that parses, optimizes, and executes JS for Node. It is only one part of Node, but it explains runtime behavior around compilation, optimization, and memory management.",
      },
      {
        q: "How does JS get compiled in V8?",
        a: "V8 parses code into an AST, produces bytecode, and uses JIT optimization for hot paths. Performance depends on predictable code shapes and runtime behavior, not just source-level syntax.",
      },
      {
        q: "What is JIT compilation?",
        a: "JIT compilation means V8 can optimize frequently executed code paths at runtime based on observed behavior. The tradeoff is that unstable shapes or deoptimizations can make performance less predictable under changing workloads.",
      },
      {
        q: "What are hidden classes?",
        a: "Hidden classes are internal V8 structures used to optimize property access for objects with stable shapes. Frequent object shape mutations can reduce optimization effectiveness and contribute to performance noise.",
      },
      {
        q: "Garbage collection basics in Node.js",
        a: "V8 reclaims unreachable memory automatically, but GC pauses and heap pressure still affect latency. Memory-heavy services need profiling because leaks or large short-lived allocations can destabilize tail performance.",
      },
      {
        q: "What is libuv?",
        a: "libuv is the C library that underpins Node’s event loop, async I/O abstractions, and thread pool behavior. It is why Node can present a consistent cross-platform asynchronous programming model.",
      },
      {
        q: "What is the role of the libuv thread pool?",
        a: "The thread pool handles selected operations such as filesystem work, parts of DNS, and crypto that cannot rely purely on kernel event notifications. Saturating it can hurt throughput for unrelated tasks using the same pool.",
      },
      {
        q: "Why can fs.readFile be async?",
        a: "Node delegates the work to underlying OS facilities or libuv worker threads so the main JS thread does not block waiting for file I/O. Async at the API level does not mean the hardware operation is magically parallelized in JS itself.",
      },
      {
        q: "Why do DNS and crypto often use the thread pool?",
        a: "Some DNS resolution and crypto tasks are blocking or CPU-expensive from the runtime’s perspective, so Node routes them through libuv workers. This is a common source of contention in authentication-heavy or certificate-heavy services.",
      },
    ],
  },
  {
    section: "Performance, Scaling & Production Systems",
    questions: [
      {
        q: "How does Node handle thousands of connections?",
        a: "It multiplexes many sockets and async operations on the event loop rather than assigning a thread per connection. This is efficient for I/O-heavy workloads, but only as long as request handlers stay non-blocking.",
      },
      {
        q: "What are the tradeoffs of Promise.all?",
        a: "Promise.all reduces end-to-end latency for independent tasks, but it can also amplify downstream pressure and memory usage if too many operations are launched at once. Concurrency without limits is not the same as controlled throughput.",
      },
      {
        q: "What is backpressure in Node streams?",
        a: "Backpressure is how consumers signal producers to slow down when downstream processing cannot keep up. Without it, memory grows, latency spikes, and pipelines fail under load.",
      },
      {
        q: "What are streams in Node.js?",
        a: "Streams process data incrementally instead of buffering entire payloads in memory. They are a core tool for large files, proxying, ETL flows, and anything where bounded memory matters.",
      },
      {
        q: "Readable vs Writable vs Duplex streams",
        a: "Readable streams emit data, writable streams consume data, and duplex streams do both. This matters architecturally because it determines where buffering, transformation, and backpressure control actually happen.",
      },
      {
        q: "Why use stream.pipeline?",
        a: "Pipeline connects streams with proper error forwarding and cleanup semantics. It is safer than manually wiring `pipe()` chains in production because partial failure handling is otherwise easy to get wrong.",
        code: `import { pipeline } from "node:stream/promises";
\nawait pipeline(sourceStream, transformStream, destinationStream);`,
      },
      {
        q: "Worker Threads vs Child Process",
        a: "Worker threads are better for CPU work sharing memory in one process, while child processes provide stronger isolation and separate memory spaces. The choice depends on failure isolation, payload transfer cost, and operational model.",
      },
      {
        q: "What is the purpose of the Cluster module?",
        a: "Cluster lets multiple Node processes share a port so one host can use multiple CPU cores. It improves utilization, but container orchestration often becomes the cleaner scaling primitive at platform level.",
      },
      {
        q: "CommonJS vs ES Modules",
        a: "CommonJS is synchronous and historically dominant in Node, while ES Modules align with the JavaScript standard and support static analysis better. Mixed module ecosystems still create friction in tooling and packaging.",
      },
      {
        q: "require vs import",
        a: "`require` loads CommonJS modules dynamically at runtime, while `import` is part of the ES module system with static structure and different resolution semantics. The engineering concern is compatibility, tooling, and package boundary clarity.",
      },
      {
        q: "What is module caching?",
        a: "Node caches loaded modules so repeated imports do not re-execute the module body. This improves efficiency, but it also means mutable module-level state can quietly become shared state across the process.",
      },
      {
        q: "Why do circular dependencies cause pain?",
        a: "Circular dependencies can produce partially initialized modules and confusing runtime behavior. In large codebases they usually signal poor boundary design rather than just an import syntax issue.",
      },
      {
        q: "Why use package.json exports?",
        a: "The `exports` field defines the public surface of a package more explicitly and improves encapsulation. It helps prevent consumers from depending on internal files that later become impossible to refactor safely.",
      },
      {
        q: "Why do Node apps become slow?",
        a: "Most slow Node apps are not limited by JavaScript syntax but by blocking CPU work, poor I/O coordination, excessive serialization, memory pressure, or overloaded downstream services. The real task is finding which one dominates p95 and p99 latency.",
      },
      {
        q: "CPU-bound vs IO-bound workloads",
        a: "Node excels at I/O-bound workloads because the event loop can keep progressing while work waits on external systems. CPU-bound work should be isolated, otherwise it degrades every concurrent request sharing that process.",
      },
      {
        q: "How do you profile Node.js apps?",
        a: "Use CPU profiles, heap snapshots, event loop lag metrics, flamegraphs, and request tracing together. Single-tool profiling often misses whether the real issue is JS CPU, GC, I/O wait, or dependency latency.",
      },
      {
        q: "Examples of event loop blocking",
        a: "Large JSON serialization, synchronous crypto, regex catastrophes, image transforms, and huge in-memory loops can all block the loop. The production symptom is rising latency on otherwise simple requests.",
      },
      {
        q: "How do you detect memory leaks?",
        a: "Track heap growth over time, inspect retained objects, and correlate leaks with request patterns or feature flags. Common causes include unbounded caches, listener leaks, orphaned timers, and closure-retained state.",
      },
      {
        q: "Heap vs stack in Node.js",
        a: "The stack holds call frames and local execution context, while the heap stores dynamically allocated objects. Most production memory problems in Node are heap-related because long-lived object retention is the usual failure mode.",
      },
      {
        q: "How do you optimize APIs under load?",
        a: "Focus on efficient query patterns, bounded concurrency, compression only when justified, response shaping, caching, and reducing blocking work. Optimizing the wrong layer just moves bottlenecks downstream.",
      },
      {
        q: "How should Node services scale horizontally?",
        a: "Keep services stateless, run multiple instances behind a load balancer, externalize sessions and caches, and use queues for expensive workflows. Horizontal scaling only works cleanly when process-local state is not required for correctness.",
      },
      {
        q: "PM2 vs Docker vs Kubernetes",
        a: "PM2 helps with process supervision on a host, Docker standardizes packaging and runtime isolation, and Kubernetes manages orchestration, scaling, and rollout across many hosts. The choice depends on operational maturity and platform needs.",
      },
      {
        q: "What is the sticky sessions issue?",
        a: "Sticky sessions tie clients to specific instances, which complicates scaling and failover because state is no longer freely movable. For most APIs, externalizing session or connection state is a cleaner design.",
      },
      {
        q: "Redis with Node.js",
        a: "Redis is commonly used for caching, rate limiting, distributed locks, and ephemeral shared state. It helps Node services stay stateless, but it can also become a central dependency that needs its own availability design.",
      },
      {
        q: "In-memory cache tradeoffs",
        a: "In-memory caches are fast and simple, but they fragment state across instances and vanish on restart. They are useful for local hot data, not for correctness-critical shared coordination.",
      },
      {
        q: "API response caching considerations",
        a: "Response caching works best for expensive reads with stable cache keys and acceptable staleness. The hard part is invalidation, not storage.",
      },
      {
        q: "JWT vs Sessions in Node apps",
        a: "JWTs simplify stateless auth distribution but complicate revocation and rotation. Sessions centralize control but require shared state infrastructure. The decision is operational and security-driven, not purely stylistic.",
      },
      {
        q: "Why rate limit Node APIs?",
        a: "Rate limiting protects finite process and downstream capacity from abuse and accidental client storms. In Node specifically, preventing overload is crucial because one saturated process degrades all requests sharing the loop.",
      },
      {
        q: "What is Helmet for?",
        a: "Helmet helps apply security headers in Node web apps. It is useful, but it is only one layer of transport security and does not replace validation, auth, or secure deployment controls.",
      },
      {
        q: "Input validation and injection prevention",
        a: "All external input should be validated for shape and meaning before use, and database access should use parameterized queries or safe query builders. Node is especially exposed to supply-chain and injection issues when teams rely too heavily on convenience packages.",
      },
      {
        q: "How should env vars and npm dependency risk be handled?",
        a: "Environment variables should be treated as sensitive configuration, loaded minimally, and rotated safely. Dependency vulnerabilities require lockfiles, auditing, update discipline, and skepticism toward untrusted packages because npm supply-chain risk is real.",
      },
      {
        q: "Node with PostgreSQL or MongoDB",
        a: "The runtime works well with both, but the data model should drive the choice. PostgreSQL fits relational transactional systems; MongoDB fits document-heavy aggregate access. The Node layer must respect pooling, backpressure, and query efficiency either way.",
      },
      {
        q: "Why does connection pooling matter for Node?",
        a: "Because a highly concurrent Node service can overwhelm a database with too many fresh connections or parallel queries. Pool limits are effectively part of application flow control.",
      },
      {
        q: "ORM vs query builders in Node",
        a: "ORMs improve productivity and consistency, while query builders give more visibility and control over generated SQL. The right choice depends on team skill, complexity of queries, and tolerance for abstraction leakage.",
      },
      {
        q: "How should transactions be handled?",
        a: "Transactions should be scoped to business operations with clear retry and error semantics. In Node, the main risk is hiding too much transaction logic inside handlers without visibility into contention and rollback paths.",
      },
      {
        q: "How should graceful shutdown work?",
        a: "On shutdown, stop accepting new traffic, let in-flight work finish within bounds, close connections cleanly, and flush telemetry where practical. Abrupt exits cause dropped requests, duplicate jobs, and inconsistent visibility during incidents.",
      },
      {
        q: "Why does SIGTERM handling matter in containers?",
        a: "Containers are often terminated with SIGTERM before forced shutdown. If the process ignores it, deployments and autoscaling can drop in-flight requests or leave stateful work half-done.",
      },
      {
        q: "Zero downtime deployments with Node",
        a: "Zero downtime depends on readiness probes, graceful drain, backward-compatible changes, and rollout strategy. The application must cooperate with the platform or deployment safety is mostly an illusion.",
      },
      {
        q: "Unhandled promise rejections",
        a: "Unhandled rejections indicate async failures escaping the intended control path. In production, teams should treat them seriously because they often signal correctness bugs, observability blind spots, or unsafe process state after failure.",
      },
      {
        q: "What is process.nextTick starvation?",
        a: "If code schedules too much work with `process.nextTick`, it can prevent the event loop from progressing to I/O and timers. This is a classic fairness bug that only shows up under real workload pressure.",
      },
      {
        q: "OpenTelemetry observability in Node",
        a: "OpenTelemetry helps capture traces, metrics, and context propagation across async flows. In Node this matters because debugging concurrent distributed systems without correlation IDs and spans becomes guesswork quickly.",
      },
    ],
  },
  {
    section: "Advanced Architecture Patterns",
    questions: [
      {
        q: "Microservices with Node.js",
        a: "Node works well for microservices when service boundaries are clean and most work is I/O-centric. The failure mode is creating many tiny services with shared libraries and unclear ownership, which amplifies operational cost.",
      },
      {
        q: "Queue systems with RabbitMQ or Kafka",
        a: "Queues decouple request paths from slow or bursty work. RabbitMQ is strong for task routing and acknowledgements; Kafka is stronger for durable event streams and replay. The choice should follow delivery semantics and consumption patterns.",
      },
      {
        q: "Event-driven systems in Node",
        a: "Node is a natural fit for event-driven systems because async composition is already part of the runtime model. The tradeoff is that debugging, ordering, and consistency become harder as workflows spread across many events and consumers.",
      },
      {
        q: "WebSockets architecture in Node.js",
        a: "WebSockets fit Node well for chat, collaboration, and live dashboards, but they introduce connection state, fan-out design, sticky session concerns, and backpressure management. The architecture should separate connection handling from durable business events.",
      },
      {
        q: "How would you think about a real-time chat system in Node?",
        a: "Focus on connection management, message durability, delivery acknowledgements, ordering, offline sync, and fan-out strategy. Node can handle the connection layer well, but persistence and cross-instance routing must be designed explicitly.",
      },
      {
        q: "GraphQL with Node.js tradeoffs",
        a: "GraphQL gives clients flexible reads, but it increases resolver complexity, N+1 risk, caching difficulty, and authorization subtlety. Node teams need disciplined resolver composition and batching to avoid self-inflicted performance problems.",
      },
      {
        q: "What is the BFF pattern?",
        a: "A Backend For Frontend tailors backend aggregation and policy to a specific client experience. Node is a strong fit because it handles concurrent API composition well, but BFF sprawl can become a maintenance issue if boundaries are not clear.",
      },
      {
        q: "What is the role of an API Gateway with Node services?",
        a: "An API gateway centralizes auth, throttling, observability, and routing in front of services. It helps keep Node services focused on domain logic, but if overloaded with business behavior it becomes a brittle platform bottleneck.",
      },
      {
        q: "How would you design a scalable chat backend with Node.js?",
        a: "Use stateless API nodes for auth and metadata, dedicated websocket connection handling, a durable message store, and pub/sub for cross-instance fan-out. The hard problems are ordering, reconnection, and presence consistency.",
      },
      {
        q: "How would you design a notifications service?",
        a: "Put durable queues between producers and channel workers, model retries and dead letters explicitly, and separate user preference logic from delivery workers. Bottlenecks usually appear in fan-out volume and third-party provider instability.",
      },
      {
        q: "How would you design a job queue processor in Node?",
        a: "Keep API processes separate from workers, enforce bounded concurrency, make handlers idempotent, and instrument queue lag and retry patterns. Node is effective here if CPU-heavy jobs are isolated from the main event-loop services.",
      },
      {
        q: "How would you design a file upload service?",
        a: "Stream uploads instead of buffering them in memory, validate type and size early, and hand off scanning or transformations asynchronously. The failure modes are memory blowups, slow downstream storage, and inconsistent cleanup on partial uploads.",
      },
      {
        q: "How would you design a real-time dashboard?",
        a: "Separate ingest, aggregation, and websocket delivery. Node is well suited to delivery and API layers, but metrics aggregation often needs a store or stream processor optimized for time-series queries.",
      },
      {
        q: "How would you design a URL shortener in Node.js?",
        a: "Optimize the write path for key generation and the read path for low-latency redirection with aggressive caching. Node is a good fit for the HTTP layer, but data model, abuse prevention, and hot-key handling dominate scalability.",
      },
      {
        q: "Bun vs Node vs Deno comparison",
        a: "Node remains the most mature ecosystem choice for production backend systems. Bun is promising for speed and tooling integration, and Deno improves security defaults and developer ergonomics, but ecosystem maturity and operational confidence still matter more than benchmark headlines.",
      },
    ],
  },
];

export const expressInterviewSections: ExpressInterviewSection[] = [
  {
    section: "Core Concepts",
    questions: [
      {
        q: "What is Express.js and why is it used?",
        a: "Express is a minimal Node.js web framework used when teams want direct control over HTTP handling, middleware composition, and API structure without heavy framework opinion.",
      },
      {
        q: "How does Express handle the request-response lifecycle?",
        a: "A request enters the Node HTTP server, Express wraps the request and response objects, runs matching middleware and route handlers in order, then completes the response or forwards an error path.",
      },
      {
        q: "What is middleware in Express?",
        a: "Middleware is a function in the request pipeline that can inspect, mutate, short-circuit, or delegate request handling. It is the core composition model of Express.",
      },
      {
        q: "What are the main types of middleware in Express?",
        a: "Application middleware applies globally, router middleware is scoped to route modules, and error-handling middleware centralizes failure response and observability logic.",
      },
      {
        q: "How does routing work in Express?",
        a: "Express matches HTTP method and path patterns against registered handlers, then executes the matching middleware stack in definition order. Route organization becomes an architecture problem as the system grows.",
      },
      {
        q: "What is the difference between app.use, app.get, and router?",
        a: "`app.use` mounts middleware or routers broadly, `app.get` registers a GET route handler, and `router` creates modular route scopes so features do not collapse into one global app file.",
      },
      {
        q: "How do request and response objects work internally?",
        a: "Express extends Node’s native `IncomingMessage` and `ServerResponse` objects with convenience helpers like params, body parsing access, status setters, JSON helpers, and header utilities.",
      },
      {
        q: "How does Express handle async errors?",
        a: "Async errors must be forwarded into the middleware chain, typically by wrapper utilities or framework support patterns. If not propagated correctly, promise rejections can bypass centralized error handling.",
      },
      {
        q: "How should you think about authentication vs authorization in Express?",
        a: "Authentication proves identity; authorization decides what that identity may do. In production, these should be distinct layers rather than mixed into one middleware blob.",
      },
      {
        q: "JWT vs session-based auth tradeoffs",
        a: "JWTs help with distributed stateless APIs but complicate revocation and rotation. Sessions simplify invalidation and server-side control but require shared session storage at scale.",
      },
    ],
  },
  {
    section: "Architecture & Internals",
    questions: [
      {
        q: "How does the Node.js event loop matter in Express?",
        a: "Every Express request shares the same event loop in a process, so blocking CPU work or bad sync code can increase latency for unrelated requests across the whole instance.",
      },
      {
        q: "How does the middleware execution pipeline work?",
        a: "Express builds a chain of middleware layers and walks them sequentially. Each layer can end the response, call `next()`, or hand off an error, which makes ordering and side effects critical.",
      },
      {
        q: "How does Express handle concurrency?",
        a: "Express itself does not create multithreaded request handling. It benefits from Node’s asynchronous I/O model, where many in-flight requests coexist while the event loop coordinates callbacks and promise continuations.",
      },
      {
        q: "What happens step by step when a request hits an Express server?",
        a: "The Node HTTP server accepts the socket, Express matches middleware, parsers and auth layers run, the route handler executes business logic, and the response is serialized or an error pipeline is triggered.",
      },
      {
        q: "How should error handling architecture be designed in Express?",
        a: "Use centralized error middleware, consistent operational error types, trace-aware logging, and explicit mapping from internal failures to safe external HTTP responses.",
      },
      {
        q: "How does Express manage routes internally?",
        a: "Express stores route layers and middleware stacks internally and iterates through them during matching. That simplicity is powerful, but route sprawl can turn matching and ownership into maintenance problems.",
      },
      {
        q: "How does async/await work with Express handlers?",
        a: "Async handlers return promises, but Express does not automatically make all async failures safe in every pattern. Teams usually standardize wrappers or helper abstractions for consistent propagation.",
        code: `const asyncHandler =
  (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);`,
      },
      {
        q: "How does Express integrate with the Node HTTP module?",
        a: "Express is essentially a request listener layered on top of Node’s HTTP primitives. It does not replace Node networking; it organizes application logic around it.",
      },
      {
        q: "How do databases usually integrate with Express?",
        a: "Express should stay as the transport layer while database access lives in services or repositories. The handler coordinates the request, but the data access layer owns query logic and transactions.",
      },
      {
        q: "ORM vs raw queries tradeoffs",
        a: "ORMs accelerate consistency and developer speed, but can hide performance characteristics. Raw queries offer control and efficiency but raise the burden of safety, maintainability, and duplication.",
      },
      {
        q: "What is connection pooling and why does it matter?",
        a: "Pooling reuses database connections instead of opening one per request. Without it, latency and resource usage degrade quickly under concurrent traffic.",
      },
      {
        q: "How should transaction handling work in Express APIs?",
        a: "Transactions should be scoped to the business operation, not the route file. The application/service layer should own commit, rollback, and consistency rules.",
      },
      {
        q: "How do you handle race conditions in APIs?",
        a: "Use database constraints, optimistic locking, idempotency keys, transactional updates, or queue-based serialization depending on the consistency requirement.",
      },
      {
        q: "How do you design scalable REST APIs in Express?",
        a: "Design around stable resource models, explicit versioning, pagination, validation, predictable error contracts, and domain-based routing boundaries rather than ad hoc endpoint growth.",
      },
    ],
  },
  {
    section: "Performance, Security & Production Systems",
    questions: [
      {
        q: "How do you scale Express apps horizontally?",
        a: "Keep instances stateless, externalize sessions and caches, run multiple replicas behind a load balancer, and move long-running work to background systems.",
      },
      {
        q: "What is clustering in Node.js for Express apps?",
        a: "Clustering runs multiple Node processes on one host to use multiple CPU cores. It improves throughput but introduces operational concerns like sticky sessions and per-process memory isolation.",
      },
      {
        q: "What load balancing strategies matter for Express?",
        a: "Use health-checked distribution across stateless instances, and add stickiness only when unavoidable. The best strategy depends on websocket use, session design, and deployment topology.",
      },
      {
        q: "What are practical caching strategies in Express systems?",
        a: "Use Redis or similar stores for hot reads, session data, rate limiting, and computed responses, but only where staleness and invalidation strategy are clearly defined.",
      },
      {
        q: "How do you avoid blocking the event loop?",
        a: "Keep handlers I/O-oriented, move CPU-heavy work to workers or separate services, stream large payloads, and avoid synchronous filesystem or crypto operations in request paths.",
      },
      {
        q: "What are good rate limiting strategies?",
        a: "Apply limits by IP, user, route, or token class depending on abuse risk. Distributed limit storage is usually required in horizontally scaled systems.",
      },
      {
        q: "How should middleware-based auth flow be designed?",
        a: "Auth middleware should validate identity early, attach a trusted user context, and leave resource-level authorization to later domain-specific checks instead of overloading one global middleware.",
      },
      {
        q: "Why does CORS matter?",
        a: "CORS controls which browser origins may access your API. It is not a full security layer, but misconfiguration can unintentionally expose browser-consumable endpoints.",
      },
      {
        q: "What is Helmet and why use security headers?",
        a: "Helmet helps set safer default HTTP headers. It is useful hardening, but it does not replace input validation, auth, secure deployment, or abuse protection.",
      },
      {
        q: "Why are input validation and sanitization critical?",
        a: "Validation protects application contracts and stops malformed input early. Sanitization reduces downstream injection and unsafe rendering risks, especially around user-generated content and query construction.",
      },
      {
        q: "How do you prevent SQL injection and NoSQL injection?",
        a: "Use parameterized queries, schema validation, safe query builders, strict operator whitelisting, and never trust raw user input in query construction.",
      },
      {
        q: "What logging strategy works well in production Express apps?",
        a: "Use structured logging with correlation IDs and log levels tuned for production. The goal is searchable operational context, not printing strings to stdout everywhere.",
      },
      {
        q: "What should monitoring and observability include?",
        a: "Track latency, error rates, saturation, request traces, logs, dependency health, and business-critical signals so incidents can be detected and explained quickly.",
      },
      {
        q: "Why do health check endpoints matter?",
        a: "Health checks let orchestrators and operators distinguish healthy instances from degraded ones. Good checks should reflect service readiness, not just process existence.",
      },
      {
        q: "How should graceful shutdown work?",
        a: "Stop accepting new requests, allow in-flight requests to complete, close external connections cleanly, and exit within a bounded timeout so deployments do not drop traffic abruptly.",
      },
      {
        q: "What are environment configuration best practices?",
        a: "Validate config at startup, keep secrets out of source control, separate environment-specific values clearly, and fail fast if required settings are missing or invalid.",
      },
      {
        q: "How should API versioning be approached?",
        a: "Version only when compatibility requires it. Prefer additive changes where possible, and use explicit versioning when contract evolution cannot remain backward compatible.",
      },
      {
        q: "Microservices vs monolith with Express",
        a: "A monolith is usually simpler to operate early on. Microservices help when domain boundaries, scaling needs, or team autonomy justify the additional distributed systems complexity.",
      },
      {
        q: "What does event-driven architecture look like around Express systems?",
        a: "Express often acts as the synchronous API edge while events propagate domain changes asynchronously through queues or brokers for downstream processing.",
      },
      {
        q: "How do queue systems like RabbitMQ or Kafka fit into Express backends?",
        a: "Queues offload slow or bursty work, improve resilience, and decouple services. The tradeoff is eventual consistency, operational overhead, and the need for idempotent consumers.",
      },
      {
        q: "How are WebSockets used with Express in real-time systems?",
        a: "Express often handles the HTTP setup layer while websocket infrastructure manages persistent connections. Real-time architecture also needs scaling, stickiness, and backpressure design.",
      },
      {
        q: "What are the tradeoffs in file upload handling?",
        a: "Streaming uploads are more memory-safe and production-ready for large files, while buffering in memory is simpler but risky under concurrency and large payload sizes.",
      },
      {
        q: "When should you use streaming responses in Express?",
        a: "Use streaming when payloads are large, incremental, or latency-sensitive. It improves memory usage and time-to-first-byte but complicates error handling and connection lifecycle management.",
      },
      {
        q: "What are common middleware chaining pitfalls?",
        a: "Calling `next()` after sending a response, mutating shared request state carelessly, and burying business logic in middleware chains are common sources of hard-to-debug behavior.",
      },
      {
        q: "How do memory leaks show up in Node/Express apps?",
        a: "They often come from retained listeners, unbounded caches, unresolved timers, or objects captured in long-lived closures. In production, this appears as gradual memory growth and unstable restarts.",
      },
      {
        q: "What is backpressure handling in APIs?",
        a: "Backpressure is how the system resists being overwhelmed by downstream speed mismatches. In Express systems, that means streaming carefully, rate limiting, queueing, and protecting dependencies from overload.",
      },
    ],
  },
];

export const nestInterviewSections: NestInterviewSection[] = [
  {
    section: "Core Concepts",
    questions: [
      {
        q: "What is NestJS and why is it used?",
        a: "NestJS is an opinionated Node.js framework built for scalable backend systems. It is used when teams want consistent architecture, dependency injection, modularity, and strong testability across large codebases.",
      },
      {
        q: "How is NestJS different from Express?",
        a: "Express is minimal and leaves architecture to the team. NestJS sits on top of Express or Fastify and adds a structured application model with modules, DI, guards, pipes, interceptors, and decorators.",
      },
      {
        q: "What is modular architecture in NestJS?",
        a: "NestJS organizes features into modules that define boundaries for providers, controllers, and exports. This helps large systems maintain ownership, reuse, and dependency clarity.",
      },
      {
        q: "What are Controllers, Services, and Modules?",
        a: "Controllers handle transport-level requests, services contain application or domain logic, and modules wire related providers and controllers into a coherent feature boundary.",
      },
      {
        q: "How does Dependency Injection work in NestJS?",
        a: "Nest resolves class dependencies through a container that instantiates providers based on metadata and module registration. This keeps construction and consumption decoupled.",
      },
      {
        q: "What are Providers and how does the DI container use them?",
        a: "Providers are injectable units such as services, repositories, adapters, and factories. The DI container registers them by token and resolves them where requested.",
      },
      {
        q: "What are decorators in NestJS?",
        a: "Decorators attach metadata that Nest uses to define controllers, routes, providers, guards, pipes, and module structure. They are part of the framework contract, not just syntax sugar.",
      },
      {
        q: "Why is NestJS attractive for enterprise teams?",
        a: "Because it reduces architectural drift. Teams get common patterns for validation, security, dependency wiring, transport abstraction, and testing instead of inventing each one separately.",
      },
    ],
  },
  {
    section: "Architecture & Internals",
    questions: [
      {
        q: "How does NestJS bootstrap an application?",
        a: "Nest starts by creating an application context, scanning modules and metadata, building the DI graph, instantiating providers, and then binding the chosen HTTP adapter and route handlers.",
      },
      {
        q: "How does the Dependency Injection container work internally?",
        a: "Nest builds a provider graph from module metadata, resolves dependencies by token, handles scope rules, and caches singleton instances unless request or transient scope is explicitly used.",
      },
      {
        q: "What is the request lifecycle in NestJS?",
        a: "A request typically passes through middleware, guards, interceptors, pipes, controller handlers, service logic, then response interception or exception filters before returning to the client.",
      },
      {
        q: "What is the difference between Middleware, Guards, Interceptors, and Pipes?",
        a: "Middleware handles broad request preprocessing, guards decide access, pipes validate or transform input, and interceptors wrap execution for cross-cutting behavior such as logging or response shaping.",
      },
      {
        q: "What is the execution order of the NestJS request pipeline?",
        a: "Middleware runs first, then guards, then interceptors before controller execution, then pipes for handler arguments, then the handler, then interceptors on the way out, with exception filters handling thrown errors.",
      },
      {
        q: "How are modules resolved and loaded?",
        a: "Nest recursively loads imported modules, registers their providers and controllers, then exposes only exported providers across module boundaries. This keeps internal implementation hidden unless deliberately shared.",
      },
      {
        q: "What are dynamic modules?",
        a: "Dynamic modules let you configure module registration at runtime, often to inject environment-specific providers, options objects, or external service clients.",
      },
      {
        q: "How does NestJS integrate with Express and Fastify?",
        a: "Nest abstracts the HTTP platform through adapters. That means application structure stays mostly the same while the underlying request engine can be Express or Fastify depending on performance and ecosystem needs.",
      },
      {
        q: "What is the reflection metadata system in NestJS?",
        a: "Nest uses TypeScript decorator metadata and reflection to understand routes, parameter bindings, providers, guards, and custom framework behavior at runtime.",
      },
      {
        q: "What tradeoffs come with request-scoped providers?",
        a: "They are useful for per-request context but cost more than singletons because instances are created for each request path. Overusing them can add avoidable overhead under load.",
      },
      {
        q: "How should authentication flow be designed with Guards?",
        a: "Authentication guards should validate identity early and attach trusted user context. Authorization should remain a separate layer for resource-level decisions, not be buried inside one generic guard.",
      },
      {
        q: "How should RBAC be implemented in NestJS?",
        a: "RBAC is usually implemented with metadata-driven guards that evaluate roles or permissions against a trusted user context. The design should support policy evolution, not hardcode checks across controllers.",
      },
      {
        q: "What is the difference between transformation and validation in Pipes?",
        a: "Validation ensures input matches contract expectations; transformation converts raw transport data into the shape the application actually wants to consume.",
      },
      {
        q: "Why use Interceptors for logging, caching, or transformation?",
        a: "Interceptors are ideal for cross-cutting execution wrappers because they can observe timing, alter responses, apply caching, or attach telemetry without contaminating handlers.",
      },
    ],
  },
  {
    section: "Advanced Backend Systems & Production Design",
    questions: [
      {
        q: "What is NestJS Microservices architecture?",
        a: "NestJS microservices let you use the same application patterns across event-driven and RPC-style services by abstracting transport details behind a consistent programming model.",
      },
      {
        q: "How should you think about transport layers like TCP, Redis, NATS, RabbitMQ, and Kafka?",
        a: "Choose transports based on delivery semantics, topology, throughput, ordering, and operational maturity. The transport is an infrastructure choice, not the architecture by itself.",
      },
      {
        q: "Request-response vs event-driven communication tradeoffs",
        a: "Request-response is simpler and immediate but tightly coupled. Event-driven communication improves decoupling and resilience, but introduces eventual consistency, retries, and consumer coordination complexity.",
      },
      {
        q: "What are message patterns in NestJS microservices?",
        a: "Message patterns define how services consume commands, queries, or events across transports. The real design question is whether you are modeling synchronous workflows or asynchronous domain propagation.",
      },
      {
        q: "TypeORM vs Prisma vs Mongoose tradeoffs",
        a: "TypeORM is decorator-heavy and ORM-oriented, Prisma emphasizes type-safe query ergonomics, and Mongoose fits document-centric MongoDB modeling. The tradeoff is control, abstraction style, and team familiarity.",
      },
      {
        q: "What is the Repository pattern in NestJS?",
        a: "The repository pattern isolates persistence concerns behind domain-oriented interfaces. It is useful when you want transport and service layers to stay independent from query implementation details.",
      },
      {
        q: "How should transaction handling work in NestJS applications?",
        a: "Transactions belong in the application or domain service layer around a business operation, not scattered across controllers. The system must define clear consistency boundaries.",
      },
      {
        q: "Why does connection pooling matter?",
        a: "Pooling avoids the overhead of creating database connections per request and protects backend services from collapsing under concurrency spikes.",
      },
      {
        q: "What is CQRS and when does it make sense in NestJS?",
        a: "CQRS separates write and read responsibilities when the domain or scaling model benefits from different models, flows, or optimization paths. It is useful, but unnecessary for simple CRUD services.",
      },
      {
        q: "How does NestJS handle scalability?",
        a: "NestJS scales well when the application is stateless at the edge, modules are well-bounded, long-running work is asynchronous, and infrastructure concerns such as caching and queues are designed deliberately.",
      },
      {
        q: "In-memory cache vs Redis cache tradeoffs",
        a: "In-memory cache is fast and simple but isolated per instance. Redis works across replicas and supports broader system patterns, but adds network hops and operational dependency.",
      },
      {
        q: "How should request throttling and rate limiting be applied?",
        a: "Use throttling per endpoint risk profile and distribute counters if the system is horizontally scaled. Rate limiting is part of abuse prevention and dependency protection, not just auth security.",
      },
      {
        q: "Cluster mode vs PM2 usage",
        a: "Cluster mode uses multiple Node processes to use CPU cores. PM2 adds orchestration features like process supervision and restarts, but container platforms often replace part of that operational role.",
      },
      {
        q: "How do you avoid blocking operations in NestJS?",
        a: "Keep request paths I/O-oriented, push heavy jobs to workers or async pipelines, and avoid CPU-heavy synchronous logic inside controller or service execution.",
      },
      {
        q: "How should authentication strategies be chosen in NestJS?",
        a: "Use JWT, sessions, or OAuth2 based on client type, revocation needs, identity provider model, and operational constraints. The right answer depends on the trust and lifecycle model.",
      },
      {
        q: "What role does Passport.js play in NestJS?",
        a: "Passport integrates strategy-based authentication into Nest guards and request flow. It is convenient, but teams should still understand the security model rather than treat Passport as magic.",
      },
      {
        q: "Why are input validation and sanitization critical in NestJS?",
        a: "Validation protects contracts and prevents malformed requests from entering business logic. Sanitization reduces injection and unsafe payload risks, especially when inputs propagate across services.",
      },
      {
        q: "How should CORS and Helmet be handled in NestJS?",
        a: "CORS should be explicitly scoped to real client origins, and Helmet should be part of layered HTTP hardening. Neither replaces proper auth, validation, or deployment-level controls.",
      },
      {
        q: "What does good logging architecture look like in NestJS?",
        a: "Use structured logs with correlation IDs, environment-aware log levels, and centralized transport integration such as Pino or Winston. Logging should support diagnosis, not just print events.",
      },
      {
        q: "Why use global exception filters?",
        a: "Global filters standardize how internal failures become external responses and telemetry. They keep error mapping consistent across controllers and transports.",
      },
      {
        q: "How should health checks and monitoring endpoints be designed?",
        a: "Readiness and liveness checks should reflect actual service health, not just process availability. Monitoring should combine metrics, logs, traces, and dependency health signals.",
      },
      {
        q: "How should graceful shutdown work in NestJS?",
        a: "The app should stop accepting new work, drain in-flight requests, close adapters and external connections, and exit predictably so deployments do not cause partial failures.",
      },
      {
        q: "What are configuration management best practices in NestJS?",
        a: "Use ConfigModule or equivalent centralized config, validate environment values at startup, separate secrets from code, and fail fast when required configuration is invalid.",
      },
      {
        q: "How should API versioning be handled?",
        a: "Prefer backward-compatible evolution where possible, then use explicit versioning when contracts must diverge. Versioning should reflect product stability, not framework convenience alone.",
      },
      {
        q: "How should multi-environment deployment be designed?",
        a: "Keep artifacts immutable across environments, vary only config and infrastructure bindings, and standardize health, observability, and rollout policies across stages.",
      },
      {
        q: "How does the Saga pattern fit in NestJS systems?",
        a: "Sagas coordinate long-running distributed workflows where local transactions succeed independently and compensation handles failure across service boundaries.",
      },
      {
        q: "What is the Outbox pattern and why does it matter?",
        a: "The Outbox pattern ensures domain state changes and emitted events stay consistent by persisting outbound messages transactionally before asynchronous publishing.",
      },
      {
        q: "How does EventEmitter or Kafka fit into event-driven NestJS design?",
        a: "EventEmitter is useful inside one service boundary; Kafka and similar brokers are for durable cross-service event propagation. They solve different levels of system coupling.",
      },
      {
        q: "What role can GraphQL play in a NestJS system?",
        a: "GraphQL can be a strong API layer for client-driven aggregation, but it increases schema design complexity, resolver performance concerns, and authorization surface area.",
      },
      {
        q: "How are WebSockets used in NestJS real-time systems?",
        a: "Nest can host websocket gateways for real-time communication, but scaling them requires attention to sticky sessions, pub-sub fanout, and connection lifecycle management.",
      },
      {
        q: "What are the tradeoffs in file upload handling?",
        a: "Streaming uploads are more production-safe for large payloads and lower memory use. Buffering in memory is simpler but dangerous under concurrency and large files.",
      },
      {
        q: "What is the API gateway role in a NestJS microservices ecosystem?",
        a: "The API gateway acts as the edge boundary for routing, auth, aggregation, and client-facing concerns while internal services stay focused on domain capabilities.",
      },
    ],
  },
];

export const fastApiInterviewSections: FastApiInterviewSection[] = [
  {
    section: "Core Concepts",
    questions: [
      {
        q: "What is FastAPI and why is it used?",
        a: "FastAPI is a Python API framework built for typed request handling, async support, and strong developer ergonomics. Teams use it when they want modern API contracts with good performance and low boilerplate.",
      },
      {
        q: "FastAPI vs Flask vs Django differences",
        a: "Flask is minimal and flexible, Django is a batteries-included web framework, and FastAPI is API-focused with typed validation and async-first design. The right choice depends on system shape, not popularity.",
      },
      {
        q: "What makes FastAPI fast?",
        a: "Its performance comes from the ASGI stack, efficient request handling, and low-friction typed validation. The framework is fast, but real throughput still depends on I/O behavior, database design, and deployment choices.",
      },
      {
        q: "What is ASGI and how is it different from WSGI?",
        a: "ASGI supports async request handling, long-lived connections, and modern concurrency models. WSGI is synchronous and fits older request-response server models better than real-time or async-heavy workloads.",
      },
      {
        q: "What are Pydantic models and why do they matter?",
        a: "Pydantic models define typed input and output contracts, validate payloads, and shape data at the API boundary. They improve correctness and reduce manual parsing logic.",
      },
      {
        q: "How do path parameters, query parameters, and request bodies work in FastAPI?",
        a: "FastAPI infers them from function signatures and type annotations. That keeps transport contracts explicit and lets validation happen before business logic runs.",
      },
      {
        q: "How does dependency injection work in FastAPI?",
        a: "Dependencies are declared in function signatures and resolved by the framework per request or per call site. This is useful for auth, configuration, sessions, and reusable request context.",
      },
      {
        q: "Why is automatic OpenAPI / Swagger generation useful?",
        a: "It keeps API documentation aligned with code contracts and reduces drift between implementation and integration docs. It is valuable for internal platforms and consumer-facing APIs alike.",
      },
    ],
  },
  {
    section: "Architecture & Internals",
    questions: [
      {
        q: "How does FastAPI handle the request lifecycle?",
        a: "A request enters the ASGI server, passes through middleware, gets routed, dependencies are resolved, validation runs, the endpoint executes, and the response is serialized or an exception handler takes over.",
      },
      {
        q: "What is the ASGI server flow with Uvicorn or Hypercorn?",
        a: "The ASGI server accepts network connections, builds the ASGI scope, invokes the app callable, and coordinates async send/receive events across the request lifecycle.",
      },
      {
        q: "How does async/await work in FastAPI?",
        a: "Async endpoints let the event loop switch away while waiting on non-blocking I/O. This improves concurrency for I/O-bound systems, but does not make CPU-heavy code magically faster.",
      },
      {
        q: "How does the event loop matter in Python async apps?",
        a: "The event loop is the coordination layer for async tasks. If blocking work runs inside it, request latency rises and concurrency gains disappear even if the code looks async.",
      },
      {
        q: "How does FastAPI’s dependency injection system work internally?",
        a: "FastAPI builds a dependency graph from function signatures, resolves nested dependencies in order, and caches request-scoped values where appropriate for that resolution path.",
      },
      {
        q: "How does middleware execution flow work in FastAPI?",
        a: "Middleware wraps the ASGI app and executes around request handling. It is best for cross-cutting transport concerns, not for burying application logic.",
      },
      {
        q: "How does routing work internally in FastAPI?",
        a: "Routing is inherited from Starlette-style path matching and endpoint registration. FastAPI layers validation, dependency resolution, and schema generation on top of that routing base.",
      },
      {
        q: "How does FastAPI integrate with Starlette?",
        a: "FastAPI uses Starlette for the core ASGI app, middleware, routing, and response infrastructure, while adding typed validation, dependency injection, and OpenAPI generation.",
      },
      {
        q: "What is the Pydantic validation pipeline?",
        a: "Incoming data is parsed against annotated models and types before entering application logic. That keeps invalid transport payloads from leaking deeper into the service layer.",
      },
      {
        q: "When should you use async vs sync endpoints?",
        a: "Use async when the handler relies on non-blocking I/O end to end. Use sync when the code is CPU-bound or depends on blocking libraries that would otherwise stall the event loop.",
      },
      {
        q: "Blocking vs non-blocking I/O tradeoff in FastAPI",
        a: "Non-blocking I/O improves concurrency for waiting-heavy workloads. Blocking calls inside async handlers undermine that model and should be isolated to threads, workers, or separate services.",
      },
      {
        q: "When would you use ThreadPoolExecutor in FastAPI?",
        a: "Use it when you must call blocking code from an async application and cannot replace that dependency. It is a bridge, not a primary scaling strategy.",
      },
      {
        q: "What are common performance pitfalls in async Python?",
        a: "Blocking libraries, oversized JSON work, poor connection reuse, excessive task fan-out, and assuming async alone solves downstream bottlenecks are the most common failures.",
      },
    ],
  },
  {
    section: "Advanced Backend Systems & Production Design",
    questions: [
      {
        q: "SQLAlchemy vs Tortoise ORM vs Prisma tradeoffs in Python systems",
        a: "SQLAlchemy gives deep control and maturity, Tortoise is async-oriented but lighter weight, and Prisma-like approaches emphasize schema-driven ergonomics. The tradeoff is abstraction style versus control and ecosystem depth.",
      },
      {
        q: "How should session management work in FastAPI?",
        a: "Session lifecycle should be explicit and controlled by dependencies or service boundaries, not scattered across endpoints. Database sessions should be short-lived and request-scoped.",
      },
      {
        q: "Why does connection pooling matter in FastAPI backends?",
        a: "Pooling avoids reconnect overhead and protects databases from collapse under concurrent traffic. Async apps still need disciplined pool sizing relative to worker count and dependency limits.",
      },
      {
        q: "How should transaction handling be designed?",
        a: "Transactions should wrap business operations in the service layer, not controller-like endpoint code. The real design question is consistency boundary, not just ORM syntax.",
      },
      {
        q: "How do you avoid N+1 query problems?",
        a: "Use eager loading, query shaping, batching, and profiling. N+1 is usually a data-access design problem rather than a framework problem.",
      },
      {
        q: "How should JWT authentication be implemented in FastAPI?",
        a: "Use dependency-based auth boundaries, token verification, and explicit user-context creation. JWTs are useful, but revocation, rotation, and claim trust must be designed carefully.",
      },
      {
        q: "What is OAuth2 password flow and when is it appropriate?",
        a: "It is a credential-based token flow typically used for trusted first-party clients. It is usually not the right choice for third-party delegated auth scenarios.",
      },
      {
        q: "How does dependency-based authentication help in FastAPI?",
        a: "It keeps authentication reusable and explicit by composing auth checks into endpoint signatures or routers rather than duplicating logic across handlers.",
      },
      {
        q: "How should RBAC be designed in FastAPI?",
        a: "RBAC should be implemented as policy-aware authorization on top of verified identity, ideally through reusable dependencies or service-layer policies rather than ad hoc inline checks.",
      },
      {
        q: "How should CORS and security headers be handled?",
        a: "CORS should be scoped to real clients and environments, and security headers should be added through middleware or gateway controls. Neither replaces validation or auth design.",
      },
      {
        q: "Why is FastAPI considered high-performance in production?",
        a: "Because it combines an efficient ASGI stack with low-overhead API ergonomics. But real performance depends more on architecture, dependency behavior, and deployment than framework benchmarks.",
      },
      {
        q: "How do Uvicorn workers and multi-process scaling work?",
        a: "Each worker is a separate process with its own event loop. Scaling workers improves throughput across CPU cores, but also increases memory use and coordination needs.",
      },
      {
        q: "What is the Gunicorn + Uvicorn worker model?",
        a: "Gunicorn can supervise multiple Uvicorn worker processes, combining Python process management with ASGI serving. It is common when teams want mature process control around async apps.",
      },
      {
        q: "What are practical caching strategies in FastAPI systems?",
        a: "Use Redis or similar for shared cache, idempotency, rate limiting, and hot reads. In-process cache is only useful when instance-local inconsistency is acceptable.",
      },
      {
        q: "When should you use response streaming or chunked responses?",
        a: "Use streaming for large payloads, incremental generation, or low-memory transfer paths. It improves memory safety but complicates error semantics and connection management.",
      },
      {
        q: "BackgroundTasks vs Celery tradeoffs",
        a: "BackgroundTasks are fine for lightweight post-response work inside the same process. Celery or external workers are better for durable, retryable, long-running, or high-scale background jobs.",
      },
      {
        q: "What should structured logging look like in FastAPI?",
        a: "Use structured logs with correlation IDs, request context, and environment-aware levels. Logging should support tracing and incident response, not just console output.",
      },
      {
        q: "How should error handling be designed with exception handlers?",
        a: "Use centralized exception handlers to standardize failure mapping, logging, and client-safe responses. This keeps transport behavior consistent across the application.",
      },
      {
        q: "Why are health checks and readiness probes important?",
        a: "They help orchestrators and operators distinguish a live process from a ready service. Good checks include dependency readiness, not just application startup success.",
      },
      {
        q: "What are environment configuration best practices?",
        a: "Centralize config, validate it at startup, separate secrets from code, and keep environment differences declarative rather than hidden in conditional logic.",
      },
      {
        q: "How should API versioning be handled?",
        a: "Prefer backward-compatible evolution where possible, then version explicitly when contracts diverge. Versioning is a product and integration strategy, not just a URL format choice.",
      },
      {
        q: "What are good rate limiting strategies for FastAPI services?",
        a: "Apply rate limits where abuse or dependency protection matters, and use shared state like Redis for distributed enforcement when running multiple instances.",
      },
      {
        q: "How does FastAPI fit in a microservices architecture?",
        a: "FastAPI works well as a service boundary when APIs are typed, I/O-heavy, and independently deployable. The hard problems remain contract evolution, observability, and cross-service consistency.",
      },
      {
        q: "How should event-driven architecture be approached with FastAPI?",
        a: "Use FastAPI as the synchronous ingress layer when appropriate, and push asynchronous workflows through brokers or queues. The event bus is part of the architecture, not just a library integration.",
      },
      {
        q: "How do queues and async processing fit into FastAPI systems?",
        a: "Queues decouple request latency from slow work, absorb bursts, and improve resilience. They also require idempotency, retries, dead-letter strategy, and operational visibility.",
      },
      {
        q: "What service-to-service communication patterns matter?",
        a: "Choose between sync HTTP, async messaging, or hybrid models based on latency needs, consistency requirements, and failure isolation. Simplicity usually wins unless scale forces complexity.",
      },
      {
        q: "What is the API Gateway role with FastAPI services?",
        a: "The gateway handles edge concerns like auth, routing, aggregation, and policy enforcement so internal FastAPI services remain focused on domain behavior.",
      },
      {
        q: "How do WebSockets fit into FastAPI production systems?",
        a: "FastAPI can support WebSockets well, but real-time systems still need scaling, connection lifecycle management, fanout strategy, and backpressure-aware design.",
      },
      {
        q: "What are the tradeoffs in streaming large file uploads?",
        a: "Streaming to disk or object storage is safer for memory and throughput, while buffering is simpler but risky under concurrency or large payload sizes.",
      },
      {
        q: "What are advanced dependency injection patterns in FastAPI?",
        a: "Use layered dependencies for auth, tenancy, sessions, and policy context, but keep the graph understandable. Over-composed DI can become hard to reason about in large codebases.",
      },
      {
        q: "How should large FastAPI apps be structured modularly?",
        a: "Organize by domain with clear routers, schemas, services, repositories, and shared infrastructure modules. Avoid one giant routes package tied directly to persistence details.",
      },
      {
        q: "How would you design a multi-tenant system in FastAPI?",
        a: "Resolve tenant context early, isolate data access by tenant boundaries, enforce authorization consistently, and make sure caching, logging, and background processing remain tenant-aware.",
      },
    ],
  },
];
