import type { ConsultationSubmission } from "@/lib/validation/consultation";

/**
 * Integration point for the CRM. Per
 * 03_omnikom_design_system_engineering_specification.md §20.4-20.6:
 * creates a person/organization/deal, routes by segment (financial
 * services, strategic partner, enterprise), and fires internal +
 * confirmation notifications.
 *
 * Wire this up to the real CRM (HubSpot/Pipedrive/custom) before launch.
 * For now it logs server-side so the form flow can be verified end to end.
 */
export async function submitConsultation(
  submission: ConsultationSubmission,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    console.info("[consultation] new submission", {
      company: submission.company,
      email: submission.email,
      industry: submission.industry,
      partnershipInterest: submission.partnershipInterest ?? false,
    });

    return { ok: true };
  } catch {
    return { ok: false, error: "We could not process your request. Please try again." };
  }
}
