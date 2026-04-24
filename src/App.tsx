import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { HomePage } from "./pages/HomePage";
import { LearningPathPage } from "./pages/LearningPathPage";
import { TopicDetailPage } from "./pages/TopicDetailPage";

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/path" element={<LearningPathPage />} />
        <Route path="/topic/:topicId" element={<TopicDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

