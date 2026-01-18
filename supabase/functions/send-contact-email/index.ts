import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
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
    const { name, email, company, service, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, company, service });

    // Send notification email to admin
    const adminEmailResponse = await sendEmail(
      ["brandalchemie@gmail.com"],
      `New Contact Form Submission from ${name}`,
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
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}" style="color: #e10613;">${email}</a></div>
            </div>
            
            ${company ? `
            <div class="field">
              <div class="label">Company</div>
              <div class="value">${company}</div>
            </div>
            ` : ''}
            
            ${service ? `
            <div class="field">
              <div class="label">Interested Service</div>
              <div class="value accent">${service}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
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
            
            <h1>Thank you, <span>${name}</span></h1>
            
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
