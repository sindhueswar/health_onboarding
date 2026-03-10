export type Step = 1 | 2 | 3 | 4;

export interface BasicInfo {
  fullName: string;
  email: string;
  age: number;
  country: string;
}

export interface HealthScreening {
  conditions: string[];
  diabetesControlled?: "yes" | "no";
  cardiacEvent?: "yes" | "no";
}

export interface PlanSelection {
  plan: "monthly" | "quarterly" | "annual";
}

export interface OnboardingData {
  basicInfo: BasicInfo;
  healthScreening: HealthScreening;
  planSelection: PlanSelection;
}

export interface OnboardingSession {
  sessionId: string;
  currentStep: Step;
  isEligible: boolean;
  ineligibilityReason?: string;
  data: Partial<OnboardingData>;
}
