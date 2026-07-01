import { getAiProvider } from './provider';
import { matchesOptOutKeyword } from '@/lib/compliance/optout';
import type { ReplyIntent } from '@/types/database';

const VALID_INTENTS: ReplyIntent[] = [
  'wants_to_book',
  'asks_price',
  'asks_technical_question',
  'asks_availability',
  'not_interested',
  'already_fixed_elsewhere',
  'wrong_number',
  'angry_or_complaint',
  'opt_out',
  'needs_human',
  'unclear',
];

// Intents that always create a human follow-up task, regardless of AI confidence.
export const ESCALATION_INTENTS: ReplyIntent[] = [
  'asks_price',
  'asks_technical_question',
  'angry_or_complaint',
  'needs_human',
];

export interface ClassificationResult {
  intent: ReplyIntent;
  confidence: number;
  requiresEscalation: boolean;
  escalationReason: string | null;
}

const SYSTEM_PROMPT = `You classify inbound SMS/email replies to an auto repair shop's reactivation outreach.
Return exactly one intent label from this list, nothing else:
wants_to_book, asks_price, asks_technical_question, asks_availability, not_interested,
already_fixed_elsewhere, wrong_number, angry_or_complaint, opt_out, needs_human, unclear

Guidance:
- asks_price: any question about cost, pricing, discounts, or "how much".
- asks_technical_question: any question requiring a mechanic's technical judgment (what's wrong, is it safe, will it damage the car).
- angry_or_complaint: frustration, complaints about the shop, or hostile tone.
- needs_human: anything ambiguous but clearly requiring a person, or a request the AI shouldn't answer.
- opt_out: only if the message is an explicit unsubscribe/stop request; simple STOP keywords are handled separately.
- unclear: only if truly nothing else fits.

Output format: a single JSON object like {"intent": "wants_to_book", "confidence": 0.92}. No other text.`;

export async function classifyReply(body: string, highTicketDollarValue?: number): Promise<ClassificationResult> {
  const optOutKeyword = matchesOptOutKeyword(body);
  if (optOutKeyword) {
    return { intent: 'opt_out', confidence: 1, requiresEscalation: false, escalationReason: null };
  }

  const provider = getAiProvider();
  const raw = await provider.complete({
    system: SYSTEM_PROMPT,
    prompt: `Customer reply: "${body}"\n\nRespond with the JSON object only.`,
    maxTokens: 60,
    temperature: 0,
  });

  const parsed = safeParseIntent(raw);
  const isHighTicket = (highTicketDollarValue ?? 0) >= 1000;
  const requiresEscalation = ESCALATION_INTENTS.includes(parsed.intent) || (isHighTicket && parsed.intent === 'wants_to_book');

  return {
    intent: parsed.intent,
    confidence: parsed.confidence,
    requiresEscalation,
    escalationReason: requiresEscalation ? escalationReason(parsed.intent, isHighTicket) : null,
  };
}

function escalationReason(intent: ReplyIntent, isHighTicket: boolean): string {
  if (isHighTicket) return 'High-ticket opportunity — route to human for booking.';
  const reasons: Partial<Record<ReplyIntent, string>> = {
    asks_price: 'Customer asked about pricing — AI must not quote prices.',
    asks_technical_question: 'Customer asked a technical/diagnostic question.',
    angry_or_complaint: 'Customer expressed frustration or a complaint.',
    needs_human: 'Reply flagged as requiring a human.',
  };
  return reasons[intent] ?? 'Escalated for human review.';
}

function safeParseIntent(raw: string): { intent: ReplyIntent; confidence: number } {
  try {
    const match = raw.match(/\{[\s\S]*\}/);
    const json = JSON.parse(match ? match[0] : raw);
    const intent = VALID_INTENTS.includes(json.intent) ? (json.intent as ReplyIntent) : 'needs_human';
    const confidence = typeof json.confidence === 'number' ? json.confidence : 0.5;
    return { intent, confidence };
  } catch {
    return { intent: 'needs_human', confidence: 0 };
  }
}
