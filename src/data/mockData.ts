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
  return topics.map((topic, index) => ({
    id: `task-${topic.id}`,
    topicId: topic.id,
    title: `今日实操：${topic.title}`,
    goal: "在 30~45 分钟内完成该主题的最小可运行实现。",
    context: "面向学习闭环，优先保证“可执行、可验证、可复盘”。",
    codexPrompt: `请围绕「${topic.title}」实现一个最小可运行 Agent 示例，包含输入、执行步骤、结果输出和复盘日志。`,
    expectedOutput: "可运行脚本或页面 + 执行日志 + 简短复盘结论。",
    estimatedMinutes: Math.max(30, Math.min(topic.estimatedMinutes, 45)),
    steps: [
      "定义任务目标和成功标准",
      "实现最小执行流程并记录日志",
      "加入一个失败分支并完成恢复",
      "输出结果并进行复盘"
    ],
    checklist: ["可运行", "有日志", "有失败恢复", "有复盘结论"],
    evaluationRubric: ["完成度", "稳定性", "可解释性", "可复用性"],
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
      "real-what-agent-primary-openai-guide",
      "real-what-agent-video-bilibili-intro"
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
