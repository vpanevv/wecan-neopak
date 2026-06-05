import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Runs on the Node.js runtime (Nodemailer needs Node APIs).
export const runtime = 'nodejs';

interface Payload {
  company?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  country?: string;
  beverageType?: string;
  canSizes?: string[];
  decoration?: string;
  quantity?: string;
  timeline?: string;
  description?: string;
}

function escape(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Server-side validation mirrors the client's required fields.
  const required: (keyof Payload)[] = [
    'company',
    'contactPerson',
    'email',
    'country',
    'beverageType',
  ];
  const missing = required.some((key) => !String(data[key] ?? '').trim());
  if (missing) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const rows: [string, string][] = [
    ['Company', escape(data.company)],
    ['Contact person', escape(data.contactPerson)],
    ['Email', escape(data.email)],
    ['Phone', escape(data.phone) || '—'],
    ['Country', escape(data.country)],
    ['Beverage type', escape(data.beverageType)],
    ['Can size(s)', escape((data.canSizes ?? []).join(', ')) || '—'],
    ['Decoration', escape(data.decoration) || '—'],
    ['Estimated quantity', escape(data.quantity) || '—'],
    ['Timeline', escape(data.timeline) || '—'],
    ['Description', escape(data.description) || '—'],
  ];

  const html = `
    <h2 style="font-family:sans-serif">New Private Label inquiry</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#6b6e72;vertical-align:top"><strong>${label}</strong></td><td style="padding:6px 0">${value}</td></tr>`,
        )
        .join('')}
    </table>
  `;
  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');

  // TODO: Configure with client's actual email address + SMTP credentials.
  // Set SMTP_* and CONTACT_* in the environment (see .env.example).
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL,
  } = process.env;

  // If SMTP isn't configured yet, log the inquiry and report success in dev so
  // the form flow is testable before the client provides credentials.
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn(
      '[contact] SMTP not configured — inquiry received but not emailed:\n' + text,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: SMTP_SECURE === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL ?? SMTP_USER,
      to: CONTACT_TO_EMAIL ?? SMTP_USER,
      replyTo: String(data.email),
      subject: `Private Label inquiry — ${escape(data.company)}`,
      text,
      html,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[contact] Failed to send inquiry email:', err);
    return NextResponse.json({ error: 'Failed to send.' }, { status: 502 });
  }
}
