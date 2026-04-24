import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  AudioLines,
  BookMarked,
  Boxes,
  Bookmark,
  BookmarkCheck,
  FileText,
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

function ResourceSection({
  title,
  icon,
  resources,
  emptyHint
}: {
  title: string;
  icon: ReactNode;
  resources: TopicDetailView["primaryReading"];
  emptyHint: string;
}) {
  return (
    <section className="content-band">
      <div className="section-head">
        <h2>
          {icon}
          {title}
        </h2>
      </div>
      {resources.length > 0 ? (
        <div className="resource-grid">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <p className="empty-hint">{emptyHint}</p>
      )}
    </section>
  );
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

      <ResourceSection
        title="核心阅读"
        icon={<FileText size={16} />}
        resources={topic.primaryReading}
        emptyHint="核心阅读正在审核中，暂未发布。"
      />

      <ResourceSection
        title="辅助阅读"
        icon={<BookMarked size={16} />}
        resources={topic.supportingReading}
        emptyHint="辅助阅读尚未配置。"
      />

      <ResourceSection
        title="视频资源"
        icon={<PlayCircle size={16} />}
        resources={topic.videoResource}
        emptyHint="视频资源正在审核中，暂未发布。"
      />

      <ResourceSection
        title="Demo / Example / Repo"
        icon={<Boxes size={16} />}
        resources={topic.demoResource}
        emptyHint="Demo 资源尚未配置。"
      />

      <ResourceSection
        title="音频资源（预留）"
        icon={<AudioLines size={16} />}
        resources={topic.audioResource}
        emptyHint="当前主题暂无音频资源。"
      />

      <TaskCard task={topic.practiceTask} />

      <section className="content-band">
        <h2>学习复盘问题</h2>
        <ol className="review-list">
          {topic.reflectionQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
