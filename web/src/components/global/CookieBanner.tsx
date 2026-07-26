"use client";

import { useSyncExternalStore } from "react";

const CONSENT_KEY = "omnikom-cookie-consent";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return "accepted"; // storage unavailable — don't show the banner
  }
}

function getServerSnapshot() {
  return "accepted"; // no consent state on the server; avoids a hydration flash
}

function setConsent(value: "accepted" | "declined") {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // ignore — banner will simply not persist the choice
  }
  listeners.forEach((listener) => listener());
}

export function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (consent) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-16 z-40 border-t border-border bg-ink-card lg:bottom-0"
    >
      <div className="container-page flex flex-col items-start gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm text-gray-300">
          We use essential cookies to run this site and, with your consent,
          analytics cookies to understand usage. See our{" "}
          <a href="/cookies" className="text-lime underline">
            cookie policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setConsent("declined")}
            className="rounded-[10px] border border-gray-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="rounded-[10px] border border-lime bg-lime px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
