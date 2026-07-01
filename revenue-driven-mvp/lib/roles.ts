// Client-safe role helpers — no next/headers import here.

const ROLE_LABELS: Record<string, string> = {
  rd_admin: 'RD Admin',
  shop_owner: 'Shop Owner',
  location_manager: 'Location Manager',
  campaign_manager: 'Campaign Manager',
  appointment_setter: 'Appointment Setter',
  qa_analyst: 'QA Analyst',
  ai_supervisor: 'AI Supervisor',
};

export function roleLabel(role: string): string {
  return ROLE_LABELS[role] ?? role;
}

export const ROLES_CAN_APPROVE_CAMPAIGNS = ['rd_admin', 'shop_owner', 'campaign_manager', 'ai_supervisor'];
export const ROLES_CAN_WORK_TASK_QUEUE = ['rd_admin', 'shop_owner', 'location_manager', 'appointment_setter', 'qa_analyst'];
