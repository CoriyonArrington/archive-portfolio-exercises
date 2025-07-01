import type { Metadata } from "next";
import Link from "next/link"; // Needed for Quick Links

// --- Shadcn UI Imports ---
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Form } from "@/components/ui/form";

// --- Custom Typography Imports ---
import { H1, H2, H3, H4, P, Lead, Blockquote, Code, List, InlineLink } from "@/components/typography";

// --- Custom Page Section Component Imports ---
import CTASection from "@/components/page-sections/cta-section";
import HeroSection from "@/components/page-sections/hero-section";

// --- Icon Import (Using Lucide) ---
import { Home as HomeIcon, Settings as SettingsIcon, Trash2 as TrashIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: "Design System | [Your Project Name]", // Update project name
  description: "Visual guide to the project's design system tokens and components.",
};

// --- Define Sections for Quick Links ---
const sections = [
  { id: "colors", title: "Color System" },
  { id: "typography", title: "Typography" },
  { id: "spacing", title: "Spacing" },
  { id: "breakpoints", title: "Breakpoints" },
  { id: "borderradius", title: "Border Radius" },
  { id: "shadows", title: "Shadows" },
  { id: "animations", title: "Animations" },
  { id: "iconography", title: "Iconography" },
  { id: "components", title: "Components" },
];

