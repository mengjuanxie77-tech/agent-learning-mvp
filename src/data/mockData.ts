import type {
  LearningContentSchema,
  LearningRecordEntity,
  LearningResourceEntity,
  LearningStageEntity,
  LearningTopicEntity,
  PracticeTaskEntity,
  ReflectionTemplateEntity,
  TopicLearningPackEntity,
  TopicStatus
} from "../types/content";
import { stageDefinitions, topicBlueprints } from "./academy/learningPathData";
import { practiceLabItems } from "./academy/labsData";
import { playgroundDemoItems } from "./academy/playgroundData";
import { knowledgeUpdates } from "./academy/updatesData";
import { knowledgeMap } from "./academy/knowledgeMapData";
import { academyModules } from "./academy/modulesData";
import { curatedResources } from "./resources/resources";
import { topicLearningPacks as curatedTopicLearningPacks } from "./resources/topic-learning-packs";
import { resourceWhitelistConfig } from "./resources/whitelist";

function indexById<T extends { id: string }>(items: T[]): Record<string, T> {
  return Object.fromEntries(items.map((item) => [item.id, item]));
}

function indexTopicLearningPacks(
  items: TopicLearningPackEntity[]
): Record<string, TopicLearningPackEntity> {
  return Object.fromEntries(items.map((item) => [item.topicId, item]));
}

function buildStages(): LearningStageEntity[] {
  return stageDefinitions.map((stageDefinition, index) => {
    const topicIds = topicBlueprints
      .filter((topic) => topic.stageId === stageDefinition.id)
      .map((topic) => topic.id);

    return {
      id: stageDefinition.id,
      slug: stageDefinition.slug,
      order: stageDefinition.order,
      title: stageDefinition.title,
      summary: stageDefinition.summary,
      learningGoals: stageDefinition.learningGoals,
      status: index === 0 ? "in_progress" : "planned",
      topicIds,
      estimatedHours: stageDefinition.estimatedHours,
      progressPercent: index === 0 ? 10 : 0,
      tags: stageDefinition.tags
    };
  });
}

function buildTopics(): LearningTopicEntity[] {
  return topicBlueprints.map((topicBlueprint, index) => {
    const status: TopicStatus = index === 0 ? "in_progress" : "not_started";
    return {
      id: topicBlueprint.id,
      slug: topicBlueprint.slug,
      stageId: topicBlueprint.stageId,
      title: topicBlueprint.title,
      subtitle: `${topicBlueprint.title} 学习主题`,
      description: topicBlueprint.description,
      oneLineDefinition: topicBlueprint.oneLineDefinition,
      shortExplanation: topicBlueprint.shortExplanation,
      deepExplanation: topicBlueprint.deepExplanation,
      duration: topicBlueprint.duration,
      estimatedMinutes: topicBlueprint.estimatedMinutes,
      difficulty: topicBlueprint.difficulty,
      status,
      keywordTags: topicBlueprint.tags,
      searchableText: `${topicBlueprint.title} ${topicBlueprint.tags.join(" ")}`,
      resourceIds: {
        articles: [`placeholder-article-${topicBlueprint.id}`],
        videos: [`placeholder-video-${topicBlueprint.id}`],
        audios: [`placeholder-audio-${topicBlueprint.id}`],
        diagrams: [`placeholder-demo-${topicBlueprint.id}`]
      },
      practiceTaskId: `task-${topicBlueprint.id}`,
      reflectionTemplateId: `reflect-${topicBlueprint.id}`
    };
  });
}

