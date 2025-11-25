// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

import { getToken } from "./api.js";

// 🔹 NEW imports for Allianz flow
import AllianzLogin from "./pages/AllianzLogin.jsx";
import AllianzSignup from "./pages/AllianzSignup.jsx";
import AllianzDashboard from "./pages/AllianzDashboard.jsx";
import { getAllianzToken } from "./allianzApi.js";

// Main system protection (uses normal token)
function Protected({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />;
}

// Allianz-only protection (uses separate Allianz token)
function AllianzProtected({ children }) {
  return getAllianzToken() ? children : <Navigate to="/allianz/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main system */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/admin"
          element={
            <Protected>
              <AdminPanel />
            </Protected>
          }
        />

        {/* Allianz system – separate login/signup/dashboard */}
        <Route path="/allianz/login" element={<AllianzLogin />} />
        <Route path="/allianz/signup" element={<AllianzSignup />} />
        <Route
          path="/allianz/dashboard"
          element={
            <AllianzProtected>
              <AllianzDashboard />
            </AllianzProtected>
          }
        />

        {/* Default: send to main dashboard (will redirect to /login if not logged in) */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
