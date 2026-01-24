-- Add UPDATE policy to restrict updates to admins only
CREATE POLICY "Only admins can update submissions"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));