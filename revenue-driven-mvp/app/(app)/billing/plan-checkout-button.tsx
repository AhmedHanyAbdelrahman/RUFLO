'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { PlanTier } from '@/types/database';

export function PlanCheckoutButton({ tier, disabled }: { tier: PlanTier; disabled?: boolean }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const res = await fetch('/api/billing/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ tier }),
    });
    setLoading(false);
    if (res.ok) {
      const { url } = await res.json();
      if (url) window.location.href = url;
    }
  }

  return (
    <Button onClick={handleClick} disabled={disabled || loading} className="w-full">
      {disabled ? 'Current plan' : loading ? 'Redirecting…' : 'Select plan'}
    </Button>
  );
}
