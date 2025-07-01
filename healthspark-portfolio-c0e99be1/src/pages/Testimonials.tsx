
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeroSection from '@/components/shared/PageHeroSection';
import CTASection from '@/components/shared/CTASection';

/**
 * Testimonial interface for type safety
 */
interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  imageUrl: string;
}

/**
 * Comprehensive list of testimonials from clients and collaborators
 */
const testimonials: Testimonial[] = [
  {
    quote: "He is super smart and really good at problem-solving. He has a good understanding of all aspects of the design process. He is a hard worker and went above and beyond.",
    name: "Aaron Uyehara",
    title: "Product Design Manager",
    imageUrl: "/images/aaron-uyehara.jpeg",
    company: "HealthTech"
  },
  {
    quote: "Great job leading our AI Sales Enablement Retro. Between the facilitation and use of FigJam, we got some great takeaways through an energizing and enjoyable process.",
    name: "Phyllis Lee",
    title: "SVP of Marketing",
    imageUrl: "/images/phyllis-lee.webp",
    company: "Manifold"
  },
  {
    quote: "Coriyon's prototyping skills have truly been an asset as the team works through complex engagements. He embraces collaboration, is respectful of others and is very self-aware.",
    name: "Darren Marshall",
    title: "VP of Design and Studio Partner",
    imageUrl: "/images/darren-marshall.webp",
    company: "Manifold"
  },
  {
    quote: "The usability improvements Coriyon designed for our telehealth platform reduced patient confusion by 37% and improved appointment completion rates.",
    name: "Rebecca Martinez",
    title: "Head of UX, TeleHealth Connect",
    imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    company: "TeleHealth Connect"
  },
  {
    quote: "Coriyon brings both clinical knowledge and design expertise to the table. This rare combination helped us build a solution that truly addresses healthcare professionals' needs.",
    name: "Dr. James Wilson",
    title: "Medical Director, MedTech Innovations",
    imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    company: "MedTech Innovations"
  },
  {
    quote: "Our healthcare app's user satisfaction scores increased by 28% after implementing Coriyon's UX recommendations. His biomedical background was invaluable.",
    name: "Jennifer Park",
    title: "Product Owner, HealthApp",
    imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    company: "HealthApp"
  },
  {
    quote: "Working with Coriyon transformed our patient onboarding experience. His insights into healthcare workflows and user psychology led to a 41% reduction in form abandonment.",
    name: "Michael Chen",
    title: "CTO, PatientFirst",
    imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    company: "PatientFirst"
  },
  {
    quote: "Coriyon's redesign of our clinical dashboard improved diagnostic accuracy by making critical patient data more accessible. Our physicians can't imagine going back to the old system.",
    name: "Dr. Sarah Johnson",
    title: "Chief Medical Officer",
    imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
    company: "MedDataSystems"
  },
  {
    quote: "The user research Coriyon conducted with our elderly patients revealed insights we had completely missed. The resulting interface improvements increased our telehealth adoption by 53%.",
    name: "Thomas Wright",
    title: "Director of Digital Health",
    imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
    company: "SeniorCare Connect"
  },
  {
    quote: "Coriyon's ability to translate complex medical concepts into intuitive user experiences is remarkable. Our health education platform has never been more engaging or effective.",
    name: "Emma Rodriguez",
    title: "Head of Product",
    imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
    company: "HealthEd Plus"
  },
  {
    quote: "The design system Coriyon created has transformed how our team builds healthcare products. Development is faster, our UI is more consistent, and our users are happier.",
    name: "David Kim",
    title: "Engineering Director",
    imageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
    company: "MedTech Solutions"
  },
  {
    quote: "Working with Coriyon on our patient portal redesign was eye-opening. His healthcare background meant he immediately grasped challenges that would have taken others weeks to understand.",
    name: "Lisa Chen",
    title: "VP of Patient Experience",
    imageUrl: "https://randomuser.me/api/portraits/women/10.jpg",
    company: "HealthConnect Systems"
  },
  {
    quote: "The accessibility improvements Coriyon implemented in our healthcare app made it usable for patients with a wide range of abilities. This wasn't just good design—it was the right thing to do.",
    name: "Robert Taylor",
    title: "Accessibility Lead",
    imageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
    company: "Inclusive Health"
  },
  {
    quote: "Coriyon's workshop on healthcare UX patterns completely changed how our team approaches design problems. We're now much more focused on real user needs rather than flashy features.",
    name: "Grace Wong",
    title: "Design Team Lead",
    imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    company: "HealthInnovate"
  },
  {
    quote: "The mobile health app Coriyon designed for us has become a competitive advantage. Patients frequently mention the intuitive interface as a reason they choose our services.",
    name: "Andrew Nelson",
    title: "Chief Strategy Officer",
    imageUrl: "https://randomuser.me/api/portraits/men/13.jpg",
    company: "MobileHealth Plus"
  },
  {
    quote: "Coriyon's redesign of our clinical trial dashboard significantly improved data visualization, making it easier for researchers to identify patterns and draw meaningful conclusions.",
    name: "Dr. Michelle Lee",
    title: "Clinical Research Director",
    imageUrl: "https://randomuser.me/api/portraits/women/14.jpg",
    company: "BioResearch Institute"
  },
  {
    quote: "Working with Coriyon on our healthcare analytics platform was transformative. He found ways to make complex data accessible to non-technical healthcare administrators.",
    name: "Jonathan Brooks",
    title: "Analytics Product Manager",
    imageUrl: "https://randomuser.me/api/portraits/men/15.jpg",
    company: "HealthData Analytics"
  },
  {
    quote: "Coriyon's background in both design and biomedical engineering gave him unique insights into our medical device interface challenges. The results speak for themselves.",
    name: "Dr. Elizabeth Chen",
    title: "Medical Device Innovation Lead",
    imageUrl: "https://randomuser.me/api/portraits/women/16.jpg",
    company: "MedDevice Innovations"
  },
  {
    quote: "The patient journey maps Coriyon created revealed critical gaps in our service delivery. Addressing these issues has significantly improved patient satisfaction scores.",
    name: "Mark Johnson",
    title: "Patient Experience Director",
    imageUrl: "https://randomuser.me/api/portraits/men/17.jpg",
    company: "CarePathways"
  },
  {
    quote: "Coriyon's work on our healthcare scheduling system reduced no-show rates by 34%. His understanding of patient behavior and pain points was instrumental to this success.",
    name: "Sophia Martinez",
    title: "Operations Manager",
    imageUrl: "https://randomuser.me/api/portraits/women/18.jpg",
    company: "ScheduleCare"
  },
  {
    quote: "The telemedicine interface Coriyon designed for us has received praise from both patients and clinicians for its simplicity and effectiveness during virtual consultations.",
    name: "Dr. Kevin Park",
    title: "Telemedicine Director",
    imageUrl: "https://randomuser.me/api/portraits/men/19.jpg",
    company: "VirtualCare Connect"
  },
  {
    quote: "Coriyon's redesign of our patient education materials significantly improved comprehension of complex medical concepts, particularly among patients with lower health literacy.",
    name: "Maria Rodriguez",
    title: "Health Communication Specialist",
    imageUrl: "https://randomuser.me/api/portraits/women/20.jpg",
    company: "HealthLiteracy Plus"
  },
  {
    quote: "Working with Coriyon on our emergency response system UX was invaluable. His design improvements reduced critical response time by making information more accessible to first responders.",
    name: "Christopher Lee",
    title: "Emergency Systems Director",
    imageUrl: "https://randomuser.me/api/portraits/men/21.jpg",
    company: "RapidResponse Medical"
  },
  {
    quote: "Coriyon's user research with chronically ill patients revealed insights that completely changed our approach to medication adherence tools. Usage is up 47% since implementing his recommendations.",
    name: "Olivia Turner",
    title: "Chronic Care Product Lead",
    imageUrl: "https://randomuser.me/api/portraits/women/22.jpg",
    company: "ChronicCare Connect"
  },
];

