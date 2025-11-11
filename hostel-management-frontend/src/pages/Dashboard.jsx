import React, { useState, useEffect } from 'react';
import { getAvailableRooms, submitApplication } from '../services/roomService';
import { getUserApplications } from '../services/roomService';
import { getCurrentUser } from '../services/authService';

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    semester: '',
    academicYear: '',
    reason: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const user = getCurrentUser();

  useEffect(() => {
    loadRooms();
    loadApplications();
  }, []);

  const loadRooms = async () => {
    try {
      const data = await getAvailableRooms();
      setRooms(data);
    } catch (err) {
      setError('Failed to load rooms');
    }
  };

  const loadApplications = async () => {
    try {
      const data = await getUserApplications();
      setApplications(data);
    } catch (err) {
      setError('Failed to load applications');
    }
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setShowApplicationForm(true);
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitApplication({
        roomId: selectedRoom._id,
        ...applicationData
      });
      setSuccess('Application submitted successfully');
      setShowApplicationForm(false);
      loadApplications();
    } catch (err) {
      setError(err.message || 'Failed to submit application');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome, {user?.name}</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Available Rooms */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
              <div className="space-y-4">
                {rooms.map((room) => (
                  <div
                    key={room._id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-medium">Room {room.roomNumber}</h3>
                    <p className="text-gray-600">Type: {room.type}</p>
                    <p className="text-gray-600">Capacity: {room.capacity}</p>
                    <p className="text-gray-600">Price: ${room.price}/month</p>
                    <button
                      onClick={() => handleRoomSelect(room)}
                      className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                      Apply for Room
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Applications */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
              <div className="space-y-4">
                {applications.map((application) => (
                  <div
                    key={application._id}
                    className="border rounded-lg p-4"
                  >
                    <h3 className="font-medium">Room {application.room.roomNumber}</h3>
                    <p className="text-gray-600">Status: {application.status}</p>
                    <p className="text-gray-600">Applied on: {new Date(application.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Form Modal */}
          {showApplicationForm && selectedRoom && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    Apply for Room {selectedRoom.roomNumber}
                  </h3>
                  <form onSubmit={handleApplicationSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Semester
                      </label>
                      <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={applicationData.semester}
                        onChange={(e) =>
                          setApplicationData({
                            ...applicationData,
                            semester: e.target.value
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Academic Year
                      </label>
                      <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={applicationData.academicYear}
                        onChange={(e) =>
                          setApplicationData({
                            ...applicationData,
                            academicYear: e.target.value
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Reason
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={applicationData.reason}
                        onChange={(e) =>
                          setApplicationData({
                            ...applicationData,
                            reason: e.target.value
                          })
                        }
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowApplicationForm(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 