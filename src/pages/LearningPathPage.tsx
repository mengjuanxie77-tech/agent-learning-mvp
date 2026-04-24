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
        <h1>AI Agent Academy Learning Path</h1>
        <p>6 个阶段、18 个主题，从基础到生产落地逐步建立完整能力。</p>
      </section>

      {stages.map((stage, index) => (
        <StageSection key={stage.id} stage={stage} showStartHint={index === 0} />
      ))}
    </div>
  );
}
