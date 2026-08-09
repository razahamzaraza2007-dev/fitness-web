import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import DietPlan from './pages/DietPlan';
import WorkoutPlan from './pages/WorkoutPlan';
import HabitTracker from './pages/HabitTracker';
import Chatbot from './pages/Chatbot';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />


        {/* User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/diet-plan" element={<DietPlan />} />
          <Route path="/workout-plan" element={<WorkoutPlan />} />
          <Route path="/habit-tracker" element={<HabitTracker />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-users" element={<AdminUsers />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}