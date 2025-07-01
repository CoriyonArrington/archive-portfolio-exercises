
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/services/HeroSection';
import ServicesOverview from '@/components/services/ServicesOverview';
import UXResearchSection from '@/components/services/UXResearchSection';
import UXDesignSection from '@/components/services/UXDesignSection';
import WorkshopSection from '@/components/services/WorkshopSection';
import CTASection from '@/components/services/CTASection';

const Services = () => {
  return (
    <Layout>
      <div className="pt-32 pb-20">
        <div className="container">
          <HeroSection />
          <ServicesOverview />
          <UXResearchSection />
          <UXDesignSection />
          <WorkshopSection />
          <CTASection />
        </div>
      </div>
    </Layout>
  );
};

export default Services;
