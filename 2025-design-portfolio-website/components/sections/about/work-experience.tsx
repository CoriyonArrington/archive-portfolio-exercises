export default function WorkExperience() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-8">Work Experience</h2>

      <div className="relative border-l border-gray-200 pl-8 space-y-12">
        {/* Senior Product Designer */}
        <div className="relative">
          {/* Timeline dot */}
          <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full border border-white bg-primary"></div>

          <div>
            <p className="text-primary font-medium">2021 - Present</p>
            <h3 className="text-xl font-bold mt-1 mb-1">Senior Product Designer</h3>
            <p className="text-muted-foreground mb-4">HealthTech Innovations</p>

            <p className="mb-4">
              Lead designer for digital health products focused on chronic disease management. Collaborate with
              cross-functional teams to deliver user-centered solutions that improve patient outcomes and clinical
              workflows.
            </p>

            <div>
              <h4 className="font-semibold mb-2">Key Achievements:</h4>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>
                  Led the redesign of flagship patient monitoring app, resulting in 40% increase in daily active users
                </li>
                <li>
                  Established the company's first design system, improving design consistency and development efficiency
                  by 30%
                </li>
                <li>
                  Mentored junior designers and established user research practices that reduced development rework by
                  25%
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* UX Designer */}
        <div className="relative">
          {/* Timeline dot */}
          <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full border border-white bg-primary"></div>

          <div>
            <p className="text-primary font-medium">2019 - 2021</p>
            <h3 className="text-xl font-bold mt-1 mb-1">UX Designer</h3>
            <p className="text-muted-foreground mb-4">MedSolutions Inc.</p>

            <p className="mb-4">
              Designed interfaces for medical devices and companion applications, focusing on usability and safety for
              both clinical and home use contexts.
            </p>

            <div>
              <h4 className="font-semibold mb-2">Key Achievements:</h4>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Redesigned critical alarm interfaces, reducing error rates by 35% and improving patient safety</li>
                <li>
                  Conducted extensive field research with patients and healthcare providers that informed product
                  roadmap
                </li>
                <li>
                  Collaborated with regulatory affairs to ensure designs met FDA requirements, accelerating approval
                  process
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Design Intern */}
        <div className="relative">
          {/* Timeline dot */}
          <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full border border-white bg-primary"></div>

          <div>
            <p className="text-primary font-medium">2018 - 2019</p>
            <h3 className="text-xl font-bold mt-1 mb-1">Product Design Intern</h3>
            <p className="text-muted-foreground mb-4">Healthcare Innovations Lab</p>

            <p className="mb-4">
              Assisted in the design and testing of digital health interventions for underserved populations.
            </p>

            <div>
              <h4 className="font-semibold mb-2">Key Achievements:</h4>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>
                  Contributed to the design of a multilingual health education platform that increased user
                  comprehension by 45%
                </li>
                <li>
                  Conducted usability testing with diverse user groups that identified critical accessibility
                  improvements
                </li>
                <li>
                  Presented research findings to stakeholders that influenced $2M in product development decisions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

