export type ISODateString = string;

export type StageStatus = "completed" | "in_progress" | "planned";
export type TopicStatus = "not_started" | "in_progress" | "completed";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
export type ResourceSourceType =
  | "article"
  | "doc"
  | "repo"
  | "video"
  | "audio"
  | "guide"
  | "tutorial";
export type ResourceProviderType =
  | "official"
  | "github"
  | "blog"
  | "bilibili"
  | "course";
export type ResourceContentFormat = "text" | "video" | "audio" | "mixed";
export type ResourceReviewStatus = "pending" | "approved" | "rejected";
export type ResourceFullTextPolicy =
  | "hosted_full_text"
  | "external_full_text_only"
  | "excerpt_with_guided_notes";
export type ResourceSourceRole =
  | "official_baseline"
  | "deep_analysis"
  | "cn_interpretation"
  | "practice_reference"
  | "candidate";
export type TaskStatus = "not_started" | "in_progress" | "completed";

export interface LearningStageEntity {
  id: string;
  slug: string;
  order: number;
  title: string;
  summary: string;
  learningGoals: string[];
  status: StageStatus;
  topicIds: string[];
  estimatedHours: number;
  progressPercent: number;
  tags: string[];
}

export interface LearningTopicEntity {
  id: string;
  slug: string;
  stageId: string;
  title: string;
  subtitle: string;
  description: string;
  oneLineDefinition: string;
  shortExplanation: string;
  deepExplanation: string[];
  duration: string;
  estimatedMinutes: number;
  difficulty: DifficultyLevel;
  status: TopicStatus;
  keywordTags: string[];
  searchableText: string;
  resourceIds: {
    articles: string[];
    videos: string[];
    audios: string[];
    diagrams: string[];
  };
  practiceTaskId: string;
  reflectionTemplateId: string;
}

export interface LearningResourceEntity {
  id: string;
  title: string;
  description: string;
  url: string;
  domain: string;
  sourceType: ResourceSourceType;
  providerType: ResourceProviderType;
  language: "zh" | "en";
  contentFormat: ResourceContentFormat;
  topicTags: string[];
  difficulty: DifficultyLevel;
  durationMinutes?: number;
  isOfficial: boolean;
  isWhitelisted: boolean;
  qualityScore: number;
  reviewStatus: ResourceReviewStatus;
  publishDate?: ISODateString;
  authorName?: string;
  creatorName?: string;
  creatorId?: string;
  summary: string;
  thumbnail?: string;
  sourceRole?: ResourceSourceRole;
  authorProfile?: string;
  whySelected?: string;
  readingGuide?: string[];
  keyConcepts?: string[];
  takeaways?: string[];
  expectedOutcome?: string;
  fullTextPolicy?: ResourceFullTextPolicy;
  licenseType?: string;
  licenseNote?: string;
  fullText?: string;
  excerpt?: string;
  translation?: string;
  lastCheckedAt: ISODateString;
  metadata: Record<string, string | number | boolean | null>;
}

export interface ResourceWhitelistConfig {
  articleDocDomains: string[];
  restrictedDomains: string[];
  videoDomains: string[];
  blockedVideoPlatforms: string[];
  approvedAuthors: string[];
  approvedOrganizations: string[];
  manuallyApprovedUrls: string[];
}

export interface TopicLearningPackEntity {
  topicId: string;
  officialBaseline?: string[];
  deepAnalysis?: string[];
  cnGuides?: string[];
  practiceReferences?: string[];
  primaryReading: string[];
  supportingReading: string[];
  videoResource: string[];
  audioResource: string[];
  demoResource: string[];
  practiceTaskId: string;
  reflectionQuestions: string[];
}

export interface PracticeTaskEntity {
  id: string;
  topicId: string;
  title: string;
  goal: string;
  context: string;
  codexPrompt: string;
  expectedOutput: string;
  observationFocus?: string[];
  reflectionFocus?: string[];
  estimatedMinutes: number;
  steps: string[];
  checklist: string[];
  evaluationRubric: string[];
  status: TaskStatus;
}

