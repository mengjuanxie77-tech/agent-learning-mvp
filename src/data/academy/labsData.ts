import type { PracticeLabItem } from "../../types/content";

export const practiceLabItems: PracticeLabItem[] = [
  {
    id: "lab-agent-builder",
    title: "AI Agent Builder",
    description: "构建一个基础任务执行 Agent，覆盖目标输入、规划、执行与反馈。",
    skillsLearned: ["Agent loop design", "Prompt template design", "Tool call wiring"]
  },
  {
    id: "lab-rag-knowledge-agent",
    title: "RAG Knowledge Agent",
    description: "构建知识库问答 Agent，支持检索、重排与答案生成。",
    skillsLearned: ["RAG pipeline", "Retrieval quality tuning", "Grounded response"]
  },
  {
    id: "lab-research-agent",
    title: "Research Agent",
    description: "构建自动研究和报告生成 Agent，输出结构化研究报告。",
    skillsLearned: ["Research workflow", "Source synthesis", "Structured report output"]
  },
  {
    id: "lab-multi-agent-system",
    title: "Multi-Agent System",
    description: "构建多个 Agent 协作系统，完成分工执行与结果汇总。",
    skillsLearned: ["Role orchestration", "Inter-agent protocol", "Coordinator patterns"]
  }
];
