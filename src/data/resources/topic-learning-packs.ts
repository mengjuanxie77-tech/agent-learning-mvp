import type { TopicLearningPackEntity } from "../../types/content";

export const topicLearningPacks: TopicLearningPackEntity[] = [
  {
    topicId: "topic-what-is-ai-agent",
    primaryReading: ["real-what-agent-primary-openai-guide"],
    supportingReading: ["real-what-agent-support-anthropic-guide"],
    videoResource: ["real-what-agent-video-bilibili-intro"],
    audioResource: [],
    demoResource: ["real-what-agent-demo-langchain-repo"],
    practiceTaskId: "task-topic-what-is-ai-agent",
    reflectionQuestions: [
      "阅读完主材料后，你如何定义“可执行智能体”？",
      "视频中的案例里，哪一步最容易失败？你会怎么改？",
      "如果在你当前团队落地，你会先做哪种最小Agent？"
    ]
  },
  {
    topicId: "topic-tool-calling-fundamentals",
    primaryReading: ["real-tool-calling-primary-openai"],
    supportingReading: ["real-tool-calling-support-anthropic"],
    videoResource: ["real-tool-calling-video-bilibili"],
    audioResource: [],
    demoResource: ["real-tool-calling-demo-cookbook"],
    practiceTaskId: "task-topic-tool-calling-fundamentals",
    reflectionQuestions: [
      "你的工具参数 schema 里，最容易缺失的字段是什么？",
      "当工具调用失败时，你会如何设计重试策略？",
      "如何判断一个工具是否应该纳入 Agent 的默认工具集？"
    ]
  },
  {
    topicId: "topic-planning-algorithms",
    primaryReading: ["real-planning-primary-langgraph"],
    supportingReading: ["real-planning-support-fowler"],
    videoResource: ["real-planning-video-bilibili"],
    audioResource: [],
    demoResource: ["real-planning-demo-langgraph-repo"],
    practiceTaskId: "task-topic-planning-algorithms",
    reflectionQuestions: [
      "这次规划流程里，哪一步最需要动态重规划？",
      "你会用什么方式限制规划树的分支膨胀？",
      "如果执行失败，如何把反馈回流到下一轮规划？"
    ]
  },
  {
    topicId: "topic-agent-runtime-state",
    primaryReading: ["real-runtime-primary-llamaindex"],
    supportingReading: ["real-runtime-support-microsoft-agent"],
    videoResource: ["real-runtime-video-bilibili"],
    audioResource: [],
    demoResource: ["real-runtime-demo-autogen"],
    practiceTaskId: "task-topic-agent-runtime-state",
    reflectionQuestions: [
      "你会把哪些状态字段作为必须持久化项？",
      "如何设计可恢复执行中的检查点与回放机制？",
      "哪些监控指标最能反映 runtime 健康度？"
    ]
  }
];