export default function DesignSystemPage() {
  return (
    <div className="container py-10">
      <header className="mb-12">
        <H1>Design System</H1>
        <Lead>Visual guide to the project's design system tokens and components.</Lead>
      </header>

      {/* --- Quick Links Navigation (Static) --- */}
      <nav className="mb-16 p-4 border rounded-lg"> {/* Removed sticky, top, z, bg, backdrop, max-h, overflow */}
        <H4 className="mb-3">On This Page</H4>
        <ul className="space-y-1.5">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                {section.title}
              </a>
              {/* Sub-links for components if needed */}
              {section.id === 'components' && (
                <ul className="pl-4 space-y-1 mt-1.5">
                   <li><a href="#buttons" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Buttons</a></li>
                   <li><a href="#cards" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Cards</a></li>
                   <li><a href="#badges" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Badges</a></li>
                   <li><a href="#forms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Form Elements</a></li>
                   <li><a href="#loading-states" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Loading States</a></li>
                   <li><a href="#page-sections" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Page Sections</a></li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* --- Design System Sections --- */}
      <div className="space-y-16"> {/* Wrapper div for consistent spacing */}

        {/* 1. Colors */}
        {/* Removed scroll-mt */}
        <section id="colors">
          <H2>Color System</H2>
          <P>Defined via HSL CSS variables for easy theming.</P>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
            <ColorSwatch title="Primary" bgColor="bg-primary" textColor="text-primary-foreground" />
            <ColorSwatch title="Secondary" bgColor="bg-secondary" textColor="text-secondary-foreground" />
            <ColorSwatch title="Destructive" bgColor="bg-destructive" textColor="text-destructive-foreground" />
            <ColorSwatch title="Accent" bgColor="bg-accent" textColor="text-accent-foreground" />
            <ColorSwatch title="Background" bgColor="bg-background" textColor="text-foreground" border />
            <ColorSwatch title="Foreground" bgColor="bg-foreground" textColor="text-background" border />
            <ColorSwatch title="Card" bgColor="bg-card" textColor="text-card-foreground" border />
            <ColorSwatch title="Muted" bgColor="bg-muted" textColor="text-muted-foreground" border />
            <ColorSwatch title="Border" bgColor="bg-border" textColor="text-foreground" />
            <ColorSwatch title="Input" bgColor="bg-input" textColor="text-foreground" border />
            <ColorSwatch title="Ring" bgColor="bg-ring" textColor="text-foreground" />
          </div>
        </section>

        {/* 2. Typography */}
        <section id="typography" className="border-t pt-12"> {/* Removed scroll-mt */}
          <H2>Typography</H2>
          <P>Fonts: Nunito Sans (Body), Montserrat (Headings).</P>
          <div className="space-y-6 mt-6">
            <div><H1>Heading 1</H1><P>Used for main page titles</P></div>
            <div><H2>Heading 2</H2><P>Used for section titles</P></div>
            <div><H3>Heading 3</H3><P>Used for subsection titles</P></div>
            <div><H4>Heading 4</H4><P>Used for card titles and smaller sections</P></div>
            <div><P>Paragraph text is used for the main content.</P></div>
            <div><Lead>Lead text is used for introductory paragraphs.</Lead></div>
            <div><Blockquote>Blockquotes are used for highlighting important quotes.</Blockquote></div>
            <div><P>You can use <Code>inline code</Code> for code snippets.</P></div>
            <div><List><li>List item one</li><li>List item two</li></List></div>
            <div><P>Use <InlineLink href="#">inline links</InlineLink> for navigation.</P></div>
          </div>
        </section>

        {/* 3. Spacing */}
        <section id="spacing" className="border-t pt-12"> {/* Removed scroll-mt */}
          <H2>Spacing</H2>
          <P>Using the "Inside-Out Spacing" method with a 4px base scale (4px-120px).</P>
          <div className="space-y-6 mt-6">
            <div>
              <H4>Margin Example (Vertical Rhythm)</H4>
              <div className="bg-muted p-4 rounded">
                <div className="bg-card p-2 rounded mb-1">Item 1 (mb-1 = 4px)</div>
                <div className="bg-card p-2 rounded mb-2">Item 2 (mb-2 = 8px)</div>
                <div className="bg-card p-2 rounded mb-4">Item 3 (mb-4 = 16px)</div>
                <div className="bg-card p-2 rounded mb-8">Item 4 (mb-8 = 32px)</div>
                <div className="bg-card p-2 rounded">Item 5 (no margin)</div>
              </div>
              <P>Components manage their own bottom margin (`mb-*`).</P>
            </div>
            <div>
              <H4>Padding Example (Internal Space)</H4>
              <div className="flex flex-wrap gap-4">
                <div className="bg-primary text-primary-foreground p-1 rounded">p-1 (4px)</div>
                <div className="bg-primary text-primary-foreground p-2 rounded">p-2 (8px)</div>
                <div className="bg-primary text-primary-foreground p-4 rounded">p-4 (16px)</div>
                <div className="bg-primary text-primary-foreground p-6 rounded">p-6 (24px)</div>
                <div className="bg-primary text-primary-foreground p-8 rounded">p-8 (32px)</div>
              </div>
              <P>Padding (`p-*`) creates space inside an element's border.</P>
            </div>
             <div>
              <H4>Gap Example (Flex/Grid Children)</H4>
              <div className="flex flex-wrap gap-4 bg-muted p-4 rounded">
                 <div className="bg-card p-4 rounded">Item A</div>
                 <div className="bg-card p-4 rounded">Item B</div>
                 <div className="bg-card p-4 rounded">Item C</div>
              </div>
               <P>Gap (`gap-*`) spaces direct children in flex/grid containers.</P>
            </div>
          </div>
        </section>

        {/* 4. Breakpoints */}
        <section id="breakpoints" className="border-t pt-12"> {/* Removed scroll-mt */}
          <H2>Breakpoints</H2>
          <P>Standard responsive breakpoints (sm, md, lg, xl, 2xl). Applied mobile-first.</P>
          <div className="mt-6 p-4 border rounded space-y-2">
              <P>Resize your browser to see changes:</P>
              <div className="p-2 bg-red-200 rounded">Visible on all screens</div>
              <div className="hidden sm:block p-2 bg-orange-200 rounded">Visible sm (640px) and up</div>
              <div className="hidden md:block p-2 bg-yellow-200 rounded">Visible md (768px) and up</div>
              <div className="hidden lg:block p-2 bg-green-200 rounded">Visible lg (1024px) and up</div>
              <div className="hidden xl:block p-2 bg-blue-200 rounded">Visible xl (1280px) and up</div>
              <div className="hidden 2xl:block p-2 bg-purple-200 rounded">Visible 2xl (1536px) and up</div>
          </div>
           <P className="mt-2 text-sm text-muted-foreground">Container max-width is 1400px at 2xl.</P>
        </section>

        {/* 5. Border Radius */}
         <section id="borderradius" className="border-t pt-12"> {/* Removed scroll-mt */}
          <H2>Border Radius</H2>
          <P>Uses CSS variable `--radius`.</P>
          <div className="flex flex-wrap gap-4 mt-6">
             <div className="w-24 h-24 bg-muted border rounded-sm flex items-center justify-center">sm</div>
             <div className="w-24 h-24 bg-muted border rounded-md flex items-center justify-center">md (default)</div>
             <div className="w-24 h-24 bg-muted border rounded-lg flex items-center justify-center">lg</div>
          </div>
        </section>

        {/* 6. Shadows */}
        <section id="shadows" className="border-t pt-12"> {/* Removed scroll-mt */}
           <H2>Shadows</H2>
           <P>Consistent shadow scale for elevation.</P>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              <div className="p-6 border rounded shadow-sm"><P>sm</P></div>
              <div className="p-6 border rounded shadow"><P>DEFAULT</P></div>
              <div className="p-6 border rounded shadow-md"><P>md</P></div>
              <div className="p-6 border rounded shadow-lg"><P>lg</P></div>
              <div className="p-6 border rounded shadow-xl"><P>xl</P></div>
              <div className="p-6 border rounded shadow-2xl"><P>2xl</P></div>
           </div>
        </section>

         {/* 7. Animations */}
        <section id="animations" className="border-t pt-12"> {/* Removed scroll-mt */}
          <H2>Animations</H2>
          <P>Includes accordion, float, fade-in, pulse, move-up.</P>
           <div className="flex flex-wrap gap-8 items-center mt-6">
              <div className="w-16 h-16 bg-primary rounded-lg animate-pulse"></div>
              <P className="mb-0">Pulse</P>
           </div>
        </section>

         {/* 8. Iconography */}
         <section id="iconography" className="border-t pt-12"> {/* Removed scroll-mt */}
          <H2>Iconography</H2>
          <P>Using Lucide Icons.</P>
           <div className="flex flex-wrap gap-6 items-center mt-6 text-foreground">
               <HomeIcon className="w-4 h-4" /> <P className="mb-0">Default (16px)</P>
               <SettingsIcon className="w-5 h-5" /> <P className="mb-0">Size 5 (20px)</P>
               <TrashIcon className="w-6 h-6 text-destructive" /> <P className="mb-0">Size 6 (24px), Destructive Color</P>
           </div>
         </section>

        {/* 9. Components */}
        <section id="components" className="border-t pt-12"> {/* Removed scroll-mt */}
          <H2>Components</H2>
          <P>Core UI elements built with Shadcn/UI and custom components.</P>

          {/* --- UI Components (from components/ui) --- */}
          {/* Removed scroll-mt from subsections */}
          <div className="mt-8 space-y-12" id="buttons">
              <H3 className="mb-6">Buttons</H3>
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
                <Button disabled>Disabled</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
              </div>
          </div>

          <div className="mt-12 space-y-12" id="cards">
              <H3 className="mb-6">Cards</H3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <Card>
                   <CardHeader>
                     <CardTitle>Standard Card</CardTitle>
                     <CardDescription>Card description</CardDescription>
                   </CardHeader>
                   <CardContent><P>Card content goes here.</P></CardContent>
                   <CardFooter><Button size="sm">Action</Button></CardFooter>
                 </Card>
                 <Card>
                   <CardHeader><CardTitle>Simple Card</CardTitle></CardHeader>
                   <CardContent><P>Just title and content.</P></CardContent>
                 </Card>
               </div>
          </div>

           <div className="mt-12 space-y-12" id="badges">
              <H3 className="mb-6">Badges</H3>
              <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
              </div>
           </div>

           <div className="mt-12 space-y-12" id="forms">
               <H3 className="mb-6">Form Elements (UI)</H3>
               <div className="max-w-md space-y-4">
                 <div className="grid w-full max-w-sm items-center gap-1.5">
                   <Label htmlFor="ds-email-ui">Email (UI)</Label>
                   <Input type="email" id="ds-email-ui" placeholder="your@email.com" />
                   <P className="text-sm text-muted-foreground mt-1">Helper text example.</P>
                 </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                   <Label htmlFor="ds-name-ui">Name (UI)</Label>
                   <Input type="text" id="ds-name-ui" placeholder="Your Name" />
                 </div>
               <Button>Submit Example</Button>
               </div>
           </div>


          <div className="mt-12 space-y-12" id="loading-states">
              <H3 className="mb-6">Loading States (Skeleton)</H3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-7 w-3/5" />
                    <Skeleton className="h-4 w-4/5 mt-2" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                  </CardContent>
                </Card>
                <div className="space-y-3">
                  <Skeleton className="h-8 w-full rounded-md" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
           </div>

          {/* --- Page Section Components --- */}
          <div className="mt-16 space-y-12 border-t pt-12" id="page-sections"> {/* Removed scroll-mt */}
               <H3 className="mb-6">Page Sections</H3>

               {/* Hero Section Demo */}
               <div>
                   <H4 className="mb-4">Hero Section</H4>
                   <HeroSection
                      headline="Example Hero Headline"
                      subheadline="This is an example subheadline demonstrating the HeroSection component."
                      cta="Learn More"
                   />
                   <hr className="my-8"/>
                   <HeroSection
                       headline="Hero Without CTA"
                       subheadline="This version of the hero section does not include a call to action button."
                   />
               </div>

               <hr className="my-8"/>

               {/* CTA Section Demo */}
               <div>
                   <H4 className="mb-4">CTA Section</H4>
                   <CTASection
                     headline="Ready to Get Started?"
                     body="This is a reusable call to action section component."
                     cta="Contact Us Now"
                     href="/contact"
                   />
                    <hr className="my-8"/>
                    <CTASection
                      headline="Another CTA Example"
                      body="This is a reusable call to action section component."
                      cta="Sign Up"
                      href="/sign-up"
                   />
               </div>
          </div>
        </section>

      </div> {/* End wrapper div */}
    </div>
  );
}

// Helper component for color swatches
function ColorSwatch({ title, bgColor, textColor, border = false }: { title: string, bgColor: string, textColor: string, border?: boolean }) {
  return (
    <div className="text-center">
      <div className={`h-20 w-full rounded ${bgColor} ${border ? 'border' : ''} flex items-center justify-center`}>
        <span className={`text-xs font-medium ${textColor}`}>Aa</span>
      </div>
      <P className="text-sm mt-2 mb-0">{title}</P>
      <Code className="text-xs">{bgColor}</Code>
    </div>
  );
}