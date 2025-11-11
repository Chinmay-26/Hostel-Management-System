import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>RVU Hostel</h3>
          <p>A comprehensive solution for hostel room allocation and management.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/room-status">Room Status</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>Email: hostel@rvu.edu.in</p>
          <p>Phone: +91 1234569780</p>
          <p>Address: University Campus, Mailasandra</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} RVU Hostel. All rights reserved.</p>
      </div>
      
      <style jsx>{`
        .footer {
          background-color: var(--primary-color);
          color: white;
          padding-top: 2rem;
        }
        
        .footer-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .footer-section {
          flex: 1;
          min-width: 250px;
          margin-bottom: 2rem;
          padding-right: 1rem;
        }
        
        .footer-section h3 {
          color: white;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }
        
        .footer-section ul {
          list-style: none;
          padding: 0;
        }
        
        .footer-section ul li {
          margin-bottom: 0.5rem;
        }
        
        .footer-section a {
          color: #ddd;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-section a:hover {
          color: var(--secondary-color);
        }
        
        .footer-bottom {
          text-align: center;
          padding: 1.5rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 1rem;
        }
        
        @media screen and (max-width: 768px) {
          .footer-container {
            flex-direction: column;
          }
          
          .footer-section {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;