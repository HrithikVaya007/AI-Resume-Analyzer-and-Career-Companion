import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaRobot, FaDownload, FaListUl } from "react-icons/fa";
import { jsPDF } from "jspdf";
import './question.css';

function Questiongenerator() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [_error, setError] = useState(null);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Orbit AI - Interview Prep", 20, 20);
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    const role = localStorage.getItem("analyzedRole") || "Your Target Role";
    doc.text(`Custom 15-Question Set tailored for: ${role}`, 20, 30);
    
    doc.setFontSize(12);
    let y = 45;
    
    questions.forEach((q, i) => {
      const textLines = doc.splitTextToSize(`${i + 1}. ${q}`, 170);
      textLines.forEach(line => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 20, y);
        y += 7;
      });
      y += 4;
    });
    
    doc.save(`OrbitAI_Questions_${role.replace(/\s+/g, '_')}.pdf`);
  };

  const generateQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const role = localStorage.getItem("analyzedRole");
      if (!role) {
        alert("Please analyze a resume first to extract your job role!");
        setLoading(false);
        return;
      }
      
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/ai/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });

      if (!res.ok) {
        throw new Error("Failed to generate questions");
      }

      const data = await res.json();
      setQuestions(data.questions);
    } catch (err) {
      console.error(err);
      setError("Failed to generate questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="questions-page-wrapper">
      <div className="top-nav">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <FaArrowLeft /> Back to Dashboard
        </button>
      </div>

      <div className="questions-header">
        <h2>AI Question Generator</h2>
        <p className="subtitle">Prepare for your next role with smart, tailored interview questions.</p>
      </div>

      <div className="main-glass-card premium-card">
        <div className="sidebar-info">
          <div className="icon-wrapper">
            <FaRobot className="robot-icon" />
          </div>
          <h3>AI Interview Prep</h3>
          <p>We'll generate highly relevant questions based on your profile to help you practice and build confidence.</p>
          
          {questions.length > 0 ? (
            <button onClick={downloadPDF} className="download-btn premium-btn">
              <FaDownload /> Download as PDF
            </button>
          ) : (
            <button className="generate-btn premium-btn" onClick={generateQuestions}>
              {loading ? "Generating..." : "Generate AI Questions"}
            </button>
          )}
        </div>

        <div className="questions-list-area">
          <div className="section-title">
            <FaListUl /> Your Tailored Questions
          </div>
          
          <div className="questions-scroll">
            {questions.length > 0 ? (
              questions.map((q, i) => (
                <div key={i} className="question-row fade-in">
                  <span className="question-number">{i + 1}.</span>
                  <p className="question-text">{q}</p>
                </div>
              ))
            ) : (
              <div className="empty-state">
                {loading ? (
                  <p className="ai-thinking"> AI is analyzing industry standards...</p>
                ) : (
                  <p className="placeholder-text">Click the button to generate your personalized questions.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questiongenerator;