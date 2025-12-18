// src/middlewares/auth.js
import { verifyToken } from "../utils/jwt.js";

export function auth(allowedRoles = null) {
  // allowedRoles: null => any authenticated user
  // allowedRoles: "admin" or ["owner","admin"] etc
  return (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const parts = authHeader.split(" ");
    const token = parts.length === 2 ? parts[1] : parts[0];

    try {
      const decoded = verifyToken(token);
      req.user = decoded; // includes id, role, name if set

      if (allowedRoles) {
        const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
        if (!roles.includes(decoded.role)) {
          return res.status(403).json({ error: "Access denied" });
        }
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}
