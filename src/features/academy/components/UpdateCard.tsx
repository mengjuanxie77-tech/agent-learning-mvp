import type { KnowledgeUpdateItem } from "../../../types/content";

interface UpdateCardProps {
  item: KnowledgeUpdateItem;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("zh-CN");
}

export function UpdateCard({ item }: UpdateCardProps) {
  return (
    <article className="academy-card">
      <div className="academy-card-head">
        <p className="academy-source">{item.sourceName}</p>
        <span>{formatDate(item.publishedAt)}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <a
        className="resource-link"
        href={item.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        查看来源
      </a>
    </article>
  );
}
