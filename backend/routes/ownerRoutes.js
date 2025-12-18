// src/routes/ownerRoutes.js
import { Router } from "express";
import * as ownerCtrl from "../controllers/ownerController.js";
import { auth } from "../middlewares/auth.js";
import { getAllPropertiesPublic } from "../controllers/ownerController.js";
const router = Router();

router.post("/register", ownerCtrl.registerOwner);
router.post("/login", ownerCtrl.loginOwner);
router.get("/all", getAllPropertiesPublic);
router.get("/all", ownerCtrl.getAllProperties);
router.post("/properties", auth(["owner","admin"]), ownerCtrl.createProperty);
router.get("/properties", auth(), ownerCtrl.getProperties); // if owner authenticated, returns owner properties
router.get("/properties/:id", ownerCtrl.getPropertyById);
router.put("/properties/:id", auth(["owner"]), ownerCtrl.updateProperty);
router.delete("/properties/:id", auth(["owner","admin"]), ownerCtrl.deleteProperty);

router.get("/myproperties", auth(["owner"]), ownerCtrl.getOwnerProperties);
router.get("/tenants", auth(["owner"]), ownerCtrl.getOwnerTenants);
router.patch("/bookings/:bookingId/status", auth(["owner"]), ownerCtrl.updateBookingStatus);
router.get("/earnings", auth(["owner"]), ownerCtrl.getEarnings);
router.post("/contactus", ownerCtrl.submitContact);

export default router;

router.get("/all", async (req, res) => {
  try {
    const pool = getConnectionObject();
    const [rows] = await pool.execute(
      "SELECT * FROM properties ORDER BY id DESC"
    );
    res.json({ success: true, properties: rows });
  } catch (err) {
    console.error("PUBLIC GET PROPERTIES ERROR:", err);
    res.status(500).json({ message: "Failed to load properties" });
  }
});