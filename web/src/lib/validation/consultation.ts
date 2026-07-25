import { z } from "zod";

// Source: 03_omnikom_design_system_engineering_specification.md §20.1 (ConsultationSubmission)
export const consultationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid work email"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  company: z.string().trim().min(1, "Company is required"),
  website: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
  industry: z.string().trim().min(1, "Select an industry"),
  role: z.string().trim().optional(),
  country: z.string().trim().optional(),
  primaryMarket: z.string().trim().optional(),
  growthObjective: z.string().trim().min(1, "Describe your main growth objective"),
  annualRevenueRange: z.string().trim().optional(),
  averageCustomerValue: z.string().trim().optional(),
  locations: z.string().trim().optional(),
  salesTeamSize: z.string().trim().optional(),
  crm: z.string().trim().optional(),
  databaseSize: z.string().trim().optional(),
  outboundStatus: z.string().trim().optional(),
  desiredTimeline: z.string().trim().optional(),
  mainChallenge: z.string().trim().optional(),
  partnershipInterest: z.boolean().optional(),
  additionalContext: z.string().trim().optional(),
  consent: z.literal(true, "You must accept the privacy consent to continue"),
  // Honeypot: real visitors never populate this hidden field.
  companyWebsiteConfirm: z.string().max(0).optional(),
});

export type ConsultationSubmission = z.infer<typeof consultationSchema>;

export const INDUSTRY_OPTIONS = [
  "Real estate and property",
  "Roofing and home services",
  "HVAC",
  "Solar",
  "Automotive",
  "B2B and SaaS",
  "Staffing and recruiting",
  "Dental and healthcare",
  "Med spa and aesthetics",
  "Legal and professional services",
  "Financial services and insurance",
  "Education and training",
  "Commercial and industrial services",
  "Other",
];
