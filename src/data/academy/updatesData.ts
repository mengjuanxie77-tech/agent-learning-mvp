import type { KnowledgeUpdatesView } from "../../types/content";

export const knowledgeUpdates: KnowledgeUpdatesView = {
  latestResearch: [
    {
      id: "update-research-1",
      title: "Planning-Centric Agent Benchmarks",
      description: "聚焦长任务规划能力的新型 Agent benchmark 与评测结论。",
      sourceName: "arXiv AI Agent papers",
      url: "#",
      publishedAt: "2026-04-20T00:00:00Z"
    },
    {
      id: "update-research-2",
      title: "Self-Reflection for Tool-Using Agents",
      description: "讨论 Agent 在工具调用失败后的自反思机制与恢复策略。",
      sourceName: "Anthropic agent research",
      url: "#",
      publishedAt: "2026-04-18T00:00:00Z"
    }
  ],
  frameworkUpdates: [
    {
      id: "update-framework-1",
      title: "LangChain Agent Runtime Update",
      description: "更新了工具路由与执行追踪能力，优化复杂任务调度。",
      sourceName: "LangChain updates",
      url: "#",
      publishedAt: "2026-04-22T00:00:00Z"
    },
    {
      id: "update-framework-2",
      title: "LangGraph Multi-Node Patterns",
      description: "新增多节点协作范式，简化状态图编排。",
      sourceName: "LangGraph updates",
      url: "#",
      publishedAt: "2026-04-19T00:00:00Z"
    }
  ],
  industryApplications: [
    {
      id: "update-industry-1",
      title: "Production Agent Safety Rollout Patterns",
      description: "总结企业在生产环境中落地 guardrails 的实战模式。",
      sourceName: "OpenAI agent capabilities",
      url: "#",
      publishedAt: "2026-04-17T00:00:00Z"
    },
    {
      id: "update-industry-2",
      title: "Domain-Specific Research Agents in Healthcare",
      description: "行业案例：医疗知识研究 Agent 的工作流与合规边界。",
      sourceName: "Industry applications",
      url: "#",
      publishedAt: "2026-04-16T00:00:00Z"
    }
  ]
};
