import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { H1, H2, H3, H4, P, Lead, Blockquote, Code, List, InlineLink } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { SectionHeading } from "@/components/shared/section-heading"
import { CTASection } from "@/components/shared/cta-section"
import { ImageCard } from "@/components/shared/image-card"
import FormField from "@/components/shared/form-field"

export const metadata: Metadata = {
  title: "Design System | Portfolio",
  description: "Design system documentation for the portfolio website",
}

export default function DesignSystemPage() {
  return (
    <div className="container py-10">
      <H1>Design System</H1>
      <Lead>This page showcases the design system components used throughout the portfolio website.</Lead>

      <section className="my-12">
        <H2 id="typography">Typography</H2>
        <div className="space-y-6 mt-6">
          <div>
            <H1>Heading 1</H1>
            <P>Used for main page titles</P>
          </div>
          <div>
            <H2>Heading 2</H2>
            <P>Used for section titles</P>
          </div>
          <div>
            <H3>Heading 3</H3>
            <P>Used for subsection titles</P>
          </div>
          <div>
            <H4>Heading 4</H4>
            <P>Used for card titles and smaller sections</P>
          </div>
          <div>
            <P>Paragraph text is used for the main content throughout the site.</P>
          </div>
          <div>
            <Lead>Lead text is used for introductory paragraphs and important information.</Lead>
          </div>
          <div>
            <Blockquote>Blockquotes are used for testimonials and highlighting important quotes.</Blockquote>
          </div>
          <div>
            <P>
              You can use <Code>inline code</Code> for technical terms or code snippets.
            </P>
          </div>
          <div>
            <List>
              <li>List item one</li>
              <li>List item two</li>
              <li>List item three</li>
            </List>
          </div>
          <div>
            <P>
              You can also use <InlineLink href="#">inline links</InlineLink> to direct users to other pages.
            </P>
          </div>
        </div>
      </section>

      <section className="my-12">
        <H2 id="buttons">Buttons</H2>
        <div className="flex flex-wrap gap-4 mt-6">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button disabled>Disabled Button</Button>
          <Button size="sm">Small Button</Button>
          <Button size="lg">Large Button</Button>
        </div>
      </section>

      <section className="my-12">
        <H2 id="cards">Cards</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <P>This is the main content of the card.</P>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>

          <ImageCard src="/placeholder.svg?height=200&width=300" alt="Placeholder image" title="Image Card">
            <P>This card includes an image at the top.</P>
          </ImageCard>

          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
            </CardHeader>
            <CardContent>
              <P>A simpler card with just a title and content.</P>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="my-12">
        <H2 id="badges">Badges</H2>
        <div className="flex flex-wrap gap-2 mt-6">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
        </div>
      </section>

      <section className="my-12">
        <H2 id="forms">Form Elements</H2>
        <div className="max-w-md mt-6">
          <FormField
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            hint="We'll never share your email with anyone else."
          />
          <FormField label="Password" id="password" type="password" placeholder="Enter your password" required />
          <FormField
            label="Invalid Field"
            id="invalid"
            error="This field has an error"
            placeholder="This field has an error"
          />
          <div className="mt-4">
            <Button>Submit</Button>
          </div>
        </div>
      </section>

      <section className="my-12">
        <H2 id="section-headings">Section Headings</H2>
        <div className="space-y-12 mt-6">
          <SectionHeading
            title="Left-aligned Heading"
            description="This is a left-aligned section heading with a description."
          />
          <SectionHeading
            title="Center-aligned Heading"
            description="This is a center-aligned section heading with a description."
            align="center"
          />
          <SectionHeading
            title="Right-aligned Heading"
            description="This is a right-aligned section heading with a description."
            align="right"
          />
        </div>
      </section>

      <section className="my-12">
        <H2 id="cta-sections">CTA Sections</H2>
        <div className="space-y-12 mt-6">
          <CTASection
            title="Default CTA Section"
            description="This is the default style for CTA sections."
            buttonText="Get Started"
            buttonLink="#"
          />
          <CTASection
            title="Subtle CTA Section"
            description="This is a more subtle style for CTA sections."
            buttonText="Learn More"
            buttonLink="#"
            variant="subtle"
          />
          <CTASection
            title="Outline CTA Section"
            description="This is an outlined style for CTA sections."
            buttonText="Contact Us"
            buttonLink="#"
            variant="outline"
          />
        </div>
      </section>

      <section className="my-12">
        <H2 id="loading-states">Loading States</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </section>
    </div>
  )
}
