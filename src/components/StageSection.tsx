import type { LearningStageView, StageStatus } from "../types/content";
import { TopicCard } from "./TopicCard";

interface StageSectionProps {
  stage: LearningStageView;
}

const stageStatusLabel: Record<StageStatus, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  planned: "Planned"
};

export function StageSection({ stage }: StageSectionProps) {
  return (
    <section className="stage-section">
      <div className="stage-head">
        <div>
          <p className="stage-status stage-status-inline">
            {stageStatusLabel[stage.status]}
          </p>
          <h2>{stage.title}</h2>
        </div>
        <p className="stage-description">{stage.description}</p>
      </div>
      <div className="topic-grid">
        {stage.topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </section>
  );
}
