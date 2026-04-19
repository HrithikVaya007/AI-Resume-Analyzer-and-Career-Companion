import { useState } from "react";
import { Link } from "react-router-dom";

import './LoginForm.css';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email });

    // API should come here
    setSent(true);
  };

  return (
    <div className="login-container">
      <div className="auth-wrapper">

        <div className="brand-section">
          <h1 className="brand-name">Orbit AI</h1>
          <p className="brand-tagline">Navigating your career path.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>

          <h2 className="form-title">Reset your password</h2>
          <p className="form-subtitle">
            Enter your email and we’ll send you a reset link.
          </p>

          <label>
            Email
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <button type="submit">
            {sent ? "Check your inbox" : "Send Reset Link"}
          </button>

          <div className="form-footer">
            <Link to="/">← Back to Login</Link>
          </div>

        </form>

      </div>
    </div>
  );
}

export default ForgotPassword;
