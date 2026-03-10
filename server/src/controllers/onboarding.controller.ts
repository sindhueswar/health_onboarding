import { Request, Response } from "express";
import OnboardingSession from "../models/OnboardingSession";

// Get or create session
export const getSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    let session = await OnboardingSession.findOne({ sessionId });
    if (!session) {
      session = new OnboardingSession({ 
        sessionId, 
        currentStep: 1, 
        isEligible: true, 
        data: {} 
      });
      await session.save();
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update session
export const updateSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const update = req.body;
    const session = await OnboardingSession.findOneAndUpdate(
      { sessionId },
      { $set: update },
      { new: true, upsert: true }
    );
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Submit session
export const submitSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const session = await OnboardingSession.findOneAndUpdate(
      { sessionId },
      { $set: { currentStep: 4, submitted: true } },
      { new: true }
    );
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json({ message: "Onboarding submitted successfully!", session });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
