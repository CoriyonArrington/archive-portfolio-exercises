# Application User Flow

## Site Navigation Structure
\`\`\`mermaid
graph TD
    Home["Home Page"] --> Work["Work/Portfolio"]
    Home --> Services["Services"]
    Home --> About["About"]
    Home --> Contact["Contact"]
    Home --> Process["Process"]
    Home --> Testimonials["Testimonials"]
    Home --> FAQs["FAQs"]
    Home --> Playground["Playground"]
    
    Work --> ProjectDetail["Project Detail Pages"]
    ProjectDetail --> RelatedProjects["Related Projects"]
    
    Services --> ServiceDetail["Service Details"]
    Services --> Engagement["Engagement Models"]
    Services --> ServiceFAQs["Service FAQs"]
    
    Process --> ProcessSteps["Process Steps"]
    Process --> ProcessCaseStudies["Process Case Studies"]
    
    Admin["Admin Dashboard"] --> ProjectsAdmin["Projects Management"]
    Admin --> TestimonialsAdmin["Testimonials Management"]
    Admin --> FAQsAdmin["FAQs Management"]
    Admin --> ServicesAdmin["Services Management"]
    Admin --> ProcessAdmin["Process Management"]
\`\`\`

## Key User Journeys

### Potential Client Journey
1. Lands on Home page
2. Explores Work/Portfolio to view relevant case studies
3. Reviews Services to understand offerings
4. Checks Testimonials for social proof
5. Visits About page to learn about expertise
6. Submits inquiry through Contact page

### Admin Content Management Journey
1. Logs in to Admin Dashboard
2. Manages Projects (add/edit/delete)
3. Updates Testimonials
4. Modifies Service offerings
5. Edits Process steps and FAQs
6. Revalidates content to update the site

### Portfolio Browsing Journey
1. Views featured projects on Home page
2. Navigates to Work page for full portfolio
3. Filters projects by category/type if needed
4. Opens detailed case study
5. Downloads PDF version if desired
6. Explores related projects
\`\`\`
