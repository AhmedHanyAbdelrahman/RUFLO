'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function OpportunityFiltersBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') params.delete(key);
    else params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-3">
      <Select defaultValue={searchParams.get('urgency') ?? 'all'} onValueChange={(v) => setParam('urgency', v)}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Urgency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All urgency</SelectItem>
          <SelectItem value="red">Red</SelectItem>
          <SelectItem value="yellow">Yellow</SelectItem>
          <SelectItem value="green">Green</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue={searchParams.get('type') ?? 'all'} onValueChange={(v) => setParam('type', v)}>
        <SelectTrigger className="w-52">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          <SelectItem value="declined_job">Declined Job</SelectItem>
          <SelectItem value="unsold_estimate">Unsold Estimate</SelectItem>
          <SelectItem value="dormant_customer">Dormant Customer</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue={searchParams.get('status') ?? 'all'} onValueChange={(v) => setParam('status', v)}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="scored">Scored</SelectItem>
          <SelectItem value="queued">Queued</SelectItem>
          <SelectItem value="messaged">Messaged</SelectItem>
          <SelectItem value="replied">Replied</SelectItem>
          <SelectItem value="booked">Booked</SelectItem>
          <SelectItem value="won">Won</SelectItem>
          <SelectItem value="lost">Lost</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
