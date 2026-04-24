import { mockLearningSchema } from "../data/mockData";
import type {
  HomeOverviewView,
  LearningContentSchema,
  LearningResourceEntity,
  LearningStageEntity,
  LearningStageView,
  LearningTopicEntity,
  TopicDetailView,
  TopicPreview
} from "../types/content";

interface LearningContentRepository {
  getSchema(): Promise<LearningContentSchema>;
}

class MockLearningContentRepository implements LearningContentRepository {
  async getSchema(): Promise<LearningContentSchema> {
    return Promise.resolve(mockLearningSchema);
  }
}

/**
 * TODO(real-data): swap this repository to API implementation.
 * Example endpoints:
 * - GET /api/learning/schema
 * - GET /api/learning/home
 * - GET /api/learning/topics/:topicId
 * - GET /api/learning/records?topicId=...
 */
const repository: LearningContentRepository = new MockLearningContentRepository();

function toTopicPreview(topic: LearningTopicEntity): TopicPreview {
  return {
    id: topic.id,
    stageId: topic.stageId,
    title: topic.title,
    summary: topic.summary,
    durationMinutes: topic.estimatedMinutes,
    difficulty: topic.difficulty,
    status: topic.status,
    tags: topic.keywordTags
  };
}

function toStageView(
  stage: LearningStageEntity,
  schema: LearningContentSchema
): LearningStageView {
  const topics = stage.topicIds
    .map((topicId) => schema.topics[topicId])
    .filter((topic): topic is LearningTopicEntity => Boolean(topic))
    .map((topic) => toTopicPreview(topic));

  return {
    id: stage.id,
    title: stage.title,
    description: stage.summary,
    status: stage.status,
    topics,
    progressPercent: stage.progressPercent
  };
}

function pickResources(
  resourceIds: string[],
  schema: LearningContentSchema
): LearningResourceEntity[] {
  return resourceIds
    .map((resourceId) => schema.resources[resourceId])
    .filter((resource): resource is LearningResourceEntity => Boolean(resource));
}

async function getSchema() {
  return repository.getSchema();
}

export async function getHomeOverview(): Promise<HomeOverviewView> {
  const schema = await getSchema();
  const orderedStages = Object.values(schema.stages).sort((a, b) => a.order - b.order);
  const stageViews = orderedStages.map((stage) => toStageView(stage, schema));

  return {
    todayTopicId: schema.homeConfig.todayTopicId,
    heroMessage: schema.homeConfig.heroMessage,
    spotlightStageId: schema.homeConfig.spotlightStageId,
    stages: stageViews
  };
}

export async function getLearningStages(): Promise<LearningStageView[]> {
  const schema = await getSchema();
  return Object.values(schema.stages)
    .sort((a, b) => a.order - b.order)
    .map((stage) => toStageView(stage, schema));
}

export async function getTopicDetail(topicId: string): Promise<TopicDetailView | null> {
  const schema = await getSchema();
  const topic = schema.topics[topicId];

  if (!topic) {
    return null;
  }

  const practiceTask = schema.practiceTasks[topic.practiceTaskId];
  const reflectionTemplate = schema.reflectionTemplates[topic.reflectionTemplateId];

  if (!practiceTask || !reflectionTemplate) {
    return null;
  }

  const videos = pickResources(topic.resourceIds.videos, schema);
  const audios = pickResources(topic.resourceIds.audios, schema);
  const readings = pickResources(topic.resourceIds.articles, schema);
  const diagrams = pickResources(topic.resourceIds.diagrams, schema);

  const learningRecord =
    Object.values(schema.learningRecords).find((record) => record.topicId === topic.id) ?? null;

  return {
    id: topic.id,
    title: topic.title,
    subtitle: topic.subtitle,
    oneLineDefinition: topic.oneLineDefinition,
    shortExplanation: topic.shortExplanation,
    deepExplanation: topic.deepExplanation,
    diagrams,
    videos,
    audios,
    readings,
    practiceTask,
    reflectionTemplate,
    learningRecord
  };
}
