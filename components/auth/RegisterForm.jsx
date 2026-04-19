import { useState } from "react";
//import Login from "./LoginForm";
import { useNavigate } from "react-router-dom";

function Register(){
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmpassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: fullName,
                    email,
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="auth-wrapper">
                <div className="brand-section">
                    <h1 className="brand-name">Orbit AI</h1>
                    <p className="brand-tagline">Navigating your career path.</p>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    {error && <p className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                    <label>
                        Full Name
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </label>
                    <label>
                        Confirm Password
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required />
                    </label>
                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                    <p style={{ marginTop: '10px', textAlign: 'center' }}>
                        Already have an account? <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</span>
                    </p>
                </form>
            </div>
        </div>
    );
}
export default Register