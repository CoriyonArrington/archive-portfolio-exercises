
import type { Project } from '@/types/project';

export const projectsData: Project[] = [
  {
    id: "care-navigation",
    title: "Reduced healthcare costs by 42%",
    description: "Redesigned a healthcare navigation platform to make high-value providers more accessible, resulting in significant cost savings for patients and improved care outcomes.",
    image: "https://zhzhtqcncdxoyclobrkj.supabase.co/storage/v1/object/public/Images/carehive-mockup.jpeg",
    clientLogo: "/images/carehive-logo.svg",
    tags: ["Featured"],
    platforms: ["iOS", "Android", "Web"],
    deviceTypes: ["Mobile","Tablet", "Desktop"],
    featured: true,
    outcome: {
      value: "42%",
      description: "reduction in out-of-pocket costs"
    }
  },
  {
    id: "physician-workflow",
    title: "Boosted therapy adherence by 68%",
    description: "Streamlined a complex clinical dashboard to reduce physician cognitive load, enabling faster and more informed decisions that directly improved patient therapy adherence.",
    image: "https://zhzhtqcncdxoyclobrkj.supabase.co/storage/v1/object/public/Images/physician-mockup.jpeg",
    clientLogo: "https://placehold.co/200x80/fff/333?text=MediFlow",
    tags: ["Phsyician Portal"],
    platforms: ["Web"],
    deviceTypes: ["Desktop"],
    featured: true,
    outcome: {
      value: "68%",
      description: "improvement in therapy adherence"
    }
  },
  {
    id: "stroke-recovery",
    title: "Increased patient engagement by 32%",
    description: "Revolutionized stroke recovery by redesigning mobile and web apps with intuitive goal-setting and progress tracking features that kept patients motivated and improved outcomes.",
    image: "https://zhzhtqcncdxoyclobrkj.supabase.co/storage/v1/object/public/Images/stroke-recovery.webp",
    clientLogo: "https://placehold.co/200x80/fff/333?text=MediRecover",
    tags: ["Patient App"],
    platforms: ["iOS", "Android", "Web"],
    deviceTypes: ["Tablet", "Desktop"],
    featured: false,
    outcome: {
      value: "32%",
      description: "increase in patient and family engagement"
    }
  },
  {
    id: "telehealth-elderly",
    title: "Improved satisfaction by 78%",
    description: "Transformed telehealth experiences for seniors by designing an age-friendly interface that drove adoption rates up by 65% and dramatically improved patient satisfaction scores.",
    image: "https://zhzhtqcncdxoyclobrkj.supabase.co/storage/v1/object/public/Images/telehealth-elderly.jpg", 
    clientLogo: "https://placehold.co/200x80/fff/333?text=SeniorCare",
    tags: ["Telehealth"],
    platforms: ["iOS", "Web"],
    deviceTypes: ["Mobile", "Desktop"],
    featured: false,
    outcome: {
      value: "78%",
      description: "increase in patient satisfaction"
    }
  },
  {
    id: "patient-monitoring",
    title: "Cut readmissions by 54%",
    description: "Designed a monitoring system that helped providers identify concerning patterns before they became critical, significantly reducing hospital readmissions and improving care continuity.",
    image: "https://zhzhtqcncdxoyclobrkj.supabase.co/storage/v1/object/public/Images/patient-monitoring.webp",
    clientLogo: "https://placehold.co/200x80/fff/333?text=VitalTrack",
    tags: ["Health Tech"],
    platforms: ["Web"],
    deviceTypes: ["Desktop", "Tablet"],
    featured: false,
    outcome: {
      value: "54%",
      description: "reduction in hospital readmissions"
    }
  },
  {
    id: "wellness-app",
    title: "Boosted program participation by 36%",
    description: "Revitalized a corporate wellness program by creating an engaging mobile experience that gamified healthy activities and drove higher employee participation rates.",
    image: "https://zhzhtqcncdxoyclobrkj.supabase.co/storage/v1/object/public/Images/wellness-app.webp",
    clientLogo: "https://placehold.co/200x80/fff/333?text=CorpWell",
    tags: ["Wellness"],
    platforms: ["Android", "iOS"],
    deviceTypes: ["Mobile"],
    featured: false,
    outcome: {
      value: "36%",
      description: "increase in employee participation"
    }
  },
  {
    id: "medical-records",
    title: "Slashed documentation time by 45%",
    description: "Redesigned an EMR system that dramatically reduced documentation burden while improving data completeness, allowing providers to spend more quality time with patients.",
    image: "https://zhzhtqcncdxoyclobrkj.supabase.co/storage/v1/object/public/Images/medical-records.webp",
    clientLogo: "https://placehold.co/200x80/fff/333?text=MedRecord",
    tags: ["Health Tech", "EMR"],
    platforms: ["Web"],
    deviceTypes: ["Desktop"],
    featured: false,
    outcome: {
      value: "45%",
      description: "reduction in documentation time"
    }
  }
];

// Helper function to get featured projects
export const getFeaturedProjects = (limit?: number) => {
  const featured = projectsData.filter(project => project.featured);
  return limit ? featured.slice(0, limit) : featured;
};
