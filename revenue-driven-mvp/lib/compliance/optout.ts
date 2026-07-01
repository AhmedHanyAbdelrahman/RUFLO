const OPT_OUT_KEYWORDS = ['stop', 'unsubscribe', 'quit', 'cancel', 'end', 'revoke', 'optout', 'opt out'];

export function matchesOptOutKeyword(body: string): string | null {
  const normalized = body.trim().toLowerCase().replace(/[.!?]/g, '');
  for (const kw of OPT_OUT_KEYWORDS) {
    if (normalized === kw || normalized.startsWith(kw + ' ') || normalized === kw.replace(' ', '')) {
      return kw;
    }
  }
  return null;
}
