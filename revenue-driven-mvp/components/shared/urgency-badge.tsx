import { Badge } from '@/components/ui/badge';
import type { UrgencyLevel } from '@/types/database';

const LABELS: Record<UrgencyLevel, string> = { red: 'Red — Safety', yellow: 'Yellow — Attention', green: 'Green — Routine' };

export function UrgencyBadge({ urgency }: { urgency: UrgencyLevel }) {
  return <Badge variant={urgency}>{LABELS[urgency]}</Badge>;
}
