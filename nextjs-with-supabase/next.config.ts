// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Keep any existing config options you have here */
  // reactStrictMode: true, // Example existing config

  // Add or modify the images configuration
  images: {
    // --- Add dangerouslyAllowSVG ---
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Recommended CSP for SVGs
    // --- End Add dangerouslyAllowSVG ---
    remotePatterns: [
      // Existing pattern for Supabase Storage
      {
        protocol: 'https',
        hostname: 'lwanuwbdwxlcbnwiricu.supabase.co',
      },
      // Added pattern for placeholder images
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      // Add other trusted hostnames here if necessary
    ],
  },
};

export default nextConfig;
