import type { LearningStageView, TopicStatus } from "../types/content";
import type {
  LearningStateStore,
  TopicLearningProgressState
} from "./learningStateStore";

export interface TopicLearningSnapshot extends TopicLearningProgressState {}
export interface StageLearningMetrics {
  stageStatus: "completed" | "in_progress" | "planned";
  progressPercent: number;
  completedTopicCount: number;
  inProgressTopicCount: number;
  notStartedTopicCount: number;
  totalTopicCount: number;
}

type TopicProgressStateSource = Pick<LearningStateStore, "topicProgressById">;

export function selectIsTopicFavorited(
  state: LearningStateStore,
  topicId: string
): boolean {
  return state.favoriteTopicIds.includes(topicId);
}

export function selectIsResourceFavorited(
  state: LearningStateStore,
  resourceId: string
): boolean {
  return state.favoriteResourceIds.includes(resourceId);
}

export function selectIsTaskFavorited(
  state: LearningStateStore,
  taskId: string
): boolean {
  return state.favoriteTaskIds.includes(taskId);
}

export function selectTopicLearningSnapshot(
  state: TopicProgressStateSource,
  topicId: string,
  fallbackStatus: TopicStatus
): TopicLearningSnapshot {
  const existing = state.topicProgressById[topicId];
  if (existing) {
    return existing;
  }
  return {
    topicId,
    status: fallbackStatus,
    progressPercent: fallbackStatus === "completed" ? 100 : 0
  };
}

export function selectContinueLearningTopicIds(
  state: LearningStateStore
): string[] {
  const inProgressTopicIds = Object.values(state.topicProgressById)
    .filter((item) => item.status === "in_progress")
    .sort((a, b) => {
      const timeA = a.lastVisitedAt ? new Date(a.lastVisitedAt).getTime() : 0;
      const timeB = b.lastVisitedAt ? new Date(b.lastVisitedAt).getTime() : 0;
      return timeB - timeA;
    })
    .map((item) => item.topicId);

  return [...state.recentlyVisitedTopicIds, ...inProgressTopicIds].filter(
    (id, index, arr) => arr.indexOf(id) === index
  );
}

export function selectHasLearningHistory(state: LearningStateStore): boolean {
  return (
    Object.keys(state.topicProgressById).length > 0 ||
    state.recentlyVisitedTopicIds.length > 0
  );
}

export function selectStageLearningMetrics(
  stage: LearningStageView,
  state: TopicProgressStateSource
): StageLearningMetrics {
  const topicSnapshots = stage.topics.map((topic) =>
    selectTopicLearningSnapshot(state, topic.id, topic.status)
  );

  const totalTopicCount = topicSnapshots.length;
  if (totalTopicCount === 0) {
    return {
      stageStatus: "planned",
      progressPercent: 0,
      completedTopicCount: 0,
      inProgressTopicCount: 0,
      notStartedTopicCount: 0,
      totalTopicCount: 0
    };
  }

  const completedTopicCount = topicSnapshots.filter(
    (topic) => topic.status === "completed"
  ).length;
  const inProgressTopicCount = topicSnapshots.filter(
    (topic) => topic.status === "in_progress"
  ).length;
  const notStartedTopicCount = totalTopicCount - completedTopicCount - inProgressTopicCount;

  const progressPercent = Math.round(
    topicSnapshots.reduce((sum, topic) => sum + topic.progressPercent, 0) /
      totalTopicCount
  );

  const stageStatus =
    completedTopicCount === totalTopicCount
      ? "completed"
      : completedTopicCount > 0 || inProgressTopicCount > 0
        ? "in_progress"
        : "planned";

  return {
    stageStatus,
    progressPercent,
    completedTopicCount,
    inProgressTopicCount,
    notStartedTopicCount,
    totalTopicCount
  };
}
