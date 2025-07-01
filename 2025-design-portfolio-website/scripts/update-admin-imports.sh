#!/bin/bash

# Update imports for admin components
find app -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "from.*components/admin" | while read file; do
  # Update project admin component imports
  sed -i '' "s|from ['\"].*components/admin/project-|from '@/components/admin/projects/project-|g" "$file"
  
  # Update testimonial admin component imports
  sed -i '' "s|from ['\"].*components/admin/testimonial-|from '@/components/admin/testimonials/testimonial-|g" "$file"
  
  # Update service admin component imports
  sed -i '' "s|from ['\"].*components/admin/service-|from '@/components/admin/services/service-|g" "$file"
  
  # Update process admin component imports
  sed -i '' "s|from ['\"].*components/admin/process-|from '@/components/admin/process/process-|g" "$file"
  
  # Update faq admin component imports
  sed -i '' "s|from ['\"].*components/admin/faq-|from '@/components/admin/faqs/faq-|g" "$file"
  
  # Update image admin component imports
  sed -i '' "s|from ['\"].*components/admin/image-|from '@/components/admin/images/image-|g" "$file"
  
  # Update login/auth admin component imports
  sed -i '' "s|from ['\"].*components/admin/login-|from '@/components/admin/auth/login-|g" "$file"
  sed -i '' "s|from ['\"].*components/admin/logout-|from '@/components/admin/auth/logout-|g" "$file"
  
  # Update layout admin component imports
  sed -i '' "s|from ['\"].*components/admin/sidebar|from '@/components/admin/layout/sidebar|g" "$file"
  
  echo "Updated admin imports in $file"
done
