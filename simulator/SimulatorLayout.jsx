import React, { useState } from "react";
import SimulatorCard from "./SimulatorCard";
import InterviewChat from "./InterviewChat";
import "./simulator.css";

const SimulatorLayout = () => {
  const questions = [
    "How would you deploy a scalable ML pipeline?",
    "Explain CI/CD in MLOps.",
    "How do you monitor model drift?"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleEnd = () => {
    alert("Interview Ended");
  };

  return (
    <div className="simulator-wrapper">
      <div className="simulator-header">
        <h1>AI Interview Simulator</h1>
        <p>Position: MLOps Engineer | Level: Intermediate</p>
      </div>

      <div className="simulator-main">
        <SimulatorCard isListening={isListening} />

        <InterviewChat
          question={questions[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          isListening={isListening}
          setIsListening={setIsListening}
          handleNext={handleNext}
          handleEnd={handleEnd}
        />
      </div>
    </div>
  );
};

export default SimulatorLayout;