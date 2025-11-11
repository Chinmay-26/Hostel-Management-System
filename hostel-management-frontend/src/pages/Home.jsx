import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to the Hostel Management System</h1>
          <p>A streamlined solution for managing hostel accommodations for students.</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">Register Now</Link>
            <Link to="/room-status" className="btn btn-secondary">View Rooms</Link>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏠</div>
            <h3>Easy Room Application</h3>
            <p>Apply for hostel rooms with a simple and straightforward process.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-time Room Status</h3>
            <p>Check vacancy status of all hostel rooms in real-time.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Track Your Application</h3>
            <p>Keep track of your room application status from anywhere.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Management</h3>
            <p>Your personal information is kept secure and private.</p>
          </div>
        </div>
      </div>
      
      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register an Account</h3>
            <p>Create your student account with basic information to get started.</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Browse Available Rooms</h3>
            <p>Check which rooms are currently available across different blocks.</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Submit Your Application</h3>
            <p>Apply for your preferred room by filling out the application form.</p>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <h3>Track Status & Get Approved</h3>
            <p>Follow your application status and receive approval notification.</p>
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join numerous students who have already secured their hostel rooms through our system.</p>
        <Link to="/register" className="btn btn-primary">Register Now</Link>
      </div>
      
      <style jsx>{`
        .home-page {
          font-family: 'Roboto', sans-serif;
        }
        
        .hero-section {
          background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
          padding: 5rem 2rem;
          color: white;
          text-align: center;
          border-radius: 8px;
          margin-bottom: 3rem;
        }
        
        .hero-content h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: white;
        }
        
        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        
        .features-section {
          padding: 3rem 1rem;
          text-align: center;
        }
        
        .features-section h2 {
          margin-bottom: 2rem;
          font-size: 2rem;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .feature-card {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-10px);
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .feature-card h3 {
          margin-bottom: 1rem;
          color: var(--primary-color);
        }
        
        .how-it-works {
          background-color: #f8f9fa;
          padding: 3rem 1rem;
          text-align: center;
          margin: 3rem 0;
          border-radius: 8px;
        }
        
        .how-it-works h2 {
          margin-bottom: 2rem;
          font-size: 2rem;
        }
        
        .steps {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .step {
          flex: 1;
          min-width: 220px;
          max-width: 300px;
          padding: 1.5rem;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .step-number {
          background-color: var(--secondary-color);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 auto 1rem;
        }
        
        .cta-section {
          text-align: center;
          padding: 4rem 1rem;
          background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
          color: white;
          border-radius: 8px;
          margin-bottom: 2rem;
        }
        
        .cta-section h2 {
          color: white;
          margin-bottom: 1rem;
        }
        
        .cta-section p {
          margin-bottom: 2rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .steps {
            flex-direction: column;
            align-items: center;
          }
          
          .step {
            width: 100%;
            max-width: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
