export type PrepQuestion = {
  question: string;
  shortAnswer: string;
  deepExplanation: string;
  useCase: string;
};

export type NextJsInterviewQuestion = {
  q: string;
  a: string;
  code?: string;
};

export type NextJsInterviewSection = {
  section: string;
  questions: NextJsInterviewQuestion[];
};

export type ReactInterviewQuestion = {
  q: string;
  a: string;
  code?: string;
};

export type ReactInterviewSection = {
  section: "Core Concepts" | "Advanced Concepts" | "Performance & Architecture";
  questions: ReactInterviewQuestion[];
};

export type ReactNativeInterviewQuestion = {
  q: string;
  a: string;
  code?: string;
};

export type ReactNativeInterviewSection = {
  section:
    | "Core Concepts"
    | "Architecture & Internals"
    | "Performance, Native Integration & Production Challenges";
  questions: ReactNativeInterviewQuestion[];
};

export type PrepTopic = {
  id: "nextjs" | "react" | "react-native";
  label: string;
  accent: string;
  commands: string[];
  concepts: string[];
  questions: PrepQuestion[];
};

export const frontendPrepTopics: PrepTopic[] = [
  {
    id: "nextjs",
    label: "Next.js",
    accent: "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
    commands: ["npx create-next-app@latest my-app", "cd my-app", "npm run dev"],
    concepts: [
      "Rendering strategies (SSR, SSG, ISR)",
      "App Router architecture",
      "Server vs Client components",
      "Middleware usage",
      "API routes",
      "Performance optimization techniques",
    ],
    questions: [
      {
        question: "What is SSR, SSG, ISR in Next.js?",
        shortAnswer:
          "SSR renders per request, SSG renders at build time, and ISR regenerates static pages after deployment on a revalidation window.",
        deepExplanation:
          "These are delivery strategies for balancing freshness, latency, and infrastructure cost. SSR is useful when response content depends on request-time data such as cookies, headers, or rapidly changing records. SSG is ideal for content that changes infrequently because HTML is prebuilt and served cheaply at the edge. ISR extends SSG by allowing stale pages to be rebuilt in the background, so you keep static performance while updating content without a full rebuild.",
        useCase:
          "A marketing site can use SSG for landing pages, ISR for documentation that changes daily, and SSR for a personalized dashboard that depends on the signed-in user context.",
      },
      {
        question: "What is the difference between App Router and Pages Router?",
        shortAnswer:
          "App Router is the newer React Server Components based routing model with nested layouts and streaming, while Pages Router is the older file-based router built around page-level rendering and API routes.",
        deepExplanation:
          "App Router changes how data flows through a Next.js app. Layouts are hierarchical, components are server-first, and features like loading states, streaming, and colocated server logic are built into the route tree. Pages Router is simpler conceptually but less expressive for nested UI and shared route state. In production, App Router improves composition, reduces client bundle pressure, and aligns better with modern React, but teams need clearer boundaries between server and client code.",
        useCase:
          "A large SaaS app with persistent side navigation, nested dashboards, and partial page streaming benefits from App Router, while a legacy content app may remain on Pages Router until the migration cost is justified.",
      },
      {
        question: "What are Server Components and Client Components?",
        shortAnswer:
          "Server Components render on the server and do not ship their logic to the browser, while Client Components run in the browser and can use state, effects, and event handlers.",
        deepExplanation:
          "Server Components are designed to move non-interactive work closer to the data source and reduce JavaScript sent to the client. They are ideal for fetching, formatting, and composing static or request-bound UI. Client Components opt into browser behavior with `use client`, which enables interactivity but also increases bundle size and hydration cost. Senior-level design means pushing as much rendering and data shaping to the server as possible while isolating only truly interactive surfaces into small client islands.",
        useCase:
          "A product page can render pricing, description, and recommendations as Server Components, while the add-to-cart control and quantity selector stay as Client Components.",
      },
      {
        question: "How does hydration work in Next.js?",
        shortAnswer:
          "Hydration attaches React’s event system to server-rendered HTML so the UI becomes interactive in the browser.",
        deepExplanation:
          "On the initial request, the browser receives HTML generated on the server. Then the client-side React runtime loads the component tree and reconciles the existing DOM with the expected UI structure. If the server markup and client render differ, hydration mismatches occur. In Next.js, hydration cost is heavily influenced by how much UI is client-rendered. Good architecture minimizes client component scope, keeps deterministic rendering, and avoids browser-only values during the first render unless they are gated behind effects.",
        useCase:
          "On an ecommerce PDP, static product details can arrive pre-rendered for fast paint, while the review filters hydrate afterward to enable client-side interaction.",
      },
      {
        question: "How does caching work in Next.js?",
        shortAnswer:
          "Next.js caches at multiple layers including route output, fetch requests, and data revalidation depending on route config and fetch options.",
        deepExplanation:
          "Caching is not a single switch. In App Router, `fetch` can be cached or marked dynamic, route segments can opt into static or dynamic behavior, and revalidation controls how often stale content is refreshed. There is also request memoization within a render pass. The senior-level concern is understanding cache invalidation strategy, because incorrect defaults can produce stale dashboards or expensive over-rendering. You should decide explicitly which pages can be static, which data can be reused, and which requests must always be fresh.",
        useCase:
          "A blog index may use cached `fetch` calls with revalidation every 10 minutes, while stock-level inventory widgets bypass cache and render dynamically on each request.",
      },
      {
        question: "What is middleware in Next.js?",
        shortAnswer:
          "Middleware runs before a request is completed and can rewrite, redirect, or modify request handling at the edge.",
        deepExplanation:
          "Middleware is useful for lightweight request-time concerns such as localization, auth gating, A/B routing, or header normalization. It should not become a dumping ground for business logic because it runs very early in the request lifecycle and can increase latency if abused. In production architecture, middleware is best used for fast, deterministic decisions that shape routing behavior before the main page render happens.",
        useCase:
          "A multilingual app can detect locale from hostname or headers in middleware and rewrite requests to the correct language segment before rendering the page.",
      },
      {
        question: "How do API routes work in Next.js?",
        shortAnswer:
          "API routes expose server-side handlers inside the app and can process HTTP requests without a separate backend service for simple use cases.",
        deepExplanation:
          "In Pages Router, API routes live under `pages/api`. In App Router, route handlers live in `app/**/route.ts`. These handlers can accept request bodies, return JSON, and integrate with databases or third-party services. The architectural question is whether colocated route handlers are sufficient or whether a dedicated backend is needed for domain separation, scaling, and reuse. For internal tools or thin BFF layers, Next.js route handlers are often enough. For larger systems, they may front a broader service layer.",
        useCase:
          "A frontend application may use a route handler to securely sign upload URLs for cloud storage without exposing credentials to the browser.",
      },
      {
        question: "How do you optimize performance in Next.js apps?",
        shortAnswer:
          "Optimize by minimizing client JavaScript, using Server Components effectively, caching correctly, splitting code, and serving optimized assets.",
        deepExplanation:
          "Senior performance work is mostly about architecture before micro-optimizations. First reduce bundle size by keeping components server-rendered unless interactivity is required. Then use route-level streaming, lazy loading, image optimization, font optimization, and stable caching rules. You also profile expensive client trees, remove avoidable rerenders, and monitor real web vitals. Good performance in Next.js comes from aligning rendering strategy with content behavior, not from isolated tweaks alone.",
        useCase:
          "A knowledge platform can stream article chrome immediately, lazy load code playgrounds below the fold, and keep heavy filtering tools in isolated client chunks.",
      },
      {
        question: "How does routing work in App Router?",
        shortAnswer:
          "Routing is file-system based with nested segments, layouts, loading states, parallel routes, and route groups defined by the `app` directory structure.",
        deepExplanation:
          "Each folder becomes a route segment and special files such as `layout.tsx`, `page.tsx`, and `loading.tsx` define behavior for that segment. Nested layouts preserve state across navigation and enable deep composition. Route groups help organize code without affecting the URL. App Router also supports intercepting and parallel routes for advanced UX patterns. The senior design angle is using route structure to match product structure so shared UI, loading states, and data boundaries remain maintainable over time.",
        useCase:
          "A dashboard app can keep a persistent shell layout, render different nested workspaces under it, and use route-specific loading states for smoother transitions.",
      },
      {
        question: "How would you design authentication in a Next.js production app?",
        shortAnswer:
          "Use secure session handling on the server, enforce access at middleware and route boundaries, and keep sensitive logic out of client code.",
        deepExplanation:
          "A production authentication design includes session storage strategy, token rotation, CSRF protection where needed, route protection, and server-side authorization checks. In App Router, you typically read the session on the server, render user-specific UI there, and use middleware for coarse-grained redirects. Client state should only reflect auth status, not be the source of truth. The real engineering work is around session lifecycle, revocation, permission modeling, and keeping private data off the client wherever possible.",
        useCase:
          "An admin portal can use middleware to block anonymous access, server-render the shell from a verified session cookie, and perform permission checks again in route handlers before serving privileged data.",
      },
    ],
  },
  {
    id: "react",
    label: "React.js",
    accent: "from-cyan-500/20 via-sky-500/10 to-emerald-500/20",
    commands: ["npx create-react-app my-app", "cd my-app", "npm start"],
    concepts: [
      "Component lifecycle",
      "Hooks system",
      "State management",
      "Rendering optimization",
      "React Fiber",
      "Performance tuning",
    ],
    questions: [
      {
        question: "What is Virtual DOM?",
        shortAnswer:
          "Virtual DOM is React’s in-memory representation of UI that helps compute efficient DOM updates before touching the real browser DOM.",
        deepExplanation:
          "React does not blindly redraw the DOM on every state change. Instead it creates element trees in memory and compares the next tree with the previous one to determine the minimum necessary updates. The important senior-level point is that Virtual DOM is an implementation strategy, not the performance guarantee by itself. Performance comes from React’s scheduling, diffing heuristics, and how you structure component boundaries, not just from the existence of a virtual tree.",
        useCase:
          "In a dashboard with many widgets, only the components whose inputs changed need to commit DOM updates, which reduces expensive browser layout work.",
      },
      {
        question: "How does React reconciliation work?",
        shortAnswer:
          "Reconciliation is the process React uses to compare previous and next element trees and decide what to update, preserve, mount, or unmount.",
        deepExplanation:
          "React uses heuristics to keep reconciliation fast. Different element types are treated as different subtrees, and stable `key` values help React preserve list items correctly across reorders. Reconciliation is also where many state bugs originate when keys are unstable. A senior engineer understands that UI identity is defined structurally, and that preserving or resetting state depends on where and how components appear in the tree.",
        useCase:
          "In a reorderable kanban board, stable task IDs as keys prevent drag-and-drop actions from remounting cards and losing local state like inline edit input values.",
      },
      {
        question: "What is React Fiber architecture?",
        shortAnswer:
          "React Fiber is the internal architecture that enables incremental rendering, prioritization, and interruption of work.",
        deepExplanation:
          "Before Fiber, React rendering was more synchronous and less flexible. Fiber breaks rendering into units of work so React can pause, resume, and prioritize updates. This matters because not all UI updates are equally urgent. Input responsiveness is more important than rendering a hidden analytics panel. Fiber is the basis for concurrent features, transitions, and a smoother user experience under load. Senior engineers should understand Fiber conceptually because it explains why some updates can be deferred and how React schedules work.",
        useCase:
          "A complex filtering screen can keep text input responsive while lower-priority result list recalculation is scheduled with less urgency.",
      },
      {
        question: "What are hooks in React and why were they introduced?",
        shortAnswer:
          "Hooks let function components use state and lifecycle-like logic without classes, while improving logic reuse and composition.",
        deepExplanation:
          "Hooks were introduced to solve multiple problems: class component complexity, fragmented lifecycle logic, and poor reuse patterns with mixins or higher-order components. Hooks allow related behavior to live together and make shared logic reusable through custom hooks. They also align React with function-based composition. At a senior level, hooks are not just syntax; they are a way to build clean boundaries between UI concerns, side effects, data derivation, and reusable abstractions.",
        useCase:
          "A custom `useDebouncedSearch` hook can encapsulate delayed state updates, cancellation behavior, and input wiring for multiple search-driven interfaces.",
      },
      {
        question: "Explain useEffect lifecycle in depth",
        shortAnswer:
          "useEffect runs after render to synchronize React with external systems, and its cleanup runs before the next effect or on unmount.",
        deepExplanation:
          "The key is that `useEffect` is not a general post-render callback for arbitrary logic. It is meant for synchronization with things outside React such as subscriptions, timers, DOM APIs, or network cancellation. Dependencies determine when the effect is re-created. Cleanup prevents leaks and stale subscriptions. In strict mode during development, effects may run twice intentionally to surface unsafe patterns. Senior engineers avoid overusing effects for state derivation and instead keep render logic pure whenever possible.",
        useCase:
          "A live chat panel can open a websocket connection in an effect, resubscribe when the room ID changes, and close the connection in cleanup.",
      },
      {
        question: "What is state lifting?",
        shortAnswer:
          "State lifting means moving shared state to the closest common parent so multiple components can stay in sync.",
        deepExplanation:
          "When sibling components need the same source of truth, duplicating local state creates drift and synchronization bugs. Lifting state centralizes ownership and passes values plus update functions downward. The tradeoff is prop drilling and parent re-renders, so senior engineers balance lifted state with composition, context, or external stores depending on scope. The principle is to keep state at the level where ownership is clear and coordination is required.",
        useCase:
          "A filter sidebar and results header can both read and update the same selected filters from a shared parent container.",
      },
      {
        question: "Controlled vs uncontrolled components?",
        shortAnswer:
          "Controlled components are driven by React state, while uncontrolled components keep their own internal DOM state and are accessed via refs or form APIs.",
        deepExplanation:
          "Controlled inputs provide deterministic behavior, validation hooks, and easier synchronization with the rest of the UI, but they can introduce extra renders if misused. Uncontrolled inputs are simpler and can be more efficient for basic forms or integrations with non-React libraries. The senior decision depends on validation complexity, dynamic UI coupling, and performance requirements. Use controlled inputs when the app must react to every change; use uncontrolled ones when you only need the value at submit time.",
        useCase:
          "A live search field is usually controlled because the app responds on each keystroke, while a simple file upload form may use uncontrolled inputs and read values on submission.",
      },
      {
        question: "How does React optimize rendering?",
        shortAnswer:
          "React optimizes rendering through reconciliation heuristics, component memoization, scheduling, and by avoiding DOM work unless output actually changes.",
        deepExplanation:
          "React’s baseline optimizations only go so far. Engineers improve rendering by stabilizing props, using `memo` selectively, deriving state instead of duplicating it, splitting large trees, and avoiding expensive work during render. With concurrent features, React can also prioritize urgent updates. The important part is profiling first. Senior engineers optimize based on flamecharts and user-visible bottlenecks rather than scattering memoization everywhere.",
        useCase:
          "On a trading dashboard, expensive chart containers can be isolated so updating a small account summary does not cause the entire screen to rerender.",
      },
      {
        question: "Context API vs Redux?",
        shortAnswer:
          "Context is built into React and works well for low-frequency shared state, while Redux is a more structured external state model for complex app-wide updates and tooling.",
        deepExplanation:
          "Context solves prop drilling but does not automatically solve large-scale state architecture. Frequent context value changes can rerender many consumers unless carefully segmented. Redux adds predictable event-driven updates, middleware, devtools, and clear mutation tracing. Senior engineers choose based on complexity: theme and auth display state fit Context well, while highly interactive enterprise state with auditability, async orchestration, and debugging needs may justify Redux or another dedicated store.",
        useCase:
          "A design system provider may expose theme and locale through Context, while a multi-step insurance workflow with derived entities and async side effects may use Redux Toolkit.",
      },
      {
        question: "How do you prevent unnecessary re-renders?",
        shortAnswer:
          "Keep state local, stabilize props where it matters, memoize selectively, and avoid changing object identities unnecessarily across large subtrees.",
        deepExplanation:
          "The first fix is architectural, not tactical. If unrelated state lives too high in the tree, the whole branch rerenders. From there, use memoization for expensive components with stable inputs, split components by responsibility, and avoid inline object/function churn only when profiling shows it matters. Also prefer derived values over mirrored state. Senior performance work focuses on data flow clarity and render ownership instead of blindly applying `useMemo` or `useCallback` everywhere.",
        useCase:
          "A table page can keep pagination and filter state in one container while row expansion state lives inside rows, preventing every row from rerendering when a single item expands.",
      },
    ],
  },
  {
    id: "react-native",
    label: "React Native",
    accent: "from-fuchsia-500/20 via-rose-500/10 to-orange-500/20",
    commands: ["npx react-native init MyApp", "cd MyApp", "npx react-native run-android"],
    concepts: [
      "Native bridge architecture",
      "Performance optimization",
      "Mobile UI rendering system",
      "Native modules",
      "Navigation systems",
      "Platform differences (iOS vs Android)",
    ],
    questions: [
      {
        question: "What is React Native and how is it different from React?",
        shortAnswer:
          "React Native uses React’s component model to build native mobile apps, but it renders native platform components instead of browser DOM elements.",
        deepExplanation:
          "React provides the component architecture and state model, while React Native supplies native host components such as `View`, `Text`, and `ScrollView`. Unlike React for web, there is no DOM or CSS engine. Layout is handled through Yoga and platform-specific native views. Senior engineers need to think in terms of mobile constraints: bundle size, startup cost, device memory, gesture responsiveness, and platform-specific behavior.",
        useCase:
          "A startup can share product logic and design patterns across web and mobile while still shipping actual iOS and Android apps with native rendering primitives.",
      },
      {
        question: "How does the React Native bridge work?",
        shortAnswer:
          "The bridge is the communication layer that lets JavaScript talk to native modules and UI managers.",
        deepExplanation:
          "Historically, React Native batched messages between the JavaScript thread and native side asynchronously through a bridge. That made cross-boundary communication possible but also introduced serialization overhead and latency for chatty interactions. Understanding the bridge explains why excessive native calls, large payload transfers, or constant layout measurements can hurt performance. Even with the newer architecture reducing some of these costs, engineers still design to minimize unnecessary cross-runtime coordination.",
        useCase:
          "A camera feature that streams many events back to JavaScript can become janky if every frame or sensor update is pushed through a heavy bridge path.",
      },
      {
        question: "What is React Native architecture?",
        shortAnswer:
          "React Native architecture includes the JavaScript runtime, rendering pipeline, native platform layers, and communication mechanisms between them.",
        deepExplanation:
          "At a high level, your React code runs in JavaScript, React reconciles the tree, and the platform renders native views. The newer architecture introduces JSI, Fabric, and TurboModules to improve direct interoperability and rendering efficiency. Senior-level understanding matters because architectural choices affect startup time, animation smoothness, debugging strategy, and how third-party native libraries behave. You do not need to memorize internals, but you should know where bottlenecks can occur.",
        useCase:
          "When evaluating a complex animation library or biometric SDK, an engineer needs to know whether it aligns with the app’s runtime and native architecture constraints.",
      },
      {
        question: "How do you optimize performance in React Native apps?",
        shortAnswer:
          "Optimize by reducing unnecessary re-renders, minimizing bridge traffic, virtualizing long lists, and keeping animations off the JS thread where possible.",
        deepExplanation:
          "Mobile performance failures show up as dropped frames, slow startup, memory pressure, and input lag. Senior optimization work includes using `FlatList` properly, memoizing expensive rows, compressing assets, avoiding oversized bundles, and offloading animations to native-driven solutions. You also profile device-specific bottlenecks because a screen that feels fine on a flagship phone may fail badly on mid-range Android hardware.",
        useCase:
          "A commerce app with long product feeds can use `FlatList`, image placeholders, and native-driven transitions to stay smooth during scrolling.",
      },
      {
        question: "How does navigation work in React Native?",
        shortAnswer:
          "Navigation is usually handled by a library such as React Navigation, which manages stacks, tabs, drawers, and screen state on top of React Native.",
        deepExplanation:
          "React Native does not ship with a full navigation system by default. Libraries manage route stacks, gestures, transitions, and deep linking across platforms. Senior engineers design navigation around product flow, not just screens, including restoring state, handling auth boundaries, and avoiding memory issues from oversized navigation trees. On mobile, navigation also interacts with system back behavior and platform-specific expectations.",
        useCase:
          "A fintech app may combine a tab navigator for core areas, nested stack navigators per tab, and guarded flows for onboarding and KYC steps.",
      },
      {
        question: "What are native modules?",
        shortAnswer:
          "Native modules are platform-specific implementations that expose device or OS capabilities to JavaScript.",
        deepExplanation:
          "When JavaScript alone cannot access a required platform feature or a library exists only natively, you create or integrate a native module. Examples include biometrics, low-level media processing, Bluetooth, or proprietary SDKs. Senior engineers need to judge the maintenance cost: each native dependency increases build complexity, platform debugging overhead, and upgrade risk. Native modules are powerful, but they reduce the simplicity of a pure JavaScript app.",
        useCase:
          "An enterprise app integrating a vendor-issued printer SDK may need custom native modules for Android and iOS because the vendor does not provide a JavaScript wrapper.",
      },
      {
        question: "How do you handle offline storage?",
        shortAnswer:
          "Use local persistence such as AsyncStorage, SQLite, MMKV, or encrypted stores depending on data size, sensitivity, and access patterns.",
        deepExplanation:
          "Offline support is not just about saving values locally. It requires synchronization strategy, conflict handling, retry policies, and clear UX for stale data. Lightweight preferences fit key-value storage, while structured domain records often need SQLite-like solutions. Sensitive tokens or secrets should use secure storage. Senior mobile architecture treats offline as a consistency problem, not a local-cache checkbox.",
        useCase:
          "A field operations app can store inspection drafts locally, queue uploads when connectivity returns, and resolve conflicts if the same job was updated elsewhere.",
      },
      {
        question: "What is gesture handling in React Native?",
        shortAnswer:
          "Gesture handling is the system for recognizing taps, pans, swipes, long presses, and complex touch interactions on mobile devices.",
        deepExplanation:
          "Basic touch handlers exist out of the box, but complex interactions usually rely on specialized gesture libraries for performance and composability. Gesture handling becomes difficult when interactions compete, such as nested scroll views, swipeable cards, and drag handles. Senior engineers design gestures with platform expectations in mind and ensure they stay responsive by avoiding excessive JS-thread dependence.",
        useCase:
          "A task management app with swipe-to-complete rows and draggable ordering needs coordinated gesture priorities to avoid accidental scroll conflicts.",
      },
      {
        question: "What are limitations of React Native?",
        shortAnswer:
          "React Native accelerates cross-platform development, but it can add native dependency friction, platform inconsistencies, and performance constraints for some workloads.",
        deepExplanation:
          "The biggest limitations appear when apps demand deep native integration, cutting-edge platform features, extremely heavy animations, or high-performance graphics. Library compatibility and upgrade churn can also slow teams down. The senior-level view is pragmatic: React Native is excellent for many business apps, but it is not automatically the right answer for all mobile products. Architecture should follow product requirements, not framework preference.",
        useCase:
          "A document-heavy line-of-business app is a strong React Native candidate, while a 3D gaming or AR-heavy experience may quickly hit framework limits.",
      },
      {
        question: "When should you choose native over React Native?",
        shortAnswer:
          "Choose native when platform-specific performance, hardware integration, or UX requirements outweigh the benefits of shared cross-platform development.",
        deepExplanation:
          "The choice depends on product risk, team expertise, and user expectations. If the app requires deep OS-level behavior, advanced graphics, platform-first UX, or the absolute best performance under strict constraints, native development often wins. If the app is mostly business workflows, forms, dashboards, and moderate interactivity, React Native can reduce delivery cost significantly. Senior engineers frame this as a business and technical tradeoff, not a tribal preference.",
        useCase:
          "A consumer banking app with custom onboarding, transactions, and dashboards may work well in React Native, while a video editing tool with heavy native processing should likely be built natively.",
      },
    ],
  },
];

