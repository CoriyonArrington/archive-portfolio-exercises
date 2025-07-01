// components/community/speaking-card.tsx
import React from 'react';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'; // Use your existing Card component
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; // For engagement type

// Define the expected shape of the engagement data
interface SpeakingEngagement {
    id: string;
    title: string;
    event: string;
    date: string; // Consider using Date type if feasible
    description?: string | null; // Optional description
    link?: string | null; // Optional link to slides/video/event page
    type: string; // e.g., Talk, Workshop, Panel
}

interface SpeakingCardProps {
    engagement: SpeakingEngagement;
}

export default function SpeakingCard({ engagement }: SpeakingCardProps) {
    const { title, event, date, description, link, type } = engagement;

    // Format date for display (adjust locale and options as needed)
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Card className="flex flex-col h-full"> {/* Ensure cards in a grid take full height */}
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>
                    {event} - {formattedDate}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"> {/* Allow content to grow */}
                 <Badge variant="secondary" className="mb-3">{type}</Badge>
                 {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                 )}
            </CardContent>
            {link && (
                 <CardFooter>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={link} target="_blank" rel="noopener noreferrer">
                            View Details
                        </Link>
                    </Button>
                 </CardFooter>
            )}
        </Card>
    );
}