// src/pages/AllianzLogin.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { allianzLogin } from "../allianzApi";

export default function AllianzLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    setLoading(true);
    try {
      await allianzLogin(username, password);
      navigate("/allianz/dashboard");
    } catch (err) {
      setError(err.message || "Allianz login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="center-screen">
      <div className="card" style={{ maxWidth: 420 }}>

        {/* Allianz Logo */}
        <img
          src="/allianz-logo.png"
          alt="Allianz Logo"
          style={{
            width: 110,
            height: "auto",
            display: "block",
            margin: "0 auto 18px auto",
          }}
        />

        <h2 className="form-title">Allianz Assistant Tool</h2>
        <p className="form-sub">Sign in to access the Allianz console</p>

        <form className="stack" onSubmit={onSubmit}>
          <label>Username</label>
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div style={{ color: "crimson", marginBottom: "4px" }}>
              {error}
            </div>
          )}

          {/* Premium Allianz Blue Button */}
          <button
            className="button primary allianz"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="row" style={{ marginTop: 10 }}>
          <span>New Allianz user?</span>
          <Link to="/allianz/signup" className="button ghost">
            Create account
          </Link>
        </div>

        <div className="row" style={{ marginTop: 10 }}>
          <Link to="/dashboard" className="button ghost">
            Back to main console
          </Link>
        </div>
      </div>
    </div>
  );
}
