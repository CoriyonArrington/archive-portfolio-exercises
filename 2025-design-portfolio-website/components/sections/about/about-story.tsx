/**
 * AboutStory Component
 *
 * This component displays the designer's background story,
 * including their journey into product design and design philosophy.
 *
 * Accessibility features:
 * - Semantic heading structure
 * - Proper section labeling with aria-labelledby
 */
export default function AboutStory() {
  return (
    <section id="story" className="scroll-mt-24" aria-labelledby="story-heading">
      <h2 id="story-heading" className="text-3xl md:text-4xl font-bold font-playfair mb-8">
        My Story
      </h2>
      <div className="space-y-6 text-lg">
        <p>
          My journey into product design began with a foundation in biomedical engineering, where I developed a deep
          understanding of healthcare challenges. This unique perspective has shaped my approach to design, allowing me
          to bridge the gap between technical feasibility and human needs. Over the past five years, I've collaborated
          with healthcare startups and established medical technology companies to create intuitive, accessible digital
          products.
        </p>
        <p>
          What drives me is the opportunity to make a tangible difference in people's lives. Whether designing a patient
          portal that reduces anxiety or a clinical dashboard that helps healthcare providers make better decisions, I'm
          passionate about creating solutions that contribute to better health outcomes. My design philosophy centers on
          empathy, evidence, and impact—deeply understanding user needs, making design decisions based on research, and
          measuring success through meaningful outcomes.
        </p>
      </div>
    </section>
  )
}

