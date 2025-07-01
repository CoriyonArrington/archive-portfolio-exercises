# Database Schema

## Tables

### projects
- `id`: UUID (Primary Key)
- `created_at`: Timestamp
- `title`: Text
- `slug`: Text (Unique)
- `description`: Text
- `content`: JSON
- `thumbnail_url`: Text
- `featured`: Boolean
- `published`: Boolean
- `category`: Text
- `tags`: Text[]
- `client`: Text
- `year`: Integer
- `images`: JSON

### testimonials
- `id`: UUID (Primary Key)
- `created_at`: Timestamp
- `client_name`: Text
- `client_title`: Text
- `client_company`: Text
- `content`: Text
- `rating`: Integer
- `featured`: Boolean
- `avatar_url`: Text
- `project_id`: UUID (Foreign Key)

### services
- `id`: UUID (Primary Key)
- `created_at`: Timestamp
- `title`: Text
- `slug`: Text (Unique)
- `description`: Text
- `icon`: Text
- `features`: Text[]
- `benefits`: Text[]
- `order`: Integer
- `image_url`: Text

### faqs
- `id`: UUID (Primary Key)
- `created_at`: Timestamp
- `question`: Text
- `answer`: Text
- `category`: Text
- `order`: Integer

### process_steps
- `id`: UUID (Primary Key)
- `created_at`: Timestamp
- `title`: Text
- `description`: Text
- `phase`: Text
- `order`: Integer
- `icon`: Text
- `activities`: Text[]
- `deliverables`: Text[]

### profiles
- `id`: UUID (Primary Key)
- `created_at`: Timestamp
- `user_id`: UUID
- `email`: Text
- `role`: Text
- `name`: Text

## Row-Level Security (RLS) Policies

The database uses RLS policies to restrict access:

- Public tables allow read-only access
- Admin operations require authentication with the appropriate role
- Service role key bypasses RLS for server-side operations

## Database Relationships

### One-to-Many Relationships
- A project can have multiple testimonials
- A service can have multiple FAQs
- A process phase can have multiple process steps

### Many-to-Many Relationships
- Projects can have multiple tags
- Services can have multiple features and benefits

## Data Access Patterns

### Public Access
- Read-only access to published projects, testimonials, services, FAQs, and process steps
- No access to unpublished content or admin-only tables

### Admin Access
- Full CRUD access to all tables
- Ability to publish/unpublish content
- Ability to feature/unfeature content

## Database Migrations

Database migrations are managed through SQL scripts in the `db/` and `sql/` directories. These scripts should be run in order to set up the database schema and initial data.

## Supabase Configuration

The Supabase project requires:
- Database tables as defined above
- Storage buckets for images
- Authentication with email/password for admin users
- Row-level security policies for data protection
\`\`\`
