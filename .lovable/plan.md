

## Contact Form: Calendly Integration

### What Changes

**Flow update**: After the user fills the form and clicks submit, the form data is saved to the database and the notification email is sent (existing behavior stays). Then, instead of showing the current static "Received" success screen, the user is redirected to the Calendly scheduling link in a new tab, and the success screen is updated to reflect that a meeting is being scheduled.

### Changes (1 file)

**`src/components/Contact.tsx`**

1. **Rename the submit button**: Change "Send Brief" to "Schedule a Meeting" and swap the `Send` icon for the `Calendar` icon (already imported)
2. **Open Calendly after successful submission**: In `handleSubmit`, after the DB insert and email function call succeed, open `https://calendly.com/alchemylabs-work/30min` in a new tab via `window.open()`
3. **Update the success state screen**:
   - Change heading from "Received." to "You're almost there."
   - Update body text to: "Your brief has been sent. Complete your booking on Calendly to lock in your Strategy Sprint."
   - Add a prominent "Open Calendly" button (in case the popup was blocked) linking to the same Calendly URL
   - Keep the existing "Back to Home" and "WhatsApp Us" buttons
4. **Update the "Sending..." state text** to "Submitting..."
5. **Update the after-submit microtext** from the current "Next: we reply within 24h..." to "Next: pick a time slot on Calendly for your 15-min Strategy Sprint."

### What Stays the Same

- All form fields (name, email, company, service, message)
- Database save to `contact_submissions`
- Email notification via `send-contact-email` edge function
- Turnstile CAPTCHA verification
- Validation logic
- Left column info panel

