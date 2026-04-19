import { useState, useEffect } from "react";
import { FaUsers, FaFileInvoice, FaMicrophone, FaUserSlash, FaUserCheck } from "react-icons/fa";
import "./Dashboard.css";

function AdminPanel() {
  const [stats, setStats] = useState({ users: 0, resumes: 0, sessions: 0 });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    const token = localStorage.getItem("token");
    try {
      const statsRes = await fetch("http://localhost:5000/api/admin/stats", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (statsRes.ok) setStats(await statsRes.json());

      const usersRes = await fetch("http://localhost:5000/api/admin/users", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (usersRes.ok) setUsers(await usersRes.json());
    } catch (err) {
      console.error("Admin Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}/status`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        fetchAdminData(); // Refresh list
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="admin-loading">Initializing Control Center...</div>;

  return (
    <div className="admin-panel fade-in">
      <header className="dashboard-header">
        <h1>Command & Control Center</h1>
        <p>Real-time platform oversight and user management</p>
      </header>

      {/* Admin Stats Grid */}
      <section className="cards-grid">
        <div className="dashboard-card admin-stat-card">
          <div className="card-header">
            <FaUsers className="card-icon" />
            <h3>Registered Users</h3>
          </div>
          <div className="stat-value">{stats.users}</div>
          <p className="card-desc">Total platform growth</p>
        </div>

        <div className="dashboard-card admin-stat-card">
          <div className="card-header">
            <FaFileInvoice className="card-icon" />
            <h3>Resumes Analyzed</h3>
          </div>
          <div className="stat-value">{stats.resumes}</div>
          <p className="card-desc">Total ATS checks performed</p>
        </div>

        <div className="dashboard-card admin-stat-card">
          <div className="card-header">
            <FaMicrophone className="card-icon" />
            <h3>Interviews Conducted</h3>
          </div>
          <div className="stat-value">{stats.sessions}</div>
          <p className="card-desc">Total AI mock sessions</p>
        </div>
      </section>

      {/* User Management Table */}
      <section className="user-management-section">
        <div className="section-header">
          <h3>User Directory</h3>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className={!u.isActive ? "inactive-row" : ""}>
                  <td>
                    <div className="user-info-cell">
                      <div className="user-avatar-small">{u.name.charAt(0)}</div>
                      <span>{u.name}</span>
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`role-badge ${u.role}`}>{u.role}</span>
                  </td>
                  <td>
                    <span className={`status-pill ${u.isActive ? 'active' : 'inactive'}`}>
                      {u.isActive ? 'Active' : 'Deactivated'}
                    </span>
                  </td>
                  <td>
                    {u.role !== 'admin' && (
                       <button 
                        className={`action-btn ${u.isActive ? 'deactivate' : 'activate'}`}
                        onClick={() => toggleUserStatus(u._id)}
                        title={u.isActive ? "Deactivate User" : "Activate User"}
                       >
                         {u.isActive ? <FaUserSlash /> : <FaUserCheck />}
                       </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminPanel;
