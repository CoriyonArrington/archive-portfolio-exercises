
import React from 'react';
import { Service } from '@/data/services';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { title, description, icon } = service;
  
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-smooth border border-gray-100 group h-full flex flex-col p-8">
      <div className="mb-4 text-4xl text-highlight">{icon}</div>
      
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <Button 
        variant="outline" 
        className="w-fit group rounded-full mt-auto h-10"
      >
        <span>Learn more</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

export default ServiceCard;
