
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  clientLogo: string;
  tags: string[];
  platforms: string[];
  deviceTypes: string[];
  featured: boolean;
  outcome?: {
    value: string;
    description: string;
  };
}

export const projectsData: Project[] = [
  {
    id: "stroke-recovery",
    title: "Boosting engagement for stroke patients",
    description: "We partnered with a leading provider to redesign their mobile and web apps, which allows patients to set goals, track progress, and share results with care teams.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
    clientLogo: "https://placehold.co/200x80/fff/333?text=MediRecover",
    tags: ["Featured", "Health App"],
    platforms: ["iOS", "Android"],
    deviceTypes: ["Mobile", "Tablet"],
    featured: true,
    outcome: {
      value: "42%",
      description: "increase in daily app engagement"
    }
  },
  {
    id: "physician-workflow",
    title: "Streamlining physician workflows",
    description: "Redesigned a complex clinical dashboard, reducing cognitive load and helping physicians make faster, more informed decisions about patient care.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
    clientLogo: "https://placehold.co/200x80/fff/333?text=MediFlow",
    tags: ["Featured", "Physician Portal"],
    platforms: ["Web"],
    deviceTypes: ["Desktop"],
    featured: true,
    outcome: {
      value: "68%",
      description: "improvement in therapy adherence"
    }
  },
  {
    id: "telehealth-elderly",
    title: "Reimagining telehealth for elderly patients",
    description: "Created an intuitive telehealth experience designed specifically for seniors, increasing adoption rates by 65% and patient satisfaction by 78%.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2580&q=80", 
    clientLogo: "https://placehold.co/200x80/fff/333?text=SeniorCare",
    tags: ["Featured", "Telehealth"],
    platforms: ["iOS", "Web"],
    deviceTypes: ["Mobile", "Desktop"],
    featured: true,
    outcome: {
      value: "78%",
      description: "increase in patient satisfaction"
    }
  },
  {
    id: "patient-monitoring",
    title: "Remote patient monitoring dashboard",
    description: "Designed a comprehensive monitoring system that enables healthcare providers to track patient vitals and medication adherence remotely.",
    image: "https://images.unsplash.com/photo-1576091758096-fd485ec13bee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
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
    title: "Corporate wellness program app",
    description: "Created an engaging wellness application for corporate clients that gamifies healthy activities and provides personalized recommendations.",
    image: "https://images.unsplash.com/photo-1593634258985-f8604c964dab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2585&q=80",
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
    title: "Simplified electronic medical records",
    description: "Redesigned an EMR system to improve data entry efficiency and reduce documentation time for healthcare providers.",
    image: "https://images.unsplash.com/photo-1622228723662-259039245994?ixlib=rb-4.0.3&auto=format&fit=crop&w=2564&q=80",
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
