import type { Project, Testimonial, Service } from "./supabase"

// Featured projects are just projects with featured=true
export function getMockFeaturedProjects(): Project[] {
  return getMockProjects().filter((project) => project.featured)
}

// Mock projects data
export function getMockProjects(): Project[] {
  return [
    {
      id: "1",
      title: "HealthTrack Mobile App",
      description: "A patient-centered mobile application for tracking health metrics and medication adherence.",
      client: "HealthTech Innovations",
      year: "2023",
      role: "Lead Product Designer",
      duration: "6 months",
      challenge:
        "Patients with chronic conditions often struggle to consistently track their health metrics and adhere to medication schedules, leading to poor health outcomes and increased healthcare costs.",
      solution:
        "Designed an intuitive mobile application that simplifies health tracking through personalized dashboards, medication reminders, and visual progress reports, making daily health management effortless for users.",
      outcomes: [
        "92% of users reported improved medication adherence",
        "87% user satisfaction rate in post-launch surveys",
        "45% reduction in missed appointments",
        "Featured in Digital Health Today as an innovative solution",
      ],
      process: [
        {
          phase: "Research",
          description:
            "Conducted interviews with 25 patients and 10 healthcare providers to understand pain points in health tracking and medication adherence.",
        },
        {
          phase: "Ideation",
          description:
            "Developed user personas and journey maps to identify key opportunities for improving the health tracking experience.",
        },
        {
          phase: "Design",
          description:
            "Created wireframes and high-fidelity prototypes, iterating based on user feedback from usability testing sessions.",
        },
        {
          phase: "Implementation",
          description: "Collaborated with developers to ensure design integrity throughout the development process.",
        },
      ],
      images: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
      tags: ["UX Research", "UI Design", "Mobile App"],
      slug: "health-track-app",
      featured: true,
    },
    {
      id: "2",
      title: "MedConnect Platform",
      description: "Telemedicine platform connecting patients with healthcare providers for virtual consultations.",
      client: "TeleMed Solutions",
      year: "2022",
      role: "Senior UX Designer",
      duration: "8 months",
      challenge:
        "The COVID-19 pandemic accelerated the need for effective telemedicine solutions, but existing platforms were often confusing for older patients and inefficient for healthcare providers.",
      solution:
        "Designed an accessible telemedicine platform with simplified scheduling, intuitive video interfaces, and seamless integration with electronic health records to enhance the virtual care experience.",
      outcomes: [
        "Platform adopted by 15 healthcare organizations",
        "98% completion rate for first-time appointments",
        "35% increase in provider efficiency",
        "Accessibility score of 98/100",
      ],
      process: [
        {
          phase: "Research",
          description:
            "Analyzed competitor platforms and conducted remote usability studies with diverse user groups to identify accessibility barriers.",
        },
        {
          phase: "Ideation",
          description:
            "Facilitated remote design workshops with stakeholders to align on priorities and develop solution concepts.",
        },
        {
          phase: "Design",
          description:
            "Created an accessible design system and developed prototypes for both patient and provider interfaces.",
        },
        {
          phase: "Testing",
          description:
            "Conducted extensive usability testing with older adults and healthcare providers to refine the experience.",
        },
      ],
      images: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
      tags: ["Service Design", "UI/UX", "Web Application"],
      slug: "med-connect-platform",
      featured: true,
    },
    {
      id: "3",
      title: "BioWearable Dashboard",
      description: "Analytics dashboard for healthcare professionals to monitor patient data from wearable devices.",
      client: "BioTech Monitoring",
      year: "2022",
      role: "UX/UI Designer",
      duration: "5 months",
      challenge:
        "Healthcare professionals were overwhelmed by the volume of data from patient wearables, making it difficult to identify critical patterns and prioritize care.",
      solution:
        "Created an intuitive dashboard that visualizes complex health data in meaningful ways, helping providers quickly identify trends, anomalies, and priorities for patient care.",
      outcomes: [
        "32% reduction in time spent analyzing patient data",
        "Early intervention increased for at-risk patients by 28%",
        "Positive feedback from 94% of healthcare providers",
        "Integrated with 5 major wearable device platforms",
      ],
      process: [
        {
          phase: "Research",
          description: "Shadowed healthcare providers to understand their workflow and data analysis needs.",
        },
        {
          phase: "Information Architecture",
          description:
            "Organized complex data into meaningful hierarchies and visualizations based on user priorities.",
        },
        {
          phase: "Design",
          description: "Created wireframes and prototypes with a focus on data visualization best practices.",
        },
        {
          phase: "Testing",
          description: "Conducted usability testing with healthcare professionals to optimize the dashboard interface.",
        },
      ],
      images: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
      tags: ["Data Visualization", "Dashboard Design", "Healthcare"],
      slug: "bio-wearable-dashboard",
      featured: true,
    },
  ]
}

// Mock testimonials data
export function getMockTestimonials(): Testimonial[] {
  return [
    {
      id: "1",
      quote:
        "Working with this designer transformed our healthcare app from a complex system to an intuitive tool that our users love. Their background in biomedical engineering brought unique insights that made all the difference.",
      author: "Sarah Johnson",
      title: "VP of Product, HealthTech Innovations",
      image: "/placeholder.svg?height=100&width=100",
      project: "HealthTrack Mobile App",
    },
    {
      id: "2",
      quote:
        "The redesign of our patient portal exceeded all expectations. Not only did user satisfaction scores increase by 45%, but we also saw a significant reduction in support tickets. Their methodical approach to understanding both patient and staff needs was impressive.",
      author: "Dr. Michael Chen",
      title: "Chief Medical Officer, Regional Health Network",
      image: "/placeholder.svg?height=100&width=100",
      project: "Patient Portal Redesign",
    },
    {
      id: "3",
      quote:
        "As a startup founder with a medical background, I needed a designer who could understand both the clinical and business aspects of our product. They delivered a design that was not only beautiful but deeply functional for our specialized user base.",
      author: "Dr. Emily Rodriguez",
      title: "Founder & CEO, MedTech Startup",
      image: "/placeholder.svg?height=100&width=100",
      project: "MedConnect Platform",
    },
  ]
}

// Mock services data
export function getMockServices(): Service[] {
  return [
    {
      id: "1",
      title: "UX Research",
      description:
        "Uncovering insights through user interviews, usability testing, and competitive analysis to inform design decisions.",
      icon: "🔍",
      deliverables: [
        "User Interviews & Synthesis",
        "Usability Testing",
        "Competitive Analysis",
        "Heuristic Evaluation",
        "Survey Design & Analysis",
        "Research Reports",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "2",
      title: "Product Strategy",
      description: "Aligning user needs with business goals to create roadmaps that drive meaningful outcomes.",
      icon: "🧠",
      deliverables: [
        "User Personas & Journey Maps",
        "Product Roadmapping",
        "Feature Prioritization",
        "Workshops & Ideation Sessions",
        "Competitive Positioning",
        "Metrics Definition",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "3",
      title: "UI Design",
      description:
        "Creating intuitive, accessible, and visually appealing interfaces that enhance the user experience.",
      icon: "✏️",
      deliverables: [
        "Wireframes & Prototypes",
        "Visual Design",
        "Design Systems",
        "Responsive Web Design",
        "Mobile App Design",
        "Accessibility Implementation",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: "4",
      title: "Design Implementation",
      description: "Ensuring design integrity throughout the development process and beyond.",
      icon: "🛠️",
      deliverables: [
        "Developer Handoff",
        "Design QA",
        "Design Documentation",
        "Implementation Support",
        "Design System Maintenance",
        "Post-Launch Optimization",
      ],
      image: "/placeholder.svg?height=600&width=800",
    },
  ]
}

