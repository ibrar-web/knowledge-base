import type { ModuleContent } from "@/types/interview";

export const aiModule: ModuleContent = {
  key: "ai",
  title: "AI / Vector Databases",
  route: "/ai",
  icon: "ai",
  accent: "from-fuchsia-500/20 via-rose-500/10 to-transparent",
  description:
    "Vector databases, embeddings, and RAG architecture for modern application design interviews.",
  overview:
    "Designed for engineers who need to explain AI system primitives cleanly without drifting into vague buzzwords.",
  topics: [
    {
      id: "vector-db",
      title: "Vector Databases",
      summary: "Similarity search, indexing, metadata filtering, and retrieval tradeoffs.",
      questions: [
        {
          id: "vector-1",
          question: "Why is metadata filtering important in a vector search system?",
          answer:
            "Similarity alone is often not enough. Metadata filters narrow retrieval by tenant, time, source, or document type so results remain relevant and safe.",
          difficulty: "medium",
        },
      ],
      keyConcepts: [
        {
          title: "Hybrid retrieval",
          description: "Combine semantic search with keyword or metadata constraints when precision matters.",
        },
      ],
      codeExamples: [
        {
          title: "Embedding upsert payload",
          language: "json",
          snippet: `{
  "id": "doc_42",
  "values": [0.12, -0.08, 0.67],
  "metadata": { "source": "system-design", "level": "senior" }
}`,
          explanation: "Shows the core storage shape behind most vector DB discussions.",
        },
      ],
      commands: [
        {
          label: "Run embedding pipeline",
          command: "npm run embeddings:index",
          context: "Placeholder example for explaining offline indexing workflows.",
        },
      ],
    },
    {
      id: "rag",
      title: "RAG Architecture",
      summary: "Ingestion, chunking, retrieval, prompt assembly, and evaluation loops.",
      questions: [
        {
          id: "rag-1",
          question: "Where do most weak RAG systems fail?",
          answer:
            "Usually in chunking strategy, retrieval quality, stale corpora, or lack of evaluation. The model is often blamed for issues caused earlier in the pipeline.",
          difficulty: "hard",
        },
      ],
      keyConcepts: [
        {
          title: "Retrieval quality over model size",
          description: "Good context selection often matters more than switching to a larger model.",
        },
      ],
      codeExamples: [
        {
          title: "RAG pipeline sketch",
          language: "ts",
          snippet: `const docs = await retriever.search(query);
const context = docs.map((doc) => doc.content).join("\n\n");
return model.generate({ prompt: buildPrompt(query, context) });`,
          explanation: "Condenses the architecture into a shape interviewers expect you to reason about.",
        },
      ],
      commands: [
        {
          label: "Run evaluation suite",
          command: "npm run rag:evaluate",
          context: "Use to discuss regression testing for retrieval systems.",
        },
      ],
    },
  ],
};
