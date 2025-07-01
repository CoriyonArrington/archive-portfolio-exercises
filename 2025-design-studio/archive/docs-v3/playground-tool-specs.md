# 🧪 Playground Tool Specs — Coriyon’s Studio

Specs for custom interactive tools used in `/playground`. Each tool is managed via the CMS and supports content-driven customization.

---

## 1. 🎯 Interactive Quiz

| Feature | Description |
|---------|-------------|
| CRUD | Admins manage quizzes, questions, and options |
| Frontend | Timed quiz with results and scoring |
| DB Tables | `quizzes`, `questions`, `options` |
| Fields | title, slug, description, is_correct |
| Use Case | UX education, onboarding quizzes, wellness assessments |

---

## 2. 📊 Health Progress Tracker

| Feature | Description |
|---------|-------------|
| Input | Logs daily/weekly progress via dropdowns or sliders |
| Display | Renders chart over time using saved entries |
| Notes | Optional journal-style notes per entry |
| Use Case | Clients track goals and habits |

---

## 3. 🧘 DBT Diary Card

| Feature | Description |
|---------|-------------|
| Entry | Daily logs of emotions, behaviors, and DBT skills |
| Format | Tabbed UI or checklist format |
| Security | Entries are user-specific and RLS-protected |
| Use Case | Mental health journaling or coaching tools |

---

Let me know if you'd like to generate Figma flows or wireframes for each tool.