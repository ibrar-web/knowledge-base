export type BackendPrepQuestion = {
  question: string;
  shortAnswer: string;
  deepExplanation: string;
  useCase: string;
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
