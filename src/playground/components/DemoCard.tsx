import type { PlaygroundDemoItem } from "../../types/content";

interface DemoCardProps {
  item: PlaygroundDemoItem;
}

export function DemoCard({ item }: DemoCardProps) {
  return (
    <article className="academy-card">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div>
        <p className="academy-card-label">Workflow simulation</p>
        <ol className="academy-list academy-list-ordered">
          {item.workflowSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </article>
  );
}
