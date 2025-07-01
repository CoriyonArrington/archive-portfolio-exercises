// Education section for the About page
// Displays a heading and cards with education history
export default function Education() {
  return (
    <section id="education" className="scroll-mt-24" aria-labelledby="education-heading">
      <h2 id="education-heading" className="text-3xl md:text-4xl font-bold font-playfair mb-8">
        Education
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">Certificate of Product Design</h3>
          <p className="text-primary mb-1">Thinkful</p>
          <p className="text-muted-foreground mb-4">2019 - 2020</p>
          <p>Specialized in healthcare UX design with a focus on accessibility and inclusive design practices.</p>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">B.S. in Biomedical Engineering</h3>
          <p className="text-primary mb-1">East Carolina University</p>
          <p className="text-muted-foreground mb-4">2010 - 2015</p>
          <p>Focused on medical device design and human factors engineering.</p>
        </div>
      </div>
    </section>
  )
}

