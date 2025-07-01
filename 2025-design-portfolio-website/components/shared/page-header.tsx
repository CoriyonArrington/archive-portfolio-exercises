/**
 * PageHeader component
 *
 * A consistent header for all main pages
 * Includes a title, optional description, and maintains consistent spacing
 */
interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className = "" }: PageHeaderProps) {
  return (
    <section className={`mb-8 ${className}`}>
      <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6">{title}</h1>
      {description && (
        <p className="text-lg text-muted-foreground max-w-4xl line-clamp-2 overflow-hidden">{description}</p>
      )}
    </section>
  )
}
