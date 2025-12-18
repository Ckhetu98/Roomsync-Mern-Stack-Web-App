// src/controllers/ownerController.js
import { getConnectionObject } from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export async function registerOwner(req, res) {
  const pool = getConnectionObject();
  const { name, email, password, phone } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.execute(
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashed, phone, "owner"]
    );
    res.json({ success: true, message: "Owner registered" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Email already exists or invalid data" });
  }
}

export async function loginOwner(req, res) {
  const pool = getConnectionObject();
  const { email, password } = req.body;
  try {
    const [[owner]] = await pool.execute("SELECT * FROM users WHERE email = ? AND role = ?", [email, "owner"]);
    if (!owner) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, owner.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken({ id: owner.id, role: "owner", name: owner.name });
    res.json({ token, user: { id: owner.id, name: owner.name, role: owner.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// Create property (owner) — accepts image URL text
export async function createProperty(req, res) {
  const pool = getConnectionObject();
  try {
    const { name, location, price, type, occupancy, amenities = null, description = "", image = null, rating = 0.0, available = 1 } = req.body;
    const ownerId = req.user.id;

    if (!name || !location || !price || !type) return res.status(400).json({ message: "Missing fields" });

    const imagePath = image && String(image).startsWith("http") ? image : null;

    const [result] = await pool.execute(
      `INSERT INTO properties (name, location, price, type, occupancy, amenities, description, image, rating, available, owner_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, location, price, type, occupancy, amenities ? JSON.stringify(amenities) : null, description, imagePath, rating, available, ownerId]
    );

    res.json({ success: true, message: "Property added", propertyId: result.insertId });
  } catch (err) {
    console.error("Create property error:", err);
    res.status(400).json({ error: "Failed to add property", details: err.message || err });
  }
}

export async function getProperties(req, res) {
  const pool = getConnectionObject();
  try {
    const ownerId = req.user ? req.user.id : null;
    // If authenticated owner requests their properties: return only owner ones
    if (ownerId) {
      const [rows] = await pool.execute("SELECT * FROM properties WHERE owner_id = ? ORDER BY id DESC", [ownerId]);
      return res.json({ properties: rows });
    }
    // otherwise, for public owner/properties route (rare) - return all
    const [rows] = await pool.execute("SELECT * FROM properties ORDER BY id DESC");
    return res.json({ properties: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
}

export async function getPropertyById(req, res) {
  const pool = getConnectionObject();
  const id = req.params.id;
  try {
    const [property] = await pool.execute("SELECT * FROM properties WHERE id = ?", [id]);
    if (property.length === 0) return res.status(404).json({ error: "Property not found" });
    res.json({ property: property[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch property" });
  }
}

export async function updateProperty(req, res) {
  const pool = getConnectionObject();
  const id = req.params.id;
  const updateData = req.body;
  try {
    // Simple update (only provided fields)
    const keys = Object.keys(updateData);
    if (keys.length === 0) return res.status(400).json({ error: "No update fields" });

    const set = keys.map(() => "?? = ?").join(", ").replace(/\?\?/g, "?"); // simpler — we will do parameterized below
    // Use a safer approach: build clause
    const values = [];
    const sets = [];
    for (const k of keys) {
      sets.push(`${k} = ?`);
      values.push(updateData[k]);
    }
    values.push(id);

    const sql = `UPDATE properties SET ${sets.join(", ")} WHERE id = ?`;
    const [result] = await pool.execute(sql, values);
    res.json({ success: true, message: "Property updated" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to update property" });
  }
}

export async function deleteProperty(req, res) {
  const pool = getConnectionObject();
  const id = req.params.id;
  try {
    await pool.execute("DELETE FROM properties WHERE id = ? AND owner_id = ?", [id, req.user.id]);
    res.json({ success: true, message: "Property deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to delete property" });
  }
}

export async function getOwnerProperties(req, res) {
  const pool = getConnectionObject();
  const ownerId = req.user.id;
  try {
    const [rows] = await pool.execute(
      `SELECT id, name, location, price, type, occupancy, amenities, description, image, rating, available, created_at
       FROM properties
       WHERE owner_id = ? ORDER BY id DESC`,
      [ownerId]
    );
    res.json({ properties: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load properties" });
  }
}

export async function getOwnerTenants(req, res) {
  const pool = getConnectionObject();
  const ownerId = req.user.id;
  try {
    const [rows] = await pool.execute(
      `SELECT b.id AS booking_id, b.status, b.check_in_date, b.duration_months, b.total_amount,
              u.name AS tenant_name, u.email AS tenant_email, p.name AS property_name, p.image
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       JOIN properties p ON b.property_id = p.id
       WHERE p.owner_id = ?
       ORDER BY b.id DESC`,
      [ownerId]
    );

    const totalEarnings = rows.filter(r => r.status === "confirmed").reduce((s, r) => s + Number(r.total_amount || 0), 0);

    res.json({ tenants: rows, totalEarnings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tenants", details: err });
  }
}

// Owner updates booking status (confirm/reject/pending)
export async function updateBookingStatus(req, res) {
  const pool = getConnectionObject();
  const { bookingId } = req.params;
  const { status } = req.body;
  try {
    if (!["confirmed", "pending", "cancelled"].includes(status)) return res.status(400).json({ error: "Invalid status" });

    await pool.execute("UPDATE bookings SET status = ? WHERE id = ?", [status, bookingId]);
    res.json({ success: true, message: `Booking ${status}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update status" });
  }
}

export async function getEarnings(req, res) {
  const pool = getConnectionObject();
  const ownerId = req.user.id;
  try {
    const [[{ total }]] = await pool.execute(
      `SELECT SUM(b.total_amount) AS total
       FROM bookings b JOIN properties p ON b.property_id = p.id
       WHERE p.owner_id = ? AND b.status='confirmed'`,
      [ownerId]
    );
    res.json({ total: total || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch earnings" });
  }
}

export const getAllPropertiesPublic = async (req, res) => {
  try {
    const pool = getConnectionObject();
    const [rows] = await pool.execute(
      `SELECT id, name, location, price, type, occupancy, image, description 
       FROM properties 
       WHERE available = 1 
       ORDER BY id DESC`
    );

    res.json({ properties: rows });
  } catch (err) {
    console.error("PUBLIC PROPERTY LOAD ERROR:", err);
    res.status(500).json({ message: "Failed to load hostels" });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM properties ORDER BY id DESC");
    res.json({ properties: rows });
  } catch (err) {
    console.error("GET ALL PROPERTIES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch properties", error: err.message });
  }
};

export async function submitContact(req, res) {
  const pool = getConnectionObject();
  const { email, subject, message } = req.body;
  try {
    if (!email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    await pool.execute(
      "INSERT INTO contact_us (email, subject, message, created_at) VALUES (?, ?, ?, NOW())",
      [email, subject, message]
    );
    
    res.json({ success: true, message: "Contact message submitted successfully" });
  } catch (err) {
    console.error("Contact submission error:", err);
    res.status(500).json({ error: "Failed to submit contact message" });
  }
}
