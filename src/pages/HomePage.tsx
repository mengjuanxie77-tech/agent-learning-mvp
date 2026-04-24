import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHomeOverview } from "../services/contentService";
import type { HomeOverviewView, StageStatus, TopicPreview } from "../types/content";
import { TopicCard } from "../components/TopicCard";
import {
  useContinueLearningTopicIds,
  useFavoriteSummary,
  useHasLearningHistory
} from "../hooks/useLearningState";

const stageStatusLabel: Record<StageStatus, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  planned: "Planned"
};

export function HomePage() {
  const [data, setData] = useState<HomeOverviewView | null>(null);
  const continueLearningIds = useContinueLearningTopicIds();
  const favoriteSummary = useFavoriteSummary();
  const hasLearningHistory = useHasLearningHistory();

  useEffect(() => {
    getHomeOverview().then(setData);
  }, []);

  if (!data) {
    return <p className="loading">页面加载中...</p>;
  }

  const currentStage =
    data.stages.find((stage) => stage.status === "in_progress") ?? data.stages[0];
  const todayTopic = data.stages
    .flatMap((stage) => stage.topics)
    .find((topic) => topic.id === data.todayTopicId);
  const topicById = Object.fromEntries(
    data.stages.flatMap((stage) => stage.topics.map((topic) => [topic.id, topic]))
  );
  const continueLearningTopics = continueLearningIds
    .map((topicId) => topicById[topicId])
    .filter((topic): topic is TopicPreview => Boolean(topic))
    .slice(0, 3);
  const recommendedStartTopic =
    data.stages[0]?.topics[0] ?? todayTopic ?? currentStage.topics[0];

  return (
    <div className="page-stack">
      <section className="hero-band">
        <p className="hero-kicker">
          <CalendarDays size={14} />
          今日学习焦点
        </p>
        <h1>AI Agent Academy</h1>
        <p>{data.heroMessage}</p>
        <div className="hero-actions">
          <Link to="/path" className="cta-btn">
            查看完整学习路径
          </Link>
          {todayTopic ? (
            <Link to={`/topic/${todayTopic.id}`} className="ghost-btn">
              进入今日主题
              <ArrowRight size={14} />
            </Link>
          ) : null}
        </div>
      </section>

      <section className="content-band">
        <div className="section-head">
          <h2>Academy Modules</h2>
          <span>学习路径 + 实操 + 演示 + 更新 + 图谱</span>
        </div>
        <div className="academy-grid academy-module-grid">
          {data.modules.map((module) => (
            <Link key={module.id} to={module.path} className="academy-card academy-link-card">
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <span className="topic-link">进入模块</span>
            </Link>
          ))}
        </div>
      </section>

      {hasLearningHistory ? (
        <section className="content-band">
          <div className="section-head">
            <h2>继续学习</h2>
            <span>
              已收藏 {favoriteSummary.favoriteTopicCount} 个主题 /{" "}
              {favoriteSummary.favoriteResourceCount} 个资源 /{" "}
              {favoriteSummary.favoriteTaskCount} 个任务
            </span>
          </div>
          {continueLearningTopics.length > 0 ? (
            <div className="topic-grid">
              {continueLearningTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} actionLabel="继续学习" />
              ))}
            </div>
          ) : (
            <div className="recommended-panel">
              <p className="empty-hint">你有学习记录，建议先回到路径页选择最近阶段继续。</p>
              <Link to="/path" className="cta-btn">
                去继续学习
              </Link>
            </div>
          )}
        </section>
      ) : (
        <section className="content-band">
          <div className="section-head">
            <h2>推荐起点</h2>
            <span>建议从阶段 1 开始，先建立统一概念框架</span>
          </div>
          {recommendedStartTopic ? (
            <div className="single-topic-panel">
              <TopicCard topic={recommendedStartTopic} actionLabel="从这里开始" />
            </div>
          ) : (
            <div className="recommended-panel">
              <p className="empty-hint">当前暂无推荐主题，请先进入学习路径页选择起点。</p>
              <Link to="/path" className="cta-btn">
                去学习路径页
              </Link>
            </div>
          )}
        </section>
      )}

      <section className="content-band">
        <div className="section-head">
          <h2>学习路径概览</h2>
          <Link to="/path">查看全部阶段</Link>
        </div>
        <div className="stage-overview-grid">
          {data.stages.map((stage) => (
            <article key={stage.id} className="stage-overview-item">
              <p className="stage-status">{stageStatusLabel[stage.status]}</p>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
              <p className="stage-topic-count">进度 {stage.progressPercent}%</p>
              <p className="stage-topic-count">共 {stage.topics.length} 个主题</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-band">
        <div className="section-head">
          <h2>今日推荐主题</h2>
          <span>{currentStage.title}</span>
        </div>
        {todayTopic ? (
          <div className="single-topic-panel">
            <TopicCard topic={todayTopic} actionLabel="进入今日主题" />
          </div>
        ) : (
          <p className="empty-hint">暂未配置今日主题。</p>
        )}
      </section>
    </div>
  );
}
