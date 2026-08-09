import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Adjust path to your firebase config file
import { onAuthStateChanged } from 'firebase/auth';
import './Dashboard.css';

export default function Dashboard() {
  const [userName, setUserName] = useState('ATHLETE');

  useEffect(() => {
    // Listen for Firebase auth state change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If Google Sign-In or profile updated, user.displayName will exist
        // Otherwise fallback to extracting the name before '@' from email
        const name = user.displayName 
          ? user.displayName.split(' ')[0] 
          : user.email ? user.email.split('@')[0] : 'ATHLETE';

        setUserName(name.toUpperCase());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content-wrapper">
        
        {/* Top Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="header-title">
              WELCOME BACK, <span className="cyan-text">{userName}</span> ⚡
            </h1>
            <p className="header-sub">Here is your fitness performance overview for today.</p>
          </div>
          <div className="streak-card">
            <span className="streak-fire">🔥</span>
            <div>
              <div className="streak-num">7 DAYS</div>
              <div className="streak-lbl">ACTIVE STREAK</div>
            </div>
          </div>
        </div>

        {/* 4 Metric Cards Grid */}
        <div className="metrics-grid">
          <div className="metric-box">
            <div className="metric-top"><span>CALORIES BURNED</span> <span>🔥</span></div>
            <div className="metric-val">640 <span className="metric-unit">kcal</span></div>
            <div className="progress-bg"><div className="progress-bar" style={{ width: '75%' }}></div></div>
          </div>

          <div className="metric-box">
            <div className="metric-top"><span>WORKOUTS</span> <span>🏋️‍♂️</span></div>
            <div className="metric-val">4 / 5 <span className="metric-unit">this week</span></div>
            <div className="progress-bg"><div className="progress-bar" style={{ width: '80%' }}></div></div>
          </div>

          <div className="metric-box">
            <div className="metric-top"><span>WATER INTAKE</span> <span>💧</span></div>
            <div className="metric-val">2.4 <span className="metric-unit">/ 3.0 L</span></div>
            <div className="progress-bg"><div className="progress-bar" style={{ width: '65%' }}></div></div>
          </div>

          <div className="metric-box">
            <div className="metric-top"><span>DAILY CALORIES</span> <span>🥗</span></div>
            <div className="metric-val">1,850 <span className="metric-unit">/ 2,200</span></div>
            <div className="progress-bg"><div className="progress-bar" style={{ width: '84%' }}></div></div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="dashboard-grid">
          
          {/* Left Column */}
          <div className="left-col">
            
            <div className="offset-frame-wrapper">
              <div className="offset-frame-card">
                <div className="card-top-flex">
                  <h3 className="card-heading">TODAY'S WORKOUT: <span className="cyan-text">UPPER BODY</span></h3>
                  <span className="cyan-badge">45 MINS</span>
                </div>
                <p className="card-desc">Focus on Chest, Shoulders, and Triceps with high-intensity sets.</p>

                <ul className="workout-list">
                  <li>⚡ Barbell Bench Press - 4 Sets x 10 Reps</li>
                  <li>⚡ Overhead Dumbbell Press - 3 Sets x 12 Reps</li>
                  <li>⚡ Incline Cable Flyes - 3 Sets x 15 Reps</li>
                </ul>

                <Link to="/workout-plan" className="btn-cyan-solid">START WORKOUT NOW</Link>
              </div>
            </div>

            <div className="flat-card">
              <div className="card-top-flex">
                <h3 className="card-heading">TODAY'S MEAL PLAN</h3>
                <Link to="/diet-plan" className="cyan-link">View Diet →</Link>
              </div>
              <div className="meal-rows">
                <div className="meal-row">
                  <span>🍳 Breakfast: Oats & Eggs</span>
                  <span className="status-done">COMPLETED</span>
                </div>
                <div className="meal-row">
                  <span>🍗 Lunch: Chicken, Rice & Veggies</span>
                  <span className="status-done">COMPLETED</span>
                </div>
                <div className="meal-row">
                  <span>🥩 Dinner: Salmon & Roasted Potatoes</span>
                  <span className="status-pending">PENDING</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="right-col">
            
            <div className="flat-card">
              <h3 className="card-heading">🤖 AI COACH ASSISTANT</h3>
              <p className="card-desc" style={{ margin: '10px 0 20px' }}>Need workout suggestions or instant meal adjustments?</p>
              <Link to="/chatbot" className="btn-cyan-outline">ASK COACH AI</Link>
            </div>

            <div className="flat-card">
              <h3 className="card-heading">TODAY'S HABITS</h3>
              <div className="habit-rows">
                <div className="habit-row"><span>8 Hours Sleep</span><span className="cyan-text">✓</span></div>
                <div className="habit-row"><span>3L Water Intake</span><span className="cyan-text">✓</span></div>
                <div className="habit-row"><span>No Refined Sugar</span><span className="cyan-text">⏳</span></div>
              </div>
              <Link to="/habit-tracker" className="btn-cyan-outline" style={{ marginTop: '20px' }}>HABIT TRACKER</Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}