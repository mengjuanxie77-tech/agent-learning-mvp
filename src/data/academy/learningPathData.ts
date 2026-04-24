import type { DifficultyLevel } from "../../types/content";

export interface StageDefinition {
  id: string;
  slug: string;
  order: number;
  title: string;
  summary: string;
  learningGoals: string[];
  estimatedHours: number;
  tags: string[];
}

export interface TopicBlueprint {
  id: string;
  slug: string;
  stageId: string;
  title: string;
  description: string;
  duration: string;
  estimatedMinutes: number;
  difficulty: DifficultyLevel;
  oneLineDefinition: string;
  shortExplanation: string;
  deepExplanation: string[];
  tags: string[];
}

export const stageDefinitions: StageDefinition[] = [
  {
    id: "stage-1-foundations",
    slug: "agent-foundations",
    order: 1,
    title: "Stage 1 — Agent Foundations",
    summary: "先建立智能体的基本概念与输入输出规范，形成统一心智模型。",
    learningGoals: ["Agent definition", "Prompt Engineering", "Structured Output"],
    estimatedHours: 8,
    tags: ["foundation", "prompt", "schema"]
  },
  {
    id: "stage-2-llm-capabilities",
    slug: "llm-capabilities",
    order: 2,
    title: "Stage 2 — LLM Capabilities",
    summary: "理解 LLM 能力边界与外部能力扩展，搭建可靠执行入口。",
    learningGoals: ["Tool Calling", "RAG Systems", "Capability Boundaries"],
    estimatedHours: 10,
    tags: ["llm", "tools", "rag"]
  },
  {
    id: "stage-3-core-systems",
    slug: "agent-core-systems",
    order: 3,
    title: "Stage 3 — Agent Core Systems",
    summary: "进入核心运行时设计，处理记忆、状态与系统编排。",
    learningGoals: ["Agent Memory", "State Runtime", "Core Orchestration"],
    estimatedHours: 12,
    tags: ["runtime", "memory", "core"]
  },
  {
    id: "stage-4-planning-execution",
    slug: "planning-and-execution",
    order: 4,
    title: "Stage 4 — Planning and Execution",
    summary: "构建从策略生成到执行反馈的关键机制。",
    learningGoals: ["Planning Algorithms", "ReAct", "Plan & Execute + ToT"],
    estimatedHours: 14,
    tags: ["planning", "react", "tot"]
  },
  {
    id: "stage-5-multi-agent",
    slug: "multi-agent-systems",
    order: 5,
    title: "Stage 5 — Multi-Agent Systems",
    summary: "从单智能体升级到协同系统，处理角色、通信与调度。",
    learningGoals: [
      "Multi-Agent Collaboration",
      "Agent Orchestration",
      "Communication Protocols"
    ],
    estimatedHours: 14,
    tags: ["multi-agent", "coordination", "protocol"]
  },
  {
    id: "stage-6-production",
    slug: "production-ai-agents",
    order: 6,
    title: "Stage 6 — Production AI Agents",
    summary: "面向上线与迭代，建立评估、安全与监控体系。",
    learningGoals: ["Evaluation Frameworks", "Guardrails", "Agent Monitoring"],
    estimatedHours: 12,
    tags: ["production", "safety", "observability"]
  }
];

