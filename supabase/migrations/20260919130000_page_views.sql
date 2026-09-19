-- First-party, privacy-light pageview counter.
-- No IPs, cookies, user agents or user ids are stored: only path, referrer host, timestamp.
CREATE TABLE IF NOT EXISTS public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL CHECK (char_length(path) BETWEEN 1 AND 200),
  referrer_host text CHECK (referrer_host IS NULL OR char_length(referrer_host) <= 253),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON public.page_views (created_at DESC);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Anyone may record a view (insert only). created_at is left to the default.
CREATE POLICY "Anyone can insert page views"
ON public.page_views
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(path) <= 200
  AND path NOT LIKE '/admin%'
  AND (referrer_host IS NULL OR char_length(referrer_host) <= 253)
);

-- Only admins can read. No UPDATE/DELETE policies => nobody can modify via the API.
CREATE POLICY "Only admins can view page views"
ON public.page_views
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

REVOKE ALL ON public.page_views FROM anon;
GRANT INSERT ON public.page_views TO anon;
GRANT INSERT, SELECT ON public.page_views TO authenticated;
