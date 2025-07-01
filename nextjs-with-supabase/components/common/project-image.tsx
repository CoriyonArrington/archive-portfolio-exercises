// components/common/project-image.tsx
"use client"; // Mark this as a Client Component

import React from 'react';

// Using standard <img> tag for simpler onError handling.

interface ProjectImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    // Inherit standard img attributes (src, alt, className, etc.)
    fallbackSrc?: string; // Optional fallback image source
}

const ProjectImage: React.FC<ProjectImageProps> = ({
    src,
    alt,
    className = "",
    // Defaulting to your Supabase SVG placeholder URL (ensure it's correct and public)
    fallbackSrc = "https://lwanuwbdwxlcbnwiricu.supabase.co/storage/v1/object/public/project-visuals/600x400.svg",
    onError, // Capture any onError passed from props
    ...props // Pass any other standard img attributes
}) => {

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const imgElement = e.currentTarget;
        // Prevent infinite loop if fallback also fails or isn't set
        if (fallbackSrc && imgElement.src !== fallbackSrc) {
            console.warn(`Image failed to load: ${src}. Falling back to ${fallbackSrc}`);
            imgElement.src = fallbackSrc;
        } else if (!fallbackSrc) {
             console.warn(`Image failed to load: ${src}. No fallback specified.`);
             // Optionally hide the image or show a placeholder style
             imgElement.style.display = 'none'; // Example: hide broken image
        } else {
             // Log the error if the fallback itself fails
             console.error(`Fallback image also failed to load or is the same as src: ${fallbackSrc}`);
             // Optionally hide the image or show a placeholder style
             imgElement.style.display = 'none'; // Example: hide broken image
        }

        // Call original onError handler if it was passed
        if (typeof onError === 'function') {
            onError(e);
        }
    }; // Ensure this closing brace and semicolon are correct

    // Render the standard img tag
    return (
        <img
            src={src} // src is required
            alt={alt || ""} // Provide default empty alt text
            className={className}
            onError={handleError} // Use the client-side error handler
            {...props} // Pass down other props like style, etc.
        />
    ); // Ensure this closing parenthesis and semicolon are correct

}; // Ensure this closing brace and semicolon for the component definition are correct

// Export the component
export default ProjectImage; // This should be the last substantive line

// Ensure there are no stray characters or unclosed template literals (`) below this line.