function buildPlaceholderResources(
  topics: LearningTopicEntity[]
): LearningResourceEntity[] {
  const checkedAt = "2026-04-24T12:00:00Z";
  return topics.flatMap((topic) => [
    {
      id: `placeholder-article-${topic.id}`,
      title: `${topic.title}：主阅读（待接入）`,
      description: "该主题真实主阅读正在接入中。",
      url: "#",
      domain: "internal.local",
      sourceType: "article",
      providerType: "course",
      language: "zh",
      contentFormat: "text",
      topicTags: topic.keywordTags,
      difficulty: topic.difficulty,
      durationMinutes: 15,
      isOfficial: false,
      isWhitelisted: false,
      qualityScore: 50,
      reviewStatus: "pending",
      summary: "占位资源，等待替换为白名单真实内容。",
      lastCheckedAt: checkedAt,
      metadata: {
        placeholder: true
      }
    },
    {
      id: `placeholder-video-${topic.id}`,
      title: `${topic.title}：视频（待接入）`,
      description: "该主题中文视频正在接入中。",
      url: "#",
      domain: "internal.local",
      sourceType: "video",
      providerType: "course",
      language: "zh",
      contentFormat: "video",
      topicTags: topic.keywordTags,
      difficulty: topic.difficulty,
      durationMinutes: 20,
      isOfficial: false,
      isWhitelisted: false,
      qualityScore: 50,
      reviewStatus: "pending",
      summary: "占位视频资源，等待替换为 bilibili 审核通过内容。",
      lastCheckedAt: checkedAt,
      metadata: {
        placeholder: true
      }
    },
    {
      id: `placeholder-audio-${topic.id}`,
      title: `${topic.title}：音频（预留）`,
      description: "音频资源槽位预留，可为空。",
      url: "#",
      domain: "internal.local",
      sourceType: "audio",
      providerType: "course",
      language: "zh",
      contentFormat: "audio",
      topicTags: topic.keywordTags,
      difficulty: topic.difficulty,
      durationMinutes: 15,
      isOfficial: false,
      isWhitelisted: false,
      qualityScore: 50,
      reviewStatus: "pending",
      summary: "占位音频资源。",
      lastCheckedAt: checkedAt,
      metadata: {
        placeholder: true
      }
    },
    {
      id: `placeholder-demo-${topic.id}`,
      title: `${topic.title}：Demo / Example（待接入）`,
      description: "Demo 资源槽位预留。",
      url: "#",
      domain: "internal.local",
      sourceType: "tutorial",
      providerType: "course",
      language: "zh",
      contentFormat: "mixed",
      topicTags: topic.keywordTags,
      difficulty: topic.difficulty,
      durationMinutes: 20,
      isOfficial: false,
      isWhitelisted: false,
      qualityScore: 50,
      reviewStatus: "pending",
      summary: "占位 demo 资源。",
      lastCheckedAt: checkedAt,
      metadata: {
        placeholder: true
      }
    }
  ]);
}

