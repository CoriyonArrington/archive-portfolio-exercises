
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const servicesData: Service[] = [
  {
    id: "ux-research",
    title: "UX Research",
    description: "Uncover powerful insights through user interviews, usability testing, and competitive analysis to inform design decisions.",
    icon: "🔍"
  },
  {
    id: "product-strategy",
    title: "Product Strategy",
    description: "Align business goals with user needs to create a roadmap for successful product development and market fit.",
    icon: "📊"
  },
  {
    id: "interface-design",
    title: "Interface Design",
    description: "Create intuitive, accessible, and visually appealing interfaces that enhance user experience across platforms.",
    icon: "🎨"
  },
  {
    id: "design-systems",
    title: "Design Systems",
    description: "Build scalable and consistent design frameworks that improve team efficiency and product quality.",
    icon: "🧩"
  },
  {
    id: "prototyping",
    title: "Prototyping",
    description: "Bring ideas to life with interactive prototypes that allow for early testing and validation before development.",
    icon: "⚙️"
  }
];

// Helper function to get featured services
export const getFeaturedServices = (limit?: number) => {
  const featured = servicesData;
  return limit ? featured.slice(0, limit) : featured;
};
