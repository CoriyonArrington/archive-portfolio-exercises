// components/common/project-card.tsx
import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
  content: {
    why: string;
    overview: string;
    before_after: string;
  };
  tags: string[];  // Accept tags as a prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, slug, tags }) => {
  return (
    <div className="project-card">
        
    {/* Render tags */}
    <div className="tags">
        {tags && tags.length > 0 && (
          <ul>
            {tags.map((tag, index) => (
              <li key={index} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      

      <a href={`/projects/${slug}`}>View Project</a>
    </div>
  );
};

export default ProjectCard;
