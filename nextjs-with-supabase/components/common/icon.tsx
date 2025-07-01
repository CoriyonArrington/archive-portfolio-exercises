// components/common/icon.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import {
    HelpCircle, // Fallback Icon
    Palette, TrendingDown, MousePointerSquareDashed, Milestone, Sparkles, Gem, TrendingUp, Workflow,
    // Add any other icons listed in your iconMap here...
    type LucideProps // Use type import for LucideProps
} from 'lucide-react';

// Icon map remains the same
const iconMap: { [key: string]: React.FC<LucideProps> } = {
    Palette, TrendingDown, MousePointerSquareDashed, Milestone, Sparkles, Gem, TrendingUp, Workflow, HelpCircle,
};

// --- Fix: Define props explicitly, avoid extending SVGProps directly to prevent 'name' conflict ---
// Extend base HTML attributes for things like id, aria-*, etc.
interface IconProps extends React.HTMLAttributes<SVGSVGElement> {
    iconName?: string | null; // Use the distinct prop name
    size?: string | number;   // Explicitly allow size prop
    color?: string;  // Explicitly allow color prop
    // Add other Lucide props you commonly use if needed (e.g., strokeWidth)
    // className is already part of HTMLAttributes
}

// Use the distinct prop name 'iconName'
export function Icon({ iconName, className, ...props }: IconProps) {
    // Determine which component to render based on iconName
    const IconComponent = (iconName && iconMap[iconName]) ? iconMap[iconName] : HelpCircle;

    // Render the chosen icon component, passing down className and spreading other props
    // Type assertion might be needed on props depending on strictness
    return (
        <IconComponent className={cn(className)} {...props as LucideProps} />
    );
}