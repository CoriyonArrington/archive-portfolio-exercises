#!/bin/bash

# Simplified Duplicate Component Cleanup
# This script provides a more straightforward approach to handling duplicate components

set -e

echo "Starting Simplified Duplicate Component Cleanup"

# Create reports directory if it doesn't exist
mkdir -p reports

# Create a log file for the changes
changes_log="reports/simplified_duplicate_cleanup.md"
echo "# Simplified Duplicate Component Cleanup" > "$changes_log"
echo "" >> "$changes_log"
echo "Generated on: $(date)" >> "$changes_log"
echo "" >> "$changes_log"
echo "## Components Processed" >> "$changes_log"
echo "" >> "$changes_log"
echo "| Component | Action | Location |" >> "$changes_log"
echo "|-----------|--------|----------|" >> "$changes_log"

# Process duplicate components
echo "Processing duplicate components..."

# Preferred locations in order of priority
declare -A preferred_locations
preferred_locations=(
  ["about-cta.tsx"]="components/sections/about/about-cta.tsx"
  ["about-hero.tsx"]="components/sections/about/about-hero.tsx"
  ["about-nav.tsx"]="components/sections/about/about-nav.tsx"
  ["about-page-content.tsx"]="components/sections/about/about-page-content.tsx"
  ["about-sidebar-nav.tsx"]="components/sections/about/about-sidebar-nav.tsx"
  ["about-sidebar.tsx"]="components/sections/about/about-sidebar.tsx"
  ["about-story.tsx"]="components/sections/about/about-story.tsx"
  ["admin-layout.tsx"]="components/admin/layout/admin-layout.tsx"
  ["admin-sidebar.tsx"]="components/admin/layout/admin-sidebar.tsx"
  ["audit-dashboard-api-update.tsx"]="components/admin/dashboard/audit-dashboard-api-update.tsx"
  ["audit-dashboard.tsx"]="components/admin/dashboard/audit-dashboard.tsx"
  ["audit-skeleton.tsx"]="components/admin/common/audit-skeleton.tsx"
  ["beyond-design.tsx"]="components/sections/about/beyond-design.tsx"
  ["calendly-section.tsx"]="components/sections/home/calendly-section.tsx"
  ["case-study-nav.tsx"]="components/sections/work/case-study-nav.tsx"
  ["challenges-section.tsx"]="components/sections/home/challenges-section.tsx"
  ["client-journey-overview.tsx"]="components/sections/process/client-journey-overview.tsx"
  ["client-logos.tsx"]="components/sections/testimonials/client-logos.tsx"
  ["client-problems.tsx"]="components/sections/home/client-problems.tsx"
  ["client-project-form.tsx"]="components/admin/projects/client-project-form.tsx"
  ["code-duplication-list.tsx"]="components/admin/common/code-duplication-list.tsx"
  ["component-status-list.tsx"]="components/admin/dashboard/component-status-list.tsx"
  ["contact-availability.tsx"]="components/sections/contact/contact-availability.tsx"
  ["contact-form.tsx"]="components/sections/contact/contact-form.tsx"
  ["contact-info.tsx"]="components/sections/contact/contact-info.tsx"
  ["cta-section.tsx"]="components/sections/common/cta-section.tsx"
  ["data-table.tsx"]="components/admin/common/data-table.tsx"
  ["delete-faq-button.tsx"]="components/admin/faqs/delete-faq-button.tsx"
  ["delete-process-step-button.tsx"]="components/admin/process/delete-process-step-button.tsx"
  ["delete-service-button.tsx"]="components/admin/services/delete-service-button.tsx"
  ["download-resume-button.tsx"]="components/sections/about/download-resume-button.tsx"
  ["education.tsx"]="components/sections/about/education.tsx"
  ["engagement-models.tsx"]="components/sections/services/engagement-models.tsx"
  ["faq-form.tsx"]="components/admin/faqs/faq-form.tsx"
  ["faqs-list.tsx"]="components/admin/faqs/faqs-list.tsx"
  ["featured-projects.tsx"]="components/sections/projects/featured-projects.tsx"
  ["featured-testimonials-server.tsx"]="components/sections/testimonials/featured-testimonials-server.tsx"
  ["featured-testimonials-wrapper.tsx"]="components/sections/testimonials/featured-testimonials-wrapper.tsx"
  ["featured-testimonials.tsx"]="components/sections/testimonials/featured-testimonials.tsx"
  ["featured-work.tsx"]="components/sections/home/featured-work.tsx"
  ["floating-stat-card.tsx"]="components/sections/home/floating-stat-card.tsx"
  ["footer-contact.tsx"]="components/sections/contact/footer-contact.tsx"
  ["footer.tsx"]="components/layout/footer/footer.tsx"
  ["form-button.tsx"]="components/admin/common/form-button.tsx"
  ["form-field.tsx"]="components/admin/common/form-field.tsx"
  ["general-image-uploader.tsx"]="components/admin/images/general-image-uploader.tsx"
  ["health-score.tsx"]="components/admin/dashboard/health-score.tsx"
  ["hero-section.tsx"]="components/sections/home/hero-section.tsx"
  ["hero-showcase-wrapper.tsx"]="components/sections/home/hero-showcase-wrapper.tsx"
  ["hero-showcase.tsx"]="components/sections/home/hero-showcase.tsx"
  ["hero-testimonial-section.tsx"]="components/sections/testimonials/hero-testimonial-section.tsx"
  ["hero-testimonial.tsx"]="components/sections/testimonials/hero-testimonial.tsx"
  ["hero-testimonials.tsx"]="components/sections/testimonials/hero-testimonials.tsx"
  ["home-cta.tsx"]="components/sections/home/home-cta.tsx"
  ["home-hero.tsx"]="components/sections/home/home-hero.tsx"
  ["image-gallery.tsx"]="components/admin/images/image-gallery.tsx"
  ["image-uploader.tsx"]="components/admin/images/image-uploader.tsx"
  ["implementation-checklist.tsx"]="components/admin/dashboard/implementation-checklist.tsx"
  ["loading-projects.tsx"]="components/sections/projects/loading-projects.tsx"
  ["login-form.tsx"]="components/admin/auth/login-form.tsx"
  ["logout-button.tsx"]="components/admin/auth/logout-button.tsx"
  ["mobile-nav.tsx"]="components/layout/navigation/mobile-nav.tsx"
  ["notification-button.tsx"]="components/sections/process/notification-button.tsx"
  ["process-case-studies.tsx"]="components/sections/process/process-case-studies.tsx"
  ["process-cta.tsx"]="components/sections/process/process-cta.tsx"
  ["process-faq.tsx"]="components/sections/process/process-faq.tsx"
  ["process-form.tsx"]="components/admin/process/process-form.tsx"
  ["process-hero.tsx"]="components/sections/process/process-hero.tsx"
  ["process-overview.tsx"]="components/sections/process/process-overview.tsx"
  ["process-step-form.tsx"]="components/admin/process/process-step-form.tsx"
  ["process-steps-list.tsx"]="components/admin/process/process-steps-list.tsx"
  ["process-steps.tsx"]="components/sections/process/process-steps.tsx"
  ["project-card.tsx"]="components/sections/projects/project-card.tsx"
  ["project-detail-content.tsx"]="components/sections/work/project-detail-content.tsx"
  ["project-detail-skeleton.tsx"]="components/sections/work/project-detail-skeleton.tsx"
  ["project-footer-nav.tsx"]="components/sections/projects/project-footer-nav.tsx"
  ["project-form-wrapper.tsx"]="components/admin/projects/project-form-wrapper.tsx"
  ["project-form.tsx"]="components/admin/projects/project-form.tsx"
  ["project-gallery.tsx"]="components/sections/projects/project-gallery.tsx"
  ["project-grid.tsx"]="components/sections/projects/project-grid.tsx"
  ["project-image-editor.tsx"]="components/admin/images/project-image-editor.tsx"
  ["project-list.tsx"]="components/admin/projects/project-list.tsx"
  ["project-nav.tsx"]="components/sections/projects/project-nav.tsx"
  ["project-process-section.tsx"]="components/sections/projects/project-process-section.tsx"
  ["projects-grid.tsx"]="components/sections/work/projects-grid.tsx"
  ["projects-loading.tsx"]="components/sections/work/projects-loading.tsx"
  ["related-projects.tsx"]="components/sections/work/related-projects.tsx"
  ["section-header.tsx"]="components/sections/common/section-header.tsx"
  ["service-form.tsx"]="components/admin/services/service-form.tsx"
  ["service-offerings.tsx"]="components/sections/services/service-offerings.tsx"
  ["service-overview.tsx"]="components/sections/home/service-overview.tsx"
  ["service-solutions.tsx"]="components/sections/services/service-solutions.tsx"
  ["services-cta.tsx"]="components/sections/services/services-cta.tsx"
  ["services-faq.tsx"]="components/sections/services/services-faq.tsx"
  ["services-list.tsx"]="components/admin/services/services-list.tsx"
  ["sidebar.tsx"]="components/admin/layout/sidebar.tsx"
  ["simple-login-form.tsx"]="components/admin/auth/simple-login-form.tsx"
  ["skip-to-content.tsx"]="components/layout/skip-to-content.tsx"
  ["success-stories.tsx"]="components/sections/home/success-stories.tsx"
  ["supabase-debug-client.tsx"]="components/admin/common/supabase-debug-client.tsx"
  ["testimonial-avatars.tsx"]="components/sections/testimonials/testimonial-avatars.tsx"
  ["testimonial-card.tsx"]="components/sections/testimonials/testimonial-card.tsx"
  ["testimonial-debug.tsx"]="components/sections/testimonials/testimonial-debug.tsx"
  ["testimonial-form.tsx"]="components/admin/testimonials/testimonial-form.tsx"
  ["testimonial-grid.tsx"]="components/sections/testimonials/testimonial-grid.tsx"
  ["testimonial-list.tsx"]="components/admin/testimonials/testimonial-list.tsx"
  ["testimonial-preview.tsx"]="components/sections/testimonials/testimonial-preview.tsx"
  ["testimonial-section.tsx"]="components/sections/testimonials/testimonial-section.tsx"
  ["testimonials-case-studies.tsx"]="components/sections/testimonials/testimonials-case-studies.tsx"
  ["testimonials-content.tsx"]="components/sections/testimonials/testimonials-content.tsx"
  ["testimonials-cta.tsx"]="components/sections/testimonials/testimonials-cta.tsx"
  ["testimonials-section.tsx"]="components/sections/testimonials/testimonials-section.tsx"
  ["testimonials-skeleton.tsx"]="components/sections/testimonials/testimonials-skeleton.tsx"
  ["testimonials.tsx"]="components/sections/testimonials/testimonials.tsx"
  ["unused-components-list.tsx"]="components/admin/common/unused-components-list.tsx"
  ["unused-dependencies-list.tsx"]="components/admin/common/unused-dependencies-list.tsx"
  ["work-cta.tsx"]="components/sections/work/work-cta.tsx"
  ["work-experience.tsx"]="components/sections/about/work-experience.tsx"
)

