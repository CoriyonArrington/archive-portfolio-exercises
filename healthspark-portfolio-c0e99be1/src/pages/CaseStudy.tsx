
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { projectsData } from '@/data/projects';
import CTASection from '@/components/shared/CTASection';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudyApproach from '@/components/case-study/CaseStudyApproach';
import CaseStudyResults from '@/components/case-study/CaseStudyResults';
import CaseStudyNavigation from '@/components/case-study/CaseStudyNavigation';
import ClientChallengeSection from '@/components/case-study/ClientChallengeSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/**
 * CaseStudy - Detailed client success story page
 * 
 * Displays comprehensive information about a specific client project including 
 * challenge, approach, solution, and measurable results with business impact.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - ARIA attributes
 * - Keyboard navigation
 */
const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState(projectsData.find(p => p.id === id));
  
  // Get the previous and next project for navigation
  const currentIndex = projectsData.findIndex(p => p.id === id);
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  useEffect(() => {
    // Update project when id changes
    setProject(projectsData.find(p => p.id === id));
    // Scroll to top
    window.scrollTo(0, 0);
    // Set page title for better SEO and accessibility
    document.title = project 
      ? `${project.title} | Client Success Story` 
      : 'Case Study Not Found - Coriyon Arrington';
  }, [id, project]);

  if (!project) {
    return (
      <Layout>
        <div className="container py-20">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">Case Study Not Found</h1>
          <p className="mb-6 dark:text-gray-300">Sorry, we couldn't find the case study you're looking for.</p>
          <Button asChild>
            <Link to="/work">Back to All Results</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Get specific case study content based on project id
  const getCaseStudyContent = () => {
    switch (project.id) {
      case 'stroke-recovery':
        return {
          clientBackground: "A leading stroke recovery technology provider needed to improve patient engagement with their therapy tools.",
          challenge: "Stroke recovery patients struggled with maintaining engagement in their therapy programs. The existing mobile app had low usage rates, with only 23% of patients regularly tracking their progress.",
          approach: "We conducted extensive user research with both patients and therapists to identify pain points and opportunities. After creating user flows and low-fidelity wireframes, we designed an intuitive interface with adaptive goal-setting features and personalized progress tracking.",
          solution: "The redesigned app featured simplified navigation, visual progress indicators, and integration with therapist feedback. We implemented gamification elements to encourage consistent engagement and added social features allowing patients to connect with peers for motivation.",
          results: "Daily app engagement increased by 42%, and therapy adherence improved significantly. Therapists reported that patients using the app showed faster recovery progress compared to those using traditional methods.",
          businessImpact: "The improved engagement led to better patient outcomes, which strengthened the company's position in the market and became a key differentiator in their sales process."
        };
      case 'physician-workflow':
        return {
          clientBackground: "A healthcare SaaS company was struggling with physician adoption of their clinical decision support platform.",
          challenge: "Healthcare providers were spending excessive time navigating a complex clinical dashboard, leading to frustration and reduced efficiency in patient care decisions.",
          approach: "We shadowed physicians during their workday to understand their information needs and decision-making processes. Working closely with clinical informaticists, we redesigned the dashboard interface to align with clinical workflows.",
          solution: "The new dashboard organizes patient information hierarchically based on urgency and relevance, with customizable views for different specialties. We implemented a color-coded alert system and streamlined the most common tasks to require fewer clicks.",
          results: "After implementation, physician satisfaction scores increased by 87%, and the time spent navigating the dashboard decreased by 32%. Most importantly, therapy adherence improved by 68% due to clearer communication between providers and patients.",
          businessImpact: "The dramatic improvement in usability became a competitive advantage, helping the company secure three major hospital system contracts worth over $2.5M in annual recurring revenue."
        };
      default:
        return {
          clientBackground: "The client faced significant challenges with their existing digital healthcare solution, impacting both user satisfaction and business outcomes.",
          challenge: "The client's platform was not meeting user needs effectively, resulting in low adoption rates and poor engagement metrics.",
          approach: "We conducted comprehensive user research and collaborative design workshops to develop a user-centered solution based on actual user behavior and needs.",
          solution: "Our team created an intuitive interface with streamlined workflows that addressed key pain points identified in the research phase.",
          results: "The redesigned solution significantly improved user satisfaction and key performance metrics, delivering measurable business value.",
          businessImpact: "The improved user experience directly contributed to increased user retention, higher customer satisfaction, and tangible ROI for the organization."
        };
    }
  };

  const content = getCaseStudyContent();

  return (
    <Layout>
      <main id="main-content">
        <CaseStudyHero project={project} />
        <ClientChallengeSection 
          clientBackground={content.clientBackground}
          challenge={content.challenge}
        />
        <CaseStudyApproach content={content} />
        <CaseStudyResults 
          content={content} 
          outcome={project.outcome} 
          businessImpact={content.businessImpact}
        />
        <CaseStudyNavigation prevProject={prevProject} nextProject={nextProject} />
        <CTASection
          title="Ready to achieve similar results for your organization?"
          description="Let's discuss how we can address your specific challenges and create measurable improvements in your healthcare product."
          buttonText="Schedule a consultation"
          buttonLink="/contact"
        />
      </main>
    </Layout>
  );
};

export default CaseStudy;
