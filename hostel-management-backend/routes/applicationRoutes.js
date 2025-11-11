const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getUserApplications,
  getApplicationById,
  updateApplicationStatus
} = require('../controllers/applicationController');
const { protect, admin } = require('../middleware/authMiddleware');

// Submit new application
router.post('/', protect, submitApplication);

// Get user's applications
router.get('/user', protect, getUserApplications);

// Get application by ID
router.get('/:id', protect, getApplicationById);

// Update application status (admin only)
router.put('/:id/status', protect, admin, updateApplicationStatus);

module.exports = router;