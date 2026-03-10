import React from "react";

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FieldProps> = ({ label, error, children }) => (
  <div>
    <label className="block text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: 'rgba(59,130,246,0.9)' }}>
      {label}
    </label>
    {children}
    {error && <p className="text-xs mt-1" style={{ color: '#3b82f6' }}>{error}</p>}
  </div>
);

interface Props {
  title: string;
  subtitle: string;
  onBack?: () => void;
  onContinue: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  children: React.ReactNode;
  error?: string;
}

const FormWrapper: React.FC<Props> = ({
  title, subtitle, onBack, onContinue,
  continueLabel = "Continue", continueDisabled = false, children, error,
}) => {
  return (
    <div>
      <div className="mb-8 fade-up">
        <h2 className="font-display text-4xl font-light mb-2" style={{ color: '#3b82f6' }}>{title}</h2>
        <p className="text-sm" style={{ color: '#3b82f6'}}>{subtitle}</p>
      </div>

      <div className="rounded-xl p-6 mb-6 fade-up-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="space-y-5">{children}</div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
          {error}
        </div>
      )}

      <div className={`grid gap-3 fade-up-3 ${onBack ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {onBack && (
          <button onClick={onBack} className="ghost-btn py-3 rounded-xl text-sm font-medium">← Back</button>
        )}
        <button onClick={onContinue} disabled={continueDisabled} className="gold-btn py-3 rounded-xl text-sm uppercase tracking-widest">
          {continueLabel}
        </button>
      </div>
    </div>
  );
};

export default FormWrapper;
