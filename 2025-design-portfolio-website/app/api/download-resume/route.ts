import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "coriyon-arrington-resume.pdf")

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Resume file not found" }, { status: 404 })
    }

    const fileBuffer = fs.readFileSync(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="coriyon-arrington-resume.pdf"',
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Error serving resume:", error)
    return NextResponse.json({ error: "Failed to serve resume file" }, { status: 500 })
  }
}
