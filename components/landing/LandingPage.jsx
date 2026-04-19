import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaRobot, FaUserTie } from 'react-icons/fa';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <h2>Orbit AI</h2>
        </div>
        <div className="nav-buttons">
          <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
          <button className="btn-signup" onClick={() => navigate('/register')}>Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="landing-hero">
        <h1 className="hero-title">
          Master Your Career Journey with <span className="highlight">AI Intelligence</span>
        </h1>
        <p className="hero-subtitle">
          From perfecting your resume to practicing real-world interviews, Orbit AI provides an all-in-one platform engineered to land your dream job faster and outsmart the competition.
        </p>
      </header>

      {/* Features / Cards Section */}
      <section className="cards-section">
        <div className="tool-card">
          <div className="card-icon-wrapper">
            <FaFileAlt />
          </div>
          <h3>AI Resume Analyzer</h3>
          <p>
            Upload your resume and the target job description. Our advanced AI instantly checks for skill matches, hidden gaps, and gives you an actionable score to pass Applicant Tracking Systems (ATS).
          </p>
        </div>

        <div className="tool-card">
          <div className="card-icon-wrapper">
            <FaRobot />
          </div>
          <h3>AI Question Generator</h3>
          <p>
            Generate tailored interview questions based on your specific role and experience level. Practice predicting the hardest questions before you even step into the room.
          </p>
        </div>

        <div className="tool-card">
          <div className="card-icon-wrapper">
            <FaUserTie />
          </div>
          <h3>AI Interview Simulator</h3>
          <p>
            Step into a realistic audio and text-based mock interview. Receive instant feedback on your answers, tone, and confidence levels as if you were speaking to a real recruiter.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
