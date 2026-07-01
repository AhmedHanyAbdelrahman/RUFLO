import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { commitImport } from '@/lib/import/commit';
import { createClient } from '@/lib/supabase/server';
import type { NormalizedRow } from '@/lib/import/normalize';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireUser();
  if (!user.client_id) return NextResponse.json({ error: 'User has no client assigned' }, { status: 400 });

  const { rows, locationId }: { rows: NormalizedRow[]; locationId: string } = await request.json();

  const supabase = createClient();
  const { data: fileImport } = await supabase
    .from('files_imports')
    .select('id, client_id')
    .eq('id', params.id)
    .single();

  if (!fileImport || fileImport.client_id !== user.client_id) {
    return NextResponse.json({ error: 'Import not found' }, { status: 404 });
  }

  try {
    const result = await commitImport(rows, { clientId: user.client_id, locationId, fileImportId: params.id });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
