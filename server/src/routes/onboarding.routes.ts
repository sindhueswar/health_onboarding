import { Router } from "express";
import { getSession, updateSession, submitSession } from "../controllers/onboarding.controller";

const router = Router();

router.get("/session/:sessionId", getSession);
router.put("/session/:sessionId", updateSession);
router.post("/session/:sessionId/submit", submitSession);

export default router;
