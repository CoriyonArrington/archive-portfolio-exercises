export default function ResumePage() {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "24px" }}>Coriyon Arrington - Resume</h1>

      <p style={{ marginBottom: "32px" }}>
        This is a static HTML version of my resume. You can also{" "}
        <a
          href="/coriyon-arrington-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#10b981", textDecoration: "underline" }}
        >
          view or download the PDF version
        </a>
        .
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", marginTop: "32px" }}>Work Experience</h2>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Senior Product Designer</h3>
        <p style={{ fontStyle: "italic" }}>HealthTech Innovations • 2021 - Present</p>
        <p style={{ marginTop: "8px" }}>
          Lead designer for digital health products focused on chronic disease management.
        </p>
        <ul style={{ marginTop: "8px", paddingLeft: "20px", listStyleType: "disc" }}>
          <li>Led the redesign of flagship patient monitoring app, resulting in 40% increase in daily active users</li>
          <li>
            Established the company's first design system, improving design consistency and development efficiency by
            30%
          </li>
          <li>
            Mentored junior designers and established user research practices that reduced development rework by 25%
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>UX Designer</h3>
        <p style={{ fontStyle: "italic" }}>MedSolutions Inc. • 2019 - 2021</p>
        <p style={{ marginTop: "8px" }}>Designed interfaces for medical devices and companion applications.</p>
        <ul style={{ marginTop: "8px", paddingLeft: "20px", listStyleType: "disc" }}>
          <li>Redesigned critical alarm interfaces, reducing error rates by 35% and improving patient safety</li>
          <li>
            Conducted extensive field research with patients and healthcare providers that informed product roadmap
          </li>
          <li>
            Collaborated with regulatory affairs to ensure designs met FDA requirements, accelerating approval process
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Product Design Intern</h3>
        <p style={{ fontStyle: "italic" }}>Healthcare Innovations Lab • 2018 - 2019</p>
        <p style={{ marginTop: "8px" }}>Assisted in the design and testing of digital health interventions.</p>
        <ul style={{ marginTop: "8px", paddingLeft: "20px", listStyleType: "disc" }}>
          <li>
            Contributed to the design of a multilingual health education platform that increased user comprehension by
            45%
          </li>
          <li>
            Conducted usability testing with diverse user groups that identified critical accessibility improvements
          </li>
          <li>Presented research findings to stakeholders that influenced $2M in product development decisions</li>
        </ul>
      </div>

      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", marginTop: "32px" }}>Education</h2>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Bachelor of Fine Arts, Graphic Design</h3>
        <p style={{ fontStyle: "italic" }}>Design University • 2012 - 2016</p>
      </div>
    </div>
  )
}
