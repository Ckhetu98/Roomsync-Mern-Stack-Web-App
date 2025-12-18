import axios from "axios";
import { USER_API_URL, OWNER_API_URL, ADMIN_API_URL } from "../utils/constants";

// user
export async function userRegister(data) { return axios.post(`${USER_API_URL}/register`, data); }
export async function userLogin(data) { return axios.post(`${USER_API_URL}/login`, data); }

// owner
export async function ownerRegister(data) { return axios.post(`${OWNER_API_URL}/register`, data); }
export async function ownerLogin(data) { return axios.post(`${OWNER_API_URL}/login`, data); }

// admin
export async function createAdmin(data) { return axios.post(`${ADMIN_API_URL}/create`, data); }
export async function adminLogin(data) { return axios.post(`${ADMIN_API_URL}/login`, data); }

// helpers
export async function registerByRole(role, data) {
  switch (role) {
    case "user": return userRegister(data);
    case "owner": return ownerRegister(data);
    case "admin": return createAdmin(data);
    default: throw new Error("Invalid role");
  }
}
export async function loginByRole(role, data) {
  switch (role) {
    case "user": return userLogin(data);
    case "owner": return ownerLogin(data);
    case "admin": return adminLogin(data);
    default: throw new Error("Invalid role");
  }
}
