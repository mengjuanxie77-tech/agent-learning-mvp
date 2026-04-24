import type { PracticeTaskEntity } from "../types/content";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useIsTaskFavorited, useLearningActions } from "../hooks/useLearningState";

interface TaskCardProps {
  task: PracticeTaskEntity;
}

export function TaskCard({ task }: TaskCardProps) {
  const isFavorited = useIsTaskFavorited(task.id);
  const { toggleTaskFavorite } = useLearningActions();

  return (
    <section className="task-card">
      <div className="task-head">
        <h2>今日实操任务</h2>
        <button
          className="icon-btn"
          type="button"
          onClick={() => toggleTaskFavorite(task.id)}
          aria-label={isFavorited ? "取消收藏实操任务" : "收藏实操任务"}
        >
          {isFavorited ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </div>
      <h3>{task.title}</h3>
      <p>
        <strong>目标：</strong>
        {task.goal}
      </p>
      <p>
        <strong>场景：</strong>
        {task.context}
      </p>
      <div className="prompt-box">
        <p className="prompt-label">可直接给 Codex 的 Prompt</p>
        <p>{task.codexPrompt}</p>
      </div>
      <p>
        <strong>预期产出：</strong>
        {task.expectedOutput}
      </p>
      <div>
        <p className="checklist-label">建议执行步骤</p>
        <ul className="checklist">
          {task.steps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="checklist-label">完成检查清单</p>
        <ul className="checklist">
          {task.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
