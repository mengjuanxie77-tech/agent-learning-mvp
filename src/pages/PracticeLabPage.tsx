import { useEffect, useState } from "react";
import { getPracticeLabs } from "../services/contentService";
import type { PracticeLabItem } from "../types/content";
import { LabCard } from "../labs";

export function PracticeLabPage() {
  const [labs, setLabs] = useState<PracticeLabItem[]>([]);

  useEffect(() => {
    getPracticeLabs().then(setLabs);
  }, []);

  if (labs.length === 0) {
    return <p className="loading">页面加载中...</p>;
  }

  return (
    <div className="page-stack">
      <section className="hero-band hero-band-compact">
        <p className="hero-kicker">Practice Lab</p>
        <h1>实操实验室</h1>
        <p>用可执行实验把智能体知识转成稳定能力。</p>
      </section>

      <section className="content-band">
        <div className="section-head">
          <h2>Lab Projects</h2>
          <span>4 个核心实验</span>
        </div>
        <div className="academy-grid">
          {labs.map((item) => (
            <LabCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
