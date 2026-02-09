
-- Add restrictive INSERT, UPDATE, DELETE policies to admin_users
-- Only existing admins can manage admin records

CREATE POLICY "Only admins can insert admin_users"
ON public.admin_users
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update admin_users"
ON public.admin_users
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete admin_users"
ON public.admin_users
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));
