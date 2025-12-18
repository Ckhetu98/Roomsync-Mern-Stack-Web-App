import axios from "axios";
import { PROPERTY_API_URL, PUBLIC_HOSTELS_URL, BOOKING_API_URL } from "../utils/constants";
import { getToken } from "./TokenService";

const authHeader = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

export const fetchProperties = () => axios.get(`${PROPERTY_API_URL}`, { headers: authHeader() });
export const getPropertyById = (id) => axios.get(`${PROPERTY_API_URL}/${id}`, { headers: authHeader() });
export const createProperty = (data) => axios.post(`${PROPERTY_API_URL}`, data, { headers: authHeader() });
export const updateProperty = (id, data) => axios.put(`${PROPERTY_API_URL}/${id}`, data, { headers: authHeader() });
export const deleteProperty = (id) => axios.delete(`${PROPERTY_API_URL}/${id}`, { headers: authHeader() });


export async function fetchAllHostels() {
  try {
    const res = await axios.get(PUBLIC_HOSTELS_URL);
    return res.data.properties || [];
  } catch (err) {
    console.error("Fetch hostels failed:", err);
    return [];
  }
}

// Book a property (user)
export const bookProperty = async (propertyId, checkInDate, durationMonths) => {
  try {
    const token = getToken();
    const res = await axios.post(
      BOOKING_API_URL,
      { propertyId, checkInDate, durationMonths },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Book property failed:", err);
    throw err;
  }
};