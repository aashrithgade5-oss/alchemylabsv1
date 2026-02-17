

## Fix Contact Form: Calendly Redirect, Clean Options, Updated Copy

### Root Cause: Calendly Not Opening

The `window.open('https://calendly.com/alchemylabs-work/30min', '_blank')` call on line 113 happens **after** two `await` calls (database insert + edge function). Most browsers block `window.open` in async callbacks because it's no longer within the "user gesture" context. The fix is to open Calendly **before** the async calls or use a pre-created window reference.

### Changes (1 file: `src/components/Contact.tsx`)

**1. Fix Calendly redirect (critical)**
- Open a blank window reference synchronously (inside the click handler, before any `await`), then set its URL after the async calls complete. This bypasses popup blockers.
- Alternative: redirect to Calendly via `window.location.href` as a fallback if the popup is blocked.

**2. Remove emojis from service options**
Replace the current options:
- `⚡ Fast — 24h AI Build` becomes `Fast — 24h AI Build`
- `🏛️ Foundation — Brand System` becomes `Foundation — Brand System`
- `💡 Clarity — Strategy Advisory` becomes `Clarity — Strategy Advisory`
- `🤔 Not sure yet — Help me figure out` becomes `Not sure yet — Help me figure out`
- `✉️ Specific request — Direct to founder` becomes `Specific request — Direct to founder`

**3. Add "15 min Strategy Call" heading**
Add a heading above the form: **"15 min Strategy Call, First one for free."** styled with `font-display` in the existing design language.

**4. WhatsApp and Email buttons — hide numbers/addresses**
In the left info panel, remove the phone number (`+91 7794912315`) and email address (`alchemylabs.work@gmail.com`) text. Keep only the icon + label ("WhatsApp", "Email") as clean abstract buttons that open the respective links in new tabs.

**5. Founder contact section — same treatment**
Replace the raw email addresses with clean "Aashrith" and "Eva" buttons that open `mailto:` links, without displaying the actual email addresses.

### Technical Details

```text
handleSubmit flow (fixed):
  1. User clicks "Schedule a Meeting"
  2. Synchronously: calendlyWindow = window.open('', '_blank')
  3. Await: DB insert + edge function
  4. On success: calendlyWindow.location.href = calendly URL
  5. Show success state with fallback Calendly button
  6. On error: close the blank window, show error toast
```

This ensures the browser doesn't block the popup since `window.open` is called synchronously within the user gesture.

