import React from "react";
import { FaMicrophone, FaLock } from "react-icons/fa";
import "./simulator.css";

const SimulatorCard = ({ isListening, isFinished }) => {
  return (
    <div className="ai-card premium-card fade-in">
      <div className="avatar-circle">🤖</div>
      <div className="ai-info">
        <h3>Orbit AI Entity</h3>
        <p className="ai-title">TECHNICAL INTERVIEWER</p>
      </div>

      <div className="listening-status">
        {isFinished ? (
          <div className="status-badge processing">
            <span className="status-dot active purple"></span>
            Analyzing performance...
          </div>
        ) : (
          <div className="status-badge">
            <span className={`status-dot ${isListening ? "active cyan" : ""}`}></span>
            {isListening ? "Listening..." : "Idle / Awaiting Input"}
          </div>
        )}
      </div>

      <div className="secure-connection">
        <FaLock className="lock-icon" />
        <span>SECURE CONNECTION</span>
      </div>
    </div>
  );
};

export default SimulatorCard;