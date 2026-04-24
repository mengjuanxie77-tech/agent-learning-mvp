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
  return `${durationSeconds} min`;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const isFavorited = useIsResourceFavorited(resource.id);
  const { toggleResourceFavorite } = useLearningActions();

  return (
    <article className="resource-card">
      <div className="resource-head">
        <p>{resource.domain}</p>
        <div className="resource-head-actions">
          <span>{formatDuration(resource.durationMinutes)}</span>
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
      <div className="resource-tags">
        <span className="resource-tag">{resource.sourceType}</span>
        <span className="resource-tag">{resource.language.toUpperCase()}</span>
        <span className="resource-tag">{resource.difficulty}</span>
        <span className="resource-tag">{resource.providerType}</span>
        {resource.isOfficial ? <span className="resource-tag">official</span> : null}
      </div>
      <a className="resource-link" href={resource.url}>
        打开资源
        <ExternalLink size={14} />
      </a>
    </article>
  );
}
