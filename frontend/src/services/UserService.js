import axios from "axios";
import { USER_API_URL } from "../utils/constants";
import { getToken } from "./TokenService";

const authHeader = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

export const getUserDashboard = () =>
  axios.get(`${USER_API_URL}/dashboard`, { headers: authHeader() });

export const fetchProfile = () =>
  axios.get(`${USER_API_URL}/profile`, { headers: authHeader() });

export const getUserBookings = () =>
  axios.get(`${USER_API_URL}/my`, { headers: authHeader() });