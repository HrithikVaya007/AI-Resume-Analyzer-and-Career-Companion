import { useState, useEffect } from "react";
import "./Dashboard.css";
import { FaRobot, FaFileAlt, FaUserTie, FaHistory, FaCog, FaChartLine, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminPanel from "./AdminPanel";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [historyTab, setHistoryTab] = useState("interview");
  
  const [user, setUser] = useState({
    name: "User Fullname",
    email: "user@example.com",
    role: "User",
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    darkMode: false
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [interviewHistory, setInterviewHistory] = useState([]);
  const [resumeHistory, setResumeHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setUser({
            name: data.name,
            email: data.email,
            role: data.role || "User",
            id: data._id
          });
          if (data.preferences) {
            setPreferences(data.preferences);
          }
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    const fetchHistories = async () => {
      try {
        const resInt = await fetch("http://localhost:5000/api/interview/history", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (resInt.ok) setInterviewHistory(await resInt.json());

        const resRes = await fetch("http://localhost:5000/api/resume/history", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (resRes.ok) setResumeHistory(await resRes.json());
      } catch (err) {
        console.error("Failed to load history", err);
      }
    };

    fetchUserProfile();
    fetchHistories();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const saveProfile = async () => {
    setIsEditing(false);
    const token = localStorage.getItem("token");
    try {
      await fetch("http://localhost:5000/api/user/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: user.name, email: user.email })
      });
      const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
      localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, name: user.name, email: user.email }));
    } catch (err) {
      console.error(err);
    }
  };

  const togglePreference = async (key) => {
    const newVal = !preferences[key];
    const newPrefs = { ...preferences, [key]: newVal };
    setPreferences(newPrefs);
    const token = localStorage.getItem("token");
    try {
      await fetch("http://localhost:5000/api/user/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ preferences: newPrefs })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogoClick = () => {
    if (user.role !== 'admin') return;
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);
    if (newClicks >= 5) {
      setAdminUnlocked(true);
      setLogoClicks(0);
    }
    // Reset clicks after 3 seconds of inactivity
    setTimeout(() => setLogoClicks(0), 3000);
  };

  return (
    <div className={`dashboard-container ${preferences.darkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <h2 className="logo" onClick={handleLogoClick} style={{cursor: 'pointer'}}>Orbit AI</h2>

          <nav className="menu">
            <a className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>Dashboard</a>
            <a className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Profile</a>
            <a className={activeTab === "history" ? "active" : ""} onClick={() => setActiveTab("history")}>History</a>
            <a className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}>Settings</a>
            
            {adminUnlocked && user.role === 'admin' && (
              <a className={activeTab === "admin" ? "active admin-link" : "admin-link"} onClick={() => setActiveTab("admin")}>
                 Control Center
              </a>
            )}
          </nav>
        </div>

        <div className="profile">
          <p className="username">Hello, {user.name}</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeTab === "dashboard" && (
          <>
            <header className="dashboard-header">
              <h1>Welcome, {user.name}</h1>
              <p>Your AI-powered career preparation steps</p>
            </header>

            {/* Cards Section */}
            <section className="cards-grid">
              <div className="dashboard-card">
                <div className="card-header">
                  <FaFileAlt className="card-icon" />
                  <h3>AI Resume Analysis</h3>
                </div>
                <p className="card-desc">Analyze your resume vs job description</p>
                <div className="stats">
                  <div><span className="stat-title">Uploads</span><span className="stat-value">{resumeHistory.length}</span></div>
                </div>
                <button className="btn-primary" onClick={()=>navigate("/resume-analyze")}>Analyze Resume</button>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <FaRobot className="card-icon" />
                  <h3>AI Interview Prep</h3>
                </div>
                <p className="card-desc">Practice AI-generated interview questions</p>
                <div className="stats">
                  <div><span className="stat-title">Sessions</span><span className="stat-value">{interviewHistory.length}</span></div>
                </div>
                <button className="btn-primary" onClick={()=>navigate("/question-gen")}>Start Practicing</button>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <FaUserTie className="card-icon" />
                  <h3>AI Interview Simulator</h3>
                </div>
                <p className="card-desc">Simulate real interview scenarios with AI</p>
                <div className="stats">
                  <div><span className="stat-title">Sessions</span><span className="stat-value">{interviewHistory.length}</span></div>
                </div>
                <button className="btn-primary" onClick={()=>navigate("/ai-simulator")}>Start Mock Interview</button>
              </div>
            </section>
          </>
        )}

        {activeTab === "profile" && (
          <div className="profile-section">
            <header className="dashboard-header">
              <h1>Your Profile</h1>
              <p>Manage your account credentials and personal information</p>
            </header>

            <div className="profile-content-grid">
              <div className="profile-card user-identity-card">
                <div className="avatar-wrapper"><FaUser className="large-avatar-icon" /></div>
                {isEditing ? (
                  <input className="edit-input" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                ) : (
                  <h2>{user.name}</h2>
                )}
                <p className="user-role">{user.role}</p>
                <div className="user-badges">
                  <span className="badge pro-badge">Pro Member</span>
                </div>
              </div>

              <div className="profile-card user-details-card">
                <h3>Account Credentials</h3>
                <div className="credentials-list">
                  <div className="credential-item">
                    <span className="cred-label">Full Name</span>
                    {isEditing ? (
                      <input className="edit-input" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    ) : (
                      <span className="cred-value">{user.name}</span>
                    )}
                  </div>
                  <div className="credential-item">
                    <span className="cred-label">Email Address</span>
                    {isEditing ? (
                      <input className="edit-input" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    ) : (
                      <span className="cred-value">{user.email}</span>
                    )}
                  </div>
                </div>
                
                <div className="profile-actions">
                  {isEditing ? (
                    <>
                      <button className="btn-save" onClick={saveProfile}>Save</button>
                      <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                  ) : (
                    <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>Edit Credentials</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="history-section">
            <header className="dashboard-header">
              <h1>Your History</h1>
              <p>Review your past performances and analyses</p>
            </header>

            <div className="history-tabs">
              <button 
                className={`history-tab ${historyTab === 'interview' ? 'active' : ''}`}
                onClick={() => setHistoryTab('interview')}
              >
                <FaRobot /> Interview History
              </button>
              <button 
                className={`history-tab ${historyTab === 'resume' ? 'active' : ''}`}
                onClick={() => setHistoryTab('resume')}
              >
                <FaFileAlt /> Resume History
              </button>
            </div>

            <div className="history-content">
              {historyTab === "interview" && (
                <div className="history-list">
                  {interviewHistory.length === 0 ? <p>No interview sessions yet.</p> : interviewHistory.map((session, index) => (
                    <div key={index} className="history-item">
                      <div className="history-item-icon"><FaUserTie /></div>
                      <div className="history-item-details">
                        <h4>{session.role} - Mock Interview</h4>
                        <p>{new Date(session.createdAt).toLocaleDateString()} • {session.questions?.length || 0} Questions</p>
                      </div>
                      <div className="history-item-score">Overall Score: <strong>{session.score || 0}/100</strong></div>
                    </div>
                  ))}
                </div>
              )}

              {historyTab === "resume" && (
                <div className="history-list">
                  {resumeHistory.length === 0 ? <p>No resumes uploaded yet.</p> : resumeHistory.map((resume, index) => (
                    <div key={index} className="history-item">
                      <div className="history-item-icon"><FaChartLine /></div>
                      <div className="history-item-details">
                        <h4>{resume.detectedRole || 'Unknown Role'}</h4>
                        <p>{new Date(resume.createdAt).toLocaleDateString()} • ATS Check</p>
                        <p style={{fontSize: '12px', color: '#666'}}>{resume.skills?.join(', ')}</p>
                      </div>
                      <div className="history-item-score">Match: <strong>{resume.atsScore || 0}%</strong></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings-section">
            <header className="dashboard-header">
              <h1>Settings</h1>
              <p>Manage your account preferences</p>
            </header>
            
            <div className="settings-card mt-4">
              <h3>Preferences</h3>
              <div className="pref-row">
                <span>Email Notifications</span>
                <label className="switch">
                  <input type="checkbox" checked={preferences.emailNotifications} onChange={() => togglePreference('emailNotifications')} />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="pref-row">
                <span>Dark Mode</span>
                <label className="switch">
                  <input type="checkbox" checked={preferences.darkMode} onChange={() => togglePreference('darkMode')} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === "admin" && user.role === 'admin' && (
          <AdminPanel />
        )}

      </main>
    </div>
  );
}

export default Dashboard;
