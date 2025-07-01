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
