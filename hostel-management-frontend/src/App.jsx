import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import RoomStatus from './pages/RoomStatus';
import Dashboard from './pages/Dashboard';
import ImagesPage from './pages/ImagesPage';
import { getCurrentUser } from './services/authService';
import './styles/global.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('student'); // 'student' or 'admin'
  
  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role || 'student');
    }
  }, []);

  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole('student');
  };

  return (
    <div className="app">
      <Navbar isAuthenticated={isAuthenticated} userRole={userRole} logout={logout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <Profile userRole={userRole} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/room-status" 
            element={<RoomStatus isAuthenticated={isAuthenticated} userRole={userRole} />} 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/images" element={<ImagesPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;