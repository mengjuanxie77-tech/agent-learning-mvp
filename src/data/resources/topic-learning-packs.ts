import type { TopicLearningPackEntity } from "../../types/content";

export const topicLearningPacks: TopicLearningPackEntity[] = [
  {
    topicId: "topic-what-is-ai-agent",
    officialBaseline: ["agent-baseline-anthropic-effective-agents"],
    deepAnalysis: ["agent-deep-chip-huyen-agents"],
    cnGuides: ["agent-guide-academy-foundation-cn"],
    practiceReferences: ["agent-practice-reference-langchain-agents"],
    primaryReading: ["agent-baseline-anthropic-effective-agents"],
    supportingReading: ["agent-deep-chip-huyen-agents", "agent-guide-academy-foundation-cn"],
    videoResource: [],
    audioResource: [],
    demoResource: ["agent-practice-reference-langchain-agents"],
    practiceTaskId: "task-topic-what-is-ai-agent",
    reflectionQuestions: [
      "阅读完主材料后，你如何定义“可执行智能体”？",
      "视频中的案例里，哪一步最容易失败？你会怎么改？",
      "如果在你当前团队落地，你会先做哪种最小Agent？"
    ]
  },
  {
    topicId: "topic-tool-calling-fundamentals",
    officialBaseline: ["tool-baseline-openai-cookbook-function-calling"],
    deepAnalysis: ["tool-deep-chip-huyen-tools-section", "tool-deep-simon-willison-functions"],
    cnGuides: ["tool-guide-academy-cn"],
    practiceReferences: ["tool-baseline-openai-cookbook-function-calling"],
    primaryReading: ["tool-baseline-openai-cookbook-function-calling"],
    supportingReading: [
      "tool-deep-chip-huyen-tools-section",
      "tool-deep-simon-willison-functions",
      "tool-guide-academy-cn"
    ],
    videoResource: [],
    audioResource: [],
    demoResource: ["tool-baseline-openai-cookbook-function-calling"],
    practiceTaskId: "task-topic-tool-calling-fundamentals",
    reflectionQuestions: [
      "你的工具参数 schema 里，最容易缺失的字段是什么？",
      "当工具调用失败时，你会如何设计重试策略？",
      "如何判断一个工具是否应该纳入 Agent 的默认工具集？"
    ]
  },
  {
    topicId: "topic-planning-algorithms",
    officialBaseline: ["planning-baseline-langgraph-overview"],
    deepAnalysis: ["planning-deep-lilian-agent-planning"],
    cnGuides: ["planning-guide-academy-cn"],
    practiceReferences: ["planning-practice-reference-langgraph-examples"],
    primaryReading: ["planning-baseline-langgraph-overview"],
    supportingReading: ["planning-deep-lilian-agent-planning", "planning-guide-academy-cn"],
    videoResource: [],
    audioResource: [],
    demoResource: ["planning-practice-reference-langgraph-examples"],
    practiceTaskId: "task-topic-planning-algorithms",
    reflectionQuestions: [
      "这次规划流程里，哪一步最需要动态重规划？",
      "你会用什么方式限制规划树的分支膨胀？",
      "如果执行失败，如何把反馈回流到下一轮规划？"
    ]
  },
  {
    topicId: "topic-agent-runtime-state",
    officialBaseline: ["runtime-baseline-langgraph-memory"],
    deepAnalysis: ["runtime-deep-lilian-memory"],
    cnGuides: ["runtime-guide-academy-cn"],
    practiceReferences: ["runtime-practice-reference-langgraph-persistence"],
    primaryReading: ["runtime-baseline-langgraph-memory"],
    supportingReading: ["runtime-deep-lilian-memory", "runtime-guide-academy-cn"],
    videoResource: [],
    audioResource: [],
    demoResource: ["runtime-practice-reference-langgraph-persistence"],
    practiceTaskId: "task-topic-agent-runtime-state",
    reflectionQuestions: [
      "你会把哪些状态字段作为必须持久化项？",
      "如何设计可恢复执行中的检查点与回放机制？",
      "哪些监控指标最能反映 runtime 健康度？"
    ]
  }
];
