-- Fix RLS for orders table
DROP POLICY IF EXISTS "Public can insert orders" ON public.orders;

CREATE POLICY "Enable insert for anonymous users" 
ON public.orders 
FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Enable read access for everyone" 
ON public.orders 
FOR SELECT 
TO anon 
USING (true);

-- Fix RLS for storage.objects (if needed)
DROP POLICY IF EXISTS "Public can upload to mockups" ON storage.objects;
DROP POLICY IF EXISTS "Public can read mockups" ON storage.objects;

CREATE POLICY "Enable upload for anonymous users" 
ON storage.objects 
FOR INSERT 
TO anon 
WITH CHECK (bucket_id = 'mockups');

CREATE POLICY "Enable read access for everyone mockups" 
ON storage.objects 
FOR SELECT 
TO anon 
USING (bucket_id = 'mockups');
