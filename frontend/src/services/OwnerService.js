import axios from "axios";
import { OWNER_API_URL } from "../utils/constants";
import { getToken } from "./TokenService";

const ownerAuthHeader = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

// Owner creates a property
export const ownerCreateProperty = (data) =>
  axios.post(`${OWNER_API_URL}/properties`, data, { headers: ownerAuthHeader() });

// Owner fetches all their properties
export const ownerFetchMyProperties = () =>
  axios.get(`${OWNER_API_URL}/myproperties`, { headers: ownerAuthHeader() });

// Owner fetches tenants for their properties
export const ownerFetchTenants = () =>
  axios.get(`${OWNER_API_URL}/tenants`, { headers: ownerAuthHeader() });

// Owner confirms or cancels a booking with bookingId and status payload
export const ownerConfirmBooking = (bookingId, status) =>
  axios.patch(`${OWNER_API_URL}/bookings/${bookingId}/confirm`, { status }, { headers: ownerAuthHeader() });


// Fetch owner's own properties
export const fetchOwnerProperties = async () => {
  const token = getToken();
  const res = await axios.get(`${OWNER_API_URL}/properties`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.properties || [];
};

// Create or update property
export const saveProperty = async (form, id = null) => {
  const token = getToken();
  if (id) {
    // Update existing
    return await axios.put(`${OWNER_API_URL}/properties/${id}`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    // Create new
    return await axios.post(`${OWNER_API_URL}/properties`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
};

// Delete property
export const deleteProperty = async (id) => {
  const token = getToken();
  return await axios.delete(`${OWNER_API_URL}/properties/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};