export const topicBlueprints: TopicBlueprint[] = [
  {
    id: "topic-what-is-ai-agent",
    slug: "what-is-an-ai-agent",
    stageId: "stage-1-foundations",
    title: "What is an AI Agent",
    description: "理解智能体的核心架构，以及它与传统聊天机器人的区别。",
    duration: "30 min",
    estimatedMinutes: 30,
    difficulty: "beginner",
    oneLineDefinition: "智能体是围绕目标执行“感知-规划-行动-反馈”的系统。",
    shortExplanation:
      "智能体不仅负责生成答案，还要根据目标进行决策、调用工具并验证结果。",
    deepExplanation: [
      "从系统工程角度看，智能体至少包含目标解析、策略生成、工具执行和结果校验四段链路。",
      "和聊天模型相比，智能体强调可执行、可恢复、可追踪。",
      "真正可落地的智能体，要先定义成功标准再设计提示词与工具。"
    ],
    tags: ["agent-definition", "foundation"]
  },
  {
    id: "topic-prompt-engineering-agents",
    slug: "prompt-engineering-for-agents",
    stageId: "stage-1-foundations",
    title: "Prompt Engineering for Agents",
    description: "学习如何写出可执行、可复用、可评估的 Agent 提示词。",
    duration: "45 min",
    estimatedMinutes: 45,
    difficulty: "beginner",
    oneLineDefinition: "Agent Prompt 的核心是把目标和约束转换为稳定执行协议。",
    shortExplanation:
      "在智能体场景里，提示词必须明确角色、输入格式、工具策略和失败回退。",
    deepExplanation: [
      "好提示词不是更长，而是更结构化、更可验证。",
      "通过明确输出 schema 与边界条件，可以大幅减少意外行为。",
      "建议把高频提示词模板沉淀为可复用资产。"
    ],
    tags: ["prompt-engineering", "template"]
  },
  {
    id: "topic-structured-output-essentials",
    slug: "structured-output-essentials",
    stageId: "stage-1-foundations",
    title: "Structured Output Essentials",
    description: "掌握 JSON Schema 与结构化输出，减少 Agent 执行不确定性。",
    duration: "40 min",
    estimatedMinutes: 40,
    difficulty: "beginner",
    oneLineDefinition: "结构化输出是连接模型推理与程序执行的关键契约。",
    shortExplanation:
      "当输出格式可校验时，工具链路更稳定，也更容易做错误恢复。",
    deepExplanation: [
      "结构化输出能降低解析失败、字段缺失和语义歧义。",
      "建议把 schema 校验作为调用前后双向检查。",
      "生产场景中应记录结构化错误类型用于后续优化。"
    ],
    tags: ["structured-output", "schema"]
  },
  {
    id: "topic-tool-calling-fundamentals",
    slug: "tool-calling-fundamentals",
    stageId: "stage-2-llm-capabilities",
    title: "Tool Calling Fundamentals",
    description: "构建 Agent 的工具调用链路，让模型把决策转为动作。",
    duration: "45 min",
    estimatedMinutes: 45,
    difficulty: "intermediate",
    oneLineDefinition: "Tool Calling 让 LLM 从“回答问题”变成“执行任务”。",
    shortExplanation:
      "通过函数定义、参数约束和回传结果，Agent 才能连接真实世界系统。",
    deepExplanation: [
      "工具调用设计要同时考虑可解释性、幂等性和失败重试。",
      "工具过多会增加决策复杂度，建议分层路由。",
      "将工具结果标准化后，更容易支撑评估和监控。"
    ],
    tags: ["tool-calling", "function-call"]
  },
  {
    id: "topic-rag-systems",
    slug: "rag-systems",
    stageId: "stage-2-llm-capabilities",
    title: "RAG Systems",
    description: "学习检索增强生成架构，搭建可更新知识 Agent。",
    duration: "50 min",
    estimatedMinutes: 50,
    difficulty: "intermediate",
    oneLineDefinition: "RAG 通过检索外部知识提升答案准确性与时效性。",
    shortExplanation:
      "对业务 Agent 而言，RAG 是连接私有知识与推理能力的核心机制。",
    deepExplanation: [
      "RAG 关键链路包括切片、索引、检索、重排和答案合成。",
      "高质量 RAG 系统要区分事实性问答与推理型问答策略。",
      "评估指标应覆盖命中率、幻觉率和响应时延。"
    ],
    tags: ["rag", "knowledge"]
  },
  {
    id: "topic-llm-capability-boundaries",
    slug: "llm-capability-boundaries",
    stageId: "stage-2-llm-capabilities",
    title: "LLM Capability Boundaries",
    description: "识别模型能力边界，避免把不可控任务直接交给 Agent。",
    duration: "35 min",
    estimatedMinutes: 35,
    difficulty: "intermediate",
    oneLineDefinition: "理解边界比盲目扩展能力更重要。",
    shortExplanation:
      "不同模型在规划、代码、检索、长上下文上的稳定性差异会直接影响 Agent 设计。",
    deepExplanation: [
      "应基于任务类型做模型与工具的协同分工。",
      "把复杂任务拆成可验证子任务能显著提升成功率。",
      "通过离线评估持续校准能力边界。"
    ],
    tags: ["llm", "evaluation"]
  },
  {
    id: "topic-agent-memory-systems",
    slug: "agent-memory-systems",
    stageId: "stage-3-core-systems",
    title: "Agent Memory Systems",
    description: "设计短期上下文与长期记忆，让 Agent 具备连续学习能力。",
    duration: "45 min",
    estimatedMinutes: 45,
    difficulty: "intermediate",
    oneLineDefinition: "记忆系统决定 Agent 是否能跨任务持续改进。",
    shortExplanation:
      "需要区分会话记忆、任务记忆和用户偏好记忆，并定义写入策略。",
    deepExplanation: [
      "记忆不是越多越好，关键是可检索和可治理。",
      "应设计遗忘机制和冲突解决机制。",
      "将记忆命中率纳入评估可反向优化索引策略。"
    ],
    tags: ["memory", "long-term-memory"]
  },
  {
    id: "topic-agent-runtime-state",
    slug: "agent-core-runtime-and-state",
    stageId: "stage-3-core-systems",
    title: "Agent Core Runtime and State",
    description: "搭建运行时状态机，保证 Agent 可追踪、可恢复。",
    duration: "50 min",
    estimatedMinutes: 50,
    difficulty: "intermediate",
    oneLineDefinition: "稳定运行时让 Agent 从 demo 走向系统能力。",
    shortExplanation:
      "状态机帮助你管理步骤推进、异常分支与重入恢复。",
    deepExplanation: [
      "建议为每次执行保留状态快照和关键事件日志。",
      "状态流转要有明确终止条件与失败策略。",
      "统一 runtime 协议能降低后续多 Agent 集成成本。"
    ],
    tags: ["runtime", "state-management"]
  },
  {
    id: "topic-tool-knowledge-orchestration",
    slug: "tool-and-knowledge-orchestration",
    stageId: "stage-3-core-systems",
    title: "Tool and Knowledge Orchestration",
    description: "协调工具与知识检索，提升复杂任务执行效率。",
    duration: "40 min",
    estimatedMinutes: 40,
    difficulty: "intermediate",
    oneLineDefinition: "编排能力决定 Agent 在真实任务中的吞吐和稳定性。",
    shortExplanation:
      "将查询路由、工具优先级和上下文拼接纳入统一编排层。",
    deepExplanation: [
      "编排层是控制复杂度的关键，不应把路由逻辑散落在提示词里。",
      "建议使用可观测事件流记录每次编排决策。",
      "通过策略版本化支持迭代对比。"
    ],
    tags: ["orchestration", "tool-layer", "knowledge-layer"]
  },
  {
    id: "topic-planning-algorithms",
    slug: "planning-algorithms-for-agents",
    stageId: "stage-4-planning-execution",
    title: "Planning Algorithms for Agents",
    description: "理解任务分解、启发式搜索与执行反馈循环。",
    duration: "55 min",
    estimatedMinutes: 55,
    difficulty: "advanced",
    oneLineDefinition: "规划算法让 Agent 在复杂任务中保持方向与效率。",
    shortExplanation:
      "好的规划应支持动态重规划，而不是一次性静态步骤。",
    deepExplanation: [
      "可结合任务图或树状搜索表达候选路径。",
      "规划质量与执行反馈必须形成闭环。",
      "先从小规模场景验证，再扩展任务广度。"
    ],
    tags: ["planning", "search"]
  },
  {
    id: "topic-react-architecture",
    slug: "react-architecture-for-agents",
    stageId: "stage-4-planning-execution",
    title: "ReAct Architecture",
    description: "掌握 ReAct 模式：推理与行动交替，提升任务完成率。",
    duration: "45 min",
    estimatedMinutes: 45,
    difficulty: "advanced",
    oneLineDefinition: "ReAct 将 Thought 与 Action 交替执行，增强可解释推理。",
    shortExplanation:
      "ReAct 有助于减少无依据决策，同时为调试提供清晰轨迹。",
    deepExplanation: [
      "应限制每轮推理长度，避免循环膨胀。",
      "引入停止条件和工具预算能提高稳定性。",
      "结合日志回放可以快速定位错误路径。"
    ],
    tags: ["react", "reasoning", "execution"]
  },
  {
    id: "topic-plan-execute-tot",
    slug: "plan-and-execute-tree-of-thoughts",
    stageId: "stage-4-planning-execution",
    title: "Plan & Execute + Tree of Thoughts",
    description: "把计划执行与树状思维结合，处理复杂决策分支。",
    duration: "60 min",
    estimatedMinutes: 60,
    difficulty: "advanced",
    oneLineDefinition: "Plan & Execute + ToT 让 Agent 在高复杂度任务中做多路径选择。",
    shortExplanation:
      "通过先规划后执行、再评估分支路径，可提升复杂任务成功率。",
    deepExplanation: [
      "树状思维适用于答案空间大、验证成本高的任务。",
      "需控制分支宽度和深度，避免资源失控。",
      "建议结合评分器对候选路径做剪枝。"
    ],
    tags: ["plan-execute", "tree-of-thoughts"]
  },
  {
    id: "topic-multi-agent-collaboration",
    slug: "multi-agent-collaboration-patterns",
    stageId: "stage-5-multi-agent",
    title: "Multi-Agent Collaboration Patterns",
    description: "设计角色分工与协作方式，提升复杂任务并行处理能力。",
    duration: "50 min",
    estimatedMinutes: 50,
    difficulty: "advanced",
    oneLineDefinition: "多智能体协作通过角色专精实现复杂任务分治。",
    shortExplanation:
      "可采用 Leader-Worker、Reviewer-Executor 等协作模式。",
    deepExplanation: [
      "角色职责与输入输出边界必须明确。",
      "协作链路应支持冲突检测与回退机制。",
      "先从两角色模式验证，再扩展到多角色。"
    ],
    tags: ["multi-agent", "collaboration"]
  },
  {
    id: "topic-agent-orchestration-strategies",
    slug: "agent-orchestration-strategies",
    stageId: "stage-5-multi-agent",
    title: "Agent Orchestration Strategies",
    description: "构建跨 Agent 的任务调度与依赖管理策略。",
    duration: "45 min",
    estimatedMinutes: 45,
    difficulty: "advanced",
    oneLineDefinition: "编排策略决定多 Agent 系统是否可扩展。",
    shortExplanation:
      "你需要设计任务队列、优先级、重试和回收策略。",
    deepExplanation: [
      "编排器应提供统一调度视图和执行追踪。",
      "策略应支持按任务类型动态切换。",
      "将失败重试与幂等逻辑作为默认能力。"
    ],
    tags: ["orchestration", "scheduler"]
  },
  {
    id: "topic-inter-agent-protocols",
    slug: "inter-agent-communication-protocols",
    stageId: "stage-5-multi-agent",
    title: "Inter-Agent Communication Protocols",
    description: "定义 Agent 之间的消息协议，提升协作稳定性。",
    duration: "35 min",
    estimatedMinutes: 35,
    difficulty: "advanced",
    oneLineDefinition: "通信协议是多 Agent 系统的契约层。",
    shortExplanation:
      "规范消息格式、上下文字段和错误码是协作成功的前提。",
    deepExplanation: [
      "协议需要版本化，避免升级导致全链路中断。",
      "结构化消息可降低语义误解风险。",
      "建议配套协议一致性测试。"
    ],
    tags: ["protocol", "communication"]
  },
  {
    id: "topic-evaluation-frameworks",
    slug: "evaluation-frameworks",
    stageId: "stage-6-production",
    title: "Evaluation Frameworks",
    description: "建立线上线下评估体系，持续优化 Agent 质量。",
    duration: "45 min",
    estimatedMinutes: 45,
    difficulty: "intermediate",
    oneLineDefinition: "没有评估框架，就没有可持续优化。",
    shortExplanation:
      "应覆盖正确率、任务完成率、时延、成本和用户反馈等维度。",
    deepExplanation: [
      "离线基准集用于快速迭代，在线评估用于真实反馈。",
      "指标体系必须与业务目标对齐。",
      "将评估结果反馈到提示词、工具和策略层。"
    ],
    tags: ["evaluation", "metrics"]
  },
  {
    id: "topic-guardrails-and-safety",
    slug: "guardrails-and-safety",
    stageId: "stage-6-production",
    title: "Guardrails and Safety",
    description: "构建输入输出防护与策略约束，降低生产风险。",
    duration: "40 min",
    estimatedMinutes: 40,
    difficulty: "intermediate",
    oneLineDefinition: "Guardrails 为 Agent 提供可控边界与风险缓冲。",
    shortExplanation:
      "包括提示注入防护、敏感操作审批、输出过滤等关键机制。",
    deepExplanation: [
      "安全策略应按风险分级，而非单一开关。",
      "高风险工具建议引入 human-in-the-loop。",
      "把风险事件纳入监控与复盘闭环。"
    ],
    tags: ["guardrails", "safety"]
  },
  {
    id: "topic-agent-monitoring-observability",
    slug: "agent-monitoring-and-observability",
    stageId: "stage-6-production",
    title: "Agent Monitoring and Observability",
    description: "构建可观测体系，定位故障并支撑持续运维。",
    duration: "35 min",
    estimatedMinutes: 35,
    difficulty: "intermediate",
    oneLineDefinition: "监控可观测是 Agent 生产化的底盘能力。",
    shortExplanation:
      "通过 tracing、事件日志与告警体系，快速发现异常与回归。",
    deepExplanation: [
      "建议覆盖执行路径、工具成功率、错误类型和成本指标。",
      "可观测数据应支持按用户、任务和版本切片分析。",
      "监控体系要与评估框架协同，形成闭环改进。"
    ],
    tags: ["monitoring", "observability", "production"]
  }
];