# Count variables
total_processed=0
total_kept=0
total_removed=0

# Process each component
for component in "${!preferred_locations[@]}"; do
  preferred="${preferred_locations[$component]}"
  echo "Processing $component..."
  
  # Find all instances of this component
  instances=$(find components -name "$component")
  
  # Skip if no instances found
  if [ -z "$instances" ]; then
    echo "| $component | Not found | N/A |" >> "$changes_log"
    continue
  fi
  
  # Count instances
  instance_count=$(echo "$instances" | wc -l)
  
  # If only one instance, mark as kept
  if [ "$instance_count" -eq 1 ]; then
    echo "| $component | Kept (single instance) | $(echo "$instances") |" >> "$changes_log"
    ((total_kept++))
    continue
  fi
  
  # Check if preferred location exists
  if [ ! -f "$preferred" ]; then
    # Find the first instance to use as preferred
    preferred=$(echo "$instances" | head -n 1)
    echo "Preferred location not found, using $preferred instead"
  fi
  
  # Mark preferred as kept
  echo "| $component | Kept | $preferred |" >> "$changes_log"
  ((total_kept++))
  
  # Process each instance
  echo "$instances" | while read -r instance; do
    if [ "$instance" != "$preferred" ]; then
      # Remove the duplicate
      echo "| $component | Removed | $instance |" >> "$changes_log"
      rm -f "$instance"
      ((total_removed++))
    fi
  done
  
  ((total_processed++))
