// src/allianzApi.js
import { API_BASE, LOGIN_PATH, REGISTER_PATH } from "./config";

const ALLIANZ_TOKEN_KEY = "allianz.auth.token";
const ALLIANZ_USER_KEY = "allianz.auth.user";

// ---- storage helpers ----
export function getAllianzToken() {
  return localStorage.getItem(ALLIANZ_TOKEN_KEY) || "";
}

export function getAllianzUser() {
  try {
    return JSON.parse(localStorage.getItem(ALLIANZ_USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function clearAllianzAuth() {
  localStorage.removeItem(ALLIANZ_TOKEN_KEY);
  localStorage.removeItem(ALLIANZ_USER_KEY);
}

function setAllianzAuth(token, user) {
  if (token) localStorage.setItem(ALLIANZ_TOKEN_KEY, token);
  if (user) localStorage.setItem(ALLIANZ_USER_KEY, JSON.stringify(user));
}

// ---- Allianz SIGNUP (same backend as normal register) ----
export async function allianzRegister(username, password) {
  const res = await fetch(API_BASE + REGISTER_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  // We just create the user; AllianzSignup will redirect to /allianz/login
  return data;
}

// ---- Allianz LOGIN (same backend as normal login) ----
export async function allianzLogin(username, password) {
  const res = await fetch(API_BASE + LOGIN_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  const token =
    data.token || data.accessToken || "";

  const user =
    data.user ||
    (data.username ? { username: data.username } : { username });

  if (!token) {
    throw new Error("No token in response");
  }

  setAllianzAuth(token, user);
  return { token, user };
}
