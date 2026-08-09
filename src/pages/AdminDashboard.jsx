import "./AdminDashboard.css";
import { mockUsers } from "../data/mockUsers";

export default function AdminDashboard() {
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter((u) => u.status === "active").length;
  const bannedUsers = mockUsers.filter((u) => u.status === "banned").length;
  const avgFitnessScore = Math.round(
    mockUsers.reduce((sum, u) => sum + u.fitnessScore, 0) / totalUsers
  );

  const stats = [
    { label: "Total Users", value: totalUsers },
    { label: "Active Users", value: activeUsers },
    { label: "Banned Users", value: bannedUsers },
    { label: "Avg Fitness Score", value: avgFitnessScore },
  ];

  return (
    <div className="page-container">
      <p className="section-title">Admin</p>
      <h1>
        ANALYTICS <span className="highlight">DASHBOARD</span>
      </h1>
      <p className="page-sub">Platform overview and key metrics</p>

      <div className="admin-stats-grid">
        {stats.map((s, i) => (
          <div className="card-dark" key={i}>
            <p className="section-title">{s.label}</p>
            <h2>{s.value}</h2>
          </div>
        ))}
      </div>

      <h2 className="list-heading">Quick Metrics</h2>
      <div className="metric-list">
        <div className="metric-row">
          <span>Plan Completion Rate</span>
          <span className="metric-value">78%</span>
        </div>
        <div className="metric-row">
          <span>Chatbot Usage (this week)</span>
          <span className="metric-value">1,240 messages</span>
        </div>
        <div className="metric-row">
          <span>DAU / WAU</span>
          <span className="metric-value">340 / 1,120</span>
        </div>
        <div className="metric-row">
          <span>Flagged AI Outputs</span>
          <span className="metric-value">3 pending review</span>
        </div>
      </div>
    </div>
  );
}