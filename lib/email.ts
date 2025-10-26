import nodemailer from 'nodemailer';
import type { InquiryFormData } from './validators';

// Simple in-memory rate limiter
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // 5 requests per hour per IP

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetAt) {
      rateLimitStore.delete(ip);
    }
  }
}, 10 * 60 * 1000); // Every 10 minutes

// Create email transporter
export function createTransporter() {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    throw new Error('SMTP configuration is missing in environment variables');
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Send inquiry email
export async function sendInquiryEmail(data: InquiryFormData, locale: string) {
  const transporter = createTransporter();

  const subject =
    locale === 'hr'
      ? `Nova rezervacijska upit - ${data.name}`
      : `New Booking Inquiry - ${data.name}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0369a1;">${locale === 'hr' ? 'Nova rezervacijska upit' : 'New Booking Inquiry'}</h2>
      <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>${locale === 'hr' ? 'Ime' : 'Name'}:</strong> ${data.name}</p>
        <p><strong>${locale === 'hr' ? 'Email' : 'Email'}:</strong> ${data.email}</p>
        <p><strong>${locale === 'hr' ? 'Telefon' : 'Phone'}:</strong> ${data.phone}</p>
        <p><strong>${locale === 'hr' ? 'Broj osoba' : 'Number of Guests'}:</strong> ${data.guests}</p>
        <p><strong>${locale === 'hr' ? 'Dolazak' : 'Check-in'}:</strong> ${data.checkIn}</p>
        <p><strong>${locale === 'hr' ? 'Odlazak' : 'Check-out'}:</strong> ${data.checkOut}</p>
        ${data.message ? `<p><strong>${locale === 'hr' ? 'Poruka' : 'Message'}:</strong><br/>${data.message}</p>` : ''}
      </div>
      <p style="color: #64748b; font-size: 12px;">
        ${locale === 'hr' ? 'Ovaj email je poslan iz kontakt forme na web stranici Mobilne kućice Lana.' : 'This email was sent from the contact form on Mobile Home Lana website.'}
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.INQUIRY_TO,
    subject,
    html,
    replyTo: data.email,
  });
}

