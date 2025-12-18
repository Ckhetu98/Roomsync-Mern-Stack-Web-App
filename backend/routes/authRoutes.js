// src/routes/authRoutes.js
import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { getConnectionObject } from "../config/db.js";

const router = Router();

router.get("/me", auth(), async (req, res) => {
  try {
    const pool = getConnectionObject();
    const [[user]] = await pool.execute("SELECT id, name, email, role, phone FROM users WHERE id = ?", [req.user.id]);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

export default router;
