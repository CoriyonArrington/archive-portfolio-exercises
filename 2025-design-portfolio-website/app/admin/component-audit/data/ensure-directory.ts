import fs from "fs"
import path from "path"

// This file ensures the data directory exists
// It's executed at build time

const dataDir = path.join(process.cwd(), "public", "admin", "component-audit", "data")

// Create directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true })
    console.log(`Created directory: ${dataDir}`)

    // Create an empty placeholder file
    const placeholderPath = path.join(dataDir, "README.md")
    fs.writeFileSync(
      placeholderPath,
      "# Component Audit Data\n\nThis directory contains JSON files with component audit data.\n",
    )
    console.log(`Created placeholder file: ${placeholderPath}`)
  } catch (error) {
    console.error(`Error creating directory: ${error}`)
  }
}
