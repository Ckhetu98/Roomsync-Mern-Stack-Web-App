import axios from "axios";
import { USER_API_URL } from "../utils/constants";
import { getToken } from "./TokenService";

const authHeader = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

// User books a property
export const bookProperty = (bookingData) =>
  axios.post(`${USER_API_URL}/properties/book`, bookingData, { headers: authHeader() });

// Get bookings for logged-in user
export const getMyBookings = () =>
  axios.get(`${USER_API_URL}/my`, { headers: authHeader() });

// Cancel a booking by bookingId
export const cancelMyBooking = (bookingId) =>
  axios.patch(`${USER_API_URL}/bookings/${bookingId}/cancel`, {}, { headers: authHeader() });