function buildPracticeTasks(topics: LearningTopicEntity[]): PracticeTaskEntity[] {
  const codexPrompts: Record<
    string,
    Pick<
      PracticeTaskEntity,
      | "goal"
      | "context"
      | "codexPrompt"
      | "expectedOutput"
      | "steps"
      | "checklist"
      | "evaluationRubric"
      | "observationFocus"
      | "reflectionFocus"
    >
  > = {
    "topic-what-is-ai-agent": {
      goal: "用低代码方式搭建一个“任务执行型 Agent”的纸面原型。",
      context: "你不需要自己写完整代码，重点是让 Codex 帮你生成结构，并理解目标、工具、执行循环和反馈。",
      codexPrompt:
        "请帮我设计一个最小 AI Agent 原型，用于完成“整理一篇文章的学习笔记”任务。请输出：1. Agent 的目标；2. 可用工具清单；3. 执行步骤；4. 每一步的输入和输出；5. 失败时如何回退；6. 一份可复制的执行日志模板。请用非开发者也能理解的方式解释。",
      expectedOutput: "Agent 结构说明 + 执行步骤表 + 日志模板 + 失败恢复说明。",
      steps: [
        "把任务目标写成一句话",
        "让 Codex 列出 Agent 需要的工具和输入输出",
        "检查每一步是否有明确结果",
        "补充失败恢复和人工确认节点"
      ],
      checklist: ["目标清楚", "工具不超过3个", "每一步有输入输出", "有失败恢复", "有复盘问题"],
      evaluationRubric: ["是否像任务系统", "是否可执行", "是否有边界", "是否容易解释"],
      observationFocus: ["Agent 和 chatbot 的差别在哪里", "哪一步需要工具", "哪一步需要人工判断"],
      reflectionFocus: ["如果去掉工具，它还算 Agent 吗？", "这个 Agent 最容易失败在哪里？"]
    },
    "topic-tool-calling-fundamentals": {
      goal: "用 Codex 设计一个工具调用 schema，并理解模型和代码各自负责什么。",
      context: "重点不是写 API，而是理解工具调用的契约：声明工具、生成参数、校验、执行、回填。",
      codexPrompt:
        "请帮我设计一个 AI Agent 的工具调用方案，场景是“根据用户给出的主题生成学习计划”。请输出：1. 工具名称；2. 工具用途；3. JSON schema 输入参数；4. 返回结果结构；5. 参数校验规则；6. 失败处理；7. 哪些步骤必须由代码执行而不是模型执行。",
      expectedOutput: "工具卡 + JSON schema + 参数校验规则 + 失败处理说明。",
      steps: [
        "定义一个只做一件事的工具",
        "让 Codex 写出输入参数 schema",
        "检查哪些字段必填、哪些字段有范围",
        "补充失败处理和人工确认"
      ],
      checklist: ["工具用途单一", "schema 字段清楚", "有校验规则", "有失败处理", "模型和代码分工明确"],
      evaluationRubric: ["结构清晰", "边界明确", "安全性", "可复用性"],
      observationFocus: ["模型输出的是意图还是执行结果", "哪些动作有风险", "schema 如何降低误解"],
      reflectionFocus: ["这个工具如果参数错了会怎样？", "哪些工具不应该默认开放给 Agent？"]
    },
    "topic-planning-algorithms": {
      goal: "让 Codex 帮你把一个复杂任务拆成可观察、可重规划的执行循环。",
      context: "不要求实现算法，重点理解 ReAct、Plan-and-Execute 和重规划的差别。",
      codexPrompt:
        "请帮我把“研究一个新的 AI Agent 技术主题并产出学习报告”设计成一个计划-执行循环。请输出：1. 初始计划；2. 每一步要观察什么；3. 如果资料不足如何重规划；4. 执行日志格式；5. ReAct 版本和 Plan-and-Execute 版本的差异。",
      expectedOutput: "计划表 + 观察点 + 重规划规则 + 两种执行策略对比。",
      steps: [
        "写出任务目标和最终产物",
        "让 Codex 生成初始计划",
        "给每一步加观察点和失败条件",
        "要求 Codex 输出重规划规则"
      ],
      checklist: ["有初始计划", "有观察点", "有失败条件", "有重规划规则", "有执行日志"],
      evaluationRubric: ["任务拆解质量", "可观察性", "恢复能力", "复盘价值"],
      observationFocus: ["什么时候应该继续执行", "什么时候应该重规划", "日志如何帮助复盘"],
      reflectionFocus: ["这个任务适合 ReAct 还是 Plan-and-Execute？", "如果第一步失败，系统怎么知道？"]
    },
    "topic-agent-runtime-state": {
      goal: "设计一个最小 Agent 运行时状态表，理解记忆、检查点和执行日志。",
      context: "你不需要做数据库，先用表格理解哪些状态需要保存、更新、删除。",
      codexPrompt:
        "请帮我为一个“个人学习 Agent”设计最小运行时状态模型。请输出：1. 当前任务状态字段；2. 用户偏好字段；3. 工具结果字段；4. 执行日志字段；5. 检查点规则；6. 哪些信息不应该保存；7. 一个失败后恢复执行的示例。",
      expectedOutput: "状态字段表 + 检查点规则 + 失败恢复示例 + 隐私边界说明。",
      steps: [
        "列出 Agent 当前任务需要记住的信息",
        "区分短期状态和长期记忆",
        "定义检查点和执行日志",
        "标注不应该保存的敏感信息"
      ],
      checklist: ["短期状态清楚", "长期记忆克制", "有检查点", "有删除/修正边界", "有恢复示例"],
      evaluationRubric: ["结构化程度", "隐私意识", "可恢复性", "可解释性"],
      observationFocus: ["哪些信息只是当前任务需要", "哪些信息可以跨会话", "日志和记忆有什么不同"],
      reflectionFocus: ["如果记错了怎么办？", "哪些状态保存后会带来风险？"]
    }
  };

  return topics.map((topic, index) => ({
    id: `task-${topic.id}`,
    topicId: topic.id,
    title: `今日实操：${topic.title}`,
    goal: codexPrompts[topic.id]?.goal ?? "在 30~45 分钟内完成该主题的最小可运行理解练习。",
    context:
      codexPrompts[topic.id]?.context ??
      "面向学习闭环，优先保证“可执行、可验证、可复盘”。",
    codexPrompt:
      codexPrompts[topic.id]?.codexPrompt ??
      `请围绕「${topic.title}」实现一个最小可运行 Agent 示例，包含输入、执行步骤、结果输出和复盘日志。`,
    expectedOutput:
      codexPrompts[topic.id]?.expectedOutput ??
      "可运行脚本或页面 + 执行日志 + 简短复盘结论。",
    estimatedMinutes: Math.max(30, Math.min(topic.estimatedMinutes, 45)),
    steps:
      codexPrompts[topic.id]?.steps ?? [
        "定义任务目标和成功标准",
        "实现最小执行流程并记录日志",
        "加入一个失败分支并完成恢复",
        "输出结果并进行复盘"
      ],
    checklist:
      codexPrompts[topic.id]?.checklist ?? [
        "可运行",
        "有日志",
        "有失败恢复",
        "有复盘结论"
      ],
    evaluationRubric:
      codexPrompts[topic.id]?.evaluationRubric ?? [
        "完成度",
        "稳定性",
        "可解释性",
        "可复用性"
      ],
    observationFocus: codexPrompts[topic.id]?.observationFocus,
    reflectionFocus: codexPrompts[topic.id]?.reflectionFocus,
    status: index === 0 ? "in_progress" : "not_started"
  }));
}

