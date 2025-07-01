// components/page-sections/solutions-section.tsx
import React from 'react';
import Link from 'next/link'; // <--- Ensure Link is imported
import { Button } from '@/components/ui/button'; // <--- Ensure Button is imported
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'; // <--- Ensure ALL Card components are imported
import type { Database } from '@/types/supabase'; // Import base DB type

// Define the type for the individual list items fetched from 'solution_pages'
type SolutionPageListItem = Pick<
    Database['public']['Tables']['solution_pages']['Row'],
    'id' | 'slug' | 'title' | 'headline'
>;

// Define the props interface
interface SolutionsSectionProps {
    headline?: string;
    body?: string;
    solution_pages: SolutionPageListItem[];
    cta?: string;
    ctaLink?: string; // Optional link for the section CTA button
}

// --- Component Definition ---
export default function SolutionsSection({
    headline,
    body,
    solution_pages,
    cta,
    ctaLink = "/solutions" // Default value if not provided
}: SolutionsSectionProps) { // <--- Use the defined interface

    // Defensive check for the array
    const hasSolutions = Array.isArray(solution_pages) && solution_pages.length > 0;

    // *** Ensure this return statement and JSX structure is exactly correct ***
    return (
        <section id="solutions-list" className="py-16 md:py-24 bg-muted/50 dark:bg-muted/20">
             <div className="container">
                {/* Centered headline block */}
                {(headline || body) && (
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                        {headline && (
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                                {headline}
                            </h2>
                        )}
                        {body && (
                            <p className="text-lg text-muted-foreground mb-8">
                                {body}
                            </p>
                        )}
                    </div>
                )}

                {/* Grid layout for solution cards */}
                {!hasSolutions ? (
                    <div className="text-center text-muted-foreground">
                        No solutions available at the moment.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {solution_pages.map((solution) => (
                            <Link
                                key={solution.id}
                                href={`/solutions/${solution.slug}`}
                                className="block h-full"
                                aria-label={`Learn more about ${solution.title}`}
                            >
                                <Card className="flex flex-col h-full transition-shadow duration-200 hover:shadow-md">
                                    <CardHeader>
                                        <CardTitle>{solution.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        {solution.headline && (
                                            <CardDescription>{solution.headline}</CardDescription>
                                        )}
                                    </CardContent>
                                </Card>
                             </Link>
                        ))}
                    </div>
                )}

                {/* Centered CTA Button for the whole section */}
                {cta && ctaLink && ( // Make sure ctaLink is also provided for the button
                    <div className="mt-12 md:mt-16 text-center">
                        <Button asChild size="lg">
                            <Link href={ctaLink}>{cta}</Link>
                        </Button>
                    </div>
                )}
            </div> {/* End of container div */}
        </section> // End of section tag
    ); // End of return statement
} // End of component function - **Ensure no stray characters after this**