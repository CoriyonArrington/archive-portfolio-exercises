import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedDatabase() {
  console.log("🌱 Starting database seeding...")

  // Seed projects
  const projects = [
    {
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
    {
      title: "Patient Portal Redesign",
      description:
        "Comprehensive redesign of a hospital's patient portal to improve accessibility and user satisfaction.",
      client: "Metropolitan Health Network",
      year: "2021",
      role: "Lead UX Designer",
      duration: "7 months",
      challenge:
        "The existing patient portal had poor adoption rates due to confusing navigation, medical jargon, and accessibility issues that created barriers for many patients.",
      solution:
        "Redesigned the portal with simplified navigation, plain language, and robust accessibility features, creating an inclusive experience that empowers patients to manage their health information.",
      outcomes: [
        "Portal usage increased by 64% within 3 months of launch",
        "Support call volume decreased by 42%",
        "Task completion rate improved from 62% to 94%",
        "WCAG 2.1 AA compliance achieved across all features",
      ],
      process: [
        {
          phase: "Audit",
          description:
            "Conducted a comprehensive audit of the existing portal, identifying usability and accessibility issues.",
        },
        {
          phase: "User Research",
          description: "Interviewed diverse patient groups, including elderly users and those with disabilities.",
        },
        {
          phase: "Design",
          description:
            "Developed a new information architecture and user interface focused on simplicity and accessibility.",
        },
        {
          phase: "Validation",
          description:
            "Tested with users throughout the design process, including accessibility testing with assistive technologies.",
        },
      ],
      images: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
      tags: ["Redesign", "Accessibility", "Healthcare"],
      slug: "patient-portal-redesign",
      featured: false,
    },
    {
      title: "MedDispense System",
      description: "Medication dispensing system interface designed for nursing staff in hospital settings.",
      client: "Healthcare Equipment Solutions",
      year: "2021",
      role: "UX Designer",
      duration: "6 months",
      challenge:
        "Medication errors in hospitals are a significant cause of preventable harm to patients, with complex dispensing systems often contributing to mistakes due to poor interface design.",
      solution:
        "Designed an intuitive medication dispensing interface that reduces cognitive load, highlights critical information, and includes safety verification steps to minimize errors.",
      outcomes: [
        "Medication error rate reduced by 27%",
        "Time to dispense medications decreased by 34%",
        "Nurse satisfaction with the system increased from 42% to 89%",
        "Successfully deployed in 12 hospitals",
      ],
      process: [
        {
          phase: "Research",
          description: "Conducted field studies in hospital environments, observing nurses during medication rounds.",
        },
        {
          phase: "Analysis",
          description:
            "Analyzed error patterns and identified key interaction points where design could improve safety.",
        },
        {
          phase: "Design",
          description:
            "Created a new interface focusing on clear information hierarchy, error prevention, and efficiency.",
        },
        {
          phase: "Testing",
          description:
            "Conducted simulated medication dispensing scenarios to validate the design in realistic contexts.",
        },
      ],
      images: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
      tags: ["Medical Devices", "UI Design", "User Research"],
      slug: "med-dispense-system",
      featured: false,
    },
    {
      title: "Health Education Platform",
      description:
        "Educational platform providing personalized health information to patients with chronic conditions.",
      client: "Chronic Care Coalition",
      year: "2020",
      role: "Product Designer",
      duration: "9 months",
      challenge:
        "Patients with chronic conditions often lack access to clear, personalized information about managing their health, leading to poor self-management and unnecessary hospital visits.",
      solution:
        "Created an adaptive learning platform that delivers personalized health education content based on the patient's condition, literacy level, and learning preferences.",
      outcomes: [
        "89% of users reported better understanding of their condition",
        "Emergency department visits decreased by 23% among active users",
        "Average engagement of 3.5 sessions per week per user",
        "Content available in 6 languages with cultural adaptations",
      ],
      process: [
        {
          phase: "Discovery",
          description:
            "Researched health literacy challenges and interviewed patients with various chronic conditions.",
        },
        {
          phase: "Content Strategy",
          description:
            "Developed an adaptive content framework that adjusts complexity and format based on user needs.",
        },
        {
          phase: "Design",
          description: "Created a modular, accessible interface with multiple content presentation formats.",
        },
        {
          phase: "Evaluation",
          description:
            "Tested with diverse user groups to ensure content was understandable and culturally appropriate.",
        },
      ],
      images: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
      tags: ["E-Learning", "Content Strategy", "UX Design"],
      slug: "health-education-platform",
      featured: false,
    },
  ]

  // Seed testimonials
  const testimonials = [
    {
      quote:
        "Working with this designer transformed our healthcare app from a complex system to an intuitive tool that our users love. Their background in biomedical engineering brought unique insights that made all the difference.",
      author: "Sarah Johnson",
      title: "VP of Product, HealthTech Innovations",
      image: "/placeholder.svg?height=100&width=100",
      project: "HealthTrack Mobile App",
    },
    {
      quote:
        "The redesign of our patient portal exceeded all expectations. Not only did user satisfaction scores increase by 45%, but we also saw a significant reduction in support tickets. Their methodical approach to understanding both patient and staff needs was impressive.",
      author: "Dr. Michael Chen",
      title: "Chief Medical Officer, Regional Health Network",
      image: "/placeholder.svg?height=100&width=100",
      project: "Patient Portal Redesign",
    },
    {
      quote:
        "As a startup founder with a medical background, I needed a designer who could understand both the clinical and business aspects of our product. They delivered a design that was not only beautiful but deeply functional for our specialized user base.",
      author: "Dr. Emily Rodriguez",
      title: "Founder & CEO, MedTech Startup",
      image: "/placeholder.svg?height=100&width=100",
      project: "MedConnect Platform",
    },
    {
      quote:
        "Their ability to translate complex medical data into intuitive visualizations made our dashboard project a success. Healthcare providers can now quickly understand patient trends and make better decisions as a result.",
      author: "James Wilson",
      title: "Director of Product, Healthcare Analytics Company",
      image: "/placeholder.svg?height=100&width=100",
      project: "BioWearable Dashboard",
    },
    {
      quote:
        "We brought them in to improve the usability of our medication dispensing system, and the results were remarkable. Nursing staff reported a 30% reduction in time spent on medication tasks, and error rates decreased significantly.",
      author: "Patricia Lee",
      title: "Director of Nursing, University Hospital",
      image: "/placeholder.svg?height=100&width=100",
      project: "MedDispense System",
    },
    {
      quote:
        "Their workshop on healthcare UX transformed how our team approaches design problems. We now have a shared language and methodology that has improved our collaboration and outcomes.",
      author: "Robert Thompson",
      title: "Design Lead, Health Education Platform",
      image: "/placeholder.svg?height=100&width=100",
      project: "Design Workshop Series",
    },
  ]

  // Seed services
  const services = [
    {
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

  try {
    // Insert projects
    console.log("Inserting projects...")
    for (const project of projects) {
      const { error } = await supabase.from("projects").upsert(
        {
          ...project,
          outcomes: JSON.stringify(project.outcomes),
          process: JSON.stringify(project.process),
          images: JSON.stringify(project.images),
          tags: JSON.stringify(project.tags),
        },
        { onConflict: "slug" },
      )

      if (error) {
        console.error("Error inserting project:", error)
      }
    }

    // Insert testimonials
    console.log("Inserting testimonials...")
    for (const testimonial of testimonials) {
      const { error } = await supabase.from("testimonials").upsert(testimonial, { onConflict: "author" })

      if (error) {
        console.error("Error inserting testimonial:", error)
      }
    }

    // Insert services
    console.log("Inserting services...")
    for (const service of services) {
      const { error } = await supabase.from("services").upsert(
        {
          ...service,
          deliverables: JSON.stringify(service.deliverables),
        },
        { onConflict: "title" },
      )

      if (error) {
        console.error("Error inserting service:", error)
      }
    }

    console.log("✅ Database seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

seedDatabase()

