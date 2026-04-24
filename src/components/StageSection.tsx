import type { LearningStageView, StageStatus } from "../types/content";
import { TopicCard } from "./TopicCard";
import { useStageLearningMetrics } from "../hooks/useLearningState";

interface StageSectionProps {
  stage: LearningStageView;
  showStartHint?: boolean;
}

const stageStatusLabel: Record<StageStatus, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  planned: "Planned"
};

export function StageSection({ stage, showStartHint = false }: StageSectionProps) {
  const metrics = useStageLearningMetrics(stage);

  return (
    <section className="stage-section">
      <div className="stage-head">
        <div>
          <p className="stage-status stage-status-inline">
            {stageStatusLabel[metrics.stageStatus]}
          </p>
          <h2>{stage.title}</h2>
          {showStartHint ? (
            <p className="stage-start-hint">建议从这里开始，按主题顺序学习更容易形成体系。</p>
          ) : null}
        </div>
        <div className="stage-description-wrap">
          <p className="stage-description">{stage.description}</p>
          <p className="stage-metrics">
            已完成 {metrics.completedTopicCount}/{metrics.totalTopicCount} 主题
          </p>
          <div className="topic-progress-track">
            <div
              className="topic-progress-fill"
              style={{ width: `${metrics.progressPercent}%` }}
            />
          </div>
          <p className="stage-metrics">阶段进度 {metrics.progressPercent}%</p>
        </div>
      </div>
      <div className="topic-grid">
        {stage.topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </section>
  );
}
