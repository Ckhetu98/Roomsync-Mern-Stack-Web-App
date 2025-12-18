const TOKEN_KEY = "token";
const ADMIN_KEY = "adminKey";
const USER_KEY = "user";

export function storeToken(tokenValue) {
  localStorage.setItem(TOKEN_KEY, tokenValue);
}
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
export function storeAdminKey(adminKeyValue) {
  localStorage.setItem(ADMIN_KEY, adminKeyValue);
}
export function getAdminKey() {
  return localStorage.getItem(ADMIN_KEY);
}
export function removeAdminKey() {
  localStorage.removeItem(ADMIN_KEY);
}
export function storeUser(userObj) {
  localStorage.setItem(USER_KEY, JSON.stringify(userObj));
}
export function getUser() {
  const v = localStorage.getItem(USER_KEY);
  return v ? JSON.parse(v) : null;
}
export function removeUser() {
  localStorage.removeItem(USER_KEY);
}
