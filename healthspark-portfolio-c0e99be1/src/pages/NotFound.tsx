
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

/**
 * NotFound - 404 Error Page
 * 
 * Displays a user-friendly 404 error page when users attempt to access
 * non-existent routes. Logs the attempted path to the console for debugging.
 * 
 * Accessibility features:
 * - Semantic HTML structure
 * - Clear visual hierarchy
 * - Descriptive link text
 * - Focus-visible styling
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log attempted access to non-existent route for debugging
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section 
        className="min-h-[80vh] flex items-center justify-center"
        aria-labelledby="not-found-title"
      >
        <div className="text-center max-w-lg mx-auto p-8">
          <h1 className="text-9xl font-bold text-gray-200" aria-hidden="true">404</h1>
          <h2 id="not-found-title" className="text-3xl font-semibold mt-4 mb-6 dark:text-white">
            Page not found
          </h2>
          <p className="text-muted-foreground mb-8 dark:text-gray-300">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="rounded-full">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Return to home
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
