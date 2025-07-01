"use client"

/**
 * File Naming Conventions
 *
 * This file defines the naming conventions for different types of files
 * in the project to ensure consistency across the codebase.
 */

export const fileNamingConventions = {
  components: {
    pattern: "kebab-case.tsx",
    examples: {
      correct: ["button.tsx", "project-card.tsx", "testimonial-grid.tsx"],
      incorrect: ["Button.tsx", "projectCard.tsx", "TestimonialGrid.tsx"],
    },
    exceptions: ["index.tsx"],
  },

  pages: {
    pattern: "page.tsx",
    examples: {
      correct: ["page.tsx", "layout.tsx", "loading.tsx", "error.tsx"],
      incorrect: ["index.tsx", "home-page.tsx", "AboutPage.tsx"],
    },
  },

  apiRoutes: {
    pattern: "route.ts",
    examples: {
      correct: ["route.ts"],
      incorrect: ["api.ts", "endpoints.ts", "handler.ts"],
    },
  },

  utils: {
    pattern: "kebab-case.ts",
    examples: {
      correct: ["date-utils.ts", "string-helpers.ts", "format-currency.ts"],
      incorrect: ["dateUtils.ts", "StringHelpers.ts", "FormatCurrency.ts"],
    },
  },

  hooks: {
    pattern: "use-kebab-case.ts",
    examples: {
      correct: ["use-media-query.ts", "use-local-storage.ts", "use-form-validation.ts"],
      incorrect: ["useMediaQuery.ts", "UseLocalStorage.ts", "media-query-hook.ts"],
    },
  },

  types: {
    pattern: "kebab-case.ts",
    examples: {
      correct: ["project-types.ts", "testimonial-types.ts", "api-responses.ts"],
      incorrect: ["projectTypes.ts", "TestimonialTypes.ts", "ApiResponses.ts"],
    },
  },

  contexts: {
    pattern: "kebab-case-context.ts",
    examples: {
      correct: ["theme-context.ts", "auth-context.ts", "navigation-context.ts"],
      incorrect: ["themeContext.ts", "ThemeContext.ts", "context-theme.ts"],
    },
  },

  actions: {
    pattern: "kebab-case-action.ts",
    examples: {
      correct: ["create-project-action.ts", "update-testimonial-action.ts", "delete-user-action.ts"],
      incorrect: ["createProjectAction.ts", "UpdateTestimonialAction.ts", "deleteUser.ts"],
    },
  },
}

export const componentNamingConventions = {
  components: {
    pattern: "PascalCase",
    examples: {
      correct: ["Button", "ProjectCard", "TestimonialGrid"],
      incorrect: ["button", "project-card", "testimonialGrid"],
    },
  },

  hooks: {
    pattern: "useHookName",
    examples: {
      correct: ["useMediaQuery", "useLocalStorage", "useFormValidation"],
      incorrect: ["UseMediaQuery", "media-query", "getLocalStorage"],
    },
  },

  contextProviders: {
    pattern: "NameContext and NameProvider",
    examples: {
      correct: [
        "ThemeContext and ThemeProvider",
        "AuthContext and AuthProvider",
        "NavigationContext and NavigationProvider",
      ],
      incorrect: [
        "themeContext and themeProvider",
        "Theme_Context and Theme_Provider",
        "contextTheme and providerTheme",
      ],
    },
  },

  types: {
    pattern: "PascalCase",
    examples: {
      correct: ["Project", "Testimonial", "UserProfile"],
      incorrect: ["project", "testimonial_type", "user-profile"],
    },
  },

  props: {
    pattern: "ComponentNameProps",
    examples: {
      correct: ["ButtonProps", "ProjectCardProps", "TestimonialGridProps"],
      incorrect: ["button_props", "ProjectCardParameters", "testimonialGridAttr"],
    },
  },
}

export const propNamingConventions = {
  pattern: "camelCase",
  examples: {
    correct: ["onClick", "primaryColor", "isActive", "hasError"],
    incorrect: ["OnClick", "primary_color", "is-active", "HasError"],
  },
  specialCases: {
    boolean: {
      pattern: "is*, has*, can*, should*",
      examples: ["isActive", "hasError", "canEdit", "shouldRefresh"],
    },
    handlers: {
      pattern: "on*",
      examples: ["onClick", "onSubmit", "onToggle", "onValueChange"],
    },
    render: {
      pattern: "render*",
      examples: ["renderItem", "renderHeader", "renderFooter"],
    },
  },
}

export const importNamingConventions = {
  aliases: {
    "@/components": "For component imports",
    "@/lib": "For utility functions and services",
    "@/hooks": "For custom React hooks",
    "@/types": "For TypeScript type definitions",
    "@/styles": "For styles and design tokens",
    "@/app": "For app-specific code",
  },
  ordering: [
    "React and Next.js imports",
    "Third-party library imports",
    "Project imports (using aliases)",
    "Relative imports",
    "Type imports",
    "CSS imports",
  ],
  examples: {
    correct: `
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Button } from '@/components';
import { formatDate } from '@/lib/utils';
import { useMediaQuery } from '@/hooks';

import { ProjectCard } from './project-card';
import type { Project } from '@/types';

import './styles.css';
    `,
    incorrect: `
import { ProjectCard } from './project-card';
import { formatDate } from '@/lib/utils';
import './styles.css';
import { useState, useEffect } from 'react';
import type { Project } from '../../types';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui';
import { useMediaQuery } from '../../hooks';
    `,
  },
}

