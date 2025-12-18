import axios from "axios";
import { ADMIN_API_URL } from "../utils/constants";
import { getToken } from "./TokenService";

const authHeader = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

export const fetchAllUsers = () => axios.get(`${ADMIN_API_URL}/roles`, { headers: authHeader() });
export const deleteUser = (id) => axios.delete(`${ADMIN_API_URL}/user/${id}`, { headers: authHeader() });
export const fetchContacts = () => axios.get(`${ADMIN_API_URL}/contacts`, { headers: authHeader() });
export const fetchBookingsAdmin = () => axios.get(`${ADMIN_API_URL}/bookings`, { headers: authHeader() });
