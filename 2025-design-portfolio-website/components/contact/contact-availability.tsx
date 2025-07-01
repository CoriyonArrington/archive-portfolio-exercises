/**
 * ContactAvailability Component
 *
 * This component displays the designer's availability for different types of work.
 *
 * Accessibility features:
 * - Semantic heading structure
 * - Proper list structure
 * - Decorative icons marked as aria-hidden
 */
export default function ContactAvailability() {
  // Array of availability options
  const availabilityOptions = [
    "Full-time design positions",
    "Freelance projects",
    "Design consultations",
    "Speaking engagements",
  ]

  return (
    <div className="p-6 bg-muted rounded-lg">
      <h3 className="text-xl font-bold mb-4">Availability</h3>
      <p className="mb-4">Currently available for:</p>
      <ul className="space-y-2">
        {availabilityOptions.map((option, index) => (
          <li key={index} className="flex items-start">
            <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-2" aria-hidden="true"></div>
            <span>{option}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
