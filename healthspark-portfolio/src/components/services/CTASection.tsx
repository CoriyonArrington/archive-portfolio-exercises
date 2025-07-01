
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <div>
      <div className="bg-black text-white rounded-3xl p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to transform your healthcare product?
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Let's discuss how my services can help you create better experiences for healthcare 
          providers and patients while meeting your business goals.
        </p>
        <Button 
          className="bg-white text-black hover:bg-gray-100 rounded-full px-8"
        >
          <span>Get in touch</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default CTASection;
