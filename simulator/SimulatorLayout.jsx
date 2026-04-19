import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import SimulatorCard from "./SimulatorCard";
import InterviewChat from "./InterviewChat";
import FeedbackSummary from "./FeedbackSummary";
import "./simulator.css";

const SimulatorLayout = () => {
  const navigate = useNavigate();
  
  const [session, setSession] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState("Loading your interview scenario...");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const initSession = async () => {
      const storedRole = localStorage.getItem("analyzedRole");
      if (!storedRole) {
        alert("Please analyze your resume first to establish your role.");
        navigate("/dashboard");
        return;
      }
      setRole(storedRole);

      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/interview/start", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ role: storedRole })
        });
        
        if (res.ok) {
          const data = await res.json();
          setSession(data);
          setCurrentQuestion(data.questions[0]);
        } else {
          alert("Failed to initialize interview simulator.");
        }
      } catch (err) {
        console.error("Simulation Start Error", err);
      } finally {
        setLoading(false);
      }
    };
    
    initSession();
  }, [navigate]);

  const handleNext = async (answerText) => {
    if (!session || !answerText.trim()) return;

    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/interview/next", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          sessionId: session._id,
          answer: answerText
        })
      });
      
      if (res.ok) {
        const updatedSession = await res.json();
        setSession(updatedSession);
        
        // If we just saved the 5th answer, automatically trigger submission/feedback
        if (updatedSession.answers.length >= 5) {
          await handleEnd();
        } else {
          const latestQuestion = updatedSession.questions[updatedSession.questions.length - 1];
          setCurrentQuestion(latestQuestion);
        }
      }
    } catch (err) {
      console.error("Error fetching next question", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnd = async () => {
    if (!session) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/interview/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ sessionId: session._id })
      });
      
      if (res.ok) {
        const data = await res.json();
        setFeedback(data.feedback);
        setSession(data);
        setIsFinished(true);
      }
    } catch (err) {
      console.error("Error submitting interview", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="simulator-page-wrapper">
      <div className="top-nav">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <FaArrowLeft /> Back to Dashboard
        </button>
      </div>

      <div className="simulator-header">
        <h2>AI Interview Simulator</h2>
        <div className="info-badges">
          <div className="info-badge">
            <FaBriefcase /> Position: {role || "Analyzing..." }
          </div>
          <div className="info-badge">
            <FaGraduationCap /> Level: Intermediate
          </div>
        </div>
      </div>

      <div className="simulator-main">
        <SimulatorCard isListening={isListening} isFinished={isFinished} />

        {isFinished ? (
          <FeedbackSummary score={session?.score} feedback={feedback} />
        ) : (
          <InterviewChat
            question={loading ? "Generating response..." : currentQuestion}
            questionNumber={session ? session.questions.length : 1}
            totalQuestions={5}
            isListening={isListening}
            setIsListening={setIsListening}
            handleNext={handleNext}
            handleEnd={() => handleEnd()}
          />
        )}
      </div>
    </div>
  );
};

export default SimulatorLayout;