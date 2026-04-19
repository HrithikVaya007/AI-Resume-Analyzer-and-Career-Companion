import { useState } from "react";
import { Link } from "react-router-dom";

import './LoginForm.css';

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log({ password });

    // Later → call backend API here
    setSuccess(true);
  };

  return (
    <div className="login-container">
      <div className="auth-wrapper">

        <div className="brand-section">
          <h1 className="brand-name">Orbit AI</h1>
          <p className="brand-tagline">Navigating your career path.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>

          <h2 className="form-title">Set new password</h2>
          <p className="form-subtitle">
            Create a strong password for your account.
          </p>

          <label>
            New Password
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit">
            {success ? "Password Reset Successful" : "Reset Password"}
          </button>

          {success && (
            <div className="form-footer">
              <Link to="/">Go back to login →</Link>
            </div>
          )}

        </form>

      </div>
    </div>
  );
}

export default ResetPassword;
