import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(express.json({ limit: "8mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

app.use("/user", userRoutes);
app.use("/owner", ownerRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
