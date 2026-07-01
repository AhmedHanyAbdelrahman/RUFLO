import { getAiProvider } from './provider';
import type { CampaignStepChannel, OpportunityType, UrgencyLevel } from '@/types/database';

export interface MessageGenerationInput {
  workflow: OpportunityType;
  channel: CampaignStepChannel;
  customerFirstName: string;
  shopName: string;
  vehicleDescription: string | null; // e.g. "2016 Honda Civic"
  serviceDescription: string;
  urgency: UrgencyLevel;
  isFirstOutboundMessage: boolean;
  stepNumber: number;
}

const SYSTEM_PROMPT = `You are writing short outbound reactivation messages for a licensed auto repair shop.
The recipient is a real customer whose vehicle had a specific declined repair, unsold estimate, or who hasn't visited in a while.

Hard rules, never break them:
- Never invent or state a price, discount, coupon, warranty term, part availability, or a diagnosis. You do not have that information.
- Never use fear, alarmist, or high-pressure language (no "your car could break down", no "this is dangerous if ignored").
- Reference only the specific service/vehicle info provided — do not fabricate additional issues.
- Keep it short, human, and specific — write like a friendly service advisor texting a real customer, not a marketing blast.
- Do not use emojis, exclamation-heavy copy, or ALL CAPS.
- If this is the first outbound SMS in the conversation, end with an opt-out line: "Reply STOP to opt out."
- For email, keep it under 120 words with a plain-text tone, no HTML, no links other than a placeholder [BOOKING_LINK] if asking them to book.
- Never claim to be a technician or make technical claims — you can offer to have the shop follow up or help them get back on the schedule.
- Output ONLY the message body. No subject line, no preamble, no quotes around it.`;

export async function generateReactivationMessage(input: MessageGenerationInput): Promise<string> {
  const provider = getAiProvider();

  const workflowContext = {
    declined_job: `The customer declined a recommended repair. Gently follow up — do not pressure, do not diagnose further.`,
    unsold_estimate: `The customer received an estimate they have not approved yet. Offer to help them move forward or answer questions.`,
    dormant_customer: `The customer has not visited in a while. This is a friendly win-back check-in, not tied to a specific declined repair.`,
  }[input.workflow];

  const prompt = `Shop name: ${input.shopName}
Channel: ${input.channel}
Customer first name: ${input.customerFirstName}
Vehicle: ${input.vehicleDescription ?? 'not specified'}
Service/context: ${input.serviceDescription}
Urgency tier (internal only, do not mention urgency tier by name): ${input.urgency}
Workflow: ${input.workflow} — ${workflowContext}
This is follow-up step #${input.stepNumber} in the sequence.
Is this the first outbound SMS this customer has received from us: ${input.isFirstOutboundMessage ? 'yes' : 'no'}

Write the message now.`;

  const text = await provider.complete({ system: SYSTEM_PROMPT, prompt, maxTokens: 300, temperature: 0.5 });
  return text.trim();
}
