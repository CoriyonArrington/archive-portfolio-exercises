
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-8 animate-fade-in">
            <span className="inline-block text-sm font-medium px-3 py-1 bg-gray-100 rounded-full">
              Senior Product Designer
            </span>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Building experiences customers <span className="text-highlight">love.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              With expertise in biomedical engineering and human-centered design, I create 
              healthcare experiences that improve lives and deliver business results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="group rounded-full px-6 py-6 bg-black hover:bg-black/90"
              >
                <span>Explore my work</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full px-6 py-6"
              >
                About me
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-3">
                <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="Testimonial" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Testimonial" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Testimonial" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Testimonial" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="Testimonial" className="w-10 h-10 rounded-full border-2 border-white" />
              </div>
              <div className="text-sm">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground">Trusted by healthcare leaders</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              <img 
                src="/lovable-uploads/2cfafce4-2161-416e-adfa-e8a252855bf9.png" 
                alt="Healthcare interface design" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-5 animate-float shadow-smooth">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  <div className="h-8 w-8 rounded-full bg-green-500"></div>
                  <div className="h-8 w-8 rounded-full bg-blue-500"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Patient engagement up</p>
                  <p className="text-xs text-highlight font-medium">+43% user retention</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-24 py-10 border-t border-gray-100">
        <div className="container">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-10">
            <img src="https://via.placeholder.com/150x60?text=HealthTech" alt="Client logo" className="h-10 opacity-60 hover:opacity-100 transition-opacity" />
            <img src="https://via.placeholder.com/150x60?text=MedLife" alt="Client logo" className="h-10 opacity-60 hover:opacity-100 transition-opacity" />
            <img src="https://via.placeholder.com/150x60?text=CareOS" alt="Client logo" className="h-10 opacity-60 hover:opacity-100 transition-opacity" />
            <img src="https://via.placeholder.com/150x60?text=Vitality" alt="Client logo" className="h-10 opacity-60 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
