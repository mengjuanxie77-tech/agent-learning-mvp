import type { PlaygroundDemoItem } from "../../types/content";

export const playgroundDemoItems: PlaygroundDemoItem[] = [
  {
    id: "demo-task-planning-agent",
    title: "Task Planning Agent",
    description: "模拟任务拆解、步骤执行与中途重规划全过程。",
    workflowSteps: ["Receive Goal", "Generate Plan", "Execute Steps", "Reflect & Replan"]
  },
  {
    id: "demo-research-agent",
    title: "Research Agent",
    description: "模拟主题调研、资料汇总、观点提炼与报告输出。",
    workflowSteps: ["Collect Sources", "Score Evidence", "Draft Report", "Deliver Findings"]
  },
  {
    id: "demo-coding-agent",
    title: "Coding Agent",
    description: "模拟需求解析、代码实现、测试修复与提交产出。",
    workflowSteps: ["Read Spec", "Implement", "Run Tests", "Patch Issues"]
  },
  {
    id: "demo-knowledge-agent",
    title: "Knowledge Agent",
    description: "模拟基于知识库检索与回答校验的工作流程。",
    workflowSteps: ["Retrieve Chunks", "Reason Over Context", "Generate Answer", "Cite Sources"]
  }
];
