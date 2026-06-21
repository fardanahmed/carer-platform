import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false; // API routes must be server-rendered

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const subject = (data.get('subject') as string) || 'General Inquiry';
    const message = data.get('message') as string;

    // Validate fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please fill in all required fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Security Fix: HTML Sanitize to prevent malicious HTML injection inside email clients
    const sanitizeHtml = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\n/g, '<br />');
    };

    const cleanName = sanitizeHtml(name);
    const cleanSubject = sanitizeHtml(subject);
    const cleanMessage = sanitizeHtml(message);

    const apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured in the environment');
      return new Response(
        JSON.stringify({ success: false, message: 'Email service configuration error.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'CARER Contact Form <noreply@carer.edu.pk>',
      to: ['contact@carer.edu.pk'],
      replyTo: email,
      subject: `Contact Form: ${cleanSubject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg: 8px;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px;">New Contact Form Submission</h2>
          <p style="margin: 10px 0;"><strong>From:</strong> ${cleanName}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 10px 0;"><strong>Subject:</strong> ${cleanSubject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #3b82f6;">
            <h3 style="margin-top: 0; color: #334155;">Message:</h3>
            <p style="line-height: 1.6; color: #475569; white-space: pre-line;">${cleanMessage}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0 15px 0;" />
          <p style="color: #64748b; font-size: 12px; text-align: center;">Sent securely via CARER Platform Contact endpoint</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend delivery error:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Resend API failed to process request.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Thank you! Your message has been sent. We'll get back to you soon." }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Unexpected contact endpoint error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'An unexpected error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
