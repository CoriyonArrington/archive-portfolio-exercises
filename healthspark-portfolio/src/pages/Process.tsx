
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Process = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="pt-32 pb-20">
        <div className="container">
          {/* Hero Section */}
          <div className="mb-24 max-w-4xl">
            <span className="inline-block text-sm font-medium px-3 py-1 bg-gray-100 rounded-full mb-6">
              My Design Process
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              How I approach design challenges
            </h1>
            <p className="text-lg text-muted-foreground">
              My process is not a rigid framework but a flexible approach that adapts to the 
              unique needs of each project while ensuring we never lose sight of user needs 
              and business goals.
            </p>
          </div>
          
          {/* Process Overview */}
          <div className="mb-24">
            <div className="bg-gray-50 rounded-3xl p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-smooth hover:shadow-card transition-shadow">
                  <h3 className="text-xl font-semibold mb-4">Discovery</h3>
                  <p className="text-muted-foreground mb-6">
                    I start by deeply understanding the problem space through research, 
                    stakeholder interviews, and competitive analysis.
                  </p>
                  <div className="text-sm font-medium text-highlight">
                    1-2 Weeks
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-smooth hover:shadow-card transition-shadow">
                  <h3 className="text-xl font-semibold mb-4">Design</h3>
                  <p className="text-muted-foreground mb-6">
                    Based on research insights, I create user flows, wireframes, and 
                    high-fidelity designs that solve the identified problems.
                  </p>
                  <div className="text-sm font-medium text-highlight">
                    2-4 Weeks
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-smooth hover:shadow-card transition-shadow">
                  <h3 className="text-xl font-semibold mb-4">Delivery</h3>
                  <p className="text-muted-foreground mb-6">
                    I validate solutions through testing, refine based on feedback, 
                    and prepare designs for handoff to engineering.
                  </p>
                  <div className="text-sm font-medium text-highlight">
                    1-2 Weeks
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Detailed Process Sections */}
          {/* Discovery Phase */}
          <div className="mb-24">
            <SectionHeading 
              title="Discovery Phase"
              align="left"
              className="mb-10"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Understanding the problem</h3>
                <p className="text-muted-foreground">
                  Every great solution starts with a deep understanding of the problem. 
                  During this phase, I immerse myself in the user's world to uncover their 
                  needs, pain points, and motivations.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Stakeholder interviews</h4>
                      <p className="text-sm text-muted-foreground">
                        I interview key stakeholders to understand business goals, technical 
                        constraints, and success metrics.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">User research</h4>
                      <p className="text-sm text-muted-foreground">
                        Through interviews, surveys, and contextual inquiry, I gain insights 
                        into user behaviors, needs, and frustrations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Market analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        I analyze competitor products and industry trends to identify 
                        opportunities and avoid common pitfalls.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Synthesis</h4>
                      <p className="text-sm text-muted-foreground">
                        I synthesize research findings into actionable insights that will 
                        guide the design process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-smooth">
                <div className="aspect-video rounded-xl overflow-hidden mb-6">
                  <img 
                    src="https://via.placeholder.com/800x450?text=Discovery+Phase" 
                    alt="Discovery phase process" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-medium mb-2">Stakeholder interview insights</h4>
                    <div className="text-sm text-muted-foreground">
                      <p className="italic mb-2">
                        "One persona we aren't doing well for yet... marketers. They don't want these 
                        tactical features. They need aggregated data to act on."
                      </p>
                      <p className="text-xs">— Olivia Alexander, VP Product Management</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="font-medium mb-2">Research outputs</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center space-x-2">
                          <span className="h-1 w-1 rounded-full bg-highlight"></span>
                          <span>9 Stakeholder interviews</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="h-1 w-1 rounded-full bg-highlight"></span>
                          <span>User personas</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="h-1 w-1 rounded-full bg-highlight"></span>
                          <span>Jobs-to-be-done</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="font-medium mb-2">Key insights</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center space-x-2">
                          <span className="h-1 w-1 rounded-full bg-highlight"></span>
                          <span>Data accessibility issues</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="h-1 w-1 rounded-full bg-highlight"></span>
                          <span>Integration pain points</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="h-1 w-1 rounded-full bg-highlight"></span>
                          <span>Unmet stakeholder needs</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Design Phase */}
          <div className="mb-24">
            <SectionHeading 
              title="Design Phase"
              align="left"
              className="mb-10"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <img 
                    src="https://via.placeholder.com/400x300?text=Wireframe" 
                    alt="Wireframe" 
                    className="w-full h-auto rounded-xl shadow-sm"
                  />
                  <img 
                    src="https://via.placeholder.com/400x300?text=UI+Design" 
                    alt="UI Design" 
                    className="w-full h-auto rounded-xl shadow-sm"
                  />
                  <img 
                    src="https://via.placeholder.com/400x300?text=Prototype" 
                    alt="Prototype" 
                    className="w-full h-auto rounded-xl shadow-sm"
                  />
                  <img 
                    src="https://via.placeholder.com/400x300?text=Component+Library" 
                    alt="Component Library" 
                    className="w-full h-auto rounded-xl shadow-sm"
                  />
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-medium mb-2">Design evolution</h4>
                  <p className="text-sm text-muted-foreground">
                    From initial sketch to final high-fidelity design, the solution evolves through 
                    multiple iterations based on user feedback and stakeholder input.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 space-y-6">
                <h3 className="text-2xl font-semibold">Crafting the solution</h3>
                <p className="text-muted-foreground">
                  Using insights from the discovery phase, I ideate, prototype, and refine solutions 
                  that address user needs while achieving business goals.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Ideation</h4>
                      <p className="text-sm text-muted-foreground">
                        Through sketching and collaborative workshops, I generate multiple solution 
                        concepts that address the identified problems.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Information architecture</h4>
                      <p className="text-sm text-muted-foreground">
                        I create user flows and sitemaps to establish a logical structure that 
                        supports user goals and tasks.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Wireframing & prototyping</h4>
                      <p className="text-sm text-muted-foreground">
                        I create low and mid-fidelity wireframes to rapidly explore layout options 
                        and interaction patterns.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Visual design</h4>
                      <p className="text-sm text-muted-foreground">
                        I develop high-fidelity designs that bring the solution to life with 
                        attention to visual hierarchy, accessibility, and brand consistency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Delivery Phase */}
          <div className="mb-24">
            <SectionHeading 
              title="Delivery Phase"
              align="left"
              className="mb-10"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Validating and refining</h3>
                <p className="text-muted-foreground">
                  The best designs are validated with real users. I test prototypes, gather feedback, 
                  and make data-driven refinements to ensure the solution meets user needs.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Usability testing</h4>
                      <p className="text-sm text-muted-foreground">
                        I conduct usability tests with real users to identify pain points and 
                        areas for improvement.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Iteration</h4>
                      <p className="text-sm text-muted-foreground">
                        Based on testing insights, I refine the design to address usability issues 
                        and improve the overall experience.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Documentation</h4>
                      <p className="text-sm text-muted-foreground">
                        I create comprehensive documentation to ensure smooth handoff to 
                        engineering and other stakeholders.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Implementation support</h4>
                      <p className="text-sm text-muted-foreground">
                        I collaborate closely with engineers during implementation to ensure 
                        the design is executed as intended.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-smooth">
                <div className="aspect-video rounded-xl overflow-hidden mb-6">
                  <img 
                    src="https://via.placeholder.com/800x450?text=Usability+Testing" 
                    alt="Usability testing session" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-medium mb-2">Testing insights</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        In a recent project, usability testing revealed that users struggled with the data 
                        visualization component. We redesigned it with clearer labels and interactive tooltips, 
                        which improved task completion rates from 65% to 94%.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="font-medium mb-2">Metrics</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center space-x-2">
                          <span className="h-1 w-1 rounded-full bg-highlight"></span>
                          <span>Task success rate: 94%</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="h-1 w-1 rounded-full bg-highlight"></span>
                          <span>Time on task: -32%</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="h-1 w-1 rounded-full bg-highlight"></span>
                          <span>SUS score: 87/100</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="font-medium mb-2">Deliverables</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center space-x-2">
                          <span className="h-1 w-1 rounded-full bg-highlight"></span>
                          <span>High-fidelity designs</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="h-1 w-1 rounded-full bg-highlight"></span>
                          <span>Interactive prototype</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="h-1 w-1 rounded-full bg-highlight"></span>
                          <span>Design specifications</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div>
            <div className="bg-black text-white rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to work together?
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                I'm always open to discussing new projects, design challenges, or opportunities 
                to improve healthcare experiences through thoughtful design.
              </p>
              <Button 
                className="bg-white text-black hover:bg-gray-100 rounded-full px-8"
              >
                <span>Get in touch</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Process;
