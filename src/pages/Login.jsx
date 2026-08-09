import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("INVALID EMAIL OR PASSWORD");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        
        {/* Title Header */}
        <h2 className="auth-title">
          WELCOME <span className="cyan-text">BACK</span>
        </h2>
        <p className="auth-subtitle">
          ENTER YOUR CREDENTIALS TO ACCESS YOUR ATHLETE DASHBOARD
        </p>

        {/* Error Message */}
        {error && <div className="auth-error">{error}</div>}

        {/* Form */}
        <form onSubmit={handleLogin} className="auth-form-clean">
          <div className="input-group-clean">
            <label className="input-label">EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="athlete@crossarena.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="dark-input"
            />
          </div>

          <div className="input-group-clean">
            <label className="input-label">PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="dark-input"
            />
          </div>

          <button type="submit" className="cyan-btn-solid" disabled={loading}>
            {loading ? "AUTHENTICATING..." : "LOGIN TO ARENA"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="auth-footer">
          <span>DON'T HAVE AN ACCOUNT? </span>
          <Link to="/signup" className="cyan-link">
            CREATE ACCOUNT
          </Link>
        </div>

      </div>
    </div>
  );
}