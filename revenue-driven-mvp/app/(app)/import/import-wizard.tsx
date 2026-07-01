'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseImportFile, type ParsedFile } from '@/lib/import/parse';
import { TARGET_FIELDS, autoSuggestMapping } from '@/lib/import/schema';
import { normalizeAndValidate, type NormalizedRow } from '@/lib/import/normalize';
import type { ImportRowError } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type Step = 'upload' | 'mapping' | 'validation' | 'done';

interface Location {
  id: string;
  name: string;
}

export function ImportWizard({ locations }: { locations: Location[] }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>('upload');
  const [locationId, setLocationId] = useState(locations[0]?.id ?? '');
  const [fileName, setFileName] = useState('');
  const [parsed, setParsed] = useState<ParsedFile | null>(null);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [validRows, setValidRows] = useState<NormalizedRow[]>([]);
  const [rowErrors, setRowErrors] = useState<ImportRowError[]>([]);
  const [fileImportId, setFileImportId] = useState<string | null>(null);
  const [committing, setCommitting] = useState(false);
  const [commitResult, setCommitResult] = useState<{ repairOrdersCreated: number; opportunitiesCreated: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFileSelected(file: File) {
    setError(null);
    setFileName(file.name);
    const result = await parseImportFile(file);
    setParsed(result);
    setMapping(autoSuggestMapping(result.columns));

    const res = await fetch('/api/imports', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        locationId,
        fileName: file.name,
        fileType: file.name.endsWith('.xlsx') ? 'xlsx' : 'csv',
        rowCount: result.rows.length,
      }),
    });
    if (!res.ok) {
      setError('Could not create import record. Check that a client/location is set up.');
      return;
    }
    const data = await res.json();
    setFileImportId(data.id);
    setStep('mapping');
  }

  function runValidation() {
    if (!parsed) return;
    const { valid, errors } = normalizeAndValidate(parsed.rows, mapping);
    setValidRows(valid);
    setRowErrors(errors);
    setStep('validation');
  }

  async function handleCommit() {
    if (!fileImportId) return;
    setCommitting(true);
    setError(null);
    const res = await fetch(`/api/imports/${fileImportId}/commit`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ rows: validRows, locationId }),
    });
    setCommitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Import failed');
      return;
    }
    const data = await res.json();
    setCommitResult(data);
    setStep('done');
  }

  const mappedRequiredMissing = useMemo(
    () => TARGET_FIELDS.filter((f) => f.required && !Object.values(mapping).includes(f.key)),
    [mapping]
  );

  return (
    <div className="space-y-6">
      <StepIndicator step={step} />

      {step === 'upload' && (
        <Card>
          <CardHeader>
            <CardTitle>1. Upload export file</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select value={locationId} onValueChange={setLocationId}>
                <SelectTrigger className="max-w-xs">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((l) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {locations.length === 0 && (
                <p className="text-sm text-destructive">Set up a client and location first.</p>
              )}
            </div>
            <div className="rounded-lg border-2 border-dashed p-10 text-center">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                disabled={!locationId}
                onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
                className="mx-auto block text-sm"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Accepts Tekmetric Repair Order Export, Estimate Export, or Customer Export (CSV/XLSX).
              </p>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
        </Card>
      )}

      {step === 'mapping' && parsed && (
        <Card>
          <CardHeader>
            <CardTitle>2. Field mapping — {fileName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {parsed.rows.length} rows detected. Map each source column to a Revenue Driven field.
            </p>
            <div className="max-h-96 space-y-2 overflow-auto">
              {parsed.columns.map((col) => (
                <div key={col} className="flex items-center gap-3">
                  <span className="w-48 truncate text-sm font-medium">{col}</span>
                  <Select
                    value={mapping[col] ?? '__skip__'}
                    onValueChange={(v) => setMapping((m) => ({ ...m, [col]: v === '__skip__' ? '' : v }))}
                  >
                    <SelectTrigger className="max-w-xs">
                      <SelectValue placeholder="Skip this column" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__skip__">Skip this column</SelectItem>
                      {TARGET_FIELDS.map((f) => (
                        <SelectItem key={f.key} value={f.key}>
                          {f.label}
                          {f.required ? ' *' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
            {mappedRequiredMissing.length > 0 && (
              <p className="text-sm text-destructive">
                Missing required fields: {mappedRequiredMissing.map((f) => f.label).join(', ')}
              </p>
            )}
            <Button onClick={runValidation} disabled={mappedRequiredMissing.length > 0}>
              Continue to validation
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'validation' && (
        <Card>
          <CardHeader>
            <CardTitle>3. Import validation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Badge variant="green">{validRows.length} valid rows</Badge>
              <Badge variant="red">{rowErrors.length} errors</Badge>
            </div>
            {rowErrors.length > 0 && (
              <div className="max-h-64 overflow-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Row</TableHead>
                      <TableHead>Field</TableHead>
                      <TableHead>Error</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rowErrors.slice(0, 100).map((e, i) => (
                      <TableRow key={i}>
                        <TableCell>{e.row}</TableCell>
                        <TableCell>{e.field}</TableCell>
                        <TableCell>{e.message}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('mapping')}>
                Back to mapping
              </Button>
              <Button onClick={handleCommit} disabled={validRows.length === 0 || committing}>
                {committing ? 'Importing…' : `Import ${validRows.length} valid rows`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'done' && commitResult && (
        <Card>
          <CardHeader>
            <CardTitle>Import complete</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              Imported {commitResult.repairOrdersCreated} repair order rows and detected{' '}
              <strong>{commitResult.opportunitiesCreated} new opportunities</strong>.
            </p>
            <Button onClick={() => router.push('/dashboard')}>Go to opportunity dashboard</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: 'upload', label: 'Upload' },
    { key: 'mapping', label: 'Field Mapping' },
    { key: 'validation', label: 'Validation' },
    { key: 'done', label: 'Done' },
  ];
  const activeIndex = steps.findIndex((s) => s.key === step);
  return (
    <div className="flex items-center gap-2 text-sm">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center gap-2">
          <span
            className={
              i <= activeIndex ? 'rounded-full bg-primary px-2 py-0.5 text-primary-foreground' : 'rounded-full bg-muted px-2 py-0.5 text-muted-foreground'
            }
          >
            {i + 1}
          </span>
          <span className={i <= activeIndex ? 'font-medium' : 'text-muted-foreground'}>{s.label}</span>
          {i < steps.length - 1 && <span className="mx-1 text-muted-foreground">→</span>}
        </div>
      ))}
    </div>
  );
}
