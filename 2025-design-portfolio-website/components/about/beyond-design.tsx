// Beyond Design section for the About page
// Displays a heading and cards with personal interests
export default function BeyondDesign() {
  // Array of personal interests to display
  const interests = [
    {
      title: "Health Advocacy",
      description:
        "I volunteer with local health literacy programs to help make medical information more accessible to underserved communities.",
    },
    {
      title: "Outdoor Enthusiast",
      description:
        "When I'm not designing, you'll find me hiking or rock climbing—activities that help me maintain perspective and creative energy.",
    },
    {
      title: "Continuous Learning",
      description:
        "I'm currently exploring the intersection of AI and healthcare design, taking courses in machine learning to better understand future opportunities.",
    },
  ]

  return (
    <section id="beyond" className="scroll-mt-24 bg-muted p-8 rounded-lg" aria-labelledby="beyond-heading">
      <h2 id="beyond-heading" className="text-3xl md:text-4xl font-bold font-playfair mb-8">
        Beyond Design
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {interests.map((interest, index) => (
          <div key={index} className="p-6 bg-background rounded-lg">
            <h3 className="text-xl font-bold mb-2">{interest.title}</h3>
            <p>{interest.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
