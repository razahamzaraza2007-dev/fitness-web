import "./WorkoutPlan.css";
import { mockWorkoutPlan } from "../data/mockPlans";

export default function WorkoutPlan() {
  const plan = mockWorkoutPlan;

  return (
    <div className="page-container">
      <p className="section-title">Your Plan</p>
      <h1>
        WORKOUT <span className="highlight">PLAN</span>
      </h1>
      <p className="page-sub">Split: {plan.split}</p>

      <div className="day-list">
        {plan.days.map((d, i) => (
          <div className="day-card" key={i}>
            <div className="day-header">
              <h3>{d.day}</h3>
              <span className="day-focus">{d.focus}</span>
            </div>
            <ul className="exercise-list">
              {d.exercises.map((ex, j) => (
                <li key={j}>{ex}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}