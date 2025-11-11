import React, { useState } from 'react';
import { roomService } from '../services/api';

const ApplicationForm = ({ roomId, roomNumber, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    phone: '',
    courseYear: '',
    emergencyContact: '',
    reason: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await roomService.applyForRoom({
        roomId,
        ...formData
      });
      
      if (response.success) {
        onSuccess(response.data);
      } else {
        setError(response.message || 'Failed to submit application');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="application-form">
      <h2>Apply for Room {roomNumber}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="studentId">Student ID</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            className="form-control"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="courseYear">Course & Year</label>
          <input
            type="text"
            id="courseYear"
            name="courseYear"
            className="form-control"
            value={formData.courseYear}
            onChange={handleChange}
            required
            placeholder="e.g. Computer Science, 3rd Year"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="emergencyContact">Emergency Contact</label>
          <input
            type="text"
            id="emergencyContact"
            name="emergencyContact"
            className="form-control"
            value={formData.emergencyContact}
            onChange={handleChange}
            required
            placeholder="Name & Phone Number"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="reason">Reason for Application</label>
          <textarea
            id="reason"
            name="reason"
            className="form-control"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            placeholder="Briefly explain why you need hostel accommodation"
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-cancel" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-submit" 
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
      
      <style jsx>{`
        .application-form {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          max-width: 700px;
          margin: 0 auto;
        }
        
        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: var(--primary-color);
        }
        
        .error-message {
          background-color: rgba(231, 76, 60, 0.1);
          color: var(--error-color);
          padding: 0.75rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }
        
        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 1.5rem;
        }
        
        .btn-cancel {
          background-color: #f8f9fa;
          color: #6c757d;
          border: 1px solid #ddd;
        }
        
        .btn-submit {
          background-color: var(--secondary-color);
          color: white;
          min-width: 150px;
        }
        
        @media (max-width: 768px) {
          .application-form {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ApplicationForm;