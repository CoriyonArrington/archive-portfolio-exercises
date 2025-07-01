import { type NextRequest, NextResponse } from "next/server"
import { getProjectBySlug } from "@/lib/projects"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    if (!slug) {
      return NextResponse.json({ error: "Project slug is required" }, { status: 400 })
    }

    // Get the project data
    const project = await getProjectBySlug(slug)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Generate HTML content for the case study with print-friendly styling
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${project.title} - Case Study</title>
        <style>
          @page {
            margin: 1cm;
          }
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
            color: #000;
            background: #fff;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #000;
          }
          h2 {
            font-size: 18px;
            margin-top: 20px;
            margin-bottom: 10px;
            color: #000;
          }
          .metadata {
            margin-bottom: 20px;
          }
          .section {
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          .outcomes-list {
            padding-left: 20px;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          .download-btn {
            display: inline-block;
            background-color: #0070f3;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
            margin-bottom: 20px;
            font-weight: bold;
          }
          /* Print-specific styles */
          @media print {
            body {
              width: 100%;
              max-width: none;
              padding: 0;
              margin: 0;
            }
            .no-print {
              display: none;
            }
          }
        </style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
        <script>
          window.onload = function() {
            // Add a button to convert to PDF
            const printBtn = document.getElementById('print-btn');
            const downloadPdfBtn = document.createElement('button');
            downloadPdfBtn.innerText = 'Download as PDF';
            downloadPdfBtn.className = 'download-btn';
            downloadPdfBtn.style.marginLeft = '10px';
            downloadPdfBtn.onclick = function() {
              const { jsPDF } = window.jspdf;
              const doc = new jsPDF();
              
              // Hide the buttons for PDF generation
              const actionBar = document.querySelector('.no-print');
              actionBar.style.display = 'none';
              
              // Use html2canvas to capture the content
              html2pdf().from(document.body).save('${project.title.toLowerCase().replace(/\s+/g, "-")}-case-study.pdf');
              
              // Show the buttons again
              setTimeout(() => {
                actionBar.style.display = 'block';
              }, 100);
            };
            
            const actionBar = document.querySelector('.no-print');
            actionBar.appendChild(downloadPdfBtn);
          };
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
      </head>
      <body>
        <div class="no-print" style="background: #f0f0f0; padding: 10px; margin-bottom: 20px; border-radius: 4px;">
          <p><strong>To save as PDF:</strong> Use your browser's print function (Ctrl+P or Cmd+P) and select "Save as PDF" as the destination.</p>
          <button id="print-btn" class="download-btn" onclick="window.print()">Print / Save as PDF</button>
        </div>
        
        <h1>${project.title} - Case Study</h1>
        
        <div class="metadata">
          <p><strong>Client:</strong> ${project.client || "N/A"}</p>
          <p><strong>Year:</strong> ${project.year || "N/A"}</p>
          <p><strong>Role:</strong> ${project.role || "N/A"}</p>
          <p><strong>Duration:</strong> ${project.duration || "N/A"}</p>
        </div>
        
        ${
          project.thumbnailUrl
            ? `
          <div class="section">
            <img src="${project.thumbnailUrl}" alt="${project.title} thumbnail" style="width: 100%; max-width: 600px; height: auto; border-radius: 4px; margin-bottom: 20px;">
          </div>
        `
            : ""
        }
        
        <div class="section">
          <h2>Project Description</h2>
          <p>${project.description || ""}</p>
        </div>
        
        <div class="section">
          <h2>The Challenge</h2>
          <p>${project.challenge || ""}</p>
        </div>
        
        <div class="section">
          <h2>The Solution</h2>
          <p>${project.solution || ""}</p>
        </div>
        
        ${
          project.outcomes && project.outcomes.length > 0
            ? `
          <div class="section">
            <h2>Outcomes & Impact</h2>
            <ul class="outcomes-list">
              ${project.outcomes.map((outcome) => `<li>${outcome}</li>`).join("")}
            </ul>
          </div>
        `
            : ""
        }
        
        ${
          project.images && project.images.length > 0
            ? `
          <div class="section">
            <h2>Project Gallery</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 20px;">
              ${project.images
                .map(
                  (image, index) => `
                <div style="flex: 1 1 300px; max-width: 100%; margin-bottom: 10px;">
                  <img src="${image}" alt="${project.title} - Image ${index + 1}" style="width: 100%; height: auto; max-width: 100%; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }
      </body>
      </html>
    `

    // Return the HTML content with appropriate headers for direct viewing
    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html",
      },
    })
  } catch (error) {
    console.error("Error generating case study:", error)
    return NextResponse.json(
      { error: `Failed to generate case study: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
