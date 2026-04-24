export type ISODateString = string;

export type StageStatus = "completed" | "in_progress" | "planned";
export type TopicStatus = "not_started" | "in_progress" | "completed";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
export type ResourceType = "article" | "video" | "audio" | "diagram";
export type ResourceSourceType = "official" | "community" | "internal";
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
  summary: string;
  oneLineDefinition: string;
  shortExplanation: string;
  deepExplanation: string[];
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
  type: ResourceType;
  topicId: string;
  title: string;
  description: string;
  sourceName: string;
  sourceType: ResourceSourceType;
  url: string;
  language: string;
  tags: string[];
  searchableText: string;
  publishedAt?: ISODateString;
  author?: string;
  durationSeconds?: number;
  thumbnailUrl?: string;
  diagram: null | {
    format: "image" | "mermaid" | "placeholder";
    content: string;
  };
}

export interface PracticeTaskEntity {
  id: string;
  topicId: string;
  title: string;
  goal: string;
  context: string;
  codexPrompt: string;
  expectedOutput: string;
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

export interface LearningContentSchema {
  stages: Record<string, LearningStageEntity>;
  topics: Record<string, LearningTopicEntity>;
  resources: Record<string, LearningResourceEntity>;
  practiceTasks: Record<string, PracticeTaskEntity>;
  reflectionTemplates: Record<string, ReflectionTemplateEntity>;
  learningRecords: Record<string, LearningRecordEntity>;
  homeConfig: HomeConfig;
}

export interface TopicPreview {
  id: string;
  stageId: string;
  title: string;
  summary: string;
  durationMinutes: number;
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
  stages: LearningStageView[];
}

export interface TopicDetailView {
  id: string;
  title: string;
  subtitle: string;
  oneLineDefinition: string;
  shortExplanation: string;
  deepExplanation: string[];
  diagrams: LearningResourceEntity[];
  videos: LearningResourceEntity[];
  audios: LearningResourceEntity[];
  readings: LearningResourceEntity[];
  practiceTask: PracticeTaskEntity;
  reflectionTemplate: ReflectionTemplateEntity;
  learningRecord: LearningRecordEntity | null;
}
