import type {
  LearningContentSchema,
  LearningRecordEntity,
  LearningResourceEntity,
  LearningStageEntity,
  LearningTopicEntity,
  PracticeTaskEntity,
  ReflectionTemplateEntity
} from "../types/content";

function indexById<T extends { id: string }>(items: T[]): Record<string, T> {
  return Object.fromEntries(items.map((item) => [item.id, item]));
}

const stages: LearningStageEntity[] = [
  {
    id: "stage-foundation",
    slug: "foundation",
    order: 1,
    title: "阶段 1：智能体基础",
    summary: "先建立智能体核心概念模型，避免后续学习碎片化。",
    learningGoals: [
      "区分聊天模型与智能体",
      "理解目标-规划-执行-反思闭环",
      "建立任务导向的学习方式"
    ],
    status: "in_progress",
    topicIds: ["topic-agent-foundation", "topic-llm-tools-basics"],
    estimatedHours: 10,
    progressPercent: 35,
    tags: ["foundation", "agent-basics"]
  },
  {
    id: "stage-planning",
    slug: "planning-and-execution",
    order: 2,
    title: "阶段 2：规划与执行",
    summary: "理解智能体如何在复杂任务里规划、执行、纠错。",
    learningGoals: [
      "掌握最小规划循环",
      "引入状态和记忆机制",
      "形成可追踪执行日志"
    ],
    status: "planned",
    topicIds: ["topic-planning-loop", "topic-memory-state"],
    estimatedHours: 14,
    progressPercent: 0,
    tags: ["planning", "execution"]
  },
  {
    id: "stage-collaboration",
    slug: "collaboration-and-evaluation",
    order: 3,
    title: "阶段 3：协作、评估与落地",
    summary: "把单体智能体扩展到协作、多角色与业务落地。",
    learningGoals: [
      "理解多智能体协同模式",
      "建立评估与安全约束",
      "连接真实业务流程"
    ],
    status: "planned",
    topicIds: ["topic-multi-agent", "topic-agent-evaluation"],
    estimatedHours: 16,
    progressPercent: 0,
    tags: ["multi-agent", "evaluation", "production"]
  }
];

