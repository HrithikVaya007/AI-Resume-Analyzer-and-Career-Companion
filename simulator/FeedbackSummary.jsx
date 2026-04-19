import React from "react";
import { FaCheckCircle, FaThumbsUp, FaChartLine, FaSync, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./simulator.css";

const FeedbackSummary = ({ score, feedback }) => {
  const navigate = useNavigate();
  
  const strengths = feedback?.strengths || ["No specific strengths noted."];
  const weaknesses = feedback?.weaknesses || ["No specific weaknesses noted."];
  const suggestions = feedback?.suggestions || ["No specific suggestions noted."];

  // Scoring out of 10
  const displayScore = score || 0;

  // Calculate circle stroke-dasharray
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 10) * circumference;

  return (
    <div className="feedback-summary-container fade-in">
      <div className="summary-banner">
        <h2>Session Analysis Complete</h2>
        <div className="check-wrapper">
          <FaCheckCircle className="check-icon-large" />
        </div>
      </div>

      <div className="overall-performance">
        <div className="progress-ring-wrapper">
          <svg width="150" height="150">
            <circle
              className="progress-ring-bg"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="8"
              fill="transparent"
              r={radius}
              cx="75"
              cy="75"
            />
            <circle
              className="progress-ring-fill"
              stroke="#8a3ab9"
              strokeWidth="8"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: offset }}
              strokeLinecap="round"
              fill="transparent"
              r={radius}
              cx="75"
              cy="75"
            />
          </svg>
          <div className="score-content">
            <span className="score-num">{displayScore} / 10</span>
          </div>
        </div>
        <p className="perf-label">OVERALL PERFORMANCE</p>
      </div>

      <div className="feedback-grid">
        <div className="f-card strengths-card-ui">
          <div className="f-card-header">
            <FaThumbsUp className="f-icon teal" />
            <h3>Strengths</h3>
          </div>
          <ul className="f-list">
            {strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="f-card improvement-card-ui">
          <div className="f-card-header">
            <FaChartLine className="f-icon red" />
            <h3>Areas for Improvement</h3>
          </div>
          
          <div className="sub-section">
            <span className="sub-title">Weaknesses:</span>
            <ul className="f-list">
              {weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>

          <div className="sub-section">
            <span className="sub-title">Suggestions:</span>
            <ul className="f-list">
              {suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="f-actions">
        <button className="f-btn-restart" onClick={() => window.location.reload()}>
          <FaSync /> Start New Session
        </button>
        <button className="f-btn-home" onClick={() => navigate("/dashboard")}>
          <FaHome /> Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default FeedbackSummary;