-- Contact submissions are written only by the send-contact-email edge function
-- (service role, after Turnstile + rate-limit). Browsers lose direct insert.
-- Deploy together with the updated edge function.
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
