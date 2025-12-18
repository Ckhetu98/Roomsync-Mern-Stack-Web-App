// src/routes/adminRoutes.js
import { Router } from "express";
import * as adminCtrl from "../controllers/adminController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/create", adminCtrl.createAdmin);
router.post("/login", adminCtrl.loginAdmin);
router.get("/roles", auth("admin"), adminCtrl.getAllRoles);
router.delete("/user/:id", auth("admin"), adminCtrl.deleteUser);
router.get("/bookings", auth("admin"), adminCtrl.getAllBookings);
router.delete("/booking/:id", auth("admin"), adminCtrl.removeBooking);
router.get("/contacts", auth("admin"), adminCtrl.getAllContacts);

export default router;