export const nextJsInterviewSections: NextJsInterviewSection[] = [
  {
    section: "Core Concepts",
    questions: [
      {
        q: "Why do we need Next.js?",
        a: "Next.js gives React a production framework: routing, server rendering, static generation, metadata, optimization, and server-side capabilities out of the box.",
      },
      {
        q: "What are the differences between CSR, SSR, SSG, and ISR?",
        a: "CSR renders in the browser, SSR renders per request, SSG renders at build time, and ISR refreshes static output after deployment using revalidation.",
      },
      {
        q: "What is hydration in Next.js? Why does hydration mismatch occur?",
        a: "Hydration attaches React to server-rendered HTML. Mismatches happen when the server output differs from the first client render, commonly due to time, random values, or browser-only APIs.",
      },
    ],
  },
  {
    section: "Rendering Strategies",
    questions: [
      {
        q: "When should you use SSR vs SSG?",
        a: "Use SSR for per-request or user-specific data. Use SSG for stable public content. Use ISR when you want static speed with periodic freshness.",
      },
      {
        q: "What are React Server Components (RSC)?",
        a: "Server Components render only on the server, reduce client bundle size, and can access server-side resources directly without shipping that logic to the browser.",
      },
      {
        q: "Difference between Server and Client Components?",
        a: "Server Components are default in App Router and cannot use state/effects. Client Components use `use client`, run in the browser, and handle interactivity.",
      },
    ],
  },
  {
    section: "Data Fetching",
    questions: [
      {
        q: "How do you fetch data in Server Components?",
        a: "Make the component async and call `fetch()` directly on the server, using cache options intentionally.",
        code: `async function Page() {
  const res = await fetch("https://api.example.com/data", {
    cache: "no-store",
  });

  return <div>...</div>;
}`,
      },
      {
        q: "What is caching in fetch() in Next.js?",
        a: "`force-cache` keeps cached data for static-style rendering, `no-store` always fetches fresh data, and `revalidate` enables time-based cache refresh.",
      },
      {
        q: "What is revalidation?",
        a: "Revalidation refreshes cached data after a time interval or on demand with APIs like `revalidatePath()` or `revalidateTag()`.",
      },
    ],
  },
  {
    section: "Routing (App Router)",
    questions: [
      {
        q: "Explain App Router structure",
        a: "The `app/` directory defines routes. `page.tsx` is the route entry, `layout.tsx` wraps shared UI, `loading.tsx` handles suspense fallbacks, and `error.tsx` acts as an error boundary.",
      },
      {
        q: "What are layouts vs templates?",
        a: "Layouts persist across navigation and preserve state. Templates rerender on navigation and are useful when you want a fresh subtree each time.",
      },
      {
        q: "What is Parallel Routing?",
        a: "Parallel routes let you render multiple route slots at once, such as `@modal` and `@dashboard`, inside the same screen layout.",
      },
      {
        q: "What is Intercepting Routes?",
        a: "Intercepting routes let you render a route inside the current UI context, commonly for modal-over-page patterns without full navigation replacement.",
      },
    ],
  },
  {
    section: "Middleware & Edge",
    questions: [
      {
        q: "What is middleware in Next.js?",
        a: "Middleware runs before the request completes and is typically used for auth checks, redirects, localization, or lightweight request shaping.",
      },
      {
        q: "What is Edge Runtime?",
        a: "Edge Runtime executes code closer to users for lower latency, but it has a smaller runtime surface and does not support the full Node.js API set.",
      },
    ],
  },
  {
    section: "Performance Optimization",
    questions: [
      {
        q: "How do you optimize Next.js performance?",
        a: "Use Server Components where possible, keep client bundles small, optimize images, lazy load heavy UI, cache intentionally, and avoid unnecessary client-only rendering.",
      },
      {
        q: "What is bundle splitting?",
        a: "Bundle splitting loads only the JavaScript needed for a route or feature instead of shipping one large bundle for the whole app.",
      },
      {
        q: "What is Streaming in Next.js?",
        a: "Streaming sends HTML in chunks using Suspense so users see useful UI earlier instead of waiting for the entire page to finish rendering.",
      },
      {
        q: "What is image optimization in Next.js?",
        a: "`next/image` provides optimized image delivery with resizing, lazy loading, and better formats to improve loading performance.",
      },
    ],
  },
  {
    section: "Server Components vs Client Components",
    questions: [
      {
        q: "When should you prefer Server Components?",
        a: "Prefer Server Components for data-heavy, non-interactive UI because they reduce client JavaScript and keep server concerns off the browser.",
      },
      {
        q: "When should you use Client Components?",
        a: "Use Client Components when you need state, effects, browser APIs, event handlers, or real-time interactive behavior.",
      },
    ],
  },
  {
    section: "Caching & Revalidation",
    questions: [
      {
        q: "What caching layers exist in Next.js?",
        a: "Common layers include request-level fetch caching, the data cache, full route cache, and CDN/edge cache depending on deployment.",
      },
      {
        q: "What is Incremental Static Regeneration (ISR)?",
        a: "ISR lets a static page stay fast while being regenerated after build time using a revalidation interval or manual invalidation.",
      },
    ],
  },
  {
    section: "Server Actions",
    questions: [
      {
        q: "What are Server Actions?",
        a: "Server Actions are server-executed functions that can be called from forms or components without creating a separate API route.",
        code: `"use server";

export async function createUser(formData: FormData) {
  // server logic
}`,
      },
      {
        q: "Why use Server Actions over API routes?",
        a: "They reduce boilerplate, keep mutations close to the component tree, and simplify common form-driven server workflows.",
      },
    ],
  },
  {
    section: "SEO & Metadata",
    questions: [
      {
        q: "What are metadata in Next.js?",
        a: "Metadata defines SEO and social preview information such as title, description, and Open Graph fields using the Metadata API.",
        code: `export const metadata = {
  title: "Home",
  description: "Next.js app",
};`,
      },
      {
        q: "How does Next.js improve SEO?",
        a: "It improves SEO through server-rendered HTML, static generation, metadata support, clean routing, and strong default performance characteristics.",
      },
    ],
  },
  {
    section: "Deployment & Production",
    questions: [
      {
        q: "How does Next.js handle security?",
        a: "It helps by keeping server logic on the server, supporting middleware-based guards, and protecting secrets through server-only environment usage.",
      },
      {
        q: "What are route handlers?",
        a: "Route handlers are backend endpoints defined in `app/**/route.ts` and are used for server-side HTTP handling in App Router.",
      },
      {
        q: "What should you validate before production deployment?",
        a: "Check caching behavior, runtime boundaries, image and asset optimization, error handling, observability, environment variables, and rollout strategy.",
      },
    ],
  },
];

