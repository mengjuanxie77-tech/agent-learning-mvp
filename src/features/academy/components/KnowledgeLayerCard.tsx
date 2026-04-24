import type { KnowledgeMapLayer } from "../../../types/content";

interface KnowledgeLayerCardProps {
  item: KnowledgeMapLayer;
}

export function KnowledgeLayerCard({ item }: KnowledgeLayerCardProps) {
  return (
    <article className="academy-card">
      <div className="academy-card-head">
        <p className="academy-source">Layer {item.order}</p>
      </div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <div>
        <p className="academy-card-label">Key concepts</p>
        <ul className="academy-list">
          {item.keyConcepts.map((concept) => (
            <li key={concept}>{concept}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
