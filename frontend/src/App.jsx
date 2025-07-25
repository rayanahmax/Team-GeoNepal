import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.jsx';
import InterestsPage from './pages/InterestsPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './Admin/Dashboard.jsx';

export default function App() {
  return (
    <>
    
     <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Public user routes */}
      <Route
        path="/interests"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <InterestsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <SearchPage />
          </ProtectedRoute>
        }
      />

      {/* Admin-only route example */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Dashboard/>
          </ProtectedRoute>
        }
      />

    </Routes>
    </>
  );
}