import twilio from 'twilio';

let client: ReturnType<typeof twilio> | null = null;

function getClient() {
  if (!client) {
    client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }
  return client;
}

export interface SendSmsResult {
  providerMessageId: string;
  status: string;
}

export async function sendSms(to: string, body: string): Promise<SendSmsResult> {
  const message = await getClient().messages.create({
    to,
    body,
    ...(process.env.TWILIO_MESSAGING_SERVICE_SID
      ? { messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID }
      : { from: process.env.TWILIO_FROM_NUMBER }),
  });
  return { providerMessageId: message.sid, status: message.status };
}

export function validateTwilioSignature(signature: string, url: string, params: Record<string, string>): boolean {
  return twilio.validateRequest(process.env.TWILIO_AUTH_TOKEN!, signature, url, params);
}
