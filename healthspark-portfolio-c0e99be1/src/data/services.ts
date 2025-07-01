
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  clientProblem: string;
  outcome: string;
}

export const servicesData: Service[] = [
  {
    id: "ux-research",
    title: "User Research & Insights",
    description: "Uncover critical insights about your users' needs, pain points, and behaviors to inform evidence-based design decisions.",
    icon: "🔍",
    clientProblem: "Making design decisions based on assumptions rather than evidence",
    outcome: "Data-driven design direction that reduces development risk and increases solution effectiveness"
  },
  {
    id: "product-strategy",
    title: "Product Strategy & Roadmapping",
    description: "Align your product vision with user needs and business goals to create a strategic roadmap for successful development.",
    icon: "📊",
    clientProblem: "Unclear product direction and feature prioritization challenges",
    outcome: "Clear product vision and prioritized feature set that maximizes business impact and user value"
  },
  {
    id: "interface-design",
    title: "Interface Design & Optimization",
    description: "Create intuitive, accessible interfaces that enhance user experience across platforms while meeting your business objectives.",
    icon: "🎨",
    clientProblem: "Confusing interfaces leading to user frustration and abandonment",
    outcome: "Intuitive interfaces that increase user satisfaction, adoption, and task completion rates"
  },
  {
    id: "design-systems",
    title: "Healthcare Design Systems",
    description: "Build scalable, consistent design frameworks that improve team efficiency, product quality, and support rapid iteration.",
    icon: "🧩",
    clientProblem: "Inconsistent user experience across products and difficulty scaling design",
    outcome: "Cohesive experience across all touchpoints and accelerated development velocity"
  },
  {
    id: "prototyping",
    title: "Interactive Prototyping",
    description: "Validate concepts early with interactive prototypes that allow stakeholders to experience the solution before development.",
    icon: "⚙️",
    clientProblem: "Discovering major usability issues late in development when changes are costly",
    outcome: "Early validation that reduces development costs and increases confidence in the final product"
  },
  {
    id: "healthcare-ux",
    title: "Clinical Workflow Optimization",
    description: "Streamline complex healthcare workflows to improve efficiency, reduce errors, and enhance provider satisfaction.",
    icon: "🏥",
    clientProblem: "Inefficient clinical workflows causing provider frustration and reduced productivity",
    outcome: "Optimized processes that save time, reduce documentation burden, and improve care delivery"
  },
  {
    id: "accessibility",
    title: "Inclusive Design Solutions",
    description: "Ensure your healthcare products are accessible to everyone, including users with disabilities and diverse needs.",
    icon: "♿",
    clientProblem: "Excluding users with disabilities and risking compliance issues",
    outcome: "Inclusive experiences that serve all users and meet regulatory requirements"
  },
  {
    id: "mobile-design",
    title: "Mobile Health Experience Design",
    description: "Create engaging, user-friendly mobile experiences that drive adoption and consistent usage of health applications.",
    icon: "📱",
    clientProblem: "Poor mobile experiences leading to low engagement with health tools",
    outcome: "Intuitive mobile experiences that increase user retention and health management"
  },
  {
    id: "workshop-facilitation",
    title: "Stakeholder Alignment Workshops",
    description: "Build consensus and shared understanding among diverse healthcare stakeholders through structured, productive sessions.",
    icon: "🧠",
    clientProblem: "Misalignment between clinical, business, and technical stakeholders",
    outcome: "Unified direction and reduced decision friction throughout the project lifecycle"
  }
];

// Helper function to get featured services
export const getFeaturedServices = (limit?: number) => {
  const featured = servicesData;
  return limit ? featured.slice(0, limit) : featured;
};