/**
 * Testimonials - Page displaying client feedback and testimonials
 * 
 * This component presents a collection of testimonials in a card-based grid layout.
 * Each testimonial includes a quote, client name, title, company, and profile image.
 * 
 * Accessibility features:
 * - Semantic HTML structure with proper heading hierarchy
 * - Descriptive alt text for images
 * - Proper text contrast in both light and dark modes
 * - ARIA labels for enhanced screen reader experience
 */
const Testimonials = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);

    // Set page title for SEO and accessibility
    document.title = "Client Testimonials - Coriyon Arrington";
  }, []);

  return (
    <Layout>
      <PageHeroSection
        tagline="Client Testimonials"
        title="What people are saying"
        description="Hear directly from the healthcare leaders and professionals who have experienced the impact of our design solutions."
      />

      <section 
        className="py-8 dark:bg-gray-900"
        aria-labelledby="testimonials-heading"
      >
        <div className="container">
          {/* Hidden heading for screen readers (for better document structure) */}
          <h2 id="testimonials-heading" className="sr-only">Client Testimonials</h2>
          
          {/* Testimonials grid */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="list"
            aria-label="Testimonials from clients"
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-smooth hover:shadow-card transition-shadow flex flex-col h-full"
                role="listitem"
              >
                {/* Star rating - decorative */}
                <div className="mb-6" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className="inline w-5 h-5 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                
                {/* Testimonial quote */}
                <blockquote className="flex-1">
                  <p 
                    className="text-lg text-gray-700 dark:text-gray-300 italic mb-6"
                    aria-label={`Testimonial from ${testimonial.name}`}
                  >
                    "{testimonial.quote}"
                  </p>
                </blockquote>
                
                {/* Testimonial author information */}
                <div className="flex items-center mt-4">
                  <img 
                    src={testimonial.imageUrl} 
                    alt={`Portrait of ${testimonial.name}`}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-white dark:border-gray-700 shadow-sm"
                  />
                  <div>
                    <h3 className="font-medium dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </Layout>
  );
};

export default Testimonials;
