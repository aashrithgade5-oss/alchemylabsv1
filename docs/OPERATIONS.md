# Alchemy Labs · operations guide (Patches-2, 2026-09-27)

## 1. Preview locally (localhost:3000)
```
git fetch origin
git checkout claude/youthful-thompson-2dy1hj
git pull
npm install
copy .env.example .env.local      (Windows)   |   cp .env.example .env.local  (mac)
# edit .env.local: ADMIN_PASSWORD=Alchemy Labs*55 and a 32+ char ADMIN_SESSION_SECRET
npm run dev
```
Open http://localhost:3000 . Hard-refresh (Ctrl+Shift+R) to see the preloader again
(it plays once per browser session, homepage only).

## 2. The private vault
- URL: `/alchemy-vault` (local: http://localhost:3000/alchemy-vault, live: https://alchemylabs.in/alchemy-vault)
- Username: `Alchemy Labs` · Password: the `ADMIN_PASSWORD` env value.
- Not linked anywhere, not in the sitemap, not in robots.txt, `noindex` on every response.
- The old `/admin` and `/admin/auth` URLs return 404.
- Session: signed HttpOnly cookie, 12 hours. 8 wrong attempts per 15 minutes locks that
  connection out for 15 minutes. With the env vars missing the vault stays locked (fails closed).
- Tabs: Briefs (search, reply, CSV), Newsletter (CSV), Traffic (consented page views),
  System (live status of every integration).
- To change the password: edit `ADMIN_PASSWORD` in Vercel and redeploy. Rotating
  `ADMIN_SESSION_SECRET` signs everyone out.

## 3. Briefs and newsletter: how the emails reach you
Both `/api/brief` (contact form) and `/api/newsletter` (footer band) email
aashrithgade5@gmail.com, CC alchemylabs.work@gmail.com, with reply-to set to the sender.
Provider order: Resend > Gmail SMTP > FormSubmit.
- **Zero setup (FormSubmit):** submit one test brief. FormSubmit mails an **activation link**
  to aashrithgade5@gmail.com; that first brief is reported as failed (by design, nothing is
  silently lost). Click the link, submit again: from then on every brief arrives.
- **Recommended (Gmail, 2 minutes):** on alchemylabs.work@gmail.com turn on 2-Step
  Verification, create an App password, set `GMAIL_USER` + `GMAIL_APP_PASSWORD`.
- Spam protection: hidden honeypot field, 2.5s time-trap, 5 per hour per connection,
  same-origin check. Bots get a silent fake success.

## 4. Ledger storage (optional)
Set `SUPABASE_SERVICE_ROLE_KEY` and run `supabase/migrations/20260927120000_newsletter_subscribers.sql`
in the Supabase SQL editor. Briefs then also appear in the vault. Email works without it.

## 5. Payments
- UPI: `7794912315@ybl` (decoded from the owner's PhonePe scanner), payee Aashrith Gade,
  no amount in the code. QR verified by decoding on 5 device renders. Phones also get
  Google Pay / PhonePe / Paytm / any-app buttons. Change in `lib/payments.ts`.
- Card, netbanking, wallets (India): create a Razorpay account (KYC), make a **Payment Page**
  with a customer-entered amount, paste its URL into `NEXT_PUBLIC_CARD_PAYMENT_URL`.
- International: Razorpay International cards, a Stripe Payment Link, or paypal.me into
  `NEXT_PUBLIC_INTL_PAYMENT_URL`. Until set, the card tab offers a payment link on WhatsApp.
- Client-facing link to send with invoices: https://alchemylabs.in/pay

## 6. Go-live checklist (done by Claude on "Go ahead")
1. Vercel env: ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SESSION_SECRET (+ any mail/storage keys).
2. Merge the branch to main (Vercel deploys main).
3. Smoke test on alchemylabs.in: /, /contact brief, /pay QR, /alchemy-vault login, /admin 404.
