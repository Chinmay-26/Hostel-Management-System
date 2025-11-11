import axios from 'axios';

// Create axios instance with base URL
// For now we'll mock the API calls since we're focusing on frontend only
const API_URL = 'http://localhost:5000/api'; // This would be your actual backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Mock data for frontend development
const mockRooms = [
  { id: '1', roomNumber: '101', block: 'A', capacity: 2, occupied: 1, available: 1 },
  { id: '2', roomNumber: '102', block: 'A', capacity: 2, occupied: 2, available: 0 },
  { id: '3', roomNumber: '103', block: 'A', capacity: 3, occupied: 1, available: 2 },
  { id: '4', roomNumber: '201', block: 'B', capacity: 1, occupied: 0, available: 1 },
  { id: '5', roomNumber: '202', block: 'B', capacity: 4, occupied: 3, available: 1 },
];

const mockApplications = [
  { id: '1', userId: '101', roomId: '1', status: 'pending', appliedDate: '2023-05-15' },
  { id: '2', userId: '102', roomId: '3', status: 'approved', appliedDate: '2023-05-10' },
];

// API service methods
export const authService = {
  login: async (credentials) => {
    // For frontend-only development, return mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
          resolve({ 
            success: true, 
            data: { 
              token: 'mock-admin-token', 
              role: 'admin', 
              user: { id: 'admin1', name: 'Admin User', email: 'admin@example.com' } 
            } 
          });
        } else if (credentials.email === 'student@example.com' && credentials.password === 'student123') {
          resolve({ 
            success: true, 
            data: { 
              token: 'mock-student-token', 
              role: 'student', 
              user: { id: '101', name: 'Test Student', email: 'student@example.com' } 
            } 
          });
        } else {
          resolve({ success: false, message: 'Invalid credentials' });
        }
      }, 500);
    });
    
    // When backend is ready:
    // return api.post('/auth/login', credentials);
  },

  register: async (userData) => {
    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Registration successful. Please login.' });
      }, 500);
    });
    
    // When backend is ready:
    // return api.post('/auth/register', userData);
  },
  
  getCurrentUser: async () => {
    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        const role = localStorage.getItem('userRole');
        if (role === 'admin') {
          resolve({ 
            name: 'Admin User', 
            email: 'admin@example.com', 
            role: 'admin' 
          });
        } else {
          resolve({ 
            name: 'Test Student', 
            email: 'student@example.com', 
            role: 'student',
            studentId: 'S12345',
            course: 'Computer Science',
            year: '3rd Year',
            phone: '555-123-4567'
          });
        }
      }, 300);
    });
    
    // When backend is ready:
    // return api.get('/auth/me');
  }
};

export const roomService = {
  getAllRooms: async () => {
    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: mockRooms });
      }, 500);
    });
    
    // When backend is ready:
    // return api.get('/rooms');
  },
  
  applyForRoom: async (applicationData) => {
    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          message: 'Application submitted successfully',
          data: {
            id: Date.now().toString(),
            status: 'pending',
            appliedDate: new Date().toISOString().split('T')[0],
            ...applicationData
          }
        });
      }, 500);
    });
    
    // When backend is ready:
    // return api.post('/applications', applicationData);
  },
  
  getUserApplications: async () => {
    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin') {
          resolve({ success: true, data: mockApplications });
        } else {
          // Just show one application for the student
          resolve({ 
            success: true, 
            data: [{
              id: '1',
              roomId: '1',
              roomNumber: '101',
              block: 'A',
              status: 'pending',
              appliedDate: '2023-05-15'
            }]
          });
        }
      }, 500);
    });
    
    // When backend is ready:
    // return api.get('/applications/user');
  },
  
  updateApplicationStatus: async (applicationId, status) => {
    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: `Application ${status} successfully` });
      }, 500);
    });
    
    // When backend is ready:
    // return api.put(`/applications/${applicationId}/status`, { status });
  }
};

export default api;