export interface CTA {
  label: string;
  href: string;
  style?: "primary" | "secondary" | "text";
  analyticsId?: string;
  external?: boolean;
}
