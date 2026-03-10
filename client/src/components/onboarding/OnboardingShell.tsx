import React, { useEffect, useState } from "react";
import { getSession, updateSession } from "../../lib/api";
import { getSessionId } from "../../lib/session";
import { OnboardingSession } from "../../types/onboarding";
import BasicInfo from "./BasicInfo";
import Health_Screening from "./HealthScreening";
import Plan from "./Plan";
import Review from "./Review";
import Ineligible from "./Ineligible";

const OnboardingShell: React.FC = () => {
  const [session, setSession] = useState<OnboardingSession | null>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = getSessionId();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await getSession(sessionId);
        setSession(data);
      } catch (error) {
        console.error("Failed to fetch session", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [sessionId]);

  const handleUpdate = async (update: Partial<OnboardingSession>) => {
    try {
      const updated = await updateSession(sessionId, update);
      setSession(updated);
    } catch (error) {
      console.error("Failed to update session", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Failed to load session. Please refresh.</p>
      </div>
    );
  }

  if (!session.isEligible) {
    return <Ineligible reason={session.ineligibilityReason} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {["Basic Info", "Health Screening", "Plan", "Review"].map((label, i) => (
              <span
                key={i}
                className={`text-xs font-medium ${
                  session.currentStep === i + 1 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(session.currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        {session.currentStep === 1 && (
          <BasicInfo session={session} onUpdate={handleUpdate} />
        )}
        {session.currentStep === 2 && (
          <Health_Screening session={session} onUpdate={handleUpdate} />
        )}
        {session.currentStep === 3 && (
          <Plan session={session} onUpdate={handleUpdate} />
        )}
        {session.currentStep === 4 && (
          <Review session={session} onUpdate={handleUpdate} />
        )}
      </div>
    </div>
  );
};

export default OnboardingShell;
