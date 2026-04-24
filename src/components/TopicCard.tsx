import { Bookmark, BookmarkCheck, Clock3, Signal } from "lucide-react";
import { Link } from "react-router-dom";
import type { TopicPreview, TopicStatus } from "../types/content";
import {
  useIsTopicFavorited,
  useLearningActions,
  useTopicLearningSnapshot
} from "../hooks/useLearningState";

interface TopicCardProps {
  topic: TopicPreview;
  actionLabel?: string;
}

const difficultyLabel = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced"
} as const;

const statusLabel: Record<TopicStatus, string> = {
  not_started: "未开始",
  in_progress: "学习中",
  completed: "已完成"
};

export function TopicCard({ topic, actionLabel = "进入主题学习" }: TopicCardProps) {
  const isFavorited = useIsTopicFavorited(topic.id);
  const { toggleTopicFavorite } = useLearningActions();
  const learningSnapshot = useTopicLearningSnapshot(topic.id, topic.status);

  return (
    <article className="topic-card">
      <div className="topic-card-head">
        <p className="topic-status-chip">{statusLabel[learningSnapshot.status]}</p>
        <button
          className="icon-btn"
          type="button"
          onClick={() => toggleTopicFavorite(topic.id)}
          aria-label={isFavorited ? "取消收藏主题" : "收藏主题"}
        >
          {isFavorited ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </div>
      <div className="topic-meta">
        <span className="meta-chip">
          <Clock3 size={14} />
          {topic.duration}
        </span>
        <span className="meta-chip">
          <Signal size={14} />
          {difficultyLabel[topic.difficulty]}
        </span>
      </div>
      <h3 className="topic-title">{topic.title}</h3>
      <p className="topic-summary">{topic.description}</p>
      <div className="topic-progress-wrap">
        <div className="topic-progress-head">
          <span>学习进度</span>
          <strong>{learningSnapshot.progressPercent}%</strong>
        </div>
        <div className="topic-progress-track">
          <div
            className="topic-progress-fill"
            style={{ width: `${learningSnapshot.progressPercent}%` }}
          />
        </div>
      </div>
      <Link to={`/topic/${topic.id}`} className="topic-link">
        {actionLabel}
      </Link>
    </article>
  );
}