export interface ReflectionQuestion {
  id: string;
  prompt: string;
}

export interface ReflectionTemplateEntity {
  id: string;
  topicId: string;
  title: string;
  questions: ReflectionQuestion[];
}

export interface ReflectionAnswerRecord {
  questionId: string;
  answer: string;
}

export interface LearningRecordEntity {
  id: string;
  topicId: string;
  stageId: string;
  status: TopicStatus;
  startedAt?: ISODateString;
  completedAt?: ISODateString;
  timeSpentMinutes: number;
  lastReviewedAt?: ISODateString;
  note: string;
  highlights: string[];
  answers: ReflectionAnswerRecord[];
  selfRating: number;
  nextAction: string;
  savedResourceIds: string[];
}

export interface HomeConfig {
  heroMessage: string;
  todayTopicId: string;
  spotlightStageId: string;
}

export interface PracticeLabItem {
  id: string;
  title: string;
  description: string;
  skillsLearned: string[];
}

export interface PlaygroundDemoItem {
  id: string;
  title: string;
  description: string;
  workflowSteps: string[];
}

export interface KnowledgeUpdateItem {
  id: string;
  title: string;
  description: string;
  sourceName: string;
  url: string;
  publishedAt: ISODateString;
}

export interface KnowledgeUpdatesView {
  latestResearch: KnowledgeUpdateItem[];
  frameworkUpdates: KnowledgeUpdateItem[];
  industryApplications: KnowledgeUpdateItem[];
}

export interface KnowledgeMapLayer {
  id: string;
  name: string;
  description: string;
  keyConcepts: string[];
  order: number;
}

export interface KnowledgeMapView {
  layers: KnowledgeMapLayer[];
}

export interface AcademyModuleLink {
  id: string;
  title: string;
  description: string;
  path: string;
}

export interface LearningContentSchema {
  stages: Record<string, LearningStageEntity>;
  topics: Record<string, LearningTopicEntity>;
  resources: Record<string, LearningResourceEntity>;
  topicLearningPacks: Record<string, TopicLearningPackEntity>;
  practiceTasks: Record<string, PracticeTaskEntity>;
  reflectionTemplates: Record<string, ReflectionTemplateEntity>;
  learningRecords: Record<string, LearningRecordEntity>;
  practiceLabs: Record<string, PracticeLabItem>;
  playgroundDemos: Record<string, PlaygroundDemoItem>;
  knowledgeUpdates: KnowledgeUpdatesView;
  knowledgeMap: KnowledgeMapView;
  academyModules: AcademyModuleLink[];
  resourceWhitelist: ResourceWhitelistConfig;
  homeConfig: HomeConfig;
}

export interface TopicPreview {
  id: string;
  stageId: string;
  title: string;
  description: string;
  duration: string;
  difficulty: DifficultyLevel;
  status: TopicStatus;
  tags: string[];
}

export interface LearningStageView {
  id: string;
  title: string;
  description: string;
  status: StageStatus;
  topics: TopicPreview[];
  progressPercent: number;
}

export interface HomeOverviewView {
  todayTopicId: string;
  heroMessage: string;
  spotlightStageId: string;
  modules: AcademyModuleLink[];
  stages: LearningStageView[];
}

export interface TopicDetailView {
  id: string;
  title: string;
  subtitle: string;
  oneLineDefinition: string;
  shortExplanation: string;
  deepExplanation: string[];
  officialBaseline: LearningResourceEntity[];
  deepAnalysis: LearningResourceEntity[];
  cnGuides: LearningResourceEntity[];
  practiceReferences: LearningResourceEntity[];
  primaryReading: LearningResourceEntity[];
  supportingReading: LearningResourceEntity[];
  videoResource: LearningResourceEntity[];
  audioResource: LearningResourceEntity[];
  demoResource: LearningResourceEntity[];
  practiceTask: PracticeTaskEntity;
  reflectionQuestions: string[];
  learningRecord: LearningRecordEntity | null;
}
