export interface ConsultationFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
}

export const initialConsultationState: ConsultationFormState = {
  status: "idle",
};
