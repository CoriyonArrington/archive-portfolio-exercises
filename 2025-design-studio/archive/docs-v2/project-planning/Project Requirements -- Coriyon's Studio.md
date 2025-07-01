# 📄 Project Requirements Document — Coriyon’s Studio

## 🧭 Project Overview

The 2025 Design Portfolio Website is a fully CMS-powered, SEO-optimized professional portfolio showcasing UX/UI design work — especially in health and wellness, education, and technology sectors. The platform is both a personal showcase and business marketing tool to attract new clients, manage studio operations, and share interactive tools.

---

## ✅ Core Requirements

### 🔧 Functional Requirements

- **Portfolio Showcase**  
  Display selected projects with case studies and project detail pages
- **UX Solutions Pages**  
  Highlight specific services with benefits and differentiators
- **About Section**  
  Share founder bio, studio values, experience, and speaking roles
- **Contact System**  
  Custom contact form to collect client inquiries
- **Testimonials**  
  Display past client quotes and social proof
- **Process Page**  
  Explain design approach and phased workflow
- **Playground Tools**  
  Interactive web tools including:
  - Health Progress Tracker
  - Interactive Quiz
  - DBT Diary Card
- **Admin Dashboard**  
  Full CRUD access to:
  - Pages, Projects, Services, Testimonials
  - FAQs, Process Phases, Blog (future)
  - Quizzes, Questions, Options
- **Developer Tools in Admin**
  - Revalidate cache per content type
  - Supabase live table debug
  - API route testing tool
- **Design System Audit Tool**  
  Custom interface for reviewing component consistency
- **PDF Generation**  
  Export case studies or resume via server-side PDF output
- **Responsive Design**  
  Fully mobile-first design using Tailwind CSS

---

### ⚙️ Non-Functional Requirements

- **Performance**  
  Fast loading times via optimized assets, lazy loading, and server components
- **Accessibility**  
  WCAG AA compliant with semantic HTML, ARIA roles, and keyboard nav
- **SEO Optimization**  
  Structured URLs, rich metadata, sitemap, Open Graph tags
- **Content Management**  
  Supabase-based CMS with modular page content (via JSONB)
- **Analytics Integration**  
  (Future) event and funnel tracking via analytics layer
- **Security**  
  Supabase RLS, Admin Auth Middleware, protected endpoints

---

## 👥 User Personas

1. **Potential Clients**  
   Business owners or teams looking for a strategic UX partner
2. **Hiring Managers**  
   Assessing expertise for freelance or contract roles
3. **Fellow Designers**  
   Exploring tools, inspiration, or potential collaborators
4. **Site Owner (You)**  
   Managing the brand, publishing content, debugging systems
5. **Workshop Attendees / Community Members**  
   Browsing resources, playground tools, and upcoming talks

---

## 🎯 Success Criteria

- Increased client inquiries through `/contact`
- Higher engagement with `/work` and `/services`
- Active use of interactive playground tools
- Efficient updates via admin dashboard
- Positive feedback on usability and clarity
- Smooth developer experience for future improvements

Let me know if you'd like to break this into a PDF or Notion version for sharing!
