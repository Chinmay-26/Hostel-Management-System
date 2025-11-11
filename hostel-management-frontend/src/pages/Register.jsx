import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    usn: '',
    year: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.usn || !formData.year) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await register(formData);
      setLoading(false);
      navigate('/login');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="register-bg-wrapper">
      <div className="register-bg" />
      <div className="register-center">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Create your account</h2>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="usn">USN</label>
            <input
              type="text"
              id="usn"
              name="usn"
              placeholder="USN"
              value={formData.usn}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="text"
              id="year"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-primary">Register</button>
          <div className="form-footer">
            Already have an account? <a href="/login">Login here</a>
          </div>
        </form>
      </div>
      <style jsx>{`
        .register-bg-wrapper {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .register-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-image: url('/images/bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: -1;
        }
        .register-center {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100%;
        }
        .register-form {
          background: #fff;
          padding: 1.5rem 1.2rem;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          max-width: 340px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .register-form h2 {
          margin-bottom: 0.5rem;
          color: #233647;
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          text-align: left;
        }
        .form-group label {
          font-size: 1rem;
          color: #233647;
          font-weight: 500;
        }
        .form-group input {
          padding: 0.7rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          background: #f9fafb;
          transition: border 0.2s;
        }
        .form-group input:focus {
          border: 1.5px solid #3b82f6;
          outline: none;
          background: #fff;
        }
        .btn-primary {
          background: #233647;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.7rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: 0.5rem;
        }
        .btn-primary:hover {
          background: #3b82f6;
        }
        .form-footer {
          text-align: center;
          margin-top: 0.5rem;
        }
        .error-message {
          color: #dc2626;
          background: #fee2e2;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          margin-bottom: 1rem;
          text-align: center;
          font-weight: 500;
        }
        .success-message {
          color: #16a34a;
          background: #e7fbe9;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          margin-bottom: 1rem;
          text-align: center;
          font-weight: 500;
        }
      `}</style>
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default Register;