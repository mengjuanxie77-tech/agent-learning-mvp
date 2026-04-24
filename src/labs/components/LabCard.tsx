import type { PracticeLabItem } from "../../types/content";

interface LabCardProps {
  item: PracticeLabItem;
}

export function LabCard({ item }: LabCardProps) {
  return (
    <article className="academy-card">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div>
        <p className="academy-card-label">Skills learned</p>
        <ul className="academy-list">
          {item.skillsLearned.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
