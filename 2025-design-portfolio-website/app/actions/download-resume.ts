"use server"

// This action is no longer needed as we're using a direct link
// But we'll keep it for backward compatibility
export async function downloadResume() {
  return { success: true }
}

export async function getResumeUrl() {
  return "/coriyon-arrington-resume.pdf"
}
