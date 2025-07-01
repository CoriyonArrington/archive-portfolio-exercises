// components/common/testimonial-card.tsx - Updated
import React from 'react';
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"; // Use Shadcn Card
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Use Shadcn Avatar for image

// Define props - align with Supabase types if possible
interface TestimonialCardProps {
  name: string;
  role: string | null;
  quote: string;
  imageUrl?: string | null;
}

export function TestimonialCard({ name, role, quote, imageUrl }: TestimonialCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="pt-6 flex-grow"> {/* Add padding top, allow quote to grow */}
        <p className="text-lg italic">&quot;{quote}&quot;</p>
      </CardContent>
      <CardFooter className="flex items-center gap-4">
         <Avatar>
            {imageUrl && <AvatarImage src={imageUrl} alt={`${name}'s portrait`} />}
            {/* Simple fallback with initials */}
            <AvatarFallback>{name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        <div>
          <cite className="block font-semibold not-italic">{name}</cite>
          {role && <span className="text-sm text-muted-foreground">{role}</span>}
        </div>
      </CardFooter>
    </Card>
  );
}