# Overhaul TODO — items that need a human decision or an external asset

- [ ] **UPI VPA**: `lib/payments.ts` ships with the placeholder `alchemylabs@upi`. Replace with the real VPA before announcing the Five.
- [ ] **Card checkout URLs**: `checkoutUrl` is `null` on all five products; the button reads "Card checkout opening soon". Gateway integration drops the links into `lib/payments.ts`, nothing else changes.
- [ ] **Domain / metadataBase**: `app/layout.tsx` still points at `alchemylabsv1.lovable.app`. Swap when the real domain exists.
- [ ] **Portraits**: About page (Phase 3) uses `Placeholder` with specs `PORTRAIT · ASH · 4:5 · ≥1200px` and the same for Eva. Shoot or select real portraits.
- [ ] **OG image**: `/og-image.png` predates the Furnace system. Review after Phase 7 ships `app/opengraph-image.tsx`.
- [ ] **Supabase email template**: `send-contact-email` uses the old `#e10613` accent. Left untouched by decision; restyle when convenient.
- [x] **Nav Services link**: flipped to `/services` when Phase 2 shipped.
- [ ] **Frozen-route assets**: Aashrith-exclusive assets (~12MB) are exempt from the <5MB budget for overhauled routes; revisit only with Aashrith's sign-off.
