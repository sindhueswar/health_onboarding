import React, { useState } from "react";
import { OnboardingSession } from "../../types/onboarding";
import { submitSession } from "../../lib/api";
import { getSessionId } from "../../lib/session";
import FormWrapper, { FormField } from "./FormWrapper";

interface Props {
  session: OnboardingSession;
  onUpdate: (update: Partial<OnboardingSession>) => Promise<void>;
}

const Row = ({ label, value }: { label: string; value?: string | number }) => (
  <div className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
    <span className="text-xs w-1/2" style={{ color: 'rgba(232,232,232,0.4)' }}>{label}</span>
    <span className="text-xs font-medium w-1/2 text-right" style={{ color: 'black' }}>{value}</span>
  </div>
);

const Review: React.FC<Props> = ({ session, onUpdate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const sessionId = getSessionId();
  const { basicInfo, healthScreening, planSelection } = session.data || {};

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await submitSession(sessionId);
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8 fade-up">
        <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)' }}>
          <span style={{ fontSize: '32px' }}>✦</span>
        </div>
        <h2 className="font-display text-4xl font-light mb-3" style={{ color: '#93c5fd' }}>Welcome to VitaCore</h2>
        <p className="text-sm" style={{ color: 'black' }}>Your journey to better health begins now.</p>
      </div>
    );
  }

  return (
    <FormWrapper
      title="Review & Submit"
      subtitle="Everything looks good? Let's get you started."
      onBack={() => onUpdate({ currentStep: 3 })}
      onContinue={handleSubmit}
      continueDisabled={submitting}
      continueLabel={submitting ? "Submitting..." : "Submit Application"}
      error={error}
    >
      <FormField label="Personal Details">
        <div className="mt-1">
          <Row label="Full Name" value={basicInfo?.fullName} />
          <Row label="Email" value={basicInfo?.email} />
          <Row label="Age" value={basicInfo?.age} />
          <Row label="Country" value={basicInfo?.country} />
          <button onClick={() => onUpdate({ currentStep: 1 })} className="text-xs mt-2 block" style={{ color: '#3b82f6' }}>Edit →</button>
        </div>
      </FormField>

      <FormField label="Health Screening">
        <div className="mt-1">
          <Row label="Conditions" value={healthScreening?.conditions?.join(", ") || "None"} />
          {healthScreening?.diabetesControlled && <Row label="Diabetes Controlled" value={healthScreening.diabetesControlled} />}
          {healthScreening?.cardiacEvent && <Row label="Cardiac Event" value={healthScreening.cardiacEvent} />}
          <button onClick={() => onUpdate({ currentStep: 2 })} className="text-xs mt-2 block" style={{ color: '#3b82f6' }}>Edit →</button>
        </div>
      </FormField>

      <FormField label="Selected Plan">
        <div className="mt-1">
          <Row label="Plan" value={planSelection?.plan ? planSelection.plan.charAt(0).toUpperCase() + planSelection.plan.slice(1) : ""} />
          <button onClick={() => onUpdate({ currentStep: 3 })} className="text-xs mt-2 block" style={{ color: '#3b82f6' }}>Edit →</button>
        </div>
      </FormField>
    </FormWrapper>
  );
};

export default Review;
