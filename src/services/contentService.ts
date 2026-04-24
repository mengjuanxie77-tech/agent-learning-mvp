import { mockLearningSchema } from "../data/mockData";
import { isResourceWhitelistedByDomain } from "../data/resources/whitelist";
import type {
  KnowledgeMapView,
  KnowledgeUpdatesView,
  PlaygroundDemoItem,
  PracticeLabItem,
  HomeOverviewView,
  LearningContentSchema,
  LearningResourceEntity,
  ResourceWhitelistConfig,
  LearningStageEntity,
  LearningStageView,
  LearningTopicEntity,
  TopicLearningPackEntity,
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
    description: topic.description,
    duration: topic.duration,
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

function getApprovedWhitelistedResources(
  resources: LearningResourceEntity[]
): LearningResourceEntity[] {
  return resources.filter(
    (resource) =>
      resource.reviewStatus === "approved" &&
      resource.isWhitelisted &&
      isResourceWhitelistedByDomain(resource)
  );
}

function resolveTopicLearningPack(
  topic: LearningTopicEntity,
  schema: LearningContentSchema
): TopicLearningPackEntity {
  const fallback: TopicLearningPackEntity = {
    topicId: topic.id,
    officialBaseline: topic.resourceIds.articles.slice(0, 1),
    deepAnalysis: [],
    cnGuides: [],
    practiceReferences: topic.resourceIds.diagrams.slice(0, 1),
    primaryReading: topic.resourceIds.articles.slice(0, 1),
    supportingReading: [],
    videoResource: topic.resourceIds.videos.slice(0, 1),
    audioResource: [],
    demoResource: topic.resourceIds.diagrams.slice(0, 1),
    practiceTaskId: topic.practiceTaskId,
    reflectionQuestions: []
  };

  return schema.topicLearningPacks[topic.id] ?? fallback;
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
    modules: schema.academyModules,
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

  const learningPack = resolveTopicLearningPack(topic, schema);

  const practiceTask = schema.practiceTasks[learningPack.practiceTaskId];
  const reflectionTemplate = schema.reflectionTemplates[topic.reflectionTemplateId];

  if (!practiceTask || !reflectionTemplate) {
    return null;
  }

  const primaryReading = getApprovedWhitelistedResources(
    pickResources(learningPack.primaryReading, schema)
  );
  const officialBaseline = getApprovedWhitelistedResources(
    pickResources(learningPack.officialBaseline ?? learningPack.primaryReading, schema)
  );
  const deepAnalysis = getApprovedWhitelistedResources(
    pickResources(learningPack.deepAnalysis ?? learningPack.supportingReading, schema)
  );
  const cnGuides = getApprovedWhitelistedResources(
    pickResources(learningPack.cnGuides ?? [], schema)
  );
  const practiceReferences = getApprovedWhitelistedResources(
    pickResources(learningPack.practiceReferences ?? learningPack.demoResource, schema)
  );
  const supportingReading = getApprovedWhitelistedResources(
    pickResources(learningPack.supportingReading, schema)
  );
  const videoResource = getApprovedWhitelistedResources(
    pickResources(learningPack.videoResource, schema)
  );
  const audioResource = getApprovedWhitelistedResources(
    pickResources(learningPack.audioResource, schema)
  );
  const demoResource = getApprovedWhitelistedResources(
    pickResources(learningPack.demoResource, schema)
  );

  const learningRecord =
    Object.values(schema.learningRecords).find((record) => record.topicId === topic.id) ?? null;

  return {
    id: topic.id,
    title: topic.title,
    subtitle: topic.subtitle,
    oneLineDefinition: topic.oneLineDefinition,
    shortExplanation: topic.shortExplanation,
    deepExplanation: topic.deepExplanation,
    officialBaseline,
    deepAnalysis,
    cnGuides,
    practiceReferences,
    primaryReading,
    supportingReading,
    videoResource,
    audioResource,
    demoResource,
    practiceTask,
    reflectionQuestions:
      learningPack.reflectionQuestions.length > 0
        ? learningPack.reflectionQuestions
        : reflectionTemplate.questions.map((item) => item.prompt),
    learningRecord
  };
}

export async function getPracticeLabs(): Promise<PracticeLabItem[]> {
  const schema = await getSchema();
  return Object.values(schema.practiceLabs);
}

export async function getPlaygroundDemos(): Promise<PlaygroundDemoItem[]> {
  const schema = await getSchema();
  return Object.values(schema.playgroundDemos);
}

export async function getKnowledgeUpdates(): Promise<KnowledgeUpdatesView> {
  const schema = await getSchema();
  return schema.knowledgeUpdates;
}

export async function getKnowledgeMap(): Promise<KnowledgeMapView> {
  const schema = await getSchema();
  return schema.knowledgeMap;
}

export async function getResourceWhitelistConfig(): Promise<ResourceWhitelistConfig> {
  const schema = await getSchema();
  return schema.resourceWhitelist;
}