export const reactInterviewSections: ReactInterviewSection[] = [
  {
    section: "Core Concepts",
    questions: [
      {
        q: "What is React and why does it exist?",
        a: "React exists to build complex UIs from composable components with predictable state-driven rendering. Its real value is managing UI change over time, not just templating HTML.",
      },
      {
        q: "What is virtual DOM?",
        a: "Virtual DOM is React’s in-memory UI representation used to calculate the minimal real DOM updates. It is a mechanism, not the performance story by itself.",
      },
      {
        q: "What is reconciliation?",
        a: "Reconciliation is React comparing previous and next element trees to decide what to preserve, update, mount, or unmount. Keys and component identity directly affect this behavior.",
      },
      {
        q: "What is JSX and how does it work?",
        a: "JSX is syntax that compiles to React element creation calls. It is not HTML; it is a declarative way to describe UI trees inside JavaScript or TypeScript.",
      },
      {
        q: "Functional vs Class components",
        a: "Function components are the modern default because hooks make stateful logic reusable and composable. Class components still matter mainly for older codebases and error boundary support.",
      },
      {
        q: "Props vs State",
        a: "Props are external inputs passed into a component. State is internal mutable data owned by a component or hook. Props drive composition; state drives local behavior.",
      },
      {
        q: "Controlled vs uncontrolled components",
        a: "Controlled inputs are driven by React state and suit dynamic validation or live UI updates. Uncontrolled inputs keep DOM-owned state and are simpler when values are only needed at submit time.",
      },
      {
        q: "Lifting state up",
        a: "Lift state to the nearest common owner when multiple components need the same source of truth. The tradeoff is broader re-render scope and possible prop drilling.",
      },
      {
        q: "Component lifecycle in the hooks world",
        a: "In function components, think in terms of render, commit, and effect synchronization rather than class lifecycle names. `useEffect` handles post-commit sync, not arbitrary lifecycle emulation.",
      },
      {
        q: "How do useState, useEffect, useMemo, and useCallback differ?",
        a: "`useState` stores local state, `useEffect` syncs with external systems, `useMemo` caches computed values, and `useCallback` caches function identity. Only use memoization when it changes real render cost.",
      },
      {
        q: "Why does the useEffect dependency array matter?",
        a: "Dependencies define which values an effect closes over and when it must resynchronize. Wrong dependencies cause stale behavior, missed updates, or unnecessary reruns.",
      },
      {
        q: "What are common mistakes in useEffect?",
        a: "Using effects for derived state, missing dependencies, causing render loops, and placing event logic in effects instead of handlers are the most common senior-level code review issues.",
      },
      {
        q: "What are good custom hook design patterns?",
        a: "Custom hooks should encapsulate a single behavior boundary, expose a stable interface, and hide implementation details. Good hooks improve reuse without leaking lifecycle complexity.",
      },
    ],
  },
  {
    section: "Advanced Concepts",
    questions: [
      {
        q: "What is React Fiber architecture?",
        a: "Fiber is React’s internal scheduling and rendering architecture that breaks work into units so rendering can be paused, resumed, prioritized, or discarded when needed.",
      },
      {
        q: "Explain React Fiber reconciliation at a deeper level",
        a: "Fiber turns each element into a work unit with links to parent, child, and sibling nodes. That lets React incrementally reconcile trees and prioritize urgent UI like input updates over less important rendering work.",
      },
      {
        q: "What is concurrent rendering in React 18?",
        a: "Concurrent rendering allows React to prepare and prioritize updates more flexibly instead of blocking the main thread for every render path. It is about scheduling, not parallel threads.",
      },
      {
        q: "What is automatic batching?",
        a: "React 18 batches more state updates automatically, including async contexts, so multiple updates can produce one render instead of several. This improves consistency and reduces wasted work.",
      },
      {
        q: "How does React batching behave in async updates?",
        a: "In React 18, updates inside promises, timeouts, and native async flows are usually batched too. You only force sync flushing when UI correctness truly depends on immediate DOM commitment.",
      },
      {
        q: "What is Suspense and when is it useful?",
        a: "Suspense lets React show fallback UI while waiting for lazy code or async resources. It is useful when loading boundaries are designed intentionally instead of scattering spinners everywhere.",
      },
      {
        q: "What is lazy loading in React?",
        a: "Lazy loading defers code until a route or component is needed, usually through `React.lazy` or framework-level dynamic imports. It reduces initial bundle cost.",
      },
      {
        q: "What are error boundaries?",
        a: "Error boundaries catch render-time errors in a subtree and show fallback UI instead of crashing the whole screen. They do not catch every async or event handler error case.",
      },
      {
        q: "What are portals?",
        a: "Portals render UI into another DOM subtree while preserving React ownership. They are useful for modals, overlays, and layered UI that should escape parent stacking constraints.",
      },
      {
        q: "How do refs and forwardRef work?",
        a: "Refs hold mutable values or DOM handles without triggering renders. `forwardRef` lets component libraries expose an internal DOM node or imperative surface intentionally.",
      },
      {
        q: "Higher Order Components vs Hooks pattern",
        a: "Hooks usually replace HOCs for logic reuse because they compose more cleanly and avoid wrapper nesting. HOCs still appear in older ecosystems and cross-cutting integration layers.",
      },
      {
        q: "Render props pattern vs hooks",
        a: "Render props were a pre-hooks composition pattern for sharing behavior. Hooks are generally simpler and flatter, but render props can still help when behavior must stay explicitly scoped in JSX.",
      },
      {
        q: "What is the stale closure problem in hooks?",
        a: "A stale closure happens when a callback or effect captures an old value because dependencies were omitted or logic was scheduled later. It is one of the most common subtle React bugs.",
      },
      {
        q: "What are dependency array pitfalls?",
        a: "The main pitfalls are suppressing needed dependencies, depending on unstable objects/functions unintentionally, and misunderstanding that effects synchronize values from the render they were created in.",
      },
      {
        q: "Why does StrictMode double render in development?",
        a: "StrictMode intentionally re-invokes render and certain lifecycle-like behaviors in development to expose unsafe side effects and cleanup bugs before production.",
      },
    ],
  },
  {
    section: "Performance & Architecture",
    questions: [
      {
        q: "Why does React re-render?",
        a: "A component re-renders when its state changes, its parent re-renders, its consumed context changes, or its owning framework triggers a new render pass.",
      },
      {
        q: "How do you prevent unnecessary re-renders?",
        a: "Keep state local, split components by responsibility, stabilize expensive prop paths when needed, and memoize only after profiling shows real waste.",
      },
      {
        q: "memo vs useMemo vs useCallback differences",
        a: "`memo` skips component re-renders when props are stable, `useMemo` caches computed values, and `useCallback` caches function identity. They solve related but different problems.",
      },
      {
        q: "When should you NOT use useMemo or useCallback?",
        a: "Do not use them by default. If computation is cheap or prop identity is not causing real work, memoization adds noise and can make code harder to reason about.",
      },
      {
        q: "What are practical React rendering optimization strategies?",
        a: "Move state closer to where it is used, avoid mirrored state, virtualize large lists, lazy load heavy code, and isolate expensive subtrees with memoization only where proven useful.",
      },
      {
        q: "Why is the key prop important in lists?",
        a: "Keys define element identity during reconciliation. Unstable keys cause remounts, lost state, broken animations, and incorrect diff behavior during reordering.",
      },
      {
        q: "How do you optimize large lists?",
        a: "Use virtualization so only visible rows render, keep row components lightweight, and avoid global state changes that cause the whole list to rerender.",
      },
      {
        q: "State management tradeoffs: Context vs Redux vs Zustand",
        a: "Context is good for low-frequency shared state, Redux suits large event-driven systems with tooling and discipline, and Zustand works well for lightweight store ergonomics without Redux-level ceremony.",
      },
      {
        q: "What are scalability issues in Context API?",
        a: "Large or frequently changing context values can rerender too many consumers. Context solves propagation, not large-scale state architecture or performance isolation by itself.",
      },
      {
        q: "What causes React hydration issues in SSR apps?",
        a: "Hydration issues happen when server HTML and client render diverge, usually from nondeterministic values, browser-only logic, or state that changes before hydration completes.",
      },
      {
        q: "How do memory leaks happen in React apps and how do you avoid them?",
        a: "Leaks usually come from uncleaned subscriptions, timers, async work, and retained references. Cleanup effects, cancel ongoing work, and avoid storing long-lived references carelessly.",
      },
      {
        q: "What architecture patterns matter in large React apps?",
        a: "Clear domain boundaries, feature-based modules, shared primitives, predictable state ownership, and framework-aware server/client boundaries matter more than any single hook trick.",
      },
    ],
  },
];

