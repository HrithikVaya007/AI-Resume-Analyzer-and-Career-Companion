import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



import './LoginForm.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Store token and user info
            localStorage.setItem("token", data.token);
            localStorage.setItem("userInfo", JSON.stringify({
                id: data.id,
                name: data.name,
                email: data.email
            }));

            navigate("/dashboard");
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
                    Email 
                    <input 
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)} 
                        required/>
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required/>
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? "Signing In..." : "Sign In"}
                </button>
                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                <p>Forgot your Password ? <Link to="/forgotpassword">Forgot Password</Link></p>
                


            </form>
            
        
        </div>
    </div>
    );
}

export default Login;