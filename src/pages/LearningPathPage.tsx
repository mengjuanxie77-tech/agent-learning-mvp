import { useEffect, useState } from "react";
import { getLearningStages } from "../services/contentService";
import { StageSection } from "../components/StageSection";
import type { LearningStageView } from "../types/content";

export function LearningPathPage() {
  const [stages, setStages] = useState<LearningStageView[]>([]);

  useEffect(() => {
    getLearningStages().then(setStages);
  }, []);

  if (stages.length === 0) {
    return <p className="loading">页面加载中...</p>;
  }

  return (
    <div className="page-stack">
      <section className="hero-band hero-band-compact">
        <p className="hero-kicker">Learning Path</p>
        <h1>智能体学习路径</h1>
        <p>从基础概念到协作落地，按阶段逐步建立完整智能体能力。</p>
      </section>

      {stages.map((stage) => (
        <StageSection key={stage.id} stage={stage} />
      ))}
    </div>
  );
}