function buildReflectionTemplates(
  topics: LearningTopicEntity[]
): ReflectionTemplateEntity[] {
  return topics.map((topic) => ({
    id: `reflect-${topic.id}`,
    topicId: topic.id,
    title: `学习复盘：${topic.title}`,
    questions: [
      {
        id: `${topic.id}-q1`,
        prompt: "这个主题和上一个主题的关键连接点是什么？"
      },
      {
        id: `${topic.id}-q2`,
        prompt: "今天实操里最容易失败的环节是什么？如何改进？"
      },
      {
        id: `${topic.id}-q3`,
        prompt: "如果要在你的实际工作中应用，你会先落在哪个环节？"
      }
    ]
  }));
}

function buildDefaultLearningPacks(
  topics: LearningTopicEntity[],
  reflectionTemplates: ReflectionTemplateEntity[]
): TopicLearningPackEntity[] {
  return topics.map((topic) => {
    const reflectionTemplate = reflectionTemplates.find(
      (item) => item.topicId === topic.id
    );

    return {
      topicId: topic.id,
      primaryReading: topic.resourceIds.articles.slice(0, 1),
      supportingReading: [],
      videoResource: topic.resourceIds.videos.slice(0, 1),
      audioResource: [],
      demoResource: topic.resourceIds.diagrams.slice(0, 1),
      practiceTaskId: topic.practiceTaskId,
      reflectionQuestions:
        reflectionTemplate?.questions.map((item) => item.prompt) ?? []
    };
  });
}

const topics = buildTopics();
const stages = buildStages();
const placeholderResources = buildPlaceholderResources(topics);
const practiceTasks = buildPracticeTasks(topics);
const reflectionTemplates = buildReflectionTemplates(topics);
const defaultLearningPacks = buildDefaultLearningPacks(topics, reflectionTemplates);

const resources = indexById([...placeholderResources, ...curatedResources]);
const topicLearningPacks = indexTopicLearningPacks([
  ...defaultLearningPacks,
  ...curatedTopicLearningPacks
]);

const learningRecords: LearningRecordEntity[] = [
  {
    id: "record-topic-what-is-ai-agent",
    topicId: "topic-what-is-ai-agent",
    stageId: "stage-1-foundations",
    status: "in_progress",
    startedAt: "2026-04-24T09:00:00+08:00",
    timeSpentMinutes: 28,
    lastReviewedAt: "2026-04-24T10:00:00+08:00",
    note: "已完成核心概念学习，下一步补全执行日志模板。",
    highlights: ["明确了 Agent 与 chatbot 的差异", "理解了执行闭环结构"],
    answers: [
      {
        questionId: "topic-what-is-ai-agent-q1",
        answer: "Agent 的核心是任务执行与反馈循环，而非一次回答。"
      }
    ],
    selfRating: 4,
    nextAction: "完成 Prompt 模板和结构化输出练习。",
    savedResourceIds: [
      "agent-baseline-anthropic-effective-agents",
      "agent-deep-chip-huyen-agents"
    ]
  }
];

export const mockLearningSchema: LearningContentSchema = {
  stages: indexById(stages),
  topics: indexById(topics),
  resources,
  topicLearningPacks,
  practiceTasks: indexById(practiceTasks),
  reflectionTemplates: indexById(reflectionTemplates),
  learningRecords: indexById(learningRecords),
  practiceLabs: indexById(practiceLabItems),
  playgroundDemos: indexById(playgroundDemoItems),
  knowledgeUpdates,
  knowledgeMap,
  academyModules,
  resourceWhitelist: resourceWhitelistConfig,
  homeConfig: {
    heroMessage: "用一条完整学习路径，把 AI Agent 从概念学到可落地执行。",
    todayTopicId: "topic-what-is-ai-agent",
    spotlightStageId: "stage-1-foundations"
  }
};
