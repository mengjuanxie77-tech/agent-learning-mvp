import { Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import type {
  LearningResourceEntity,
  ResourceFullTextPolicy,
  ResourceSourceRole
} from "../types/content";
import {
  useIsResourceFavorited,
  useLearningActions
} from "../hooks/useLearningState";

interface ResourceCardProps {
  resource: LearningResourceEntity;
}

function formatDuration(durationMinutes?: number): string {
  if (!durationMinutes) {
    return "TBD";
  }
  return `${durationMinutes} min`;
}

function sourceRoleLabel(role?: ResourceSourceRole): string | null {
  if (!role) {
    return null;
  }

  const labels: Record<ResourceSourceRole, string> = {
    official_baseline: "官方底座",
    deep_analysis: "深度分析",
    cn_interpretation: "中文带读",
    practice_reference: "实操参考",
    candidate: "候选资源"
  };

  return labels[role];
}

function fullTextPolicyLabel(policy?: ResourceFullTextPolicy): string | null {
  if (!policy) {
    return null;
  }

  const labels: Record<ResourceFullTextPolicy, string> = {
    hosted_full_text: "站内全文",
    external_full_text_only: "外部原文",
    excerpt_with_guided_notes: "原文+精读"
  };

  return labels[policy];
}

function paragraphLines(value?: string): string[] {
  return value?.split("\n").filter(Boolean) ?? [];
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const isFavorited = useIsResourceFavorited(resource.id);
  const { toggleResourceFavorite } = useLearningActions();
  const roleLabel = sourceRoleLabel(resource.sourceRole);
  const policyLabel = fullTextPolicyLabel(resource.fullTextPolicy);
  const isInternalLink = resource.url.startsWith("#");

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
        {roleLabel ? <span className="resource-tag">{roleLabel}</span> : null}
        <span className="resource-tag">{resource.sourceType}</span>
        <span className="resource-tag">{resource.language.toUpperCase()}</span>
        <span className="resource-tag">{resource.difficulty}</span>
        <span className="resource-tag">{resource.providerType}</span>
        {policyLabel ? <span className="resource-tag">{policyLabel}</span> : null}
        {resource.isOfficial ? <span className="resource-tag">official</span> : null}
      </div>

      {resource.whySelected ? (
        <div className="curation-block">
          <p className="curation-label">为什么选这篇</p>
          <p>{resource.whySelected}</p>
        </div>
      ) : null}

      {resource.readingGuide?.length ? (
        <div className="curation-block">
          <p className="curation-label">怎么读</p>
          <ol className="compact-list">
            {resource.readingGuide.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      ) : null}

      {resource.keyConcepts?.length ? (
        <div className="resource-tags">
          {resource.keyConcepts.map((concept) => (
            <span key={concept} className="resource-tag resource-tag-soft">
              {concept}
            </span>
          ))}
        </div>
      ) : null}

      {resource.expectedOutcome ? (
        <div className="curation-block">
          <p className="curation-label">看完应该产出</p>
          <p>{resource.expectedOutcome}</p>
        </div>
      ) : null}

      {resource.translation || resource.excerpt || resource.fullText ? (
        <details className="resource-detail-panel">
          <summary>中文精读 / 原文策略</summary>
          {resource.licenseNote ? <p>{resource.licenseNote}</p> : null}
          {resource.excerpt ? <p>{resource.excerpt}</p> : null}
          {resource.translation ? <p>{resource.translation}</p> : null}
          {paragraphLines(resource.fullText).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </details>
      ) : null}

      <a
        className="resource-link"
        href={resource.url}
        target={isInternalLink ? undefined : "_blank"}
        rel={isInternalLink ? undefined : "noreferrer noopener"}
      >
        {isInternalLink ? "阅读站内导读" : "打开英文原文"}
        <ExternalLink size={14} />
      </a>
    </article>
  );
}
