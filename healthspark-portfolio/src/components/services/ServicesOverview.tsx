
import React from 'react';

const ServicesOverview = () => {
  return (
    <div className="mb-24">
      <div className="bg-gray-50 rounded-3xl p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-smooth hover:shadow-card transition-shadow">
            <h3 className="text-xl font-semibold mb-4">UX Research & Strategy</h3>
            <p className="text-muted-foreground mb-6">
              Discover user needs and market opportunities through comprehensive 
              research and strategic planning.
            </p>
            <div className="text-sm font-medium text-highlight">
              Foundation for success
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-smooth hover:shadow-card transition-shadow">
            <h3 className="text-xl font-semibold mb-4">UX Design</h3>
            <p className="text-muted-foreground mb-6">
              Create intuitive interfaces and seamless experiences that delight users 
              while meeting business goals.
            </p>
            <div className="text-sm font-medium text-highlight">
              From concept to reality
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-smooth hover:shadow-card transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Workshop Facilitation</h3>
            <p className="text-muted-foreground mb-6">
              Guide teams through collaborative sessions to solve problems, align on 
              vision, and drive innovation.
            </p>
            <div className="text-sm font-medium text-highlight">
              Collaborative innovation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesOverview;
