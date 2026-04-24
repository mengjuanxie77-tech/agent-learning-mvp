import { useEffect, useState } from "react";
import { getKnowledgeUpdates } from "../services/contentService";
import type { KnowledgeUpdatesView } from "../types/content";
import { UpdateCard } from "../features/academy";

export function KnowledgeUpdatesPage() {
  const [updates, setUpdates] = useState<KnowledgeUpdatesView | null>(null);

  useEffect(() => {
    getKnowledgeUpdates().then(setUpdates);
  }, []);

  if (!updates) {
    return <p className="loading">页面加载中...</p>;
  }

  return (
    <div className="page-stack">
      <section className="hero-band hero-band-compact">
        <p className="hero-kicker">Knowledge Updates</p>
        <h1>AI Agent Knowledge Updates</h1>
        <p>持续追踪智能体技术研究、框架动态和行业落地。</p>
      </section>

      <section className="content-band">
        <div className="section-head">
          <h2>Latest Research</h2>
          <span>arXiv / Anthropic</span>
        </div>
        <div className="academy-grid">
          {updates.latestResearch.map((item) => (
            <UpdateCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="content-band">
        <div className="section-head">
          <h2>Framework Updates</h2>
          <span>LangChain / LangGraph</span>
        </div>
        <div className="academy-grid">
          {updates.frameworkUpdates.map((item) => (
            <UpdateCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="content-band">
        <div className="section-head">
          <h2>Industry Applications</h2>
          <span>OpenAI / Industry</span>
        </div>
        <div className="academy-grid">
          {updates.industryApplications.map((item) => (
            <UpdateCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