done

echo "" >> "$changes_log"
echo "## Summary" >> "$changes_log"
echo "" >> "$changes_log"
echo "- Total components processed: $total_processed" >> "$changes_log"
echo "- Total components kept: $total_kept" >> "$changes_log"
echo "- Total duplicates removed: $total_removed" >> "$changes_log"

echo "Step 2: Updating index files..."
# Update index files to ensure they export the correct components
find components -type d | while read -r dir; do
  if [ -d "$dir" ]; then
    # Skip the root components directory
    if [ "$dir" == "components" ]; then
      continue
    fi
    
    # Create or update the index file
    index_file="$dir/index.ts"
    echo "// Generated index file for $dir" > "$index_file"
    echo "" >> "$index_file"
    
    # Add exports for all .tsx files in the directory
    find "$dir" -maxdepth 1 -name "*.tsx" | sort | while read -r component; do
      component_name=$(basename "$component" .tsx)
      echo "export * from './$component_name'" >> "$index_file"
    done
    
    echo "Updated index file for $dir"
  fi
done

echo "Simplified Duplicate Component Cleanup complete!"
echo "Next steps:"
echo "1. Review the changes log in reports/simplified_duplicate_cleanup.md"
echo "2. Test your application thoroughly"
echo "3. Commit your changes"
echo "4. Congratulations on completing the codebase reorganization!"

read -p "Would you like to commit the changes? (y/n) " commit_changes
if [ "$commit_changes" == "y" ]; then
  git add .
  git commit -m "Simplified Duplicate Component Cleanup"
  echo "Changes committed!"
else
  echo "Simplified Duplicate Component Cleanup complete!"
fi

