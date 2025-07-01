/**
 * ContactInfo Component
 *
 * This component displays the designer's contact information.
 *
 * Accessibility features:
 * - Semantic heading structure
 * - Proper list structure
 * - Decorative icons marked as aria-hidden
 */
import { Mail, MapPin } from "lucide-react"

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8">Contact Information</h2>
      <div className="space-y-6">
        <div className="flex items-start">
          <Mail className="h-5 w-5 mr-3 mt-1 text-primary" aria-hidden="true" />
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-muted-foreground">coriyonarrington@gmail.com</p>
          </div>
        </div>
        <div className="flex items-start">
          <MapPin className="h-5 w-5 mr-3 mt-1 text-primary" aria-hidden="true" />
          <div>
            <h3 className="font-medium">Location</h3>
            <p className="text-muted-foreground">Minneapolis, MN</p>
            <p className="text-muted-foreground">Available for remote work worldwide</p>
          </div>
        </div>
      </div>
    </div>
  )
}

