export interface SendEmailResult {
  providerMessageId: string;
}

async function sendViaSendGrid(to: string, subject: string, body: string): Promise<SendEmailResult> {
  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: process.env.EMAIL_FROM },
      subject,
      content: [{ type: 'text/plain', value: body }],
    }),
  });
  if (!res.ok) throw new Error(`SendGrid error: ${res.status} ${await res.text()}`);
  return { providerMessageId: res.headers.get('x-message-id') ?? crypto.randomUUID() };
}

async function sendViaPostmark(to: string, subject: string, body: string): Promise<SendEmailResult> {
  const res = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      'x-postmark-server-token': process.env.POSTMARK_API_KEY!,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      From: process.env.EMAIL_FROM,
      To: to,
      Subject: subject,
      TextBody: body,
    }),
  });
  if (!res.ok) throw new Error(`Postmark error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return { providerMessageId: data.MessageID };
}

export async function sendEmail(to: string, subject: string, body: string): Promise<SendEmailResult> {
  const provider = (process.env.EMAIL_PROVIDER || 'sendgrid').toLowerCase();
  if (provider === 'postmark') return sendViaPostmark(to, subject, body);
  return sendViaSendGrid(to, subject, body);
}
