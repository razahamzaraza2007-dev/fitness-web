import { useState } from "react";
import "./HabitTracker.css";

export default function HabitTracker() {
  const [habits, setHabits] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    workout: false,
    sleep: false,
  });
  const [water, setWater] = useState(4); // glasses out of 8
  const streak = 12; // mock streak, will come from Firestore later

  const toggleHabit = (key) => {
    setHabits((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const habitList = [
    { key: "breakfast", label: "Breakfast" },
    { key: "lunch", label: "Lunch" },
    { key: "dinner", label: "Dinner" },
    { key: "workout", label: "Workout" },
    { key: "sleep", label: "8hrs Sleep" },
  ];

  const completedCount = Object.values(habits).filter(Boolean).length;

  return (
    <div className="page-container">
      <p className="section-title">Today</p>
      <h1>
        HABIT <span className="highlight">TRACKER</span>
      </h1>
      <p className="page-sub">{completedCount}/{habitList.length} habits completed today</p>

      {/* Streak + Progress */}
      <div className="tracker-top-grid">
        <div className="card-dark">
          <p className="section-title">Current Streak</p>
          <h2>{streak} Days 🔥</h2>
        </div>
        <div className="card-dark">
          <p className="section-title">Water Intake</p>
          <h2>{water}/8 glasses</h2>
          <div className="water-controls">
            <button className="btn-outline small" onClick={() => setWater((w) => Math.max(0, w - 1))}>−</button>
            <button className="btn-outline small" onClick={() => setWater((w) => Math.min(8, w + 1))}>+</button>
          </div>
        </div>
      </div>

      {/* Habit Checklist */}
      <h2 className="list-heading">Daily Checklist</h2>
      <div className="habit-list">
        {habitList.map((h) => (
          <div
            key={h.key}
            className={`habit-item ${habits[h.key] ? "done" : ""}`}
            onClick={() => toggleHabit(h.key)}
          >
            <span className="checkbox">{habits[h.key] ? "✓" : ""}</span>
            <span>{h.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}