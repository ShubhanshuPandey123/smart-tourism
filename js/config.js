// frontend/js/config.js

/*
  Central configuration file for frontend
  Change values here only when backend changes
*/

const API_BASE_URL = "http://localhost:5000/api";

// Token keys (used everywhere)
const USER_TOKEN_KEY = "token";
const ADMIN_TOKEN_KEY = "adminToken";

// Common headers helper (optional but useful)
function getAuthHeaders(isAdmin = false) {
  const token = isAdmin
    ? localStorage.getItem(ADMIN_TOKEN_KEY)
    : localStorage.getItem(USER_TOKEN_KEY);

  return {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` })
  };
}
