
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Briefcase, GraduationCap, Award } from 'lucide-react';

const About = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="pt-32 pb-20">
        <div className="container">
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6">
              <span className="inline-block text-sm font-medium px-3 py-1 bg-gray-100 rounded-full">
                About Me
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Healthcare design with purpose
              </h1>
              <p className="text-lg text-muted-foreground">
                I'm Emma Hayes, a senior product designer with a biomedical engineering background. 
                I specialize in creating intuitive healthcare experiences that improve lives and 
                deliver business results.
              </p>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  className="group rounded-full"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Download Resume</span>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-card">
                <img 
                  src="https://via.placeholder.com/500x600?text=Profile+Photo" 
                  alt="Emma Hayes" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Background Section */}
          <div className="mb-24">
            <SectionHeading 
              title="My background"
              align="left"
              className="mb-10"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Education & Training</h3>
                <div className="space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">MSc. Biomedical Engineering</h4>
                      <p className="text-sm text-muted-foreground">Stanford University · 2015-2017</p>
                      <p className="mt-2">
                        Specialized in human-computer interaction for healthcare applications.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">BSc. Human-Computer Interaction</h4>
                      <p className="text-sm text-muted-foreground">Carnegie Mellon University · 2011-2015</p>
                      <p className="mt-2">
                        Graduated with honors, focus on accessibility and inclusive design.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Work Experience</h3>
                <div className="space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <Briefcase className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">Senior Product Designer</h4>
                      <p className="text-sm text-muted-foreground">HealthTech Inc. · 2020-Present</p>
                      <p className="mt-2">
                        Leading design for patient engagement platform. Increased user retention by 43%.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <Briefcase className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">Product Designer</h4>
                      <p className="text-sm text-muted-foreground">MedLife Solutions · 2017-2020</p>
                      <p className="mt-2">
                        Designed telehealth experiences for elderly patients. Improved usability scores by 68%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Skills Section */}
          <div className="mb-24">
            <SectionHeading 
              title="Skills & Expertise"
              align="left"
              className="mb-10"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-smooth hover:shadow-card transition-shadow">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Design Skills</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>User Experience Design</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>User Interface Design</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Information Architecture</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Design Systems</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Interaction Design</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Visual Design</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-smooth hover:shadow-card transition-shadow">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Research Methods</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>User Interviews</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Usability Testing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Contextual Inquiry</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Stakeholder Interviews</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Survey Design</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Competitive Analysis</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-smooth hover:shadow-card transition-shadow">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Tools</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Figma</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Sketch</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Adobe Creative Suite</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Protopie</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Miro</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight"></span>
                    <span>Notion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Values Section */}
          <div className="mb-24">
            <SectionHeading 
              title="My design philosophy"
              align="left"
              className="mb-10"
            />
            
            <div className="bg-gray-50 rounded-3xl p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Design principles</h3>
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-medium mb-2">Human-centered</h4>
                      <p className="text-muted-foreground">
                        I believe in deeply understanding the people we're designing for, 
                        their needs, environments, and limitations.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Business-minded</h4>
                      <p className="text-muted-foreground">
                        Great design serves both users and business goals. I work to 
                        find solutions that create value for both.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Evidence-based</h4>
                      <p className="text-muted-foreground">
                        My engineering background means I let data, research, and 
                        testing guide decisions rather than assumptions.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Why I love healthcare design</h3>
                  <p className="text-muted-foreground mb-6">
                    Healthcare design presents unique challenges at the intersection of 
                    technology, human emotion, and complex systems. My biomedical engineering 
                    background gives me unique insight into these challenges.
                  </p>
                  <p className="text-muted-foreground">
                    I'm passionate about designing solutions that not only look good but 
                    measurably improve healthcare outcomes and experiences for both 
                    patients and providers.
                  </p>
                  
                  <div className="mt-8">
                    <Button
                      variant="outline"
                      className="group rounded-full"
                    >
                      <span>Read more about my process</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
