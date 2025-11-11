import React from 'react';

const RoomCard = ({ room, isAuthenticated, onApply }) => {
  const { id, roomNumber, block, capacity, occupied, available } = room;
  
  const handleApply = () => {
    if (onApply) {
      onApply(id);
    }
  };

  return (
    <div className="room-card">
      <div className="room-header">
        <h3>Room {roomNumber}</h3>
        <span className={`room-status ${available > 0 ? 'available' : 'full'}`}>
          {available > 0 ? 'Available' : 'Full'}
        </span>
      </div>
      
      <div className="room-details">
        <p><strong>Block:</strong> {block}</p>
        <p><strong>Capacity:</strong> {capacity} students</p>
        <p><strong>Occupied:</strong> {occupied} / {capacity}</p>
        <p><strong>Available Spots:</strong> {available}</p>
      </div>
      
      {isAuthenticated && available > 0 && (
        <button className="btn apply-btn" onClick={handleApply}>
          Apply for Room
        </button>
      )}
      
      {!isAuthenticated && available > 0 && (
        <p className="login-msg">Login to apply for this room</p>
      )}
      
      <style jsx>{`
        .room-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .room-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .room-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .room-header h3 {
          margin: 0;
          color: var(--dark-color);
        }
        
        .room-status {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .room-status.available {
          background-color: rgba(46, 204, 113, 0.2);
          color: var(--success-color);
        }
        
        .room-status.full {
          background-color: rgba(231, 76, 60, 0.2);
          color: var(--error-color);
        }
        
        .room-details {
          margin-bottom: 1.5rem;
        }
        
        .room-details p {
          margin-bottom: 0.5rem;
        }
        
        .apply-btn {
          width: 100%;
          background-color: var(--secondary-color);
        }
        
        .login-msg {
          text-align: center;
          color: var(--secondary-color);
          font-size: 0.9rem;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default RoomCard;