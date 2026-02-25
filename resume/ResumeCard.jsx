import { useState } from "react";
import "./resume.css"
import ResumeUpload from "./ResumeUpload";
import JDInput from "./JDInput";
import SkillMatch from "./SkillMatch";
import ScoreCard from "./Scorecard";
import MissingSkills from "./MissingSkills";
import AISuggestions from "./AISuggestions";

function ResumeCard() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jd, setJD] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeFile || !jd) {
      alert("Please upload a resume and provide a job description.");
      return;
    }

    setLoading(true);

    console.log("Analyzing:", resumeFile.name);

    // Mock AI call (replace with FastAPI later)
    setTimeout(() => {
      setResult({
        skillMatch: 75,
        missingSkills: ["Docker", "AWS", "System Design"],
        score: 68,
        suggestions: [
          "Add quantified achievements",
          "Include cloud projects",
        ],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="resume-card">
      <ResumeUpload onUpload={setResumeFile} />
      <JDInput onChange={setJD} />

      <button className="analyze-btn" onClick={handleAnalyze}>
        Analyze Resume
      </button>

      {loading && <p className="ai-thinking">AI analyzing your resume...</p>}

      {result && (
  <div className="result-layout fade-in">

    {/* Left Metrics */}
    <div className="result-section">
      <SkillMatch value={result.skillMatch} />
      <ScoreCard value={result.score} />
      <MissingSkills value={result.missingSkills} />
    </div>

    {/* Right AI Suggestions */}
    <AISuggestions suggestions={result.suggestions} />

  </div>
)}

    </div>
  );
}

export default ResumeCard;
