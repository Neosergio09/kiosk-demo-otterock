CREATE TABLE orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  garment_type text NOT NULL,
  garment_color text NOT NULL,
  size text NOT NULL,
  image_url text,
  customization_data jsonb
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public insert to orders
CREATE POLICY "Public can insert orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Create storage bucket mockups
INSERT INTO storage.buckets (id, name, public) VALUES ('mockups', 'mockups', true);

-- Policies for mockups bucket
CREATE POLICY "Public can upload to mockups" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'mockups');
CREATE POLICY "Public can read mockups" ON storage.objects
  FOR SELECT USING (bucket_id = 'mockups');
