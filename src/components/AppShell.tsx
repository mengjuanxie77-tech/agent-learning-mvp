import {
  BookOpen,
  FlaskConical,
  GitBranch,
  Layers,
  Newspaper,
  Route,
  Target
} from "lucide-react";
import { NavLink } from "react-router-dom";
import type { PropsWithChildren } from "react";

const navItems = [
  { to: "/", label: "首页", icon: Target },
  { to: "/path", label: "学习路径", icon: Route },
  { to: "/labs", label: "Practice Lab", icon: FlaskConical },
  { to: "/playground", label: "Playground", icon: GitBranch },
  { to: "/updates", label: "技术更新", icon: Newspaper },
  { to: "/knowledge-map", label: "技术图谱", icon: Layers }
];

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <BookOpen size={20} />
            <div>
              <p className="brand-title">智能体从0到1</p>
              <p className="brand-subtitle">AI Agent Academy</p>
            </div>
          </div>
          <nav className="nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="page">{children}</main>
    </div>
  );
}
