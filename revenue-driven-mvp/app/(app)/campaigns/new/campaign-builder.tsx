'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UrgencyBadge } from '@/components/shared/urgency-badge';
import { OPPORTUNITY_TYPE_LABELS } from '@/components/shared/opportunity-type-label';
import { formatCurrency } from '@/lib/utils';
import type { OpportunityType } from '@/types/database';

interface OpportunityRow {
  id: string;
  type: OpportunityType;
  urgency: 'red' | 'yellow' | 'green';
  estimated_value: number;
  score: number;
  customers: { first_name: string; last_name: string } | null;
}

interface Location {
  id: string;
  name: string;
}

interface StepDraft {
  channel: 'sms' | 'email';
  delay_hours: number;
}

export function CampaignBuilder({ locations, opportunities }: { locations: Location[]; opportunities: OpportunityRow[] }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [workflow, setWorkflow] = useState<OpportunityType>('declined_job');
  const [locationId, setLocationId] = useState(locations[0]?.id ?? '');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [steps, setSteps] = useState<StepDraft[]>([
    { channel: 'sms', delay_hours: 0 },
    { channel: 'sms', delay_hours: 72 },
  ]);
  const [saving, setSaving] = useState(false);

  const filteredOpportunities = opportunities.filter((o) => o.type === workflow);

  function toggle(id: string) {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleCreate() {
    setSaving(true);
    const res = await fetch('/api/campaigns', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name,
        workflow,
        locationId,
        opportunityIds: Array.from(selected),
        steps,
      }),
    });
    setSaving(false);
    if (res.ok) {
      const campaign = await res.json();
      router.push(`/campaigns/${campaign.id}`);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>1. Campaign details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Campaign name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Red-tier brake follow-up — July" />
          </div>
          <div className="space-y-1">
            <Label>Location</Label>
            <Select value={locationId} onValueChange={setLocationId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Workflow</Label>
            <Select value={workflow} onValueChange={(v) => setWorkflow(v as OpportunityType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="declined_job">Declined Job Recovery</SelectItem>
                <SelectItem value="unsold_estimate">Unsold Estimate Recovery</SelectItem>
                <SelectItem value="dormant_customer">Dormant Customer Win-Back</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Sequence steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-16 text-sm text-muted-foreground">Step {i + 1}</span>
              <Select
                value={step.channel}
                onValueChange={(v) =>
                  setSteps((s) => s.map((st, idx) => (idx === i ? { ...st, channel: v as 'sms' | 'email' } : st)))
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                className="w-32"
                value={step.delay_hours}
                onChange={(e) =>
                  setSteps((s) => s.map((st, idx) => (idx === i ? { ...st, delay_hours: Number(e.target.value) } : st)))
                }
              />
              <span className="text-sm text-muted-foreground">hours after previous step</span>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setSteps((s) => [...s, { channel: 'sms', delay_hours: 72 }])}>
            Add step
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            3. Select opportunities ({selected.size} selected of {filteredOpportunities.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-96 space-y-2 overflow-auto">
          {filteredOpportunities.map((o) => (
            <label key={o.id} className="flex items-center gap-3 rounded-md border p-2 text-sm">
              <input type="checkbox" checked={selected.has(o.id)} onChange={() => toggle(o.id)} />
              <span className="w-40">
                {o.customers?.first_name} {o.customers?.last_name}
              </span>
              <UrgencyBadge urgency={o.urgency} />
              <span className="w-24">{formatCurrency(o.estimated_value)}</span>
              <span className="text-muted-foreground">score {o.score}</span>
            </label>
          ))}
          {filteredOpportunities.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No unworked {OPPORTUNITY_TYPE_LABELS[workflow]} opportunities. Import data or change workflow.
            </p>
          )}
        </CardContent>
      </Card>

      <Button onClick={handleCreate} disabled={!name || selected.size === 0 || !locationId || saving}>
        {saving ? 'Creating…' : `Create campaign with ${selected.size} opportunities`}
      </Button>
    </div>
  );
}
