import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css"; // Adjust path if your CSS is stored elsewhere (e.g. "./Auth.css")
import "./Signup.css"; // Adjust path if your CSS is stored elsewhere (e.g. "./Auth.css")

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Standard Email/Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("PASSWORDS DO NOT MATCH");
    }

    if (password.length < 6) {
      return setError("PASSWORD MUST BE AT LEAST 6 CHARACTERS");
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("THIS EMAIL IS ALREADY REGISTERED");
      } else {
        setError("FAILED TO CREATE ACCOUNT. TRY AGAIN.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Google One-Click Signup
  const handleGoogleSignup = async () => {
  setError("");
  setLoading(true);

  try {
    await signInWithPopup(auth, googleProvider);
    navigate("/dashboard");
  } catch (err) {
    console.error("Firebase Auth Error:", err.code, err.message);

    if (err.code === "auth/popup-blocked") {
      setError("POPUP BLOCKED. PLEASE ALLOW POPUPS FOR THIS SITE.");
    } else if (err.code === "auth/popup-closed-by-user") {
      setError("SIGN-IN CANCELLED BEFORE COMPLETION.");
    } else if (err.code === "auth/unauthorized-domain") {
      setError("DOMAIN NOT AUTHORIZED IN FIREBASE CONSOLE.");
    } else {
      setError(`SIGNUP FAILED: ${err.message}`);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        
        {/* Title Header */}
        <h2 className="auth-title">
          JOIN THE <span className="cyan-text">ARENA</span>
        </h2>
        <p className="auth-subtitle">
          CREATE YOUR ACCOUNT TO START TRACKING YOUR ATHLETE PERFORMANCE
        </p>

        {/* Error Alert */}
        {error && <div className="auth-error">{error}</div>}

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="auth-form-clean">
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

          <div className="input-group-clean">
            <label className="input-label">CONFIRM PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="dark-input"
            />
          </div>

          <button type="submit" className="cyan-btn-solid" disabled={loading}>
            {loading ? "CREATING ATHLETE PROFILE..." : "REGISTER FOR CROSSARENA"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* Google Signup Button */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="google-btn"
          disabled={loading}
        >
          <svg className="google-icon" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          SIGN UP WITH GOOGLE
        </button>

        {/* Footer Link */}
        <div className="auth-footer">
          <span>ALREADY HAVE AN ACCOUNT? </span>
          <Link to="/login" className="cyan-link">
            LOGIN HERE
          </Link>
        </div>

      </div>
    </div>
  );
}