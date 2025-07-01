#!/bin/bash

# Create types directory if it doesn't exist
mkdir -p types

# Create an index.ts file to re-export all types
cat > types/index.ts << 'EOF'
// Re-export all types
export * from './project-types';
export * from './testimonial-types';
export * from './service-types';
export * from './ui-types';
// Add more exports as you migrate types
EOF

# Create basic type files
echo "Creating type files..."

# Create project-types.ts
cat > types/project-types.ts << 'EOF'
/**
 * Project types
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  featured: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  client?: string;
  year?: number;
  category?: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  url: string;
  alt: string;
  order: number;
  created_at: string;
}

export interface ProjectProcess {
  id: string;
  project_id: string;
  title: string;
  description: string;
  order: number;
  image_url?: string;
  created_at: string;
}
EOF

# Create testimonial-types.ts
cat > types/testimonial-types.ts << 'EOF'
/**
 * Testimonial types
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image_url?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}
EOF

# Create service-types.ts
cat > types/service-types.ts << 'EOF'
/**
 * Service types
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  slug: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}
EOF

# Create ui-types.ts
cat > types/ui-types.ts << 'EOF'
/**
 * UI component types
 */

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}
EOF

echo "Types creation complete!"

