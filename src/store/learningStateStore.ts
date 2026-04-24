import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { TopicStatus } from "../types/content";

const STORAGE_KEY = "agent-learning-local-state-v2";
const MAX_RECENT_TOPICS = 8;

function nowIso() {
  return new Date().toISOString();
}

function normalizeProgress(progressPercent: number): number {
  const safe = Number.isFinite(progressPercent) ? progressPercent : 0;
  return Math.max(0, Math.min(100, Math.round(safe)));
}

const safeWebStorage = {
  getItem: (name: string): string | null => {
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      window.localStorage.setItem(name, value);
    } catch {
      // no-op fallback for restricted environments
    }
  },
  removeItem: (name: string): void => {
    try {
      window.localStorage.removeItem(name);
    } catch {
      // no-op fallback for restricted environments
    }
  }
};

export interface TopicLearningProgressState {
  topicId: string;
  status: TopicStatus;
  progressPercent: number;
  lastVisitedAt?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface LearningStateStore {
  favoriteTopicIds: string[];
  favoriteResourceIds: string[];
  favoriteTaskIds: string[];
  topicProgressById: Record<string, TopicLearningProgressState>;
  recentlyVisitedTopicIds: string[];
  toggleTopicFavorite: (topicId: string) => void;
  toggleResourceFavorite: (resourceId: string) => void;
  toggleTaskFavorite: (taskId: string) => void;
  enterTopic: (topicId: string) => void;
  touchTopic: (topicId: string, fallbackStatus?: TopicStatus) => void;
  setTopicStatus: (topicId: string, status: TopicStatus) => void;
  setTopicProgress: (topicId: string, progressPercent: number) => void;
}

function toggleInList(list: string[], value: string): string[] {
  if (list.includes(value)) {
    return list.filter((item) => item !== value);
  }
  return [...list, value];
}

function upsertTopicProgress(
  current: Record<string, TopicLearningProgressState>,
  topicId: string,
  fallbackStatus: TopicStatus
): TopicLearningProgressState {
  return (
    current[topicId] ?? {
      topicId,
      status: fallbackStatus,
      progressPercent: fallbackStatus === "completed" ? 100 : 0
    }
  );
}

function withRecentTopic(
  recentTopicIds: string[],
  topicId: string
): string[] {
  const unique = [topicId, ...recentTopicIds.filter((id) => id !== topicId)];
  return unique.slice(0, MAX_RECENT_TOPICS);
}

export const useLearningStateStore = create<LearningStateStore>()(
  persist(
    (set, get) => ({
      favoriteTopicIds: [],
      favoriteResourceIds: [],
      favoriteTaskIds: [],
      topicProgressById: {},
      recentlyVisitedTopicIds: [],
      toggleTopicFavorite: (topicId) =>
        set((state) => ({
          favoriteTopicIds: toggleInList(state.favoriteTopicIds, topicId)
        })),
      toggleResourceFavorite: (resourceId) =>
        set((state) => ({
          favoriteResourceIds: toggleInList(state.favoriteResourceIds, resourceId)
        })),
      toggleTaskFavorite: (taskId) =>
        set((state) => ({
          favoriteTaskIds: toggleInList(state.favoriteTaskIds, taskId)
        })),
      enterTopic: (topicId) => {
        const snapshot = get();
        const existing = snapshot.topicProgressById[topicId];
        const now = nowIso();
        const shouldBootstrapLearning =
          !existing ||
          (existing.status === "not_started" && !existing.startedAt);
        const next: TopicLearningProgressState = shouldBootstrapLearning
          ? {
              topicId,
              status: "in_progress",
              progressPercent: Math.max(10, existing?.progressPercent ?? 0),
              startedAt: existing?.startedAt ?? now,
              completedAt: undefined,
              lastVisitedAt: now
            }
          : {
              ...existing,
              lastVisitedAt: now
            };

        set((state) => ({
          topicProgressById: {
            ...state.topicProgressById,
            [topicId]: next
          },
          recentlyVisitedTopicIds: withRecentTopic(
            state.recentlyVisitedTopicIds,
            topicId
          )
        }));
      },
      touchTopic: (topicId, fallbackStatus = "not_started") => {
        const snapshot = get();
        const existing = upsertTopicProgress(
          snapshot.topicProgressById,
          topicId,
          fallbackStatus
        );
        const visitedAt = nowIso();
        set((state) => ({
          topicProgressById: {
            ...state.topicProgressById,
            [topicId]: {
              ...existing,
              lastVisitedAt: visitedAt
            }
          },
          recentlyVisitedTopicIds: withRecentTopic(
            state.recentlyVisitedTopicIds,
            topicId
          )
        }));
      },
      setTopicStatus: (topicId, status) => {
        const snapshot = get();
        const existing = upsertTopicProgress(
          snapshot.topicProgressById,
          topicId,
          "not_started"
        );
        const now = nowIso();
        const next: TopicLearningProgressState = {
          ...existing,
          status,
          lastVisitedAt: now
        };

        if (status === "not_started") {
          next.progressPercent = 0;
          next.startedAt = undefined;
          next.completedAt = undefined;
        }

        if (status === "in_progress") {
          next.startedAt = existing.startedAt ?? now;
          next.completedAt = undefined;
          if (next.progressPercent === 0) {
            next.progressPercent = 10;
          }
        }

        if (status === "completed") {
          next.startedAt = existing.startedAt ?? now;
          next.completedAt = now;
          next.progressPercent = 100;
        }

        set((state) => ({
          topicProgressById: {
            ...state.topicProgressById,
            [topicId]: next
          },
          recentlyVisitedTopicIds: withRecentTopic(
            state.recentlyVisitedTopicIds,
            topicId
          )
        }));
      },
      setTopicProgress: (topicId, progressPercent) => {
        const snapshot = get();
        const existing = upsertTopicProgress(
          snapshot.topicProgressById,
          topicId,
          "not_started"
        );
        const now = nowIso();
        const normalized = normalizeProgress(progressPercent);

        let status: TopicStatus = existing.status;
        let startedAt = existing.startedAt;
        let completedAt = existing.completedAt;

        if (normalized <= 0) {
          status = "not_started";
          startedAt = undefined;
          completedAt = undefined;
        } else if (normalized >= 100) {
          status = "completed";
          startedAt = startedAt ?? now;
          completedAt = now;
        } else {
          status = "in_progress";
          startedAt = startedAt ?? now;
          completedAt = undefined;
        }

        set((state) => ({
          topicProgressById: {
            ...state.topicProgressById,
            [topicId]: {
              ...existing,
              status,
              progressPercent: normalized,
              startedAt,
              completedAt,
              lastVisitedAt: now
            }
          },
          recentlyVisitedTopicIds: withRecentTopic(
            state.recentlyVisitedTopicIds,
            topicId
          )
        }));
      }
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => safeWebStorage),
      partialize: (state) => ({
        favoriteTopicIds: state.favoriteTopicIds,
        favoriteResourceIds: state.favoriteResourceIds,
        favoriteTaskIds: state.favoriteTaskIds,
        topicProgressById: state.topicProgressById,
        recentlyVisitedTopicIds: state.recentlyVisitedTopicIds
      })
    }
  )
);
