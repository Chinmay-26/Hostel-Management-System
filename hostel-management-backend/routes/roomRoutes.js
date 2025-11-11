const express = require('express');
const router = express.Router();
const {
  getAvailableRooms,
  getRoomById,
  createRoom,
  updateRoomAvailability
} = require('../controllers/roomController');

// Get all available rooms
router.get('/available', getAvailableRooms);

// Get room by ID
router.get('/:id', getRoomById);

// Create new room (admin only)
router.post('/', createRoom);

// Update room availability
router.put('/:id/availability', updateRoomAvailability);

module.exports = router;