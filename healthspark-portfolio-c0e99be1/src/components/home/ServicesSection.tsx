
import React from 'react';
import { SectionHeading } from '../ui/section-heading';
import { Button } from '@/components/ui/button';
import { getFeaturedServices } from '@/data/services';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ServicesSection = () => {
  const featuredServices = getFeaturedServices(3);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container">
        <SectionHeading
          title="Services I offer"
          description="Specialized design services for healthcare technology companies"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {featuredServices.map((service, index) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-smooth hover:shadow-card transition-shadow flex flex-col"
            >
              <div className="mb-4 text-4xl text-highlight">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              
              <Link to={`/services/${service.id}`} className="mt-auto">
                <Button 
                  variant="outline" 
                  className="w-fit group rounded-full h-10 mt-auto"
                >
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        {/* View all services button */}
        <div className="mt-12 text-center">
          <Link to="/services">
            <Button size="lg" className="rounded-full group">
              <span>View all services</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
