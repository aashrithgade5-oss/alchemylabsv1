-- Add delete policy for authenticated admins
CREATE POLICY "Admins can delete submissions" 
ON public.contact_submissions 
FOR DELETE 
USING (auth.role() = 'authenticated');