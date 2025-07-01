import { createServerClient } from "@/lib/supabase/server"

export async function checkSchema() {
  const supabase = createServerClient()

  // Check projects table
  const { data: projectColumns, error: projectError } = await supabase.from("projects").select("*").limit(1)

  if (projectError) {
    console.error("Error checking projects table:", projectError)
  } else {
    console.log("Project columns:", projectColumns.length > 0 ? Object.keys(projectColumns[0]) : "No data")
  }

  // Check services table
  const { data: serviceColumns, error: serviceError } = await supabase.from("services").select("*").limit(1)

  if (serviceError) {
    console.error("Error checking services table:", serviceError)
  } else {
    console.log("Service columns:", serviceColumns.length > 0 ? Object.keys(serviceColumns[0]) : "No data")
  }

  // Check testimonials table
  const { data: testimonialColumns, error: testimonialError } = await supabase.from("testimonials").select("*").limit(1)

  if (testimonialError) {
    console.error("Error checking testimonials table:", testimonialError)
  } else {
    console.log("Testimonial columns:", testimonialColumns.length > 0 ? Object.keys(testimonialColumns[0]) : "No data")
  }

  // Check faqs table
  const { data: faqColumns, error: faqError } = await supabase.from("faqs").select("*").limit(1)

  if (faqError) {
    console.error("Error checking faqs table:", faqError)
  } else {
    console.log("FAQ columns:", faqColumns.length > 0 ? Object.keys(faqColumns[0]) : "No data")
  }

  // Check process_steps table (updated from process_phases)
  const { data: processColumns, error: processError } = await supabase.from("process_steps").select("*").limit(1)

  if (processError) {
    console.error("Error checking process_steps table:", processError)

    // Try checking 'process' table instead
    console.log("Checking process table...")
    const { data: processAltColumns, error: processAltError } = await supabase.from("process").select("*").limit(1)

    if (processAltError) {
      console.error("Error checking process table:", processAltError)
    } else {
      console.log("Process columns:", processAltColumns.length > 0 ? Object.keys(processAltColumns[0]) : "No data")
    }
  } else {
    console.log("Process columns:", processColumns.length > 0 ? Object.keys(processColumns[0]) : "No data")
  }

  return {
    projects: projectColumns?.length > 0 ? Object.keys(projectColumns[0]) : [],
    services: serviceColumns?.length > 0 ? Object.keys(serviceColumns[0]) : [],
    testimonials: testimonialColumns?.length > 0 ? Object.keys(testimonialColumns[0]) : [],
    faqs: faqColumns?.length > 0 ? Object.keys(faqColumns[0]) : [],
    process: processColumns?.length > 0 ? Object.keys(processColumns[0]) : [],
  }
}
