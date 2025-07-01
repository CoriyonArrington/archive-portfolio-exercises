
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  viewMode: 'list' | 'grid';
}

const ProjectCard = ({ project, viewMode }: ProjectCardProps) => {
  const { title, description, image, clientLogo, tags, platforms, deviceTypes, outcome } = project;
  
  // Convert tags to title case
  const formatTag = (tag: string) => {
    return tag.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };
  
  // Grid view card
  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-3xl overflow-hidden shadow-smooth border border-gray-100 group h-full flex flex-col">
        {/* Image on top for vertical layout */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          {/* Client logo */}
          <div className="h-12 mb-4">
            <img 
              src={clientLogo} 
              alt="Client logo" 
              className="h-full object-contain"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                {formatTag(tag)}
              </span>
            ))}
            {platforms.map((platform, index) => (
              <span key={`platform-${index}`} className="px-3 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-full">
                {formatTag(platform)}
              </span>
            ))}
            {deviceTypes.map((deviceType, index) => (
              <span key={`device-${index}`} className="px-3 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full">
                {formatTag(deviceType)}
              </span>
            ))}
          </div>
          
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          
          {/* Outcome highlight - moved above the button */}
          {outcome && (
            <div className="mb-4 bg-gray-50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{outcome.value}</div>
              <div className="text-sm text-gray-600">{outcome.description}</div>
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="w-fit group rounded-full mt-auto h-10"
          >
            <span>View case study</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    );
  }
  
  // List view card
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-smooth border border-gray-100 group">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative h-full min-h-[200px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 z-10"></div>
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="p-6 md:col-span-2">
          {/* Client logo */}
          <div className="h-12 mb-4">
            <img 
              src={clientLogo} 
              alt="Client logo" 
              className="h-full object-contain"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                {formatTag(tag)}
              </span>
            ))}
            {platforms.map((platform, index) => (
              <span key={`platform-${index}`} className="px-3 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-full">
                {formatTag(platform)}
              </span>
            ))}
            {deviceTypes.map((deviceType, index) => (
              <span key={`device-${index}`} className="px-3 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full">
                {formatTag(deviceType)}
              </span>
            ))}
          </div>
          
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          
          {/* Outcome highlight - moved above the button */}
          {outcome && (
            <div className="mb-4 bg-gray-50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{outcome.value}</div>
              <div className="text-sm text-gray-600">{outcome.description}</div>
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="w-fit group rounded-full h-10"
          >
            <span>View case study</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
