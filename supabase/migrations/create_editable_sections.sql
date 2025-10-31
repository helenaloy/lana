-- Create editable_sections table for storing editable content
CREATE TABLE IF NOT EXISTS public.editable_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section VARCHAR(255) NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on section for faster lookups
CREATE INDEX IF NOT EXISTS idx_editable_sections_section ON public.editable_sections(section);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_editable_sections_updated_at
  BEFORE UPDATE ON public.editable_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.editable_sections ENABLE ROW LEVEL SECURITY;

-- Create policy: Allow authenticated users to read
CREATE POLICY "Allow authenticated users to read editable_sections"
  ON public.editable_sections
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy: Allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert editable_sections"
  ON public.editable_sections
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy: Allow authenticated users to update
CREATE POLICY "Allow authenticated users to update editable_sections"
  ON public.editable_sections
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy: Allow authenticated users to delete (optional)
CREATE POLICY "Allow authenticated users to delete editable_sections"
  ON public.editable_sections
  FOR DELETE
  TO authenticated
  USING (true);

-- Allow public read access for displaying on website
CREATE POLICY "Allow public to read editable_sections"
  ON public.editable_sections
  FOR SELECT
  TO anon
  USING (true);