const topics: LearningTopicEntity[] = [
  {
    id: "topic-agent-foundation",
    slug: "what-is-an-agent",
    stageId: "stage-foundation",
    title: "什么是智能体",
    subtitle: "从会聊天的模型，到能完成任务的系统",
    summary: "区分聊天模型与任务型智能体，建立系统认知。",
    oneLineDefinition:
      "智能体是能够围绕目标进行感知、规划、行动并根据反馈迭代的 AI 系统。",
    shortExplanation:
      "聊天模型擅长生成答案，但智能体要额外处理目标理解、步骤规划、工具调用和结果校验。它不只是说得好，而是要把任务做完。",
    deepExplanation: [
      "在系统视角下，智能体通常由四个最小模块构成：目标输入、推理与规划、工具执行、结果反思。只有把这四个模块串起来，才算进入任务闭环。",
      "智能体并不总是一次成功，它需要在执行后根据反馈修正计划。这也是为什么智能体设计中，状态记录与错误恢复和模型能力同样重要。",
      "对业务应用来说，智能体价值不是回答更长，而是缩短任务完成时间并提高可验证性。因此每次设计都要先定义成功标准。"
    ],
    estimatedMinutes: 45,
    difficulty: "beginner",
    status: "in_progress",
    keywordTags: ["agent", "workflow", "tool-calling", "reasoning"],
    searchableText:
      "智能体 定义 目标 规划 工具调用 反思 任务闭环 chat vs agent",
    resourceIds: {
      articles: ["res-art-agent-concepts", "res-art-orchestration"],
      videos: ["res-video-agent-workflow", "res-video-chat-to-agent"],
      audios: ["res-audio-agent-mistakes", "res-audio-agent-in-team"],
      diagrams: ["res-diagram-agent-loop"]
    },
    practiceTaskId: "task-agent-loop",
    reflectionTemplateId: "reflect-agent-foundation"
  },
  {
    id: "topic-llm-tools-basics",
    slug: "llm-tool-calling-basics",
    stageId: "stage-foundation",
    title: "LLM + Tool 调用基础",
    subtitle: "理解模型为什么需要工具，以及如何稳定调用工具",
    summary: "理解模型为何需要工具以及工具调用的核心链路。",
    oneLineDefinition:
      "工具调用让模型把语言理解能力连接到可执行动作，从“会说”变成“会做”。",
    shortExplanation:
      "当任务需要访问外部系统时，模型必须通过工具接口完成真实操作，这需要结构化输入、参数约束和结果回传。",
    deepExplanation: [
      "工具调用本质上是模型推理与程序执行之间的协议协作。协议越清晰，执行越稳定。",
      "在生产场景里，必须有错误处理与重试策略，否则单次工具失败会导致整条任务链中断。",
      "开始阶段先做小工具集合，比一次性覆盖全部业务接口更稳。"
    ],
    estimatedMinutes: 60,
    difficulty: "beginner",
    status: "not_started",
    keywordTags: ["tool-calling", "schema", "function-call"],
    searchableText:
      "LLM tool calling function schema 参数校验 工具执行 重试",
    resourceIds: {
      articles: ["res-art-topic-llm-tools-basics-article"],
      videos: ["res-video-topic-llm-tools-basics-video"],
      audios: ["res-audio-topic-llm-tools-basics-audio"],
      diagrams: ["res-diagram-topic-llm-tools-basics-diagram"]
    },
    practiceTaskId: "task-topic-llm-tools-basics",
    reflectionTemplateId: "reflect-topic-llm-tools-basics"
  },
  {
    id: "topic-planning-loop",
    slug: "planning-loop",
    stageId: "stage-planning",
    title: "任务规划与执行循环",
    subtitle: "目标拆解、执行跟踪与失败恢复",
    summary: "把目标拆成可执行步骤并可追踪地完成。",
    oneLineDefinition:
      "规划循环让智能体在复杂任务中持续推进，并在失败后可恢复。",
    shortExplanation:
      "智能体需要先规划再执行，同时记录每次动作与结果，才能进行下一轮修正。",
    deepExplanation: [
      "规划循环的核心是“先分解目标，再按状态推进”。",
      "每一轮执行都应输出结构化日志，便于回放和评估。",
      "设计时优先保证可追踪性，再追求复杂策略。"
    ],
    estimatedMinutes: 70,
    difficulty: "intermediate",
    status: "not_started",
    keywordTags: ["planning", "execution-loop"],
    searchableText: "任务规划 执行循环 状态机 智能体",
    resourceIds: {
      articles: ["res-art-topic-planning-loop-article"],
      videos: ["res-video-topic-planning-loop-video"],
      audios: ["res-audio-topic-planning-loop-audio"],
      diagrams: ["res-diagram-topic-planning-loop-diagram"]
    },
    practiceTaskId: "task-topic-planning-loop",
    reflectionTemplateId: "reflect-topic-planning-loop"
  },
  {
    id: "topic-memory-state",
    slug: "memory-and-state",
    stageId: "stage-planning",
    title: "记忆与状态管理",
    subtitle: "把上下文保存成可持续学习的状态",
    summary: "学习短期上下文和长期记忆在智能体中的作用。",
    oneLineDefinition:
      "记忆与状态是智能体跨轮次任务连续性的基础设施。",
    shortExplanation:
      "没有状态管理，智能体就无法在复杂任务中保持一致行为和有效纠错。",
    deepExplanation: [
      "短期上下文负责当前任务连续性，长期记忆负责跨任务复用。",
      "记忆写入策略影响系统性能和准确性。",
      "先定义哪些信息值得长期保存，再设计存储结构。"
    ],
    estimatedMinutes: 65,
    difficulty: "intermediate",
    status: "not_started",
    keywordTags: ["memory", "state-management"],
    searchableText: "记忆 上下文 状态管理 智能体",
    resourceIds: {
      articles: ["res-art-topic-memory-state-article"],
      videos: ["res-video-topic-memory-state-video"],
      audios: ["res-audio-topic-memory-state-audio"],
      diagrams: ["res-diagram-topic-memory-state-diagram"]
    },
    practiceTaskId: "task-topic-memory-state",
    reflectionTemplateId: "reflect-topic-memory-state"
  },
  {
    id: "topic-multi-agent",
    slug: "multi-agent-collaboration",
    stageId: "stage-collaboration",
    title: "多智能体协作模式",
    subtitle: "角色分工、协作协议与冲突处理",
    summary: "理解角色分工、协作协议与冲突处理。",
    oneLineDefinition:
      "多智能体协作通过角色分工提升复杂任务处理效率与稳定性。",
    shortExplanation:
      "当单个智能体能力边界明显时，可以通过多角色协作模式提升整体任务表现。",
    deepExplanation: [
      "角色边界清晰是协作效率的前提。",
      "协作协议应定义输入、输出和冲突回退机制。",
      "从双智能体模式起步，比直接做大型协作更可控。"
    ],
    estimatedMinutes: 80,
    difficulty: "advanced",
    status: "not_started",
    keywordTags: ["multi-agent", "collaboration"],
    searchableText: "多智能体 协作 角色分工 协议",
    resourceIds: {
      articles: ["res-art-topic-multi-agent-article"],
      videos: ["res-video-topic-multi-agent-video"],
      audios: ["res-audio-topic-multi-agent-audio"],
      diagrams: ["res-diagram-topic-multi-agent-diagram"]
    },
    practiceTaskId: "task-topic-multi-agent",
    reflectionTemplateId: "reflect-topic-multi-agent"
  },
  {
    id: "topic-agent-evaluation",
    slug: "agent-evaluation-and-safety",
    stageId: "stage-collaboration",
    title: "评估与安全约束",
    subtitle: "建立最小可落地的评估与防护体系",
    summary: "建立智能体评估指标与最小安全边界。",
    oneLineDefinition:
      "评估与安全约束让智能体能力可衡量、可控、可持续改进。",
    shortExplanation:
      "没有评估指标，智能体优化无从谈起；没有安全约束，系统上线风险不可控。",
    deepExplanation: [
      "先定义少量关键指标，再逐步扩展评估维度。",
      "风险分层管理比一次性覆盖全部安全问题更现实。",
      "将评估结果回流到提示词和工具策略，形成迭代闭环。"
    ],
    estimatedMinutes: 75,
    difficulty: "advanced",
    status: "not_started",
    keywordTags: ["evaluation", "safety", "metrics"],
    searchableText: "评估 安全约束 指标 智能体",
    resourceIds: {
      articles: ["res-art-topic-agent-evaluation-article"],
      videos: ["res-video-topic-agent-evaluation-video"],
      audios: ["res-audio-topic-agent-evaluation-audio"],
      diagrams: ["res-diagram-topic-agent-evaluation-diagram"]
    },
    practiceTaskId: "task-topic-agent-evaluation",
    reflectionTemplateId: "reflect-topic-agent-evaluation"
  }
];

