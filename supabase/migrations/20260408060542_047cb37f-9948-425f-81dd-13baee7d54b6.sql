
-- Add only the storage policies that don't exist yet
CREATE POLICY "Authenticated users can upload site images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'site-images');

CREATE POLICY "Authenticated users can update site images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'site-images');

CREATE POLICY "Authenticated users can delete site images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'site-images');
