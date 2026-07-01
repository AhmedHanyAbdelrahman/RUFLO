import { createClient } from '@/lib/supabase/server';
import type { AppUser } from '@/types/database';
import { redirect } from 'next/navigation';

export async function getCurrentUser(): Promise<AppUser | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase.from('users').select('*').eq('id', user.id).single();
  return (data as AppUser) ?? null;
}

export async function requireUser(): Promise<AppUser> {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}

export { roleLabel, ROLES_CAN_APPROVE_CAMPAIGNS, ROLES_CAN_WORK_TASK_QUEUE } from '@/lib/roles';
