import type {
  LearningContentSchema,
  LearningRecordEntity,
  LearningResourceEntity,
  LearningStageEntity,
  LearningTopicEntity,
  PracticeTaskEntity,
  ReflectionTemplateEntity,
  TopicStatus
} from "../types/content";
import { stageDefinitions, topicBlueprints } from "./academy/learningPathData";
import { practiceLabItems } from "./academy/labsData";
import { playgroundDemoItems } from "./academy/playgroundData";
import { knowledgeUpdates } from "./academy/updatesData";
import { knowledgeMap } from "./academy/knowledgeMapData";
import { academyModules } from "./academy/modulesData";

function indexById<T extends { id: string }>(items: T[]): Record<string, T> {
  return Object.fromEntries(items.map((item) => [item.id, item]));
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
        articles: [`res-article-${topicBlueprint.id}`],
        videos: [`res-video-${topicBlueprint.id}`],
        audios: [`res-audio-${topicBlueprint.id}`],
        diagrams: [`res-diagram-${topicBlueprint.id}`]
      },
      practiceTaskId: `task-${topicBlueprint.id}`,
      reflectionTemplateId: `reflect-${topicBlueprint.id}`
    };
  });
}

function buildResources(topics: LearningTopicEntity[]): LearningResourceEntity[] {
  return topics.flatMap((topic) => [
    {
      id: `res-article-${topic.id}`,
      type: "article",
      topicId: topic.id,
      title: `${topic.title}: Core Reading`,
      description: "帮助你快速理解该主题的核心概念与实现思路。",
      sourceName: "Academy Reading",
      sourceType: "internal",
      url: "#",
      language: "zh-CN",
      tags: [...topic.keywordTags, "article"],
      searchableText: `${topic.title} reading`,
      durationSeconds: 720,
      diagram: null
    },
    {
      id: `res-video-${topic.id}`,
      type: "video",
      topicId: topic.id,
      title: `${topic.title}: Walkthrough Video`,
      description: "用案例讲解该主题在智能体系统里的应用方式。",
      sourceName: "Academy Video",
      sourceType: "internal",
      url: "#",
      language: "zh-CN",
      tags: [...topic.keywordTags, "video"],
      searchableText: `${topic.title} video`,
      durationSeconds: 900,
      diagram: null
    },
    {
      id: `res-audio-${topic.id}`,
      type: "audio",
      topicId: topic.id,
      title: `${topic.title}: Audio Notes`,
      description: "适合通勤场景的主题要点音频回顾。",
      sourceName: "Academy Audio",
      sourceType: "internal",
      url: "#",
      language: "zh-CN",
      tags: [...topic.keywordTags, "audio"],
      searchableText: `${topic.title} audio`,
      durationSeconds: 780,
      diagram: null
    },
    {
      id: `res-diagram-${topic.id}`,
      type: "diagram",
      topicId: topic.id,
      title: `${topic.title}: Diagram`,
      description: "结构化图示，帮助快速建立主题认知。",
      sourceName: "Academy Diagram",
      sourceType: "internal",
      url: "#",
      language: "zh-CN",
      tags: [...topic.keywordTags, "diagram"],
      searchableText: `${topic.title} diagram`,
      diagram: {
        format: "placeholder",
        content: `${topic.title} -> Input -> Reasoning -> Tool/Knowledge -> Output`
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

const topics = buildTopics();
const stages = buildStages();
const resources = buildResources(topics);
const practiceTasks = buildPracticeTasks(topics);
const reflectionTemplates = buildReflectionTemplates(topics);

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
      "res-article-topic-what-is-ai-agent",
      "res-video-topic-what-is-ai-agent"
    ]
  }
];

export const mockLearningSchema: LearningContentSchema = {
  stages: indexById(stages),
  topics: indexById(topics),
  resources: indexById(resources),
  practiceTasks: indexById(practiceTasks),
  reflectionTemplates: indexById(reflectionTemplates),
  learningRecords: indexById(learningRecords),
  practiceLabs: indexById(practiceLabItems),
  playgroundDemos: indexById(playgroundDemoItems),
  knowledgeUpdates,
  knowledgeMap,
  academyModules,
  homeConfig: {
    heroMessage: "用一条完整学习路径，把 AI Agent 从概念学到可落地执行。",
    todayTopicId: "topic-what-is-ai-agent",
    spotlightStageId: "stage-1-foundations"
  }
};
