import type { TopicStatus } from "../types/content";
import type {
  LearningStateStore,
  TopicLearningProgressState
} from "./learningStateStore";

export interface TopicLearningSnapshot extends TopicLearningProgressState {}

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
  state: LearningStateStore,
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