export const reactNativeInterviewSections: ReactNativeInterviewSection[] = [
  {
    section: "Core Concepts",
    questions: [
      {
        q: "What is React Native and why does it exist?",
        a: "React Native exists to build mobile apps with React’s component model while rendering native platform views instead of the browser DOM, improving code reuse without fully sacrificing native UX.",
      },
      {
        q: "Difference between React Web and React Native",
        a: "React Web targets the DOM and browser APIs, while React Native targets iOS and Android host views with platform-specific rendering, input, layout, and runtime constraints.",
      },
      {
        q: "What are core components like View, Text, ScrollView, and FlatList?",
        a: "`View` is the base layout container, `Text` renders text, `ScrollView` renders all children eagerly, and `FlatList` virtualizes large lists for performance and memory control.",
      },
      {
        q: "How does styling work in React Native, and how is Flexbox different from CSS on web?",
        a: "React Native uses JS style objects and a Flexbox-based layout engine, but not full CSS. Defaults and supported properties differ, and layout must be designed with mobile constraints in mind.",
      },
      {
        q: "How do props, state, and rendering work in React Native?",
        a: "The rendering model is still React: props flow down, state triggers re-renders, and reconciliation decides what changes. The difference is that updates eventually map to native UI primitives instead of DOM nodes.",
      },
      {
        q: "Controlled vs uncontrolled inputs in React Native",
        a: "Controlled inputs give better synchronization for validation and UI state, but can become expensive in heavy forms if everything rerenders on each keystroke. Uncontrolled patterns can help in narrow cases but are less common than on web.",
      },
      {
        q: "What are navigation basics in React Native?",
        a: "Stack navigation models drill-in flows, tab navigation handles primary app areas, and drawers expose global sections. Good mobile navigation design follows product flow and platform expectations, not just library defaults.",
      },
    ],
  },
  {
    section: "Architecture & Internals",
    questions: [
      {
        q: "What is the React Native Bridge?",
        a: "The Bridge is the older async communication layer between JavaScript and native modules/UI. It enabled cross-runtime communication but introduced serialization and latency overhead.",
      },
      {
        q: "What is JSI (JavaScript Interface)?",
        a: "JSI is a lower-level interface that allows JavaScript and native code to interact more directly without relying on the older batched Bridge model for every operation.",
      },
      {
        q: "Why is React Native moving away from Bridge architecture?",
        a: "The Bridge adds overhead, especially for chatty UI and native interactions. Newer architecture reduces indirection, lowers latency, and improves performance for complex apps.",
      },
      {
        q: "What is Fabric architecture?",
        a: "Fabric is the new React Native rendering system that aligns more closely with modern React, improves scheduling, and updates native UI with a more efficient architecture.",
      },
      {
        q: "What are TurboModules?",
        a: "TurboModules are the newer native module system designed for faster, more direct access and better lazy loading compared with older bridge-based modules.",
      },
      {
        q: "How do JS thread and native thread communicate?",
        a: "React logic runs on the JS side, while native UI and platform work happen on native threads. Communication depends on the architecture path, but thread boundaries still matter for responsiveness.",
      },
      {
        q: "What is the rendering pipeline in React Native?",
        a: "React computes the UI tree, reconciliation determines changes, and the host renderer maps those changes into native views. Performance issues often appear at the boundaries between JS scheduling and native rendering.",
      },
      {
        q: "What is reconciliation in the mobile context?",
        a: "Reconciliation still means comparing previous and next trees, but the cost profile is mobile-specific because updates affect native view trees, layout passes, gestures, and lower-powered devices.",
      },
      {
        q: "What is Hermes and why does it improve performance?",
        a: "Hermes is a JavaScript engine optimized for React Native. It improves startup, memory usage, and runtime behavior by reducing JS overhead for mobile-oriented workloads.",
      },
      {
        q: "Bridge vs JSI vs Fabric differences",
        a: "Bridge is the older async message-based layer, JSI is the lower-level interop model, and Fabric is the modern rendering architecture built to work better with React’s newer scheduling model.",
      },
      {
        q: "Why is React Native not fully native?",
        a: "Because application logic still runs through a cross-platform React abstraction and runtime layer. It renders native views, but it is not the same as writing platform code end-to-end in Swift/Kotlin.",
      },
      {
        q: "What is the multi-threading model in React Native?",
        a: "React Native involves multiple execution contexts such as the JS runtime, UI/main thread, and native/background work. Senior engineers reason about thread boundaries when diagnosing jank or blocked interaction.",
      },
    ],
  },
  {
    section: "Performance, Native Integration & Production Challenges",
    questions: [
      {
        q: "Why is FlatList preferred over ScrollView for large lists?",
        a: "FlatList virtualizes rows and only keeps a window of items mounted, while ScrollView renders everything eagerly and becomes expensive in memory and frame time.",
      },
      {
        q: "What is virtualization in React Native?",
        a: "Virtualization means rendering only the items near the viewport and recycling or unmounting off-screen content to keep list performance stable on mobile devices.",
      },
      {
        q: "How do memory leaks happen in React Native apps?",
        a: "They usually come from uncleaned listeners, timers, retained navigation state, oversized caches, or native resources that are never released. Mobile leaks often show up as long-session degradation rather than immediate crashes.",
      },
      {
        q: "What are practical image optimization strategies in React Native?",
        a: "Use correctly sized assets, caching-aware image components, lazy loading, compression, CDN delivery, and avoid decoding oversized images on low-memory devices.",
      },
      {
        q: "What causes re-render issues in React Native and how do you avoid them?",
        a: "Broad state ownership, unstable props, and expensive list rows are common causes. Keep state local, isolate heavy subtrees, and optimize only after profiling on real devices.",
      },
      {
        q: "How are useMemo and useCallback misused in mobile apps?",
        a: "They are often added everywhere without measurement. On mobile, extra complexity can hurt maintainability without solving the real bottleneck, which is often list architecture or bridge/native work instead of function identity.",
      },
      {
        q: "What are common navigation performance issues?",
        a: "Heavy screens mounting at once, oversized shared context, expensive transition work, and poor screen lifecycle cleanup can make navigation feel slow or janky.",
      },
      {
        q: "JS thread vs native driver for animations",
        a: "Animations on the JS thread can stutter when JS is busy. Native-driven or UI-thread-driven animations are more resilient because they do not depend on every frame crossing the JS boundary.",
      },
      {
        q: "What is InteractionManager used for?",
        a: "InteractionManager lets you defer expensive non-urgent work until ongoing interactions and animations are complete, which helps preserve responsiveness.",
      },
      {
        q: "How do you debug performance bottlenecks in React Native?",
        a: "Profile on real devices, inspect JS and UI thread behavior, measure list rendering, image cost, navigation transitions, and native module overhead instead of guessing from the simulator alone.",
      },
      {
        q: "How do Native Modules work?",
        a: "Native Modules expose platform-specific functionality to JavaScript so RN code can call device or OS capabilities not available in pure JavaScript.",
      },
      {
        q: "When should you write native code in Android or iOS?",
        a: "Write native code when performance, platform APIs, advanced SDKs, or UI behavior require capabilities React Native cannot deliver cleanly or efficiently on its own.",
      },
      {
        q: "How do you link native dependencies?",
        a: "Modern RN mostly relies on autolinking, but engineers still need to understand native project setup, build configuration, and platform-specific integration when libraries are not plug-and-play.",
      },
      {
        q: "How should permissions be handled in React Native?",
        a: "Permissions should be requested contextually, mapped to platform-specific behavior, and tied to clear UX flows. Treat camera, location, and storage access as product design and security concerns, not just API calls.",
      },
      {
        q: "What is push notifications architecture in React Native apps?",
        a: "Push notifications depend on native platform push services, backend token management, app lifecycle handling, and deep linking or state restoration when users open notifications.",
      },
      {
        q: "How does deep linking work in React Native?",
        a: "Deep linking maps external URLs or app intents into navigation state so the app can open a specific screen or flow directly from web links, push notifications, or other apps.",
      },
      {
        q: "What are over-the-air updates and what is the CodePush concept?",
        a: "OTA updates let JavaScript-side changes ship without full app store release cycles, but they must be governed carefully because native changes still require store-based binaries.",
      },
      {
        q: "Expo vs Bare React Native tradeoffs",
        a: "Expo improves developer speed and reduces native setup burden, while Bare gives maximum native control. The tradeoff is convenience versus platform flexibility and custom integration depth.",
      },
      {
        q: "What is Gesture Handler architecture at a high level?",
        a: "Gesture Handler moves gesture recognition closer to native handling so interactions are more reliable and performant than pure JS responder-based gesture logic.",
      },
      {
        q: "Why does Reanimated run better for complex motion?",
        a: "Reanimated can execute animation logic closer to the UI thread, reducing reliance on the JS thread and making gesture-driven interactions smoother under load.",
      },
    ],
  },
];
