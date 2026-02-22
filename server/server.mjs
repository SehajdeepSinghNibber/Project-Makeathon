import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import fundRoutes from "./routes/funds.js";
import portfolioRoutes from "./routes/portfolio.js";
import aiRoutes from "./routes/ai.js";
import compareRoutes from "./routes/compare.js";
import ConnectDB from "./database.mjs";

dotenv.config();

if (
  !process.env.JWT_SECRET ||
  process.env.JWT_SECRET === "your_jwt_secret_key_here"
) {
  console.error("ERROR: JWT_SECRET is not properly configured in .env file");
  console.error("Please set a secure JWT_SECRET in your .env file");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

ConnectDB();

app.use("/api/auth", authRoutes);
app.use("/api/funds", fundRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/compare", compareRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "FundLens API is running" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
