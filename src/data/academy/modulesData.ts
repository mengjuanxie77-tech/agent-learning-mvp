import type { AcademyModuleLink } from "../../types/content";

export const academyModules: AcademyModuleLink[] = [
  {
    id: "module-learning-path",
    title: "Learning Path",
    description: "6 阶段递进学习路线，每次聚焦一个关键能力主题。",
    path: "/path"
  },
  {
    id: "module-practice-lab",
    title: "Practice Lab",
    description: "通过实操实验，把智能体知识转成可执行能力。",
    path: "/labs"
  },
  {
    id: "module-demo-playground",
    title: "Demo Playground",
    description: "快速体验不同 Agent 的任务流程与行为模式。",
    path: "/playground"
  },
  {
    id: "module-knowledge-updates",
    title: "Knowledge Updates",
    description: "跟进最新研究、框架演进与行业落地动态。",
    path: "/updates"
  },
  {
    id: "module-knowledge-map",
    title: "Agent Knowledge Map",
    description: "查看完整 AI Agent 技术栈与模块关系图谱。",
    path: "/knowledge-map"
  }
];
