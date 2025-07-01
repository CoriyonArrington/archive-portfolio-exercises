
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const CTASection = ({ title, description, buttonText, buttonLink }: CTASectionProps) => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container">
            <div className="bg-black text-white dark:bg-gray-900 dark:border dark:border-gray-700 rounded-2xl p-16 text-center shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                {title}
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
                {description}
              </p>
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 rounded-full px-8 shadow-md hover:shadow-lg transition-all"
                asChild
              >
                <Link to={buttonLink}>
                  {buttonText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
    </section>
  );
};

export default CTASection;
