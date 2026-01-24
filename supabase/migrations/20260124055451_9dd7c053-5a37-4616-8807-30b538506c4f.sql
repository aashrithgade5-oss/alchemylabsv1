-- Drop the problematic recursive policy
DROP POLICY IF EXISTS "Only admins can view admin users" ON public.admin_users;

-- Create a new policy using the is_admin function to avoid recursion
CREATE POLICY "Admins can view admin_users"
ON public.admin_users
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));