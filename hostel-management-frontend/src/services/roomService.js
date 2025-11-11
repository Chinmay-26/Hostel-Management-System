import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all available rooms
export const getAvailableRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/rooms/available`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get room by ID
export const getRoomById = async (roomId) => {
  try {
    const response = await axios.get(`${API_URL}/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Submit room application
export const submitApplication = async (applicationData) => {
  try {
    const response = await axios.post(`${API_URL}/applications`, applicationData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get user's applications
export const getUserApplications = async () => {
  try {
    const response = await axios.get(`${API_URL}/applications/user`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get application by ID
export const getApplicationById = async (applicationId) => {
  try {
    const response = await axios.get(`${API_URL}/applications/${applicationId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}; 