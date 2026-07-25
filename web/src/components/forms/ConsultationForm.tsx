"use client";

import { useActionState } from "react";
import { INDUSTRY_OPTIONS } from "@/lib/validation/consultation";
import { submitConsultationAction } from "@/app/(marketing)/consultation/actions";
import { initialConsultationState } from "@/app/(marketing)/consultation/state";
import { NativeButton } from "@/components/ui/Button";

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-white">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="text-xs text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClasses =
  "w-full rounded-[10px] border border-border bg-ink-card px-4 py-3 text-sm text-white placeholder:text-gray-700 focus:border-lime";

export function ConsultationForm() {
  const [state, formAction, pending] = useActionState(
    submitConsultationAction,
    initialConsultationState,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-[16px] border border-lime bg-ink-card p-8">
        <p className="text-lg font-semibold text-lime">
          {state.message ?? "Your Infrastructure Assessment request has been received."}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-300">
          Our team will review the business model, market, stated objective,
          and operating requirements before the consultation.
        </p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} noValidate className="flex flex-col gap-10">
      {state.status === "error" && state.message ? (
        <p role="alert" className="rounded-[10px] border border-error bg-error/10 px-4 py-3 text-sm text-error">
          {state.message}
        </p>
      ) : null}

      {/* Honeypot */}
      <input
        type="text"
        name="companyWebsiteConfirm"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">Contact details</legend>
        <Field label="First name" name="firstName" error={errors.firstName}>
          <input id="firstName" name="firstName" required className={inputClasses} />
        </Field>
        <Field label="Last name" name="lastName" error={errors.lastName}>
          <input id="lastName" name="lastName" required className={inputClasses} />
        </Field>
        <Field label="Work email" name="email" error={errors.email}>
          <input id="email" name="email" type="email" required className={inputClasses} />
        </Field>
        <Field label="Phone" name="phone" error={errors.phone}>
          <input id="phone" name="phone" type="tel" required className={inputClasses} />
        </Field>
        <Field label="Company" name="company" error={errors.company}>
          <input id="company" name="company" required className={inputClasses} />
        </Field>
        <Field label="Website" name="website" error={errors.website}>
          <input id="website" name="website" type="url" placeholder="https://" className={inputClasses} />
        </Field>
        <Field label="Industry" name="industry" error={errors.industry}>
          <select id="industry" name="industry" required defaultValue="" className={inputClasses}>
            <option value="" disabled>
              Select an industry
            </option>
            {INDUSTRY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Role" name="role" error={errors.role}>
          <input id="role" name="role" className={inputClasses} />
        </Field>
        <Field label="Country" name="country" error={errors.country}>
          <input id="country" name="country" className={inputClasses} />
        </Field>
        <Field label="Primary market" name="primaryMarket" error={errors.primaryMarket}>
          <input id="primaryMarket" name="primaryMarket" className={inputClasses} />
        </Field>
      </fieldset>

      <fieldset className="flex flex-col gap-6">
        <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-lime">
          Growth objective
        </legend>
        <Field label="Main growth objective" name="growthObjective" error={errors.growthObjective}>
          <textarea
            id="growthObjective"
            name="growthObjective"
            required
            rows={3}
            className={inputClasses}
          />
        </Field>
      </fieldset>

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 sm:col-span-2">
          Qualification (optional, helps us prepare)
        </legend>
        <Field label="Annual revenue range" name="annualRevenueRange">
          <input id="annualRevenueRange" name="annualRevenueRange" className={inputClasses} />
        </Field>
        <Field label="Average customer / contract value" name="averageCustomerValue">
          <input id="averageCustomerValue" name="averageCustomerValue" className={inputClasses} />
        </Field>
        <Field label="Number of locations" name="locations">
          <input id="locations" name="locations" className={inputClasses} />
        </Field>
        <Field label="Sales team size" name="salesTeamSize">
          <input id="salesTeamSize" name="salesTeamSize" className={inputClasses} />
        </Field>
        <Field label="Existing CRM" name="crm">
          <input id="crm" name="crm" className={inputClasses} />
        </Field>
        <Field label="Existing database size" name="databaseSize">
          <input id="databaseSize" name="databaseSize" className={inputClasses} />
        </Field>
        <Field label="Current outbound activity" name="outboundStatus">
          <input id="outboundStatus" name="outboundStatus" className={inputClasses} />
        </Field>
        <Field label="Desired launch timing" name="desiredTimeline">
          <input id="desiredTimeline" name="desiredTimeline" className={inputClasses} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Main operational challenge" name="mainChallenge">
            <textarea id="mainChallenge" name="mainChallenge" rows={2} className={inputClasses} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Additional context" name="additionalContext">
            <textarea id="additionalContext" name="additionalContext" rows={3} className={inputClasses} />
          </Field>
        </div>
      </fieldset>

      <label className="flex items-start gap-3 text-sm text-gray-300">
        <input
          type="checkbox"
          name="partnershipInterest"
          className="mt-1 h-4 w-4 rounded border-border bg-ink-card accent-lime"
        />
        I&rsquo;m also interested in discussing a strategic partnership.
      </label>

      <label className="flex items-start gap-3 text-sm text-gray-300">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-border bg-ink-card accent-lime"
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <span>
          I agree to be contacted about a Revenue Infrastructure Consultation
          and accept the{" "}
          <a href="/privacy" className="text-lime underline">
            privacy policy
          </a>
          .
        </span>
      </label>
      {errors.consent ? (
        <p id="consent-error" className="-mt-6 text-xs text-error">
          {errors.consent}
        </p>
      ) : null}

      <NativeButton type="submit" disabled={pending} className="w-fit">
        {pending ? "Submitting…" : "Request Infrastructure Assessment"}
      </NativeButton>
    </form>
  );
}
