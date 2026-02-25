import "./Dashboard.css";
import { FaRobot, FaFileAlt, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();
  
  return (
    
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Orbit AI</h2>

        <nav className="menu">
          <a className="active">Dashboard</a>
          <a>History</a>
          <a>Settings</a>
        </nav>

        <div className="profile">
          <p className="username">Hello, Hrithik</p>
          <button className="logout-btn"onClick={()=>navigate("/")}>Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome, Hrithik</h1>
          <p>Your AI-powered career preparation steps</p>
        </header>

        {/* Cards Section */}
        <section className="cards-grid">
          {/* Card 1 */}
          <div className="dashboard-card">
            <div className="card-header">
              <FaFileAlt className="card-icon" />
              <h3>AI Resume Analysis</h3>
            </div>

            <p className="card-desc">
              Analyze your resume vs job description
            </p>

            <div className="stats">
              <div>
                <span className="stat-title">Skill Match</span>
                <span className="stat-value">75%</span>
              </div>
              <div>
                <span className="stat-title">Score</span>
                <span className="stat-value">68</span>
              </div>
            </div>

            <button className="btn-primary" onClick={()=>navigate("/resume-analyze")}>Analyze Resume</button>
          </div>

          {/* Card 2 */}
          <div className="dashboard-card">
            <div className="card-header">
              <FaRobot className="card-icon" />
              <h3>AI Interview Prep</h3>
            </div>

            <p className="card-desc">
              Practice AI-generated interview questions
            </p>

            <div className="stats">
              <div>
                <span className="stat-title">Questions</span>
                <span className="stat-value">100</span>
              </div>
              <div>
                <span className="stat-title">Level</span>
                <span className="stat-value">Intermediate</span>
              </div>
            </div>

            <button className="btn-primary" onClick={()=>navigate("/question-gen")}>Start Practicing</button>
          </div>

          {/* Card 3 */}
          <div className="dashboard-card">
            <div className="card-header">
              <FaUserTie className="card-icon" />
              <h3>AI Interview Simulator</h3>
            </div>

            <p className="card-desc">
              Simulate real interview scenarios with AI
            </p>

            <div className="stats">
              <div>
                <span className="stat-title">Readiness</span>
                <span className="stat-value">87%</span>
              </div>
              <div>
                <span className="stat-title">Sessions</span>
                <span className="stat-value">3</span>
              </div>
            </div>

            <button className="btn-primary" onClick={()=>navigate("/ai-simulator")}>Start Mock Interview</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
