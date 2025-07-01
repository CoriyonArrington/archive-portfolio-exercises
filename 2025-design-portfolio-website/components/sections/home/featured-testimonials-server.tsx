import { createServerClient } from "@/lib/supabase/server"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Helper function to get initials
function getInitials(name: string): string {
  if (!name) return "??"

  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

export async function FeaturedTestimonialsServer() {
  // Directly fetch featured testimonials from Supabase
  const supabase = await createServerClient()

  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("featured", true)
    .order("display_order", { ascending: true })
    .limit(3)

  if (error) {
    console.error("Error fetching featured testimonials:", error)
    return <div className="text-center py-8 text-red-500">Failed to load testimonials</div>
  }

  if (!testimonials || testimonials.length === 0) {
    return <div className="text-center py-8">No featured testimonials available</div>
  }

  console.log("Server-fetched featured testimonials:", testimonials.length)

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold">Success stories</h2>
          <Link href="/testimonials" className="flex items-center gap-2 text-primary hover:underline">
            Read more stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-primary text-4xl mb-4">"</div>
              <blockquote className="mb-6 italic">{testimonial.quote}</blockquote>
              <div className="flex items-center gap-3">
                <Avatar>
                  {testimonial.image ? <AvatarImage src={testimonial.image} alt={testimonial.author} /> : null}
                  <AvatarFallback>{getInitials(testimonial.author)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

