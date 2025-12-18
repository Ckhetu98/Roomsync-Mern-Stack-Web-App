// src/routes/userRoutes.js
import { Router } from "express";
import * as userCtrl from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/register", userCtrl.registerUser);
router.post("/login", userCtrl.loginUser);

router.get("/properties/search", userCtrl.searchProperties);
router.post("/properties/book", auth(["user"]), userCtrl.bookProperty);

router.get("/my", auth(["user"]), userCtrl.getUserBookings);
router.patch("/bookings/:bookingId/cancel", auth(["user"]), userCtrl.cancelBooking);

router.get("/dashboard", auth(["user"]), userCtrl.getUserDashboard);
router.get("/me", auth(["user"]), (req, res) => res.json({ user: req.user }));
router.patch("/me", auth(["user"]), userCtrl.updateProfile);

export default router;
