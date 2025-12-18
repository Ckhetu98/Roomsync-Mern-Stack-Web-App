export const API_PORT = "5000";
export const API_BASE_URL = `http://localhost:${API_PORT}`;

export const USER_API_URL = `${API_BASE_URL}/user`;
export const OWNER_API_URL = `${API_BASE_URL}/owner`;
export const ADMIN_API_URL = `${API_BASE_URL}/admin`;

export const PROPERTY_API_URL = `${OWNER_API_URL}/properties`;

export const CONTACT_API_URL = `${OWNER_API_URL}/contactus`;
export const BOOKING_API_URL = `${USER_API_URL}/properties/book`;
export const PUBLIC_HOSTELS_URL = `${OWNER_API_URL}/all`;