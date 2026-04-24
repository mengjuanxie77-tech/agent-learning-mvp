import { useEffect, useState } from "react";
import { getPlaygroundDemos } from "../services/contentService";
import type { PlaygroundDemoItem } from "../types/content";
import { DemoCard } from "../playground";

export function DemoPlaygroundPage() {
  const [demos, setDemos] = useState<PlaygroundDemoItem[]>([]);

  useEffect(() => {
    getPlaygroundDemos().then(setDemos);
  }, []);

  if (demos.length === 0) {
    return <p className="loading">页面加载中...</p>;
  }

  return (
    <div className="page-stack">
      <section className="hero-band hero-band-compact">
        <p className="hero-kicker">Demo Playground</p>
        <h1>Agent Demo Playground</h1>
        <p>在可视化流程中快速体验不同 Agent 的工作方式。</p>
      </section>

      <section className="content-band">
        <div className="section-head">
          <h2>Interactive Demos</h2>
          <span>4 个流程模拟</span>
        </div>
        <div className="academy-grid">
          {demos.map((item) => (
            <DemoCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
