// components/common/project-card.tsx (Updated)
import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import ProjectImage from '@/components/common/project-image'; // Import ProjectImage
import type { ProjectCardProps } from '@/types/project'; // Use updated type
import { cn } from '@/lib/utils'; // Import cn

export default function ProjectCard({ project, className }: ProjectCardProps) {
  // Extract data from the project object
  const { id, title, description, slug, project_tags, image_url, image_alt } = project;

  // Extract tags from the nested structure
  const tags = project_tags?.map(pt => pt.tag) ?? [];

  // Ensure slug is a valid, non-empty string before rendering the link button
  const hasValidSlug = slug && slug.trim() !== '';

  return (
    // Use cn for className merging
    <Card key={id} className={cn("flex flex-col h-full overflow-hidden", className)}>
      {/* Integrate ProjectImage - Render conditionally if image_url exists */}
      {image_url && (
          <div className="aspect-video overflow-hidden"> {/* Container for aspect ratio */}
              <ProjectImage
                  src={image_url}
                  alt={image_alt ?? title ?? 'Project visual'} // Use image_alt, fallback to title
                  className="w-full h-full object-cover" // Basic image styling
                  // You might want width/height attributes depending on optimization strategy
                  // width={600} // Example
                  // height={400} // Example
              />
          </div>
       )}
      <CardHeader>
        {/* Use nullish coalescing for title */}
        <CardTitle>{title ?? 'Untitled Project'}</CardTitle>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Use nullish coalescing for description */}
        <CardDescription>{description ?? 'No description available.'}</CardDescription>
      </CardContent>
      {/* Only render footer if slug is valid */}
      {hasValidSlug && (
        <CardFooter>
            <Button asChild variant="outline" size="sm">
                {/* Use the validated slug */}
                <Link href={`/projects/${slug}`}>View Project</Link>
            </Button>
        </CardFooter>
       )}
    </Card>
  );
}