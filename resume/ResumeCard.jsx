import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaBolt, FaFilePdf, FaRobot } from "react-icons/fa";
import { BsPersonVideo3 } from "react-icons/bs";
import "./resume.css";

function ResumeCard() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jd, setJD] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file || !jd) {
      alert("Please upload a resume and provide a job description.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jd", jd); // Sending Job Description to Backend
      
      const res = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data.analysis);
        
        // Save extracted role to local storage for subsequent QuestionGen & Simulator steps
        localStorage.setItem("analyzedRole", data.analysis.role || "Unknown Role");
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
   
      <div className="resume-page-wrapper">
      {!result ? (
        <div className="resume-mockup-card">
          <div className="resume-header">
            <h2>AI Resume Analysis</h2>
            <p className="subtitle">
              Upload your resume and paste the Job Description to get an advanced, deep-<br/>learning based gap analysis.
            </p>
          </div>

          <div className="upload-section">
            <div 
              className={`drag-drop-box ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                accept=".pdf,.docx" 
                style={{display: 'none'}} 
              />
              <FaCloudUploadAlt className="upload-icon" />
              <p className="drag-text">
                Drag & Drop or <span className="browse-text">Browse</span> File
              </p>
              <p className="format-text">
                {file ? file.name : "Supported formats: PDF, DOCX"}
              </p>
            </div>

            <textarea 
              className="jd-textarea" 
              placeholder="Paste Job Description here..."
              value={jd}
              onChange={(e) => setJD(e.target.value)}
            ></textarea>
          </div>

          <button className="initialize-btn" onClick={handleAnalyze}>
            {loading ? "Analyzing Document..." : "Initialize AI Analysis ✨"}
          </button>
        </div>
      ) : (
        <div className="results-container fade-in">
           {/* Left Column */}
           <div className="results-left">
              {/* Match Probability */}
              <div className="metric-box">
                <h3 className="metric-title">OVERALL MATCH PROBABILITY</h3>
                <div className="circular-progress-container">
                  <svg className="circular-progress" viewBox="0 0 100 100">
                    <circle className="bg-circle" cx="50" cy="50" r="40"></circle>
                    <circle className="fg-circle" cx="50" cy="50" r="40" style={{strokeDasharray: `${result.skillMatch * 2.51} 251`}}></circle>
                  </svg>
                  <div className="progress-text">
                    <span className="percent-val">{result.skillMatch}%</span>
                  </div>
                </div>
              </div>

              {/* ATS Score */}
              <div className="metric-box">
                <h3 className="metric-title">ATS READABILITY SCORE</h3>
                <div className="linear-progress-wrapper">
                  <div className="ats-track">
                    <div className="ats-fill" style={{width: `${result.score}%`}}></div>
                  </div>
                </div>
                <div className="score-text-right">
                  <strong>{result.score} / 100</strong>
                  <span className="tiny-text">Formatting & parseability check</span>
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="metric-box">
                <h3 className="metric-title">CRITICAL MISSING KEYWORDS</h3>
                <div className="keywords-list">
                  {result.missingSkills.map((skill, index) => (
                    <div className="keyword-item" key={index}>
                      <div className="kw-header">
                        <span className="kw-name">{skill.name}</span>
                        <span className="kw-impact">Impact: {skill.impact}%</span>
                      </div>
                      <div className="kw-track">
                         <div className="kw-fill" style={{width: `${skill.impact}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
           </div>

           {/* Right Column */}
           <div className="results-right">
              <div className="ai-recs-box">
                <div className="recs-header">
                  <FaRobot className="robot-icon" />
                  <h2>Orbit AI Recommendations</h2>
                </div>
                <div className="recs-list">
                  {result.suggestions.map((rec, index) => (
                    <div className="rec-item" key={index}>
                      <div className="bolt-icon"><FaBolt /></div>
                      <p>{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="action-buttons-row">
                <button className="export-btn" onClick={() => navigate("/dashboard")}>
                   <FaFilePdf /> Export Report
                </button>
                <button className="practice-btn" onClick={() => navigate("/ai-simulator")}>
                   <BsPersonVideo3 /> Practice Interview
                </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default ResumeCard;