const coreResources: LearningResourceEntity[] = [
  {
    id: "res-art-agent-concepts",
    type: "article",
    topicId: "topic-agent-foundation",
    title: "Agentic Systems: Core Concepts",
    description: "系统化解释智能体核心组成与设计取舍。",
    sourceName: "技术文章",
    sourceType: "community",
    url: "#",
    language: "zh-CN",
    tags: ["agent", "concept"],
    searchableText: "agentic systems core concepts",
    durationSeconds: 600,
    diagram: null
  },
  {
    id: "res-art-orchestration",
    type: "article",
    topicId: "topic-agent-foundation",
    title: "From Prompting to Orchestration",
    description: "从提示词工程迈向任务编排的关键步骤。",
    sourceName: "案例研究",
    sourceType: "community",
    url: "#",
    language: "en-US",
    tags: ["orchestration", "workflow"],
    searchableText: "prompting orchestration",
    durationSeconds: 840,
    diagram: null
  },
  {
    id: "res-video-agent-workflow",
    type: "video",
    topicId: "topic-agent-foundation",
    title: "Agent 系统的最小工作流",
    description: "用真实案例拆解目标、工具与执行反馈之间的关系。",
    sourceName: "YouTube",
    sourceType: "community",
    url: "#",
    language: "zh-CN",
    tags: ["workflow", "agent"],
    searchableText: "agent workflow",
    durationSeconds: 720,
    diagram: null
  },
  {
    id: "res-video-chat-to-agent",
    type: "video",
    topicId: "topic-agent-foundation",
    title: "从 Chat 到 Agent 的产品转变",
    description: "产品视角理解为什么聊天体验无法覆盖任务场景。",
    sourceName: "Bilibili",
    sourceType: "community",
    url: "#",
    language: "zh-CN",
    tags: ["product", "chat-to-agent"],
    searchableText: "chat to agent",
    durationSeconds: 1080,
    diagram: null
  },
  {
    id: "res-audio-agent-mistakes",
    type: "audio",
    topicId: "topic-agent-foundation",
    title: "智能体设计中的关键误区",
    description: "讨论智能体项目常见失败原因与改进思路。",
    sourceName: "播客",
    sourceType: "community",
    url: "#",
    language: "zh-CN",
    tags: ["podcast", "mistakes"],
    searchableText: "agent mistakes",
    durationSeconds: 1320,
    diagram: null
  },
  {
    id: "res-audio-agent-in-team",
    type: "audio",
    topicId: "topic-agent-foundation",
    title: "把智能体落地到团队工作流",
    description: "如何把学习内容映射到实际业务环节。",
    sourceName: "播客",
    sourceType: "community",
    url: "#",
    language: "zh-CN",
    tags: ["team", "workflow"],
    searchableText: "agent in team workflow",
    durationSeconds: 960,
    diagram: null
  },
  {
    id: "res-diagram-agent-loop",
    type: "diagram",
    topicId: "topic-agent-foundation",
    title: "智能体执行闭环图示",
    description: "目标输入 -> 规划 -> 工具调用 -> 结果反思 -> 下一轮执行。",
    sourceName: "Internal",
    sourceType: "internal",
    url: "#",
    language: "zh-CN",
    tags: ["diagram", "loop"],
    searchableText: "agent loop diagram",
    diagram: {
      format: "placeholder",
      content: "目标输入 -> 规划器 -> 工具调用器 -> 执行结果 -> 反思与修正 -> 输出"
    }
  }
];

