import { Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import type { LearningResourceEntity } from "../types/content";
import {
  useIsResourceFavorited,
  useLearningActions
} from "../hooks/useLearningState";

interface ResourceCardProps {
  resource: LearningResourceEntity;
}

function formatDuration(durationSeconds?: number): string {
  if (!durationSeconds) {
    return "TBD";
  }
  const minutes = Math.max(1, Math.round(durationSeconds / 60));
  return `${minutes} min`;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const isFavorited = useIsResourceFavorited(resource.id);
  const { toggleResourceFavorite } = useLearningActions();

  return (
    <article className="resource-card">
      <div className="resource-head">
        <p>{resource.sourceName}</p>
        <div className="resource-head-actions">
          <span>{formatDuration(resource.durationSeconds)}</span>
          <button
            className="icon-btn"
            type="button"
            onClick={() => toggleResourceFavorite(resource.id)}
            aria-label={isFavorited ? "取消收藏资源" : "收藏资源"}
          >
            {isFavorited ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        </div>
      </div>
      <h3>{resource.title}</h3>
      <p>{resource.description}</p>
      <a className="resource-link" href={resource.url}>
        打开资源
        <ExternalLink size={14} />
      </a>
    </article>
  );
}
