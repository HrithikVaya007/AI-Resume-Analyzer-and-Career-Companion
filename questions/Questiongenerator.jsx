import React from "react";
import {useState} from "react";
//import { useNavigate } from "react-router-dom";
import './question.css'

function Questiongenerator(){
    //const [role,setRole] =useState("");
    const [questions,setQuestions] =useState([]);
    const [loading,setLoading] =useState(false);
    const [_error, setError] = useState(null);
    const [_pdfReady,setPdfReady] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    

    const generateQuestions = async () => {
    setLoading(true);
    setError(null);
    setPdfReady(false);

    try {

      // 🔥 Later replace with Express API
      // const res = await fetch("/api/questions");
      // const data = await res.json();

      // MOCK DATA
      setTimeout(() => {
        setQuestions([
          "Explain Python decorators",
          "Difference between threading and multiprocessing",
          "What is REST API?",
          "Explain FastAPI advantages",
          "How does async await work in Python?"
        ]);
        setPdfUrl("/sample-questions.pdf");
        setPdfReady(true);
        setLoading(false);
      }, 2000);

    } catch (err) {
         console.error(err);
      setError("Failed to generate questions.");
      setLoading(false);
    }
};

    return (
  <div className="questions-container">
    <div className="role-header">
      <h1>AI Questions Generator</h1>
      <p>Got it, you're applying to the role of Python Engineer.</p>
    </div>

    <div className="main-glass-card">
      <div className="sidebar-info">
        {/* You can use a robot icon or image here */}
        <span style={{fontSize: '80px', marginBottom: '10px'}}>🤖</span>
        <h3>AI Questions Generator</h3>
        <p>We've curated 50 critical AI-generated questions for you to practice.</p>
        
        {questions.length > 0 ? (
          <a href={pdfUrl} className="download-btn" download>
            Download Questions as PDF
          </a>
        ) : (
          <button className="generate-btn" onClick={generateQuestions}>
            {loading ? "Generating..." : "Generate AI Questions"}
          </button>
        )}
      </div>

      <div className="questions-list-area">
        <div className="section-title">
          <span>⚙️</span> Questioned Interview Requirements
        </div>
        
        <div className="questions-scroll">
          {questions.map((q, i) => (
            <div key={i} className="question-row">
              <span className="question-number">{i + 1}.</span>
              <p style={{margin: 0}}>{q}</p>
            </div>
          ))}
          {!loading && questions.length === 0 && <p>Click the button to start...</p>}
          {loading && <p>🚀 Preparing your interview prep kit...</p>}
        </div>
      </div>
    </div>
  </div>
);
}
export default Questiongenerator