const placeholderResources: LearningResourceEntity[] = topics
  .filter((topic) => topic.id !== "topic-agent-foundation")
  .flatMap((topic) => [
    {
      id: `res-art-${topic.id}-article`,
      type: "article" as const,
      topicId: topic.id,
      title: `${topic.title}：推荐文章（待补充）`,
      description: "后续接入真实文章资源后替换。",
      sourceName: "Internal",
      sourceType: "internal" as const,
      url: "#",
      language: "zh-CN",
      tags: ["placeholder"],
      searchableText: `${topic.title} article placeholder`,
      durationSeconds: 480,
      diagram: null
    },
    {
      id: `res-video-${topic.id}-video`,
      type: "video" as const,
      topicId: topic.id,
      title: `${topic.title}：视频资源（待补充）`,
      description: "后续接入真实视频资源后替换。",
      sourceName: "Internal",
      sourceType: "internal" as const,
      url: "#",
      language: "zh-CN",
      tags: ["placeholder"],
      searchableText: `${topic.title} video placeholder`,
      durationSeconds: 600,
      diagram: null
    },
    {
      id: `res-audio-${topic.id}-audio`,
      type: "audio" as const,
      topicId: topic.id,
      title: `${topic.title}：音频资源（待补充）`,
      description: "后续接入真实音频资源后替换。",
      sourceName: "Internal",
      sourceType: "internal" as const,
      url: "#",
      language: "zh-CN",
      tags: ["placeholder"],
      searchableText: `${topic.title} audio placeholder`,
      durationSeconds: 600,
      diagram: null
    },
    {
      id: `res-diagram-${topic.id}-diagram`,
      type: "diagram" as const,
      topicId: topic.id,
      title: `${topic.title}：图示占位`,
      description: "图示内容待补充，当前用于验证主题页结构。",
      sourceName: "Internal",
      sourceType: "internal" as const,
      url: "#",
      language: "zh-CN",
      tags: ["placeholder", "diagram"],
      searchableText: `${topic.title} diagram placeholder`,
      diagram: {
        format: "placeholder",
        content: "图示占位：后续替换为流程图或架构图。"
      }
    }
  ]);

