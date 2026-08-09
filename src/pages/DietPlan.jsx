import "./DietPlan.css";
import { mockDietPlan } from "../data/mockPlans";

export default function DietPlan() {
  const plan = mockDietPlan;

  return (
    <div className="page-container">
      <p className="section-title">Your Plan</p>
      <h1>
        DIET <span className="highlight">PLAN</span>
      </h1>
      <p className="page-sub">Goal: {plan.goal} · {plan.calories} kcal/day</p>

      <div className="macro-grid">
        <div className="card-dark">
          <p className="section-title">Protein</p>
          <h2>{plan.macros.protein}</h2>
        </div>
        <div className="card-dark">
          <p className="section-title">Carbs</p>
          <h2>{plan.macros.carbs}</h2>
        </div>
        <div className="card-dark">
          <p className="section-title">Fats</p>
          <h2>{plan.macros.fats}</h2>
        </div>
      </div>

      <h2 className="list-heading">Today's Meals</h2>
      <div className="meal-list">
        {plan.meals.map((meal, i) => (
          <div className="meal-card" key={i}>
            <div>
              <h3>{meal.name}</h3>
              <p className="meal-items">{meal.items}</p>
            </div>
            <span className="meal-cal">{meal.calories} kcal</span>
          </div>
        ))}
      </div>
    </div>
  );
}