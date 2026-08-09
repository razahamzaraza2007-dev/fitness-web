import { useState } from "react";
import "./AdminUsers.css";
import { mockUsers } from "../data/mockUsers";

export default function AdminUsers() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | banned

  const toggleBan = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "banned" ? "active" : "banned" } : u
      )
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || u.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-container">
      <p className="section-title">Admin</p>
      <h1>
        USER <span className="highlight">MANAGEMENT</span>
      </h1>
      <p className="page-sub">{filteredUsers.length} of {users.length} users</p>

      <div className="admin-controls">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <div className="filter-buttons">
          {["all", "active", "banned"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="user-table">
        <div className="user-table-header">
          <span>Name</span>
          <span>Email</span>
          <span>Last Login</span>
          <span>Score</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filteredUsers.map((u) => (
          <div className="user-row" key={u.id}>
            <span>{u.name}</span>
            <span className="user-email">{u.email}</span>
            <span>{u.lastLogin}</span>
            <span>{u.fitnessScore}</span>
            <span className={`status-badge ${u.status}`}>{u.status}</span>
            <button
              className={`ban-btn ${u.status === "banned" ? "unban" : ""}`}
              onClick={() => toggleBan(u.id)}
            >
              {u.status === "banned" ? "Unban" : "Ban"}
            </button>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p className="no-results">No users match your search.</p>
        )}
      </div>
    </div>
  );
}