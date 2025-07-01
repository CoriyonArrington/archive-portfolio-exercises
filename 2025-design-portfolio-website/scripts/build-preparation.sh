import { validateEnv } from "../lib/env-validation"
import { generateStaticPDFs } from "../lib/static-pdf-generator"

async function buildPreparation() {
  console.log("Running build preparation...")

  // Validate environment variables
  const { valid, missing } = validateEnv()

  if (!valid) {
    console.error("❌ Missing required environment variables:", missing.join(", "))
    console.error("Build will continue, but some features may not work correctly.")
  } else {
    console.log("✅ All required environment variables are present.")
  }

  // Generate static PDFs
  try {
    console.log("Generating static PDFs...")
    const result = await generateStaticPDFs()

    if (result) {
      console.log("✅ Static PDFs generated successfully.")
    } else {
      console.error("❌ Failed to generate static PDFs.")
    }
  } catch (error) {
    console.error("❌ Error generating static PDFs:", error)
  }

  console.log("Build preparation completed.")
}

// Run the build preparation
buildPreparation().catch((error) => {
  console.error("Build preparation failed:", error)
  // Don't exit with error to allow the build to continue
})

