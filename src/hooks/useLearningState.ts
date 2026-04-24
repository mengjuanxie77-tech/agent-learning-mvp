import type { TopicStatus } from "../types/content";
import {
  selectContinueLearningTopicIds,
  selectIsResourceFavorited,
  selectIsTaskFavorited,
  selectIsTopicFavorited,
  selectTopicLearningSnapshot
} from "../store/learningStateSelectors";
import { useLearningStateStore } from "../store/learningStateStore";

export function useLearningActions() {
  return useLearningStateStore((state) => ({
    toggleTopicFavorite: state.toggleTopicFavorite,
    toggleResourceFavorite: state.toggleResourceFavorite,
    toggleTaskFavorite: state.toggleTaskFavorite,
    touchTopic: state.touchTopic,
    setTopicStatus: state.setTopicStatus,
    setTopicProgress: state.setTopicProgress
  }));
}

export function useIsTopicFavorited(topicId: string): boolean {
  return useLearningStateStore((state) => selectIsTopicFavorited(state, topicId));
}

export function useIsResourceFavorited(resourceId: string): boolean {
  return useLearningStateStore((state) =>
    selectIsResourceFavorited(state, resourceId)
  );
}

export function useIsTaskFavorited(taskId: string): boolean {
  return useLearningStateStore((state) => selectIsTaskFavorited(state, taskId));
}

export function useTopicLearningSnapshot(
  topicId: string,
  fallbackStatus: TopicStatus
) {
  return useLearningStateStore((state) =>
    selectTopicLearningSnapshot(state, topicId, fallbackStatus)
  );
}

export function useContinueLearningTopicIds(): string[] {
  return useLearningStateStore((state) => selectContinueLearningTopicIds(state));
}

export function useFavoriteSummary() {
  return useLearningStateStore((state) => ({
    favoriteTopicCount: state.favoriteTopicIds.length,
    favoriteResourceCount: state.favoriteResourceIds.length,
    favoriteTaskCount: state.favoriteTaskIds.length
  }));
}
