// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, clearAuth, getUser } from "../api";

const SINGLIFE_IFRAME_URL =
  "https://chat.lindy.ai/embedded/lindyEmbed/9b5f6236-91e8-4b27-9ab2-e109e57f7d67";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }
  }, [navigate]);

  const user = getUser();

  const GOLD = "#FECE54";

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg,#f5fbff 0%,#fff7f1 100%)",
        fontFamily:
          '"Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        color: "#0f172a",
      }}
    >
      {/* ====================== TOP BAR ====================== */}
      <header
        style={{
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#ffffff",
          boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Singlife Logo */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "999px",
              padding: 2,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/singlife-logo.png"
              alt="Singlife Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Title + User */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong style={{ fontSize: 16 }}>
              Ulink–Singlife Shield Plan – AI Console
            </strong>
            {user && (
              <span
                style={{
                  fontSize: 13,
                  opacity: 0.7,
                  marginTop: 2,
                }}
              >
                Logged in as{" "}
                <strong style={{ color: GOLD }}>{user.username}</strong>
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Status pill */}
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 1.3,
              background: "rgba(34,197,94,0.08)",
              color: "#16a34a",
              border: "1px solid rgba(34,197,94,0.35)",
            }}
          >
            Assistant Online
          </span>

          {/* Logout */}
          <button
            className="button ghost"
            onClick={() => {
              clearAuth();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* ====================== MAIN AREA ====================== */}
      <main style={{ flex: 1, padding: 16, minHeight: 0 }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 16,
            overflow: "hidden",
            background: "#ffffff",
            boxShadow: "0 10px 40px rgba(15,23,42,0.12)",
          }}
        >
          <iframe
            src={SINGLIFE_IFRAME_URL}
            title="Lindy Embed"
            width="100%"
            height="100%"
            style={{ border: "none", display: "block" }}
          />
        </div>
      </main>
    </div>
  );
}
