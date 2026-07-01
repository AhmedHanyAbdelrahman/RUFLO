'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Appointment {
  id: string;
  scheduled_at: string;
  status: string;
  booked_via: string;
  customers: { first_name: string; last_name: string } | null;
  opportunities: { estimated_value: number } | null;
  outcomes: { recovered_value: number; verified: boolean }[];
}

const STATUS_COLORS: Record<string, 'green' | 'yellow' | 'red' | 'secondary'> = {
  scheduled: 'yellow',
  confirmed: 'yellow',
  completed: 'green',
  no_show: 'red',
  cancelled: 'red',
};

export function AppointmentRow({ appointment }: { appointment: Appointment }) {
  const router = useRouter();
  const [recording, setRecording] = useState(false);
  const [value, setValue] = useState(String(appointment.opportunities?.estimated_value ?? ''));
  const [busy, setBusy] = useState(false);

  const hasOutcome = appointment.outcomes?.length > 0;

  async function recordOutcome() {
    setBusy(true);
    await fetch(`/api/appointments/${appointment.id}/outcome`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        appointmentStatus: 'completed',
        type: 'job_completed',
        recoveredValue: Number(value) || 0,
        verified: true,
      }),
    });
    setBusy(false);
    setRecording(false);
    router.refresh();
  }

  return (
    <div className="rounded-md border p-3">
      <div className="flex items-center justify-between">
        <span className="font-medium">
          {appointment.customers?.first_name} {appointment.customers?.last_name}
        </span>
        <Badge variant={STATUS_COLORS[appointment.status] ?? 'secondary'}>{appointment.status.replaceAll('_', ' ')}</Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        {formatDate(appointment.scheduled_at)} · booked via {appointment.booked_via.replaceAll('_', ' ')}
        {appointment.opportunities ? ` · est. ${formatCurrency(appointment.opportunities.estimated_value)}` : ''}
      </p>

      {hasOutcome ? (
        <p className="mt-1 text-sm font-medium text-urgent-green">
          Recovered {formatCurrency(appointment.outcomes[0].recovered_value)}
          {appointment.outcomes[0].verified ? ' · verified' : ' · unverified'}
        </p>
      ) : recording ? (
        <div className="mt-2 flex items-center gap-2">
          <Input className="w-32" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Recovered $" />
          <Button size="sm" onClick={recordOutcome} disabled={busy}>
            Save outcome
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setRecording(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button size="sm" variant="outline" className="mt-2" onClick={() => setRecording(true)}>
          Record outcome
        </Button>
      )}
    </div>
  );
}
