# Deployment — what a human must do (status 2026-09-19)

Nothing has been deployed. CLAUDE.md: deploy only on the exact phrase
"yes, upload it to Vercel and make this live."

## Deploy together, in this order
1. `supabase functions deploy send-contact-email` (edge function now owns the insert).
2. Apply `supabase/migrations/20260919120000_contact_server_only_insert.sql`
   (drops anonymous insert on `contact_submissions`). Doing 2 before 1 breaks the form.
3. Deploy the site.

## Edge-function secrets (Supabase dashboard → Functions → Secrets). Names only.
| Name | Needed | Notes |
|---|---|---|
| `TURNSTILE_SECRET_KEY` | yes | without it every submission is rejected |
| `RESEND_API_KEY` | yes | email notifications |
| `RESEND_FROM_EMAIL` | yes for prod | verified-domain sender; falls back to `onboarding@resend.dev` |
| `CONTACT_RECIPIENTS` | optional | comma-separated; defaults to the current admin inbox |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | auto | injected by Supabase |

## Site env (Vercel)
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
`NEXT_PUBLIC_SUPABASE_PROJECT_ID`, `NEXT_PUBLIC_SITE_URL` (canonical domain).

## Still human-only
- Real UPI VPA + card checkout URLs (`lib/payments.ts`).
- Domain + DNS; then add HSTS and a tested CSP in `next.config.js` headers()
  (CSP must allow Turnstile, Supabase, Calendly, Vercel insights — test on a preview first).
- Founder portraits; written permission before any client/brand name is shown as anything but CONCEPT.
- Legal review of /privacy and /terms; cookie banner still offers only "Allow" (needs accept/reject).
- `.env` is not in `.gitignore` (it holds only public keys today) — add it before any secret lands there.

## Rollback
Each work item is one commit (`O-1` … on `main`). `git revert <hash>` per item; for the
contact pipeline, revert the migration by re-creating the insert policy before reverting the function.
