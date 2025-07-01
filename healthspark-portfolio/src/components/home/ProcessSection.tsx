
import React from 'react';
import { SectionHeading } from '../ui/section-heading';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Search, Lightbulb, PenTool, MonitorSmartphone, LineChart } from 'lucide-react';

const ProcessItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex space-x-6">
    <div className="flex-shrink-0 mt-1">
      <div className="bg-gray-50 w-12 h-12 rounded-2xl flex items-center justify-center text-gray-900">
        {icon}
      </div>
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

const ProcessSection = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <SectionHeading
              title="My design process"
              align="left"
              className="mb-8"
            />
            
            <div className="space-y-12">
              <ProcessItem
                icon={<Users size={24} />}
                title="Understand"
                description="I start by understanding the business goals, user needs, and technical constraints through stakeholder interviews and research."
              />
              
              <ProcessItem
                icon={<Search size={24} />}
                title="Discover"
                description="Through user interviews, contextual inquiry, and data analysis, I uncover insights that inform design decisions."
              />
              
              <ProcessItem
                icon={<Lightbulb size={24} />}
                title="Ideate"
                description="I generate multiple solutions through sketching, wireframing, and collaborative workshops with stakeholders."
              />
              
              <ProcessItem
                icon={<PenTool size={24} />}
                title="Design"
                description="I create high-fidelity designs and prototypes that bring the solution to life, considering all user touchpoints."
              />
              
              <ProcessItem
                icon={<MonitorSmartphone size={24} />}
                title="Test & Iterate"
                description="I validate solutions through usability testing and refine based on user feedback and analytics."
              />
              
              <ProcessItem
                icon={<LineChart size={24} />}
                title="Measure"
                description="I track key metrics to ensure the solution meets business goals and user needs, making data-driven improvements."
              />
            </div>
            
            <Button 
              variant="outline" 
              className="group rounded-full"
            >
              <span>Learn more about my process</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-card">
              <img 
                src="https://via.placeholder.com/600x800?text=Design+Process" 
                alt="Design process visualization" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="absolute -bottom-5 -right-5 glass-card p-5 rounded-2xl shadow-smooth max-w-[280px]">
              <h4 className="font-semibold mb-2">Impact-driven design</h4>
              <p className="text-sm text-muted-foreground">
                My biomedical engineering background helps me balance technical feasibility with user needs to create impactful healthcare solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
