import React, { useState } from "react";
import { OnboardingSession, HealthScreening } from "../../types/onboarding";
import FormWrapper, { FormField } from "./FormWrapper";

interface Props {
  session: OnboardingSession;
  onUpdate: (update: Partial<OnboardingSession>) => Promise<void>;
}

const CONDITIONS = [
  { value: "diabetes", label: "Diabetes" },
  { value: "highBloodPressure", label: "High Blood Pressure" },
  { value: "sleepApnea", label: "Sleep Apnea" },
  { value: "heartDisease", label: "Heart Disease" },
  { value: "none", label: "None of the above" },
];

const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const Health_Screening: React.FC<Props> = ({ session, onUpdate }) => {
  const existing = session.data?.healthScreening;
  const [conditions, setConditions] = useState<string[]>(existing?.conditions || []);
  const [diabetesControlled, setDiabetesControlled] = useState<string>(existing?.diabetesControlled || "");
  const [cardiacEvent, setCardiacEvent] = useState<string>(existing?.cardiacEvent || "");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const toggleCondition = (value: string) => {
    if (value === "none") { setConditions(["none"]); return; }
    setConditions((prev) => {
      const filtered = prev.filter((c) => c !== "none");
      return filtered.includes(value) ? filtered.filter((c) => c !== value) : [...filtered, value];
    });
  };

  const checkEligibility = () => {
    if (conditions.includes("diabetes") && diabetesControlled === "no")
      return { eligible: false, reason: "Your diabetes is not under medical control." };
    if (conditions.includes("heartDisease") && cardiacEvent === "yes")
      return { eligible: false, reason: "You have had a cardiac event in the past 12 months." };
    if (conditions.includes("diabetes") && conditions.includes("highBloodPressure") && conditions.includes("sleepApnea"))
      return { eligible: false, reason: "Multiple high-risk conditions detected: Diabetes, High Blood Pressure, and Sleep Apnea." };
    return { eligible: true };
  };

  const handleContinue = async () => {
    setError("");
    if (conditions.length === 0) { setError("Please select at least one option."); return; }
    if (conditions.includes("diabetes") && !diabetesControlled) { setError("Please answer the diabetes follow-up question."); return; }
    if (conditions.includes("heartDisease") && !cardiacEvent) { setError("Please answer the heart disease follow-up question."); return; }
    setSubmitting(true);
    const { eligible, reason } = checkEligibility();
    const healthScreening: HealthScreening = {
      conditions,
      ...(conditions.includes("diabetes") && { diabetesControlled: diabetesControlled as "yes" | "no" }),
      ...(conditions.includes("heartDisease") && { cardiacEvent: cardiacEvent as "yes" | "no" }),
    };
    await onUpdate({ currentStep: eligible ? 3 : 2, isEligible: eligible, ineligibilityReason: reason, data: { ...session.data, healthScreening } });
    setSubmitting(false);
  };

  return (
    <FormWrapper
      title="Health Screening"
      subtitle="Your answers are confidential and help us ensure your safety."
      onBack={() => onUpdate({ currentStep: 1 })}
      onContinue={handleContinue}
      continueDisabled={submitting}
      continueLabel={submitting ? "Saving..." : "Continue"}
      error={error}
    >
      <FormField label="Current Conditions (Select all that apply)">
        <div className="space-y-3 mt-1">
          {CONDITIONS.map((c) => (
            <label key={c.value} className="flex items-center gap-4 cursor-pointer">
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: conditions.includes(c.value) ? '#3b82f6' : 'rgba(255,255,255,0.04)',
                  border: conditions.includes(c.value) ? 'none' : '1px solid rgba(59,130,246,0.25)',
                }}
                onClick={() => toggleCondition(c.value)}
              >
                {conditions.includes(c.value) && <span style={{ color: '#0a0f1e', fontSize: '11px', fontWeight: 700 }}>✓</span>}
              </div>
              <span className="text-sm" style={{ color: conditions.includes(c.value) ? '#3b82f6' : 'rgba(7, 11, 223, 0.6)' }}>
                {c.label}
              </span>
            </label>
          ))}
        </div>
      </FormField>

      {conditions.includes("diabetes") && (
        <FormField label="Is your diabetes currently under medical control?">
          <div className="flex gap-4 mt-1">
            {YES_NO.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: diabetesControlled === opt.value ? '#3b82f6' : 'transparent',
                    border: diabetesControlled === opt.value ? 'none' : '1px solid rgba(59,130,246,0.3)',
                  }}
                  onClick={() => setDiabetesControlled(opt.value)}
                >
                  {diabetesControlled === opt.value && <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#0a0f1e' }} />}
                </div>
                <span className="text-sm" style={{ color: '#3b82f6' }}>{opt.label}</span>
              </label>
            ))}
          </div>
        </FormField>
      )}

      {conditions.includes("heartDisease") && (
        <FormField label="Any cardiac events in the past 12 months?">
          <div className="flex gap-4 mt-1">
            {YES_NO.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: cardiacEvent === opt.value ? '#3b82f6' : 'transparent',
                    border: cardiacEvent === opt.value ? 'none' : '1px solid rgba(59,130,246,0.3)',
                  }}
                  onClick={() => setCardiacEvent(opt.value)}
                >
                  {cardiacEvent === opt.value && <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#0a0f1e' }} />}
                </div>
                <span className="text-sm" style={{ color: 'rgba(232,232,232,0.7)' }}>{opt.label}</span>
              </label>
            ))}
          </div>
        </FormField>
      )}
    </FormWrapper>
  );
};

export default Health_Screening;
