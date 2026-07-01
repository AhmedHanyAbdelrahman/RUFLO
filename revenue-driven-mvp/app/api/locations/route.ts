import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const user = await requireUser();
  if (!user.client_id) return NextResponse.json({ error: 'User has no client assigned' }, { status: 400 });

  const body = await request.json();
  const supabase = createClient();
  const { data, error } = await supabase
    .from('locations')
    .insert({
      client_id: user.client_id,
      name: body.name,
      address: body.address || null,
      city: body.city || null,
      state: body.state || null,
      zip: body.zip || null,
      timezone: body.timezone || 'America/New_York',
      daily_capacity: body.daily_capacity ? Number(body.daily_capacity) : 20,
      shop_management_system: body.shop_management_system || 'tekmetric',
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
