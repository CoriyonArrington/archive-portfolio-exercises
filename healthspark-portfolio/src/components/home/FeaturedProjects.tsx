
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/section-heading';
import { Button } from '@/components/ui/button';
import { getFeaturedProjects } from '@/data/projects';
import { Link } from 'react-router-dom';

const FeaturedProjects = () => {
  const featuredProjects = getFeaturedProjects(2);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container">
        <SectionHeading
          title="Featured case studies"
          description="Explore how I've helped healthcare companies solve complex problems and deliver meaningful user experiences."
        />
        
        <div className="space-y-12">
          {featuredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-3xl overflow-hidden shadow-smooth border border-gray-100 group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
                <div className={`p-8 lg:p-12 flex flex-col justify-center ${
                  project.id === 'physician-workflow' ? 'order-1 lg:order-2' : ''
                }`}>
                  <div className="space-y-6">
                    {/* Client logo */}
                    <div className="h-12">
                      <img 
                        src={project.clientLogo} 
                        alt="Client logo" 
                        className="h-full object-contain"
                      />
                    </div>
                    
                    {/* Outcome highlight */}
                    {project.outcome && (
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="text-2xl font-bold text-green-600">{project.outcome.value}</div>
                        <div className="text-sm text-gray-600">{project.outcome.description}</div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                          {tag.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                        </span>
                      ))}
                      {project.platforms.map((platform, index) => (
                        <span key={`platform-${index}`} className="px-3 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-full">
                          {platform}
                        </span>
                      ))}
                      {project.deviceTypes.map((deviceType, index) => (
                        <span key={`device-${index}`} className="px-3 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full">
                          {deviceType}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                    
                    <Button 
                      variant="outline" 
                      className="w-fit group rounded-full h-10"
                    >
                      <span>See what we did</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
                
                <div className={`relative overflow-hidden ${
                  project.id === 'physician-workflow' 
                    ? 'order-2 lg:order-1 lg:rounded-r-3xl' 
                    : 'lg:rounded-l-3xl'
                }`}>
                  <div className={`absolute inset-0 ${
                    project.id === 'physician-workflow'
                      ? 'bg-gradient-to-l from-white/20 to-transparent z-10 lg:from-transparent lg:via-transparent'
                      : 'bg-gradient-to-r from-white/20 to-transparent z-10 lg:from-transparent lg:via-transparent'
                  }`}></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View all projects button */}
        <div className="mt-12 text-center">
          <Link to="/projects">
            <Button size="lg" className="rounded-full group h-12">
              <span>View all case studies</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
