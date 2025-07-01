// components/page-sections/projects-section.tsx
import React from 'react'
import ProjectCard from '@/components/common/project-card'
import {
  Project,
  ProjectsSectionProps,
} from '@/types/project'

export default function ProjectsSection({
  headline,
  body,
  cta,
  projects,
}: ProjectsSectionProps) {
  return (
    <section className="projects-section">
      <h2>{headline}</h2>
      <p>{body}</p>
      <div className="projects-list">
        {projects.map((project: Project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description ?? ''}
            slug={project.slug}
            content={project.content}
            tags={project.tags ?? []}
          />
        ))}
      </div>
      <a href="/projects">{cta}</a>
    </section>
  )
}
