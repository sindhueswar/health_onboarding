import React from "react";

interface Props { reason?: string; }

const Ineligible: React.FC<Props> = ({ reason }) => {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6" style={{ background: '#0a0f1e' }}>
      <div className="orb w-96 h-96 -top-48 -right-48" style={{ background: 'rgba(239,68,68,0.06)', position: 'fixed', borderRadius: '50%', filter: 'blur(80px)' }} />
      <div className="glass-card rounded-2xl w-full max-w-lg p-10 text-center relative z-10">
        <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <span style={{ fontSize: '28px' }}>✕</span>
        </div>
        <h1 className="font-display text-4xl font-light mb-3" style={{ color: '#3b82f6' }}>We're Sorry</h1>
        <p className="text-sm mb-6" style={{ color: 'rgba(232,232,232,0.5)' }}>
          Based on your health screening, you are not eligible for our program at this time.
        </p>
        {reason && (
          <div className="rounded-xl p-4 mb-6" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <p className="text-sm" style={{ color: '#fca5a5' }}>{reason}</p>
          </div>
        )}
        <p className="text-xs mb-6" style={{ color: 'rgba(232,232,232,0.3)' }}>
          Please consult your healthcare provider for further guidance.
        </p>
        <a href="mailto:support@vitacore.com"
          className="gold-btn inline-block px-8 py-3 rounded-xl text-sm uppercase tracking-widest">
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default Ineligible;
