import fs from "fs"
import path from "path"
import { getAllProjects } from "./projects"

// This function will be called during build time to generate static PDFs
export async function generateStaticPDFs() {
  try {
    console.log("Generating static PDFs for all projects...")

    // Create the static PDFs directory if it doesn't exist
    const staticPDFsDir = path.join(process.cwd(), "public", "static-pdfs")
    if (!fs.existsSync(staticPDFsDir)) {
      fs.mkdirSync(staticPDFsDir, { recursive: true })
    }

    // Get all projects
    const projects = await getAllProjects()

    // For each project, generate a static HTML file that can be printed as PDF
    for (const project of projects) {
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${project.title} - Case Study</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 {
              font-size: 28px;
              margin-bottom: 10px;
            }
            h2 {
              font-size: 22px;
              margin-top: 30px;
              margin-bottom: 10px;
            }
            p {
              margin-bottom: 16px;
            }
            .meta {
              color: #666;
              font-size: 14px;
              margin-bottom: 30px;
            }
            .section {
              margin-bottom: 30px;
            }
            ul {
              padding-left: 20px;
            }
            li {
              margin-bottom: 8px;
            }
          </style>
        </head>
        <body>
          <h1>${project.title}</h1>
          <div class="meta">
            ${project.client ? `<p><strong>Client:</strong> ${project.client}</p>` : ""}
            ${project.year ? `<p><strong>Year:</strong> ${project.year}</p>` : ""}
            ${project.role ? `<p><strong>Role:</strong> ${project.role}</p>` : ""}
            ${project.duration ? `<p><strong>Duration:</strong> ${project.duration}</p>` : ""}
          </div>
          
          <div class="section">
            <p>${project.description}</p>
          </div>
          
          ${
            project.challenge
              ? `
          <div class="section">
            <h2>Challenge</h2>
            <p>${project.challenge}</p>
          </div>
          `
              : ""
          }
          
          ${
            project.solution
              ? `
          <div class="section">
            <h2>Solution</h2>
            <p>${project.solution}</p>
          </div>
          `
              : ""
          }
          
          ${
            project.process && project.process.length > 0
              ? `
          <div class="section">
            <h2>Process</h2>
            <ul>
              ${project.process
                .map(
                  (step) => `
                <li>
                  <strong>${step.phase}:</strong> ${step.description}
                </li>
              `,
                )
                .join("")}
            </ul>
          </div>
          `
              : ""
          }
          
          ${
            project.outcomes && project.outcomes.length > 0
              ? `
          <div class="section">
            <h2>Outcomes</h2>
            <ul>
              ${project.outcomes.map((outcome) => `<li>${outcome}</li>`).join("")}
            </ul>
          </div>
          `
              : ""
          }
          
          ${
            project.tools && project.tools.length > 0
              ? `
          <div class="section">
            <h2>Tools Used</h2>
            <p>${project.tools.join(", ")}</p>
          </div>
          `
              : ""
          }
        </body>
        </html>
      `

      // Write the HTML file
      const htmlFilePath = path.join(staticPDFsDir, `${project.slug}.html`)
      fs.writeFileSync(htmlFilePath, htmlContent)

      console.log(`Generated static HTML for ${project.title}`)
    }

    console.log("Static HTML files generated successfully")
    return true
  } catch (error) {
    console.error("Error generating static PDFs:", error)
    return false
  }
}
