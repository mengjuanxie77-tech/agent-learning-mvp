import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { HomePage } from "./pages/HomePage";
import { LearningPathPage } from "./pages/LearningPathPage";
import { TopicDetailPage } from "./pages/TopicDetailPage";
import { PracticeLabPage } from "./pages/PracticeLabPage";
import { DemoPlaygroundPage } from "./pages/DemoPlaygroundPage";
import { KnowledgeUpdatesPage } from "./pages/KnowledgeUpdatesPage";
import { KnowledgeMapPage } from "./pages/KnowledgeMapPage";

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/path" element={<LearningPathPage />} />
        <Route path="/topic/:topicId" element={<TopicDetailPage />} />
        <Route path="/labs" element={<PracticeLabPage />} />
        <Route path="/playground" element={<DemoPlaygroundPage />} />
        <Route path="/updates" element={<KnowledgeUpdatesPage />} />
        <Route path="/knowledge-map" element={<KnowledgeMapPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
