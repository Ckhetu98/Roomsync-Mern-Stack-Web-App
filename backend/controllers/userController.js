// src/controllers/userController.js
import { getConnectionObject } from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export async function registerUser(req, res) {
  const pool = getConnectionObject();
  const { name, email, password, phone } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.execute("INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)", [
      name, email, hashed, phone, "user",
    ]);
    res.json({ success: true, message: "User registered" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Email already exists or invalid data" });
  }
}

export async function loginUser(req, res) {
  const pool = getConnectionObject();
  const { email, password } = req.body;
  try {
    const [[user]] = await pool.execute("SELECT * FROM users WHERE email = ? AND role = ?", [email, "user"]);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken({ id: user.id, role: "user", name: user.name });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email, phone: user.phone } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// Search properties with query params
export async function searchProperties(req, res) {
  const pool = getConnectionObject();
  const { location, minPrice, maxPrice, type } = req.query;
  try {
    let query = "SELECT * FROM properties WHERE 1=1";
    const params = [];
    if (location) {
      query += " AND location LIKE ?";
      params.push(`%${location}%`);
    }
    if (minPrice) {
      query += " AND price >= ?";
      params.push(minPrice);
    }
    if (maxPrice) {
      query += " AND price <= ?";
      params.push(maxPrice);
    }
    if (type) {
      query += " AND type = ?";
      params.push(type);
    }
    const [results] = await pool.execute(query, params);
    res.json({ success: true, properties: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search properties" });
  }
}

// Book property (user)
export async function bookProperty(req, res) {
  const pool = getConnectionObject();
  try {
    const userId = req.user.id;
    const { propertyId, checkInDate, durationMonths } = req.body;
    if (!propertyId || !checkInDate || !durationMonths) return res.status(400).json({ message: "Missing fields" });

    const [[property]] = await pool.execute("SELECT id, price, available FROM properties WHERE id = ?", [propertyId]);
    if (!property) return res.status(404).json({ message: "Property not found" });
    if (property.available === 0) return res.status(400).json({ message: "Property not available" });

    const totalAmount = Number(property.price) * Number(durationMonths);

    await pool.execute(
      `INSERT INTO bookings (property_id, user_id, check_in_date, duration_months, total_amount, status)
       VALUES (?, ?, ?, ?, ?, 'pending')`,
      [propertyId, userId, checkInDate, durationMonths, totalAmount]
    );

    res.json({ success: true, message: "Booking created successfully" });
  } catch (err) {
    console.error("BOOK PROPERTY ERROR:", err);
    res.status(500).json({ message: "Failed to create booking" });
  }
}

// Get user's bookings
export async function getUserBookings(req, res) {
  const pool = getConnectionObject();
  try {
    const userId = req.user.id;
    const [rows] = await pool.execute(
      `SELECT b.id, b.status, b.check_in_date, b.duration_months, b.total_amount,
              p.id AS property_id, p.name AS property_name, p.location, p.price, p.image
       FROM bookings b
       JOIN properties p ON b.property_id = p.id
       WHERE b.user_id = ?
       ORDER BY b.id DESC`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("GET BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Failed to load bookings" });
  }
}

// Cancel booking (user)
export async function cancelBooking(req, res) {
  const pool = getConnectionObject();
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;
    // ensure ownership
    await pool.execute("UPDATE bookings SET status = 'cancelled' WHERE id = ? AND user_id = ?", [bookingId, userId]);
    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (err) {
    console.error("CANCEL BOOKING ERROR:", err);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
}

export async function getUserDashboard(req, res) {
  const pool = getConnectionObject();
  const userId = req.user.id;
  try {
    const [[{ count: bookingCount }]] = await pool.execute("SELECT COUNT(*) AS count FROM bookings WHERE user_id = ?", [userId]);
    const [[{ count: propertyCount }]] = await pool.execute("SELECT COUNT(*) AS count FROM properties WHERE owner_id = ?", [userId]);
    res.json({ success: true, dashboard: { bookingCount, propertyCount } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch dashboard" });
  }
}


export async function updateProfile(req, res) {
  const pool = getConnectionObject();
  const userId = req.user.id;
  const { name, phone, password } = req.body;

  try {
    let sql = "UPDATE users SET ";
    const params = [];

    if (name) {
      sql += "name = ?, ";
      params.push(name);
    }
    if (phone) {
      sql += "phone = ?, ";
      params.push(phone);
    }
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      sql += "password = ?, ";
      params.push(hashed);
    }

    sql = sql.slice(0, -2) + " WHERE id = ?";
    params.push(userId);

    await pool.execute(sql, params);
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Profile update failed" });
  }
}