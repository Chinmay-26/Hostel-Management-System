import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from '../components/RoomCard';

const RoomStatus = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [form, setForm] = useState({ semester: '', academicYear: '', reason: '' });
    const [formError, setFormError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/rooms/available');
            setRooms(response.data);
        } catch (err) {
            setError('Failed to fetch available rooms');
        } finally {
            setLoading(false);
        }
    };

    const handleRequest = (room) => {
        setSelectedRoom(room);
        setForm({ semester: '', academicYear: '', reason: '' });
        setFormError('');
        setSuccess('');
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setSuccess('');
        if (!form.semester || !form.academicYear || !form.reason) {
            setFormError('Please fill in all fields.');
            return;
        }
        try {
            // Submit application
            await axios.post('/api/applications', {
                roomId: selectedRoom._id,
                semester: form.semester,
                academicYear: form.academicYear,
                reason: form.reason,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setSuccess('Request submitted, thank you!');
            setTimeout(() => {
                setSelectedRoom(null);
                setSuccess('');
            }, 2000); // Hide form after 2 seconds
            fetchRooms(); // Refresh room list
        } catch (err) {
            console.error('Room request error:', err);
            if (err.response && err.response.data && err.response.data.message) {
                setFormError(err.response.data.message);
            } else if (err.message) {
                setFormError(err.message);
            } else {
                setFormError('Failed to request room');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Available Rooms</h1>
            {rooms.length === 0 && <div>No rooms available. Please check back later.</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rooms.map(room => (
                    <div key={room._id} className="border rounded p-4 flex flex-col">
                        <div><strong>Room Number:</strong> {room.roomNumber}</div>
                        <div><strong>Capacity:</strong> {room.capacity}</div>
                        <div><strong>Current Occupancy:</strong> {room.currentOccupancy}</div>
                        <button
                            className="mt-2 px-4 py-2 bg-green-600 text-yello rounded hover:bg-indigo-100"
                            onClick={() => handleRequest(room)}
                        >
                            Request Room
                        </button>
                    </div>
                ))}
            </div>

            {/* Application Form Modal/Inline */}
            {selectedRoom && (
                <div className="request-form-overlay">
                    <form onSubmit={handleSubmit} className="request-form">
                        {success && <div className="success-message">{success}</div>}
                        {formError && <div className="error-message">{formError}</div>}
                        <h2>Request Room {selectedRoom.roomNumber}</h2>
                        <div className="form-group">
                            <label htmlFor="semester">Semester</label>
                            <input
                                type="text"
                                id="semester"
                                name="semester"
                                placeholder="e.g. 5th"
                                value={form.semester}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="year">Academic Year</label>
                            <input
                                type="text"
                                id="year"
                                name="academicYear"
                                placeholder="e.g. 2024-25"
                                value={form.academicYear}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reason">Reason for request</label>
                            <textarea
                                id="reason"
                                name="reason"
                                placeholder="Why do you need this room?"
                                value={form.reason}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-primary">Submit Request</button>
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => setSelectedRoom(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <style jsx>{`
                .request-form-overlay {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 40vh;
                    background: rgba(0,0,0,0.02);
                    margin-top: 2rem;
                }
                .request-form {
                    background: #fff;
                    padding: 2rem 2.5rem;
                    border-radius: 16px;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.10);
                    max-width: 400px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 1.2rem;
                }
                .request-form h2 {
                    margin-bottom: 0.5rem;
                    color: #233647;
                    font-size: 1.5rem;
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
                .form-group input,
                .form-group textarea {
                    padding: 0.7rem 1rem;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    font-size: 1rem;
                    background: #f9fafb;
                    transition: border 0.2s;
                }
                .form-group input:focus,
                .form-group textarea:focus {
                    border: 1.5px solid #3b82f6;
                    outline: none;
                    background: #fff;
                }
                .form-group textarea {
                    min-height: 70px;
                    resize: vertical;
                }
                .form-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 0.5rem;
                }
                .btn-primary {
                    background:rgb(37, 35, 71);
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    padding: 0.7rem 1.5rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .btn-primary:hover {
                    background: #3b82f6;
                }
                .btn-secondary {
                    background:rgb(64, 79, 109);
                    color: #233647;
                    border: none;
                    border-radius: 8px;
                    padding: 0.7rem 1.5rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .btn-secondary:hover {
                    background:rgb(119, 150, 213);
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
                .error-message {
                    color: #dc2626;
                    background: #fee2e2;
                    border-radius: 6px;
                    padding: 0.5rem 1rem;
                    margin-bottom: 1rem;
                    text-align: center;
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
};

export default RoomStatus;