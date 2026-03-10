import mongoose, { Schema, Document } from "mongoose";
import { OnboardingSession } from "../types/onboarding";

export interface OnboardingSessionDocument extends OnboardingSession, Document {}

const OnboardingSessionSchema = new Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    currentStep: { type: Number, required: true, default: 1 },
    isEligible: { type: Boolean, default: true },
    ineligibilityReason: { type: String },
    data: {
      basicInfo: {
        fullName: String,
        email: String,
        age: Number,
        country: String,
      },
      healthScreening: {
        conditions: [String],
        diabetesControlled: String,
        cardiacEvent: String,
      },
      planSelection: {
        plan: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model<OnboardingSessionDocument>(
  "OnboardingSession",
  OnboardingSessionSchema
);
