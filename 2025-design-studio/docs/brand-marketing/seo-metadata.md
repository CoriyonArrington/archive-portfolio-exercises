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
