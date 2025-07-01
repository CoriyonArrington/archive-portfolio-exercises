# 🪩 Brand & Marketing Guide — Coriyon’s Studio

> This guide consolidates the site configuration, CMS structure, and metadata strategy that drive the studio’s brand experience and SEO footprint.

---

## 1. ⚙️ Site Configuration

# ⚙️ Site Configuration — Coriyon’s Studio

The site configuration is managed in `config/site.ts` and used throughout the app to manage metadata, navigation, and core branding. This file supports dynamic rendering, SEO enhancements, and CMS templating.

---

## 🌐 Site Metadata

- **Name**: `"Coriyon's Studio"`
- **Description**: `"A UX design studio helping people feel better through thoughtful digital experiences."`
- **URL**: Pulled from `NEXT_PUBLIC_SITE_URL` environment variable
- **OG Image**: Default Open Graph image used for social previews
- **Keywords**: `["UX Design", "Health Tech", "Portfolio", "Coriyon Arrington", "Accessibility", "Interactive Tools"]`

---

## 🧭 Navigation Structure

### Main Navigation (Header)
- Home (`/`)
- Work (`/work`)
- Services (`/services`)
- About (`/about`)
- Contact (`/contact`)

### Footer Navigation (Grouped by Category)

#### UX Solutions
- UX Research & Testing (`/ux-research-user-testing`)
- UX Audits & Optimization (`/ux-audits-optimization`)
- Mobile App UX (`/mobile-app-ux-design`)
- AI-Powered Full-Stack Apps (`/ai-fullstack-app-development`)

#### Community
- Speaking (`/speaking`)
- UXPA MN (`/uxpa-mn`)
- Minneapolis UX Design (`/minneapolis-ux-design`)

#### Explore
- Playground (`/playground`)
- FAQs (`/faq`)
- Blog (`/blog`)

#### Resources
- Process (`/process`)

---

## 🖼️ Branding & Assets

- **Logo**: `public/images/logo.svg`
- **Favicon**: `public/favicon.ico`
- **Default OG Image**: `public/og-image.jpg`
- **Fonts**: Nunito Sans (body), Montserrat (headings)

---

## 🔑 SEO & Social Sharing

- Dynamically injects `title`, `description`, and `canonical` tags
- Custom meta per page type (solution, case study, etc.)
- OG tags (`og:title`, `og:image`, etc.) from `site.ts` defaults or CMS
- Twitter card support: `summary_large_image`

---

Let me know if you'd like this exported into a JSON schema, admin UI config panel, or editable CMS version.


---

## 2. 🧱 CMS Model Diagram

# 🧱 CMS Model Diagram — Coriyon’s Studio

This document outlines how content types relate within the CMS. These models power the admin dashboard and public-facing pages, managed through a modular `pages` table and related content entities.

---

## 🌐 Primary Content Model: `pages`

The `pages` table is the root of the CMS content system and links with specialized collections via type or slug-based dynamic routing.

### Fields
- `id` (UUID)
- `title` (TEXT)
- `slug` (TEXT)
- `type` (TEXT — "main", "solution", "community", "resource", etc.)
- `content` (JSONB)
- `user_id`, `created_at`, `updated_at`

---

## 🔁 Related Collections by Type

### ➤ Main Pages
Examples: Home, About, Services, Contact  
- Standalone, stored in `pages`

### ➤ UX Solutions
Examples: Mobile App UX, UX Audits  
- Type = "solution"  
- Fully CMS-controlled under `/services/:slug`

### ➤ Community
Examples: Speaking, UXPA MN  
- Type = "community"  
- Used for credibility & social proof content

### ➤ Resources
Examples: FAQ, Process, Blog  
- Type = "resource"  
- Stored in `pages`, with dynamic subcontent stored in:
  - `faqs`
  - `process_phases`
  - `blog` (future)

---

## 📦 CMS-Controlled Collections

These tables support repeatable, structured content:

| Table           | Description                              |
|------------------|------------------------------------------|
| `projects`       | Portfolio case studies                   |
| `services`       | UX services offered                      |
| `testimonials`   | Social proof (quote, name, role)         |
| `faqs`           | Answers to common client questions       |
| `process_phases` | Steps in the UX design process           |
| `blog` (future)  | Thought leadership & marketing           |

---

## 🧠 Admin Dashboard Mapping

Each collection maps directly to a dashboard route:

| Route                     | Table/Entity         |
|---------------------------|----------------------|
| `/dashboard/pages`        | `pages`              |
| `/dashboard/projects`     | `projects`           |
| `/dashboard/services`     | `services`           |
| `/dashboard/testimonials` | `testimonials`       |
| `/dashboard/faqs`         | `faqs`               |
| `/dashboard/process-phases` | `process_phases`   |
| `/dashboard/blog` (future)  | `blog`             |

---

## 💡 Notes

- All content types support metadata: `user_id`, `created_at`, `updated_at`
- Most dynamic routes pull from `pages` or match via `slug`
- Extensible with playground tools and internal references if needed

Let me know if you want a visual version of this using Mermaid.js or diagram image format!


---

## 3. 📈 SEO Metadata


# 📈 SEO Metadata — Coriyon’s Studio

This guide defines how metadata is structured and optimized for SEO, social sharing, and discoverability across all major platforms. It supports both static and CMS-driven pages.

---

## 🧠 Metadata Fields (Global)

These are set in `config/site.ts` and injected on all pages:

| Field         | Description                                    |
|---------------|------------------------------------------------|
| `title`       | The default site name or page-specific title   |
| `description` | Description shown in search and social previews|
| `url`         | Canonical URL of the current page              |
| `og:image`    | Open Graph image for social sharing            |
| `keywords`    | Array of SEO keywords for the brand            |
| `twitter:card`| Sets format for Twitter link preview           |

---

## 🧾 Page-Specific Meta (Via CMS or Page Component)

Each CMS-managed page supports optional overrides for metadata:

| Field              | Where it's used                        |
|--------------------|----------------------------------------|
| `meta_title`       | Overrides `<title>`                    |
| `meta_description` | Overrides `<meta name="description">` |
| `meta_image`       | Overrides OG image for page            |
| `slug`             | Used to generate canonical and OG URLs |

---

## 🔍 SEO Strategy Notes

- Slugs are short, keyword-rich, and match content hierarchy
- Blog posts and UX services use dynamic routing: `/blog/:slug`, `/services/:slug`
- Open Graph and Twitter meta tags are dynamically generated
- Sitemap and robots.txt are included via `next-sitemap`
- Pages are pre-rendered and optimized with ISR where applicable

Let me know if you'd like a JSON config version or dynamic meta field integration for the CMS.