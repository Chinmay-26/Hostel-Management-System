import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, userRole, logout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          RVU Hostel
        </Link>
        
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          {/* Simple hamburger icon */}
          <div className={isMobileMenuOpen ? "hamburger open" : "hamburger"}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <ul className={isMobileMenuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/room-status" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Room Status
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/images" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Images
            </Link>
          </li>
          
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  {userRole === 'admin' ? 'Admin Panel' : 'My Profile'}
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link btn-highlight" onClick={() => setIsMobileMenuOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      
      <style jsx>{`
        .navbar {
          background-color: var(--primary-color);
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          padding: 0 2rem;
        }
        
        .navbar-logo {
          color: white;
          font-size: 1.8rem;
          font-weight: bold;
          text-decoration: none;
        }
        
        .nav-menu {
          display: flex;
          align-items: center;
          list-style: none;
        }
        
        .nav-item {
          margin: 0 1rem;
        }
        
        .nav-link {
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
        }
        
        .nav-link:hover {
          color: #ddd;
        }
        
        .btn-highlight {
          background-color: var(--secondary-color);
          border-radius: 4px;
        }
        
        .nav-btn {
          background-color: transparent;
          border: 1px solid white;
          border-radius: 4px;
          color: white;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .nav-btn:hover {
          background-color: white;
          color: var(--primary-color);
        }
        
        .mobile-menu-icon {
          display: none;
          cursor: pointer;
        }
        
        .hamburger {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 21px;
        }
        
        .hamburger span {
          width: 100%;
          height: 3px;
          background-color: white;
          transition: all 0.3s ease;
        }
        
        .hamburger.open span:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }
        
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger.open span:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }
        
        @media screen and (max-width: 768px) {
          .nav-menu {
            display: flex;
            flex-direction: column;
            width: 100%;
            position: absolute;
            top: 80px;
            left: -100%;
            opacity: 1;
            transition: all 0.5s ease;
            background-color: var(--primary-color);
          }
          
          .nav-menu.active {
            left: 0;
            opacity: 1;
            z-index: 1;
          }
          
          .nav-item {
            margin: 0;
            width: 100%;
            padding: 1.5rem 0;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .mobile-menu-icon {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;