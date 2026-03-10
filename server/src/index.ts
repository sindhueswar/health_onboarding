import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import onboardingRoutes from "./routes/onboarding.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: ["http://localhost:3000", "http://[::1]:3000", "http://127.0.0.1:3000"],
}));
app.use(express.json());

app.use("/api/onboarding", onboardingRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
