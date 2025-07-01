import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), "public")
    const filePath = path.join(publicDir, "coriyon-arrington-resume.pdf")

    const fileExists = fs.existsSync(filePath)
    const publicFiles = fs.readdirSync(publicDir)

    return NextResponse.json({
      fileExists,
      filePath,
      publicFiles,
      publicDir,
    })
  } catch (error) {
    console.error("Error checking PDF:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
