import { useEffect, useState } from "react";
import {
  getKnowledgeUpdates,
  getResourceWhitelistConfig
} from "../services/contentService";
import type { KnowledgeUpdatesView, ResourceWhitelistConfig } from "../types/content";
import { UpdateCard } from "../features/academy";

export function KnowledgeUpdatesPage() {
  const [updates, setUpdates] = useState<KnowledgeUpdatesView | null>(null);
  const [whitelist, setWhitelist] = useState<ResourceWhitelistConfig | null>(null);

  useEffect(() => {
    getKnowledgeUpdates().then(setUpdates);
    getResourceWhitelistConfig().then(setWhitelist);
  }, []);

  if (!updates || !whitelist) {
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

      <section className="content-band">
        <div className="section-head">
          <h2>白名单内容源</h2>
          <span>可控接入策略</span>
        </div>
        <div className="whitelist-grid">
          <div className="whitelist-panel">
            <p className="academy-card-label">文章 / 文档白名单域名</p>
            <div className="resource-tags">
              {whitelist.articleDocDomains.map((domain) => (
                <span key={domain} className="resource-tag">
                  {domain}
                </span>
              ))}
            </div>
          </div>
          <div className="whitelist-panel">
            <p className="academy-card-label">视频平台白名单</p>
            <div className="resource-tags">
              {whitelist.videoDomains.map((domain) => (
                <span key={domain} className="resource-tag">
                  {domain}
                </span>
              ))}
            </div>
            <p className="academy-card-label">当前禁用平台</p>
            <div className="resource-tags">
              {whitelist.blockedVideoPlatforms.map((domain) => (
                <span key={domain} className="resource-tag">
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="whitelist-steps">
          <p className="academy-card-label">后续新增来源怎么做</p>
          <ol className="academy-list academy-list-ordered">
            <li>在 `src/data/resources/whitelist.ts` 增加白名单域名或平台。</li>
            <li>在 `src/data/resources/resources.ts` 新增资源并默认 `reviewStatus: pending`。</li>
            <li>审核通过后改为 `approved`，再写入 `topic-learning-packs.ts` 绑定到主题。</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