const tasks: PracticeTaskEntity[] = [
  {
    id: "task-agent-loop",
    topicId: "topic-agent-foundation",
    title: "今日实操：搭一个最小智能体执行循环",
    goal: "通过一次完整执行，理解智能体的规划、执行和复盘机制。",
    context:
      "场景：你要做一个“学习计划助手”，输入目标后自动拆解步骤并生成执行记录。",
    codexPrompt:
      "请用 TypeScript 写一个最小智能体循环：输入学习目标，生成 3 个执行步骤，模拟 tool 调用结果，输出执行日志和最终总结。",
    expectedOutput:
      "一个可运行脚本，打印目标、计划、每步执行结果、失败重试与最终结论。",
    estimatedMinutes: 50,
    steps: [
      "定义任务目标和成功标准",
      "拆解成 3 个执行步骤",
      "模拟每步工具调用并记录结果",
      "加入一次失败并触发重试",
      "输出最终总结和下一步建议"
    ],
    checklist: [
      "定义输入目标与成功标准",
      "输出可读的步骤计划",
      "模拟至少一次工具调用失败并重试",
      "记录每一步状态变化",
      "生成最终总结与下一步建议"
    ],
    evaluationRubric: ["可运行", "可读日志", "有失败恢复", "有复盘结论"],
    status: "in_progress"
  },
  ...topics
    .filter((topic) => topic.id !== "topic-agent-foundation")
    .map((topic) => ({
      id: `task-${topic.id}`,
      topicId: topic.id,
      title: `${topic.title}：实操任务（待补充）`,
      goal: "先保证学习流程闭环，后续补充高质量任务。",
      context: "该主题内容正在构建中，当前采用标准任务模板。",
      codexPrompt: "请基于该主题设计一个 30 分钟可完成的最小实操任务。",
      expectedOutput: "任务说明文档 + 可验证的最小产出。",
      estimatedMinutes: 30,
      steps: ["定义任务目标", "执行最小实现", "记录结果与问题"],
      checklist: ["目标清晰", "有产出", "可复盘"],
      evaluationRubric: ["任务可执行", "结果可验证", "复盘可落地"],
      status: "not_started" as const
    }))
];

const reflectionTemplates: ReflectionTemplateEntity[] = [
  {
    id: "reflect-agent-foundation",
    topicId: "topic-agent-foundation",
    title: "主题复盘：什么是智能体",
    questions: [
      {
        id: "q-agent-foundation-1",
        prompt: "聊天模型和智能体在“任务完成”上的本质差异是什么？"
      },
      {
        id: "q-agent-foundation-2",
        prompt: "如果一个系统没有状态记录，它还能被称为智能体吗？为什么？"
      },
      {
        id: "q-agent-foundation-3",
        prompt: "今天的实操里，哪一步最容易失败？你会如何改进？"
      },
      {
        id: "q-agent-foundation-4",
        prompt: "在你当前工作中，哪个重复任务最适合先做成智能体？"
      }
    ]
  },
  ...topics
    .filter((topic) => topic.id !== "topic-agent-foundation")
    .map((topic) => ({
      id: `reflect-${topic.id}`,
      topicId: topic.id,
      title: `主题复盘：${topic.title}`,
      questions: [
        {
          id: `${topic.id}-q1`,
          prompt: "这个主题和上一主题的能力连接点是什么？"
        },
        {
          id: `${topic.id}-q2`,
          prompt: "如果只保留一个关键收获，你会保留什么？"
        },
        {
          id: `${topic.id}-q3`,
          prompt: "下一次实操你会新增哪个验证指标？"
        }
      ]
    }))
];

const learningRecords: LearningRecordEntity[] = [
  {
    id: "record-topic-agent-foundation",
    topicId: "topic-agent-foundation",
    stageId: "stage-foundation",
    status: "in_progress",
    startedAt: "2026-04-24T09:00:00+08:00",
    timeSpentMinutes: 35,
    lastReviewedAt: "2026-04-24T10:10:00+08:00",
    note: "已完成概念学习和第一轮任务框架，下一步补执行日志细节。",
    highlights: ["明确了目标-规划-执行-反思闭环", "意识到状态记录是关键"],
    answers: [
      {
        questionId: "q-agent-foundation-1",
        answer: "聊天偏表达，智能体偏任务完成和可验证执行。"
      }
    ],
    selfRating: 4,
    nextAction: "补上失败重试逻辑并记录每步状态。",
    savedResourceIds: ["res-video-agent-workflow", "res-art-agent-concepts"]
  }
];

export const mockLearningSchema: LearningContentSchema = {
  stages: indexById(stages),
  topics: indexById(topics),
  resources: indexById([...coreResources, ...placeholderResources]),
  practiceTasks: indexById(tasks),
  reflectionTemplates: indexById(reflectionTemplates),
  learningRecords: indexById(learningRecords),
  homeConfig: {
    heroMessage: "今天先学一个主题，把智能体从概念理解推进到可操作实践。",
    todayTopicId: "topic-agent-foundation",
    spotlightStageId: "stage-foundation"
  }
};
