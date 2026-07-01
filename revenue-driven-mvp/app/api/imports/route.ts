import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const user = await requireUser();
  const { locationId, fileName, fileType, rowCount } = await request.json();
  if (!user.client_id) return NextResponse.json({ error: 'User has no client assigned' }, { status: 400 });

  const supabase = createClient();
  const { data, error } = await supabase
    .from('files_imports')
    .insert({
      client_id: user.client_id,
      location_id: locationId,
      uploaded_by: user.id,
      file_name: fileName,
      file_type: fileType,
      source_system: 'tekmetric',
      status: 'mapping',
      row_count: rowCount ?? 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
