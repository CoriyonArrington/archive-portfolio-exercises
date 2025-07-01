
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Presentation, Users } from 'lucide-react';

const WorkshopSection = () => {
  return (
    <div className="mb-24">
      <SectionHeading 
        title="Workshop Facilitation"
        align="left"
        className="mb-10"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Collaborative problem-solving</h3>
          <p className="text-muted-foreground">
            I facilitate workshops that bring together diverse stakeholders to solve complex 
            healthcare problems, align on vision, and generate innovative solutions.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Presentation className="h-3 w-3" />
              </div>
              <div>
                <h4 className="font-medium">Design Thinking Workshops</h4>
                <p className="text-sm text-muted-foreground">
                  I guide teams through structured exercises to reframe problems, 
                  generate ideas, and prototype potential solutions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="h-3 w-3" />
              </div>
              <div>
                <h4 className="font-medium">Alignment Sessions</h4>
                <p className="text-sm text-muted-foreground">
                  I facilitate discussions to align stakeholders on vision, goals, 
                  and priorities for healthcare products.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Presentation className="h-3 w-3" />
              </div>
              <div>
                <h4 className="font-medium">Journey Mapping Sessions</h4>
                <p className="text-sm text-muted-foreground">
                  I lead collaborative exercises to map out user journeys and identify opportunities 
                  for improvement in healthcare experiences.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="h-3 w-3" />
              </div>
              <div>
                <h4 className="font-medium">Remote Facilitation</h4>
                <p className="text-sm text-muted-foreground">
                  I design and facilitate remote workshops that keep distributed teams engaged 
                  and productive, especially important in today's healthcare environment.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-smooth">
          <div className="aspect-video rounded-xl overflow-hidden mb-6">
            <img 
              src="https://via.placeholder.com/800x450?text=Workshop+Facilitation" 
              alt="Workshop facilitation" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-medium mb-2">Workshop impact</h4>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  "Our team had been stuck for months on how to approach this problem. The workshop 
                  helped us break through our assumptions and find a completely new approach."
                </p>
                <p className="text-xs">— Client feedback, Telehealth Platform</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-medium mb-2">Workshop formats</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight"></span>
                    <span>Half-day sessions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight"></span>
                    <span>Full-day workshops</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight"></span>
                    <span>Multi-day sprints</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-medium mb-2">Outcomes</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight"></span>
                    <span>Aligned vision</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight"></span>
                    <span>Prioritized solutions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight"></span>
                    <span>Action plans</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopSection;
