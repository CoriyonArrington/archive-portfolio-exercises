
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { servicesData } from '@/data/services';
import CTASection from '@/components/shared/CTASection';
import ServiceHero from '@/components/service-detail/ServiceHero';
import ProcessSteps from '@/components/service-detail/ProcessSteps';
import FAQSection from '@/components/service-detail/FAQSection';
import ServiceNavigation from '@/components/service-detail/ServiceNavigation';
import ServiceDetailContent from '@/components/service-detail/ServiceDetailContent';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/**
 * ServiceDetail - Service Detail Page
 * 
 * Displays comprehensive information about a specific service including
 * deliverables, process steps, FAQs, and navigation to other services.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - ARIA landmarks
 * - Keyboard navigation
 */
const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const service = servicesData.find(service => service.id === id);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Set page title for better SEO and accessibility
    document.title = service 
      ? `${service.title} - Coriyon Arrington` 
      : 'Service Not Found - Coriyon Arrington';
  }, [service]);

  if (!service) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">Service not found</h1>
          <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link to="/services">Back to Services</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Define some mock deliverables for each service
  const deliverables = [
    "Comprehensive user research",
    "User personas and journey maps",
    "Feature prioritization frameworks",
    "Wireframes and prototypes",
    "Final design specifications"
  ];

  // Define process steps
  const processSteps = [
    {
      step: 1,
      title: "Discovery Call",
      description: "We'll discuss your project goals, challenges, timeline, and budget to determine if we're a good fit."
    },
    {
      step: 2,
      title: "Proposal & Planning",
      description: "I'll create a detailed proposal outlining the scope, deliverables, timeline, and investment for your project."
    },
    {
      step: 3,
      title: "Execution",
      description: "We'll work collaboratively through research, design, and implementation with regular check-ins and feedback sessions."
    }
  ];

  // Define FAQs
  const faqs = [
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on scope and complexity. A small design project might take 4-6 weeks, while a comprehensive product design engagement could span 3-6 months."
    },
    {
      question: "What's your pricing structure?",
      answer: "I offer both project-based and retainer pricing models. Project fees are based on scope, complexity, and timeline. I'm happy to provide a custom quote after understanding your specific needs."
    },
    {
      question: "Do you work with startups?",
      answer: "I love working with healthcare startups to shape their products from the ground up. I offer flexible engagement models that can accommodate startup budgets and timelines."
    },
    {
      question: "How do you handle confidentiality?",
      answer: "I take confidentiality seriously, especially in healthcare. I'm happy to sign NDAs before discussing your project, and I have experience working with HIPAA-compliant products."
    }
  ];

  // Find the current service index and calculate previous/next services
  const currentIndex = servicesData.findIndex(s => s.id === id);
  const prevService = currentIndex > 0 ? servicesData[currentIndex - 1] : null;
  const nextService = currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : null;

  return (
    <Layout>
      <main id="main-content" className="pt-32 dark:bg-gray-900">
        <ServiceHero service={service} deliverables={deliverables} />
        <ServiceDetailContent deliverables={deliverables} />
        <ProcessSteps steps={processSteps} />
        <FAQSection faqs={faqs} />
      </main>

      <ServiceNavigation prevService={prevService} nextService={nextService} />

      <CTASection
        title="Ready to transform your healthcare product?"
        description="Let's collaborate to create intuitive, user-centered designs that drive engagement and deliver results."
        buttonText="Let's get started"
        buttonLink="/contact"
      />
    </Layout>
  );
};

export default ServiceDetail;
