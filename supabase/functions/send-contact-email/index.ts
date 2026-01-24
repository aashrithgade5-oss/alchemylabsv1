import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Zod schema for server-side input validation
const contactEmailSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s\-'.]+$/, "Name contains invalid characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  company: z.string()
    .trim()
    .max(200, "Company name must be less than 200 characters")
    .optional()
    .nullable()
    .transform(val => val || undefined),
  service: z.string()
    .trim()
    .max(100, "Service must be less than 100 characters")
    .optional()
    .nullable()
    .transform(val => val || undefined),
  message: z.string()
    .trim()
    .max(5000, "Message must be less than 5000 characters")
    .optional()
    .nullable()
    .transform(val => val || ""),
  turnstileToken: z.string().min(1, "Security verification token is required"),
});

type ContactEmailRequest = z.infer<typeof contactEmailSchema>;

// HTML escape function to prevent XSS in emails
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Verify Turnstile token with Cloudflare
async function verifyTurnstileToken(token: string): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) {
    console.error("TURNSTILE_SECRET_KEY not configured");
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', TURNSTILE_SECRET_KEY);
    formData.append('response', token);

    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const outcome = await result.json();
    console.log("Turnstile verification result:", outcome);
    return outcome.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

async function sendEmail(to: string[], subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Alchemy Labs <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return res.json();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();

    // Server-side input validation with Zod
    const validationResult = contactEmailSchema.safeParse(rawBody);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      console.error("Validation failed:", errors);
      return new Response(
        JSON.stringify({ error: `Validation failed: ${errors}` }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, company, service, message, turnstileToken } = validationResult.data;

    console.log("Received validated contact form submission:", { name, email, company, service });

    // Verify CAPTCHA token
    const isValidToken = await verifyTurnstileToken(turnstileToken);
    if (!isValidToken) {
      console.error("Invalid Turnstile token");
      return new Response(
        JSON.stringify({ error: "Security verification failed" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("CAPTCHA verification passed");

    // Escape all user inputs for safe HTML insertion
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : '';
    const safeService = service ? escapeHtml(service) : '';
    const safeMessage = message ? escapeHtml(message).replace(/\n/g, '<br>') : '';

    // Send notification email to admin
    const adminEmailResponse = await sendEmail(
      ["brandalchemie@gmail.com"],
      `New Contact Form Submission from ${safeName}`,
      `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #faf9f7; padding: 40px; }
            .container { max-width: 600px; margin: 0 auto; background: linear-gradient(180deg, rgba(20,20,22,0.9), rgba(10,10,11,0.95)); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px; }
            .header { text-align: center; margin-bottom: 32px; }
            .logo { font-size: 24px; font-weight: 600; }
            .logo span { color: #e10613; font-style: italic; }
            .field { margin-bottom: 20px; }
            .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(250,249,247,0.5); margin-bottom: 4px; }
            .value { font-size: 16px; color: #faf9f7; }
            .message-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; margin-top: 8px; }
            .accent { color: #e10613; }
            .footer { text-align: center; margin-top: 32px; font-size: 12px; color: rgba(250,249,247,0.4); }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo"><span>Alchemy</span> Labs</div>
              <p style="color: rgba(250,249,247,0.5); margin-top: 8px;">New Contact Submission</p>
            </div>
            
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${safeName}</div>
            </div>
            
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${safeEmail}" style="color: #e10613;">${safeEmail}</a></div>
            </div>
            
            ${safeCompany ? `
            <div class="field">
              <div class="label">Company</div>
              <div class="value">${safeCompany}</div>
            </div>
            ` : ''}
            
            ${safeService ? `
            <div class="field">
              <div class="label">Interested Service</div>
              <div class="value accent">${safeService}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">${safeMessage || '<em style="color: rgba(250,249,247,0.4);">No message provided</em>'}</div>
            </div>
            
            <div class="footer">
              Submitted via Alchemy Labs Contact Form
            </div>
          </div>
        </body>
        </html>
      `
    );

    console.log("Admin notification email sent:", adminEmailResponse);

    // Send confirmation email to the user
    const userEmailResponse = await sendEmail(
      [email],
      "We received your brief — Alchemy Labs",
      `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #faf9f7; padding: 40px; }
            .container { max-width: 600px; margin: 0 auto; background: linear-gradient(180deg, rgba(20,20,22,0.9), rgba(10,10,11,0.95)); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px; }
            .header { text-align: center; margin-bottom: 32px; }
            .logo { font-size: 24px; font-weight: 600; }
            .logo span { color: #e10613; font-style: italic; }
            h1 { font-size: 28px; font-weight: 400; margin-bottom: 16px; }
            h1 span { color: #e10613; font-style: italic; }
            p { color: rgba(250,249,247,0.7); line-height: 1.6; }
            .signature { margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); }
            .footer { text-align: center; margin-top: 32px; font-size: 12px; color: rgba(250,249,247,0.4); }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo"><span>Alchemy</span> Labs</div>
            </div>
            
            <h1>Thank you, <span>${safeName}</span></h1>
            
            <p>We've received your brief and are already diving in. Our team reviews every submission personally—expect to hear from us within 24-48 hours.</p>
            
            <p>In the meantime, feel free to explore our latest work or follow us on Instagram for behind-the-scenes insights.</p>
            
            <div class="signature">
              <p style="margin: 0;">Looking forward to creating something <em style="color: #e10613;">inevitable</em> together.</p>
              <p style="margin-top: 16px; color: rgba(250,249,247,0.5);">— The Alchemy Labs Team</p>
            </div>
            
            <div class="footer">
              <p>WhatsApp: +91 7794912315 | Email: brandalchemie@gmail.com</p>
            </div>
          </div>
        </body>
        </html>
      `
    );

    console.log("User confirmation email sent:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse, 
        userEmail: userEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
