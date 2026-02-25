import React from "react";
import "./simulator.css";

const FeedbackSummary = ({ score, feedback }) => {
  return (
    <div className="feedback-container">
      <h2>Interview Summary</h2>

      <div className="score-circle">
        {score}/10
      </div>

      <div className="feedback-text">
        {feedback}
      </div>
    </div>
  );
};

export default FeedbackSummary;