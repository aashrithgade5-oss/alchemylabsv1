-- Patches-2: real newsletter sign-ups. Written only by the server route
-- (service role); no anon policies, so the browser can neither read nor write.
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE CHECK (char_length(email) BETWEEN 3 AND 255),
  source text CHECK (source IS NULL OR char_length(source) <= 60),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS newsletter_subscribers_created_at_idx
  ON public.newsletter_subscribers (created_at DESC);
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
