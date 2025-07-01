-- Create the process_phases table
CREATE TABLE IF NOT EXISTS process_phases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phase_title TEXT NOT NULL,
  phase_subtitle TEXT,
  phase_description TEXT NOT NULL,
  steps JSONB,
  image_url TEXT,
  quote_text TEXT,
  quote_author TEXT,
  outputs JSONB,
  insights JSONB,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert a sample process phase
INSERT INTO process_phases (
  phase_title,
  phase_subtitle,
  phase_description,
  steps,
  image_url,
  quote_text,
  quote_author,
  outputs,
  insights,
  display_order
) VALUES (
  'Discovery',
  'Understanding your needs',
  'The first phase of our process involves understanding your business, goals, and requirements.',
  '[{"title": "Initial Consultation", "description": "We meet to discuss your project needs and goals."}, {"title": "Research", "description": "We research your industry, competitors, and target audience."}, {"title": "Requirements Gathering", "description": "We document all requirements and specifications."}]',
  '/images/discovery.jpg',
  'The discovery phase was incredibly thorough and helped us clarify our vision.',
  'John Smith, CEO',
  '["Project Brief", "Requirements Document", "Competitive Analysis"]',
  '["Understanding user needs is critical", "Clear goals lead to better outcomes", "Research saves time in the long run"]',
  1
);
