// src/pages/AllianzSignup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { allianzRegister } from "../allianzApi";

export default function AllianzSignup() {
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
      await allianzRegister(username, password);
      // after signup, send them to Allianz login
      navigate("/allianz/login");
    } catch (err) {
      setError(err.message || "Allianz signup failed");
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

        <h2 className="form-title">Create Allianz Account</h2>
        <p className="form-sub">Set up your access to the Allianz console</p>

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
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <div className="row" style={{ marginTop: 10 }}>
          <Link to="/allianz/login" className="button ghost">
            Back to Allianz login
          </Link>
        </div>
      </div>
    </div>
  );
}
