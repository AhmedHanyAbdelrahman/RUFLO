"use server";

import { consultationSchema } from "@/lib/validation/consultation";
import { submitConsultation } from "@/lib/crm/submitConsultation";
import type { ConsultationFormState } from "@/app/(marketing)/consultation/state";

export async function submitConsultationAction(
  _prevState: ConsultationFormState,
  formData: FormData,
): Promise<ConsultationFormState> {
  // Honeypot: a real visitor never fills this hidden field.
  if (formData.get("companyWebsiteConfirm")) {
    return { status: "success" };
  }

  const raw = {
    firstName: formData.get("firstName")?.toString() ?? "",
    lastName: formData.get("lastName")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
    website: formData.get("website")?.toString() ?? "",
    industry: formData.get("industry")?.toString() ?? "",
    role: formData.get("role")?.toString() ?? "",
    country: formData.get("country")?.toString() ?? "",
    primaryMarket: formData.get("primaryMarket")?.toString() ?? "",
    growthObjective: formData.get("growthObjective")?.toString() ?? "",
    annualRevenueRange: formData.get("annualRevenueRange")?.toString() ?? "",
    averageCustomerValue: formData.get("averageCustomerValue")?.toString() ?? "",
    locations: formData.get("locations")?.toString() ?? "",
    salesTeamSize: formData.get("salesTeamSize")?.toString() ?? "",
    crm: formData.get("crm")?.toString() ?? "",
    databaseSize: formData.get("databaseSize")?.toString() ?? "",
    outboundStatus: formData.get("outboundStatus")?.toString() ?? "",
    desiredTimeline: formData.get("desiredTimeline")?.toString() ?? "",
    mainChallenge: formData.get("mainChallenge")?.toString() ?? "",
    additionalContext: formData.get("additionalContext")?.toString() ?? "",
    partnershipInterest: formData.get("partnershipInterest") === "on",
    consent: formData.get("consent") === "on",
  };

  const result = consultationSchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please review the highlighted fields and provide the required information.",
      fieldErrors,
    };
  }

  const outcome = await submitConsultation(result.data);

  if (!outcome.ok) {
    return { status: "error", message: outcome.error };
  }

  return {
    status: "success",
    message: "Your Infrastructure Assessment request has been received.",
  };
}
