
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Search, LayoutDashboard, Users } from 'lucide-react';

const UXResearchSection = () => {
  return (
    <div className="mb-24">
      <SectionHeading 
        title="UX Research & Strategy"
        align="left"
        className="mb-10"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Understanding your users</h3>
          <p className="text-muted-foreground">
            Great healthcare products start with a deep understanding of the people who will use them. 
            My research approach combines qualitative and quantitative methods to uncover insights 
            that drive meaningful innovation.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Search className="h-3 w-3" />
              </div>
              <div>
                <h4 className="font-medium">User Research</h4>
                <p className="text-sm text-muted-foreground">
                  I conduct interviews, usability tests, and contextual inquiries to understand user needs, 
                  behaviors, and pain points in healthcare contexts.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="h-3 w-3" />
              </div>
              <div>
                <h4 className="font-medium">Competitive Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  I analyze competitor products to identify opportunities, industry standards, 
                  and areas for differentiation in the healthcare market.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                <LayoutDashboard className="h-3 w-3" />
              </div>
              <div>
                <h4 className="font-medium">Information Architecture</h4>
                <p className="text-sm text-muted-foreground">
                  I organize complex healthcare information into intuitive structures that help users 
                  find what they need quickly and easily.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="h-3 w-3" />
              </div>
              <div>
                <h4 className="font-medium">Product Strategy</h4>
                <p className="text-sm text-muted-foreground">
                  I help align business goals with user needs to create a roadmap for successful 
                  healthcare product development.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-smooth">
          <div className="aspect-video rounded-xl overflow-hidden mb-6">
            <img 
              src="https://via.placeholder.com/800x450?text=UX+Research" 
              alt="UX Research process" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-medium mb-2">Research impact</h4>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  "The insights from our user research completely changed our approach. We realized 
                  that physicians weren't the primary users of this feature—it was the nursing staff."
                </p>
                <p className="text-xs">— Client feedback, EMR Dashboard Project</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-medium mb-2">Research methods</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight"></span>
                    <span>Contextual inquiry</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight"></span>
                    <span>User interviews</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight"></span>
                    <span>Journey mapping</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-medium mb-2">Deliverables</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight"></span>
                    <span>User personas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight"></span>
                    <span>Research reports</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1 w-1 rounded-full bg-highlight"></span>
                    <span>Strategic roadmaps</span>
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

export default UXResearchSection;
