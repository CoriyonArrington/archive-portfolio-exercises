// components/layout/content-section.tsx
import React from 'react';
import { cn } from '@/lib/utils'; // Assuming you use clsx/tailwind-merge via utils

interface ContentSectionProps {
    children: React.ReactNode;
    variant?: 'default' | 'narrow' | 'wide' | 'full'; // Optional variants for max-width
    className?: string; // Class for the outer <section> element
    containerClassName?: string; // Optional class for the inner container div
    id?: string; // Allow passing an ID
    // Add other specific HTML attributes you commonly need, e.g.:
    // 'aria-labelledby'?: string;
}

export default function ContentSection({
    children,
    variant = 'default',
    className,
    containerClassName,
    id,
    // other explicitly defined props...
}: ContentSectionProps) {

    const maxWidthClasses = {
        default: 'max-w-7xl', // Standard wide container
        narrow: 'max-w-3xl', // For centered text blocks
        wide: 'max-w-screen-xl', // Wider than default
        full: 'max-w-full', // Takes full width
    };

    return (
        // Using <section> directly, avoids the 'as' prop complexity
        <section
            id={id} // Pass id explicitly
            className={cn(
                'py-16 md:py-24', // Standard vertical padding
                className // Apply passed classes to the outer element
            )}
            // Pass other explicit props here if needed, e.g. aria-labelledby
        >
            <div
                className={cn(
                    'container mx-auto', // Standard horizontal padding and centering
                    maxWidthClasses[variant], // Apply max-width based on variant
                    containerClassName // Apply passed classes to the inner container
                )}
            >
                {children}
            </div>
        </section>
    );
}