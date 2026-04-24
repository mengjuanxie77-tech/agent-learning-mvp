import type { KnowledgeMapView } from "../../types/content";

export const knowledgeMap: KnowledgeMapView = {
  layers: [
    {
      id: "layer-llm",
      name: "LLM Layer",
      description: "模型选型、上下文窗口、推理稳定性与成本能力。",
      keyConcepts: ["Model capability", "Latency", "Cost"],
      order: 1
    },
    {
      id: "layer-prompt",
      name: "Prompt Layer",
      description: "角色设定、任务约束、结构化指令与提示模板管理。",
      keyConcepts: ["System prompt", "Prompt templates", "Prompt testing"],
      order: 2
    },
    {
      id: "layer-tool",
      name: "Tool Layer",
      description: "函数调用、外部 API 接入、工具路由与重试机制。",
      keyConcepts: ["Function calling", "Tool registry", "Retry policy"],
      order: 3
    },
    {
      id: "layer-knowledge",
      name: "Knowledge Layer",
      description: "文档处理、向量检索、重排策略与证据引用。",
      keyConcepts: ["RAG", "Embedding", "Reranking"],
      order: 4
    },
    {
      id: "layer-memory",
      name: "Memory Layer",
      description: "会话记忆、长期记忆、偏好记忆与记忆治理。",
      keyConcepts: ["Session memory", "Long-term memory", "Memory policies"],
      order: 5
    },
    {
      id: "layer-planning",
      name: "Planning Layer",
      description: "任务分解、策略生成、树状思维与动态重规划。",
      keyConcepts: ["Planning algorithms", "ReAct", "Tree of Thoughts"],
      order: 6
    },
    {
      id: "layer-execution",
      name: "Execution Layer",
      description: "步骤执行、状态管理、错误恢复与结果校验。",
      keyConcepts: ["State machine", "Execution log", "Recovery loop"],
      order: 7
    },
    {
      id: "layer-multi-agent",
      name: "Multi-Agent Layer",
      description: "角色分工、协作通信、调度编排与冲突处理。",
      keyConcepts: ["Collaboration patterns", "Coordinator", "Protocol"],
      order: 8
    },
    {
      id: "layer-evaluation",
      name: "Evaluation Layer",
      description: "离线基准、在线评估、反馈闭环与性能追踪。",
      keyConcepts: ["Benchmarks", "Task success rate", "Feedback loop"],
      order: 9
    },
    {
      id: "layer-safety",
      name: "Safety Layer",
      description: "输入输出防护、权限控制、风险审计与监控告警。",
      keyConcepts: ["Guardrails", "Policy enforcement", "Observability"],
      order: 10
    }
  ]
};
