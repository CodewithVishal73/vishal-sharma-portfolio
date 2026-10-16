import { config } from '../config/env.js';

export async function sendNotificationEmail({ name, email, message, id }) {
  const { host, port, user, pass, notifyTo } = config.smtp;

  // Active only when SMTP_* environment variables exist
  if (!host || !user || !pass || !notifyTo) {
    return;
  }

  try {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: notifyTo,
      subject: `New Contact Form Submission from ${name} [${id}]`,
      text: `New contact submission received:\n\nID: ${id}\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    console.log(`[mailer] Notification email sent for submission ${id}`);
  } catch (err) {
    // Failure is logged and never fails the request
    console.warn(`[mailer] Notification email failed (non-fatal): ${err.message}`);
  }
}
