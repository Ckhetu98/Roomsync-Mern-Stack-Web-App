// src/controllers/adminController.js
import { getConnectionObject } from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export async function createAdmin(req, res) {
  const pool = getConnectionObject();
  const { name, email, password, phone, adminKey } = req.body;

  if (adminKey !== process.env.ADMIN_KEY)
    return res.status(401).json({ error: "Invalid admin key" });

  if (!name || !email || !password || !phone)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.execute(
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashed, phone, "admin"]
    );
    res.json({ success: true, message: "Admin created" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ error: "Email already registered" });
    console.error(err);
    res.status(400).json({ error: "Invalid data or other error" });
  }
}

export async function loginAdmin(req, res) {
  const pool = getConnectionObject();
  const { email, password } = req.body;
  try {
    const [[user]] = await pool.execute("SELECT * FROM users WHERE email = ? AND role = ?", [email, "admin"]);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken({ id: user.id, role: "admin", name: user.name });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
}

export async function getAllRoles(req, res) {
  const pool = getConnectionObject();
  try {
    const [users] = await pool.execute("SELECT id, name, email, role, phone, created_at FROM users");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get users" });
  }
}

export async function deleteUser(req, res) {
  const pool = getConnectionObject();
  const { id } = req.params;
  try {
    await pool.execute("DELETE FROM users WHERE id = ?", [id]);
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
}

export async function getAllBookings(req, res) {
  const pool = getConnectionObject();
  try {
    const [bookings] = await pool.execute(
      `SELECT b.*, u.name userName, p.name propertyName
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       JOIN properties p ON b.property_id = p.id`
    );
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get bookings" });
  }
}

export async function removeBooking(req, res) {
  const pool = getConnectionObject();
  const { id } = req.params;
  try {
    await pool.execute("DELETE FROM bookings WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete booking failed" });
  }
}

export async function getAllContacts(req, res) {
  const pool = getConnectionObject();
  try {
    const [contacts] = await pool.execute("SELECT * FROM contact_us ORDER BY created_at DESC");
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
}
