import axios from "axios";
import { OnboardingSession } from "../types/onboarding";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getSession = async (sessionId: string): Promise<OnboardingSession> => {
  const res = await api.get(`/onboarding/session/${sessionId}`);
  return res.data;
};

export const updateSession = async (sessionId: string, data: Partial<OnboardingSession>): Promise<OnboardingSession> => {
  const res = await api.put(`/onboarding/session/${sessionId}`, data);
  return res.data;
};

export const submitSession = async (sessionId: string): Promise<void> => {
  await api.post(`/onboarding/session/${sessionId}/submit`);
};
