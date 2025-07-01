// Replace the entire component with a version that doesn't render anything

interface DownloadCaseStudyButtonProps {
  project: any // Replace 'any' with the actual type of 'project' if known
}

export function DownloadCaseStudyButton({ project }: DownloadCaseStudyButtonProps) {
  // Return null to hide the button completely
  return null
}

