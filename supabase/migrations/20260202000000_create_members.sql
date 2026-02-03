-- Create members table for Club Correcaminos
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  year_joined INTEGER,
  email TEXT UNIQUE,
  phone TEXT,
  instagram TEXT,
  strava TEXT,
  total_marathons INTEGER DEFAULT 0,
  marathon_pr TEXT,            -- normalized HH:MM:SS
  marathon_pr_year INTEGER,
  marathon_pr_city TEXT,
  boston_count INTEGER DEFAULT 0,
  half_marathon_pr TEXT,       -- normalized HH:MM:SS or MM:SS
  ten_k_pr TEXT,               -- normalized MM:SS
  sub3_marathons INTEGER DEFAULT 0,
  most_run_marathon TEXT,
  marathon_cities TEXT[],      -- cities where they've run marathons
  other_marathon_cities TEXT,  -- free-text additional cities
  bio TEXT,
  photo_url TEXT,
  photo_authorized BOOLEAN DEFAULT false,
  is_legend BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for common queries
CREATE INDEX idx_members_year_joined ON members(year_joined);
CREATE INDEX idx_members_total_marathons ON members(total_marathons);
CREATE INDEX idx_members_full_name ON members(full_name);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER members_updated_at
  BEFORE UPDATE ON members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Members are publicly readable"
  ON members FOR SELECT
  USING (true);
