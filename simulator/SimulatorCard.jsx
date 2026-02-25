import React from "react";
import "./simulator.css";

const SimulatorCard = ({ isListening }) => {
  return (
    <div className="simulator-card">
      <div className="avatar">🤖</div>
      <h2>Orbit AI Interviewer</h2>

      <div className="status">
        <span className={isListening ? "dot active" : "dot"}></span>
        {isListening ? "Listening..." : "Idle"}
      </div>

      <div className="live-box">
        <span className="live-indicator"></span>
        LIVE
      </div>
    </div>
  );
};

export default SimulatorCard;