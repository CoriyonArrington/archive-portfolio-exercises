// components/common/service-card.tsx (Updated)
import React from 'react';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Import cn
import type { ServiceCardProps } from '@/types/services'; // Import updated type

// Optional: If you use icons
// import { IconName } from 'lucide-react';

export default function ServiceCard({
    title,
    description,
    link,
    // icon: Icon,
    className, // Destructure className
}: ServiceCardProps) {
    // Ensure link is a valid, non-empty string before rendering the footer/button
    const hasValidLink = link && link.trim() !== '';

    return (
         <Card className={cn("flex flex-col h-full", className)}> {/* Use cn */}
            <CardHeader className="flex-row items-center gap-4">
                {/* {Icon && <Icon className="w-6 h-6 text-primary" />} */}
                <div className="flex-1">
                    {/* Using Shadcn's CardTitle - likely sufficient */}
                    <CardTitle>{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                {/* Using Shadcn's CardDescription - likely sufficient */}
                <CardDescription>{description}</CardDescription>
            </CardContent>
            {/* Only render footer if link is valid */}
            {hasValidLink && (
                <CardFooter>
                    <Button variant="link" asChild className="p-0 h-auto text-primary">
                        {/* Use the validated link */}
                        <Link href={link}>Learn More</Link>
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}