export type Difficulty = "easy" | "medium" | "hard";

export type QuestionItem = {
  id: string;
  question: string;
  answer: string;
  difficulty: Difficulty;
  tags?: string[];
};

export type ConceptItem = {
  title: string;
  description: string;
};

export type CodeExample = {
  title: string;
  language: string;
  snippet: string;
  explanation: string;
};

export type CommandReference = {
  label: string;
  command: string;
  context: string;
};

export type TopicSection = {
  id: string;
  title: string;
  summary: string;
  questions: QuestionItem[];
  keyConcepts: ConceptItem[];
  codeExamples: CodeExample[];
  commands: CommandReference[];
};

export type ModuleContent = {
  key: string;
  title: string;
  route: string;
  icon: string;
  accent: string;
  description: string;
  overview: string;
  topics: TopicSection[];
};

export type CommandLibraryItem = {
  id: string;
  category: string;
  command: string;
  explanation: string;
  useCase: string;
  interviewRelevance: string;
};

export type UserQuestionDraft = {
  id: string;
  moduleKey: string;
  question: string;
  answer: string;
  difficulty: Difficulty;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type ActivityItem = {
  id: string;
  label: string;
  timestamp: string;
  route?: string;
};
