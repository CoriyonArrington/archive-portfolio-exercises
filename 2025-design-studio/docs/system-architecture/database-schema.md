# 📊 Updated Database Schema — Coriyon’s Studio

This schema powers a fully modular, CMS-enabled UX design studio with a Supabase backend and Next.js 14 App Router. All content types are editable via the admin dashboard, and all user-generated content is secure and extendable.

---

## 🧱 CMS Tables (Admin-Editable)

### `pages`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| title      | TEXT      | Page title                        |
| slug       | TEXT      | URL slug                          |
| type       | TEXT      | main, solution, resource, etc.    |
| content    | JSONB     | Flexible page builder structure   |
| created_at | TIMESTAMP | Auto-generated                    |
| updated_at | TIMESTAMP | Auto-updated                      |
| user_id    | UUID      | Author/editor                     |

### `projects`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| title      | TEXT      | Project name                      |
| slug       | TEXT      | Used for dynamic route            |
| description| TEXT      | Short case summary                |
| content    | JSONB     | Long-form content or modules      |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

### `services`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| title      | TEXT      | Service name                      |
| slug       | TEXT      | SEO slug                          |
| description| TEXT      | Short description                 |
| content    | JSONB     | Long-form details or structure    |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

### `testimonials`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| author     | TEXT      | Person’s name                     |
| role       | TEXT      | Their role or title               |
| quote      | TEXT      | Testimonial content               |
| image_url  | TEXT      | Optional portrait or logo         |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

### `faqs`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| question   | TEXT      | The FAQ question                  |
| answer     | TEXT      | The corresponding answer          |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

### `process_phases`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| phase      | TEXT      | Phase title                       |
| description| TEXT      | What happens during this phase    |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

### `blog` (future)
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| title      | TEXT      | Blog post title                   |
| slug       | TEXT      | Path-based slug                   |
| content    | JSONB     | Markdown or rich content          |
| author_id  | UUID      | Supabase user ID                  |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

---

## 💬 Feedback & Submissions

### `feedback`
| Column           | Type      | Notes                         |
|------------------|-----------|-------------------------------|
| id               | UUID      | Primary key                   |
| message          | TEXT      | Qualitative feedback          |
| source_url       | TEXT      | Where feedback was left       |
| user_agent       | TEXT      | Device/browser metadata       |
| clarity_score    | INT       | Scale 0–10                    |
| usefulness_score | INT       | Scale 0–10                    |
| overall_score    | INT       | Calculated or submitted       |
| user_id          | UUID      | Optional                      |
| created_at       | TIMESTAMP |                               |
| updated_at       | TIMESTAMP |                               |

### `contact_submissions`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| name       | TEXT      | Sender’s name                     |
| email      | TEXT      | Sender’s email                    |
| subject    | TEXT      | Optional subject                  |
| message    | TEXT      | Body of message                   |
| created_at | TIMESTAMP |                                   |

---

## 🧪 Interactive Quiz (Playground Tool)

### `quizzes`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| title      | TEXT      | Quiz name                         |
| slug       | TEXT      | Slug for linking                  |
| description| TEXT      | What the quiz is about            |
| user_id    | UUID      | Author/editor                     |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

### `questions`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| quiz_id    | UUID      | FK → quizzes.id                   |
| text       | TEXT      | The question itself               |
| order      | INT       | Display order                     |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

### `options`
| Column     | Type      | Notes                             |
|------------|-----------|-----------------------------------|
| id         | UUID      | Primary key                       |
| question_id| UUID      | FK → questions.id                 |
| text       | TEXT      | Label or content                  |
| is_correct | BOOLEAN   | True if correct answer            |
| created_at | TIMESTAMP |                                   |
| updated_at | TIMESTAMP |                                   |

---

## 📌 Notes on Metadata and Security

- All key tables include: `created_at`, `updated_at`, and `user_id` fields
- All sensitive routes are protected with Supabase Auth and Row-Level Security (RLS)

Let me know when you're ready to generate:
- 🧠 ERD visual of this structure
- 🧪 Playground schemas for DBT Diary Card or Health Tracker
- ⚙️ Admin API endpoints based on this schema
