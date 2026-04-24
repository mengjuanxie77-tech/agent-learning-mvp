import { useEffect, useState } from "react";
import { getKnowledgeMap } from "../services/contentService";
import type { KnowledgeMapView } from "../types/content";
import { KnowledgeLayerCard } from "../features/academy";

export function KnowledgeMapPage() {
  const [mapData, setMapData] = useState<KnowledgeMapView | null>(null);

  useEffect(() => {
    getKnowledgeMap().then(setMapData);
  }, []);

  if (!mapData) {
    return <p className="loading">页面加载中...</p>;
  }

  const sortedLayers = [...mapData.layers].sort((a, b) => a.order - b.order);

  return (
    <div className="page-stack">
      <section className="hero-band hero-band-compact">
        <p className="hero-kicker">Agent Knowledge Map</p>
        <h1>AI Agent 技术图谱</h1>
        <p>从 LLM Layer 到 Safety Layer，查看完整技术栈结构。</p>
      </section>

      <section className="content-band">
        <div className="section-head">
          <h2>Knowledge Stack</h2>
          <span>{sortedLayers.length} 层技术能力</span>
        </div>
        <div className="academy-grid">
          {sortedLayers.map((item) => (
            <KnowledgeLayerCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
