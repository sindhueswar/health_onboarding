import React, { useState } from "react";
import { OnboardingSession } from "../../types/onboarding";
import FormWrapper, { FormField } from "./FormWrapper";

interface Props {
  session: OnboardingSession;
  onUpdate: (update: Partial<OnboardingSession>) => Promise<void>;
}

const PLANS = [
  { value: "monthly", label: "Monthly", price: "$19.99", period: "per month", desc: "Flexible month-to-month access", badge: null },
  { value: "quarterly", label: "Quarterly", price: "$49.99", period: "per quarter", desc: "Save 17% vs monthly billing", badge: "Popular" },
  { value: "annual", label: "Annual", price: "$149.99", period: "per year", desc: "Save 37% — best value", badge: "Best Value" },
];

const Plan: React.FC<Props> = ({ session, onUpdate }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>(session.data?.planSelection?.plan || "");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!selectedPlan) { setError("Please select a plan to continue."); return; }
    setSubmitting(true);
    await onUpdate({ currentStep: 4, data: { ...session.data, planSelection: { plan: selectedPlan as "monthly" | "quarterly" | "annual" } } });
    setSubmitting(false);
  };

  return (
    <FormWrapper
      title="Choose your plan"
      subtitle="Invest in your health. Cancel anytime."
      onBack={() => onUpdate({ currentStep: 2 })}
      onContinue={handleContinue}
      continueDisabled={submitting}
      continueLabel={submitting ? "Saving..." : "Continue"}
      error={error}
    >
      <FormField label="Select a Subscription Plan">
        <div className="space-y-3 mt-1">
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.value;
            return (
              <div
                key={plan.value}
                onClick={() => setSelectedPlan(plan.value)}
                className="relative rounded-xl p-4 cursor-pointer transition-all duration-200"
                style={{
                  background: isSelected ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.02)',
                  border: isSelected ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.06)',
                  transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                }}
              >
                {plan.badge && (
                  <span className="absolute -top-2 right-4 text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: '#3b82f6', color: '#0a0f1e' }}>
                    {plan.badge}
                  </span>
                )}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium mb-0.5" style={{ color: isSelected ? '#3b82f6' : 'black' }}>{plan.label}</p>
                    <p className="text-xs" style={{ color: 'black' }}>{plan.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-light" style={{ color: isSelected ? '#3b82f6' : 'black' }}>{plan.price}</p>
                    <p className="text-xs" style={{ color: 'black' }}>{plan.period}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </FormField>
    </FormWrapper>
  );
};

export default Plan;
