const Room = require('../models/Room');

// Get all available rooms
exports.getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true });
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new room (admin only)
exports.createRoom = async (req, res) => {
  try {
    const {
      roomNumber,
      capacity,
      type,
      floor,
      price,
      amenities
    } = req.body;

    const room = new Room({
      roomNumber,
      capacity,
      type,
      floor,
      price,
      amenities
    });

    await room.save();
    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update room availability
exports.updateRoomAvailability = async (req, res) => {
  try {
    const { isAvailable, currentOccupancy } = req.body;
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    room.isAvailable = isAvailable;
    room.currentOccupancy = currentOccupancy;

    await room.save();
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};