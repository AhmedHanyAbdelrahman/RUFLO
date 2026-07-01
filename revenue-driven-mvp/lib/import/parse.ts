import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export interface ParsedFile {
  columns: string[];
  rows: Record<string, string>[];
}

export async function parseImportFile(file: File): Promise<ParsedFile> {
  const isXlsx = file.name.toLowerCase().endsWith('.xlsx') || file.name.toLowerCase().endsWith('.xls');
  if (isXlsx) return parseXlsx(file);
  return parseCsv(file);
}

async function parseCsv(file: File): Promise<ParsedFile> {
  const text = await file.text();
  const result = Papa.parse<Record<string, string>>(text, { header: true, skipEmptyLines: true });
  const columns = result.meta.fields ?? [];
  return { columns, rows: result.data };
}

async function parseXlsx(file: File): Promise<ParsedFile> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: '' });
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
  return { columns, rows };
}
