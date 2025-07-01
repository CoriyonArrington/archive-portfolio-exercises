
import React from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { PenTool, LayoutDashboard, Users } from 'lucide-react';

const UXDesignSection = () => {
  return (
    <div className="mb-24">
      <SectionHeading 
        title="UX Design"
        align="left"
        className="mb-10"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <img 
              src="https://via.placeholder.com/400x300?text=Wireframes" 
              alt="Wireframes" 
              className="w-full h-auto rounded-xl shadow-sm"
            />
            <img 
              src="https://via.placeholder.com/400x300?text=UI+Design" 
              alt="UI Design" 
              className="w-full h-auto rounded-xl shadow-sm"
            />
            <img 
              src="https://via.placeholder.com/400x300?text=Prototypes" 
              alt="Prototypes" 
              className="w-full h-auto rounded-xl shadow-sm"
            />
            <img 
              src="https://via.placeholder.com/400x300?text=Design+System" 
              alt="Design System" 
              className="w-full h-auto rounded-xl shadow-sm"
            />
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-medium mb-2">Design process</h4>
            <p className="text-sm text-muted-foreground">
              My design process is iterative and collaborative, involving stakeholders at key points 
              to ensure the solution meets both user needs and business requirements.
            </p>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 space-y-6">
          <h3 className="text-2xl font-semibold">Creating intuitive experiences</h3>
          <p className="text-muted-foreground">
            I design interfaces that make complex healthcare tasks simple and intuitive, 
            focusing on accessibility, efficiency, and emotional resonance.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                <PenTool className="h-3 w-3" />
              </div>
              <div>
                <h4 className="font-medium">Interface Design</h4>
                <p className="text-sm text-muted-foreground">
                  I create visual interfaces that balance aesthetics with functionality, 
                  paying special attention to healthcare-specific needs like clinical workflows.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                <LayoutDashboard className="h-3 w-3" />
              </div>
              <div>
                <h4 className="font-medium">Interaction Design</h4>
                <p className="text-sm text-muted-foreground">
                  I design intuitive interactions that guide users through complex healthcare tasks 
                  with minimal cognitive load.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="h-3 w-3" />
              </div>
              <div>
                <h4 className="font-medium">Usability Testing</h4>
                <p className="text-sm text-muted-foreground">
                  I validate designs with real users to ensure they work effectively in actual 
                  healthcare environments.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                <PenTool className="h-3 w-3" />
              </div>
              <div>
                <h4 className="font-medium">Design Systems</h4>
                <p className="text-sm text-muted-foreground">
                  I create scalable design systems that ensure consistency across healthcare 
                  products while improving development efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UXDesignSection;
