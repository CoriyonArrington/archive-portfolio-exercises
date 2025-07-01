# Addressing Responsiveness Issues

This document outlines the collaborative workflow for identifying, reporting, and fixing responsiveness issues in the application UI between the developer (you) and the AI assistant.

## Purpose

To ensure a consistent and efficient process for making the application layout, components, and typography adapt correctly across different screen sizes (mobile, tablet, desktop).

## Workflow Steps

1.  **Developer: Identify Issue**
    * Use browser developer tools (DevTools) to simulate various device viewports or manually resize the browser window.
    * Review pages and sections, focusing on common breakpoints (e.g., ~375px, ~420px, 768px, 1024px).
    * Identify specific elements or layouts that break, look awkward, or function poorly at certain sizes (e.g., text wrapping, element overlap, grid collapsing, horizontal scroll).

2.  **Developer: Report Issue**
    * Clearly communicate the identified issue to the AI assistant. Include the following details:
        * **Location:** Which page and specific section/component is affected? (e.g., "Home Page, Services Section", "`ProjectCard` component"). Mentioning the component filename (e.g., `services-section.tsx`) is very helpful.
        * **Breakpoint:** At what screen size or breakpoint does the issue occur? (e.g., "on small mobile screens below `sm`", "at the `md` breakpoint").
        * **Problem Description:** What exactly is happening? (e.g., "The headline text wraps onto 4 lines", "The grid columns are overlapping", "Horizontal scroll appears").
        * **Desired Outcome:** What should the correct behavior be? (e.g., "The headline font size should be smaller", "The grid columns should stack vertically", "The element should be hidden").
        * **(Optional but Recommended):** Provide a screenshot illustrating the problem, especially for complex layout issues. Callouts can help pinpoint specific areas.

3.  **AI Assistant: Analyze & Propose Solution**
    * Acknowledge the reported issue and context.
    * Analyze the problem based on the description, screenshot (if provided), and knowledge of the relevant component code and Tailwind CSS.
    * Identify the necessary code changes (e.g., adjusting Tailwind utility classes with responsive prefixes like `sm:`, `md:`, `lg:`, modifying component structure, adding helper classes like `truncate`).
    * Provide the updated code snippet(s) or the complete updated file(s).
    * Explain the reasoning behind the proposed changes.

4.  **Developer: Implement & Test**
    * Apply the code changes provided by the AI assistant.
    * Re-test the component/section in the browser DevTools at the relevant breakpoints (and potentially others to check for regressions).

5.  **Developer: Feedback & Iteration**
    * **If Fixed:** Confirm the issue is resolved. Proceed to identify the next responsiveness issue.
    * **If Not Fixed (or Partially Fixed):** Provide feedback on what still isn't working, potentially with another description or screenshot. The process repeats from Step 3.

---

*This collaborative loop ensures clear communication and helps pinpoint the exact code changes needed to achieve the desired responsive behavior efficiently.*