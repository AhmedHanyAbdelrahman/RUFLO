'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { roleLabel } from '@/lib/roles';
import type { AppUser } from '@/types/database';

export function UserMenu({ user }: { user: AppUser }) {
  const router = useRouter();
  const supabase = createClient();

  async function signOut() {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-sm font-medium leading-none">{user.full_name}</p>
        <p className="text-xs text-muted-foreground">{roleLabel(user.role)}</p>
      </div>
      <Button variant="outline" size="sm" onClick={signOut}>
        Sign out
      </Button>
    </div>
  );
}
