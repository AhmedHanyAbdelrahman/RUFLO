'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Target,
  Upload,
  Megaphone,
  Inbox,
  ListChecks,
  CalendarCheck,
  BarChart3,
  Settings,
  CreditCard,
  ShieldCheck,
  Building2,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Opportunities', icon: Target },
  { href: '/import', label: 'Data Import', icon: Upload },
  { href: '/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/inbox', label: 'Reply Inbox', icon: Inbox },
  { href: '/tasks', label: 'Follow-Up Tasks', icon: ListChecks },
  { href: '/appointments', label: 'Appointments', icon: CalendarCheck },
  { href: '/reports', label: 'Found Money Report', icon: BarChart3 },
  { href: '/clients', label: 'Client & Locations', icon: Building2 },
  { href: '/billing', label: 'Billing', icon: CreditCard },
  { href: '/compliance', label: 'Compliance', icon: ShieldCheck },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 p-3">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname?.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              active ? 'bg-primary text-primary-foreground' : 'text-slate-600 hover:bg-slate-100'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
