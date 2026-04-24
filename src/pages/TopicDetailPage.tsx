import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  AudioLines,
  BookMarked,
  Bookmark,
  BookmarkCheck,
  PlayCircle
} from "lucide-react";
import { getTopicDetail } from "../services/contentService";
import type { TopicDetailView, TopicStatus } from "../types/content";
import {
  useIsTopicFavorited,
  useLearningActions,
  useTopicLearningSnapshot
} from "../hooks/useLearningState";
import { ResourceCard } from "../components/ResourceCard";
import { TaskCard } from "../components/TaskCard";

const statusOptions: Array<{ value: TopicStatus; label: string }> = [
  { value: "not_started", label: "未开始" },
  { value: "in_progress", label: "学习中" },
  { value: "completed", label: "已完成" }
];

function formatDateTime(value?: string): string {
  if (!value) {
    return "暂无";
  }
  return new Date(value).toLocaleString("zh-CN");
}

export function TopicDetailPage() {
  const { topicId = "" } = useParams();
  const [topic, setTopic] = useState<TopicDetailView | null | undefined>(undefined);
  const { enterTopic, setTopicStatus, setTopicProgress, toggleTopicFavorite } =
    useLearningActions();
  const activeTopicId = topic?.id ?? topicId;
  const learningSnapshot = useTopicLearningSnapshot(activeTopicId, "not_started");
  const isTopicFavorited = useIsTopicFavorited(activeTopicId);

  useEffect(() => {
    getTopicDetail(topicId).then(setTopic);
  }, [topicId]);

  useEffect(() => {
    if (topic) {
      enterTopic(topic.id);
    }
  }, [topic, enterTopic]);

  if (topic === undefined) {
    return <p className="loading">页面加载中...</p>;
  }

  if (topic === null) {
    return (
      <section className="content-band">
        <h1>主题不存在</h1>
        <p>请从学习路径页选择一个可用主题。</p>
        <Link className="cta-btn" to="/path">
          返回学习路径
        </Link>
      </section>
    );
  }

  return (
    <div className="page-stack">
      <section className="hero-band hero-band-compact">
        <Link to="/path" className="back-link">
          <ArrowLeft size={14} />
          返回学习路径
        </Link>
        <p className="hero-kicker">Topic Detail</p>
        <div className="topic-hero-head">
          <h1>{topic.title}</h1>
          <button
            className="icon-btn"
            type="button"
            onClick={() => toggleTopicFavorite(topic.id)}
            aria-label={isTopicFavorited ? "取消收藏主题" : "收藏主题"}
          >
            {isTopicFavorited ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        </div>
        <p>{topic.subtitle}</p>
      </section>

      <section className="content-band">
        <h2>一句话定义</h2>
        <p className="definition-line">{topic.oneLineDefinition}</p>
      </section>

      <section className="content-band">
        <h2>简明讲解</h2>
        <p>{topic.shortExplanation}</p>
      </section>

      <section className="content-band">
        <h2>深入讲解</h2>
        <div className="paragraph-group">
          {topic.deepExplanation.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="content-band">
        <h2>图示占位区域</h2>
        <div className="diagram-placeholder">
          <p>Diagram Placeholder</p>
          <p>{topic.diagrams[0]?.diagram?.content ?? "图示内容待补充。"}</p>
        </div>
      </section>

      <section className="content-band">
        <h2>学习进度</h2>
        <div className="status-segment">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={
                learningSnapshot.status === option.value
                  ? "segment-btn segment-btn-active"
                  : "segment-btn"
              }
              onClick={() => setTopicStatus(topic.id, option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="progress-inline-head">
          <span>当前进度</span>
          <strong>{learningSnapshot.progressPercent}%</strong>
        </div>
        <input
          className="progress-slider"
          type="range"
          min={0}
          max={100}
          value={learningSnapshot.progressPercent}
          onChange={(event) => setTopicProgress(topic.id, Number(event.target.value))}
        />
        <div className="learning-meta-grid">
          <p>最近访问：{formatDateTime(learningSnapshot.lastVisitedAt)}</p>
          <p>开始学习：{formatDateTime(learningSnapshot.startedAt)}</p>
          <p>完成时间：{formatDateTime(learningSnapshot.completedAt)}</p>
        </div>
      </section>

      <section className="content-band">
        <div className="section-head">
          <h2>
            <PlayCircle size={16} />
            视频资源
          </h2>
        </div>
        <div className="resource-grid">
          {topic.videos.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      <section className="content-band">
        <div className="section-head">
          <h2>
            <AudioLines size={16} />
            音频资源
          </h2>
        </div>
        <div className="resource-grid">
          {topic.audios.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      <section className="content-band">
        <div className="section-head">
          <h2>
            <BookMarked size={16} />
            推荐阅读
          </h2>
        </div>
        <div className="resource-grid">
          {topic.readings.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      <TaskCard task={topic.practiceTask} />

      <section className="content-band">
        <h2>学习复盘问题</h2>
        <ol className="review-list">
          {topic.reflectionTemplate.questions.map((question) => (
            <li key={question.id}>{question.prompt}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
