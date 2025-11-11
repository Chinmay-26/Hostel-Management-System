const Application = require('../models/Application');
const Room = require('../models/Room');

// Submit new application
exports.submitApplication = async (req, res) => {
  // Defensive check
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized, user not found' });
  }

  try {
    const { roomId, semester, academicYear, reason } = req.body;
    const userId = req.user.id; // From auth middleware

    // Check if room exists and is available
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    if (!room.isAvailable) {
      return res.status(400).json({ message: 'Room is not available' });
    }

    // Check if user already has a pending application
    const existingApplication = await Application.findOne({
      user: userId,
      status: 'pending'
    });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already filed a request.' });
    }

    const application = new Application({
      user: userId,
      room: roomId,
      semester,
      academicYear,
      reason
    });

    await application.save();

    // Update room occupancy and availability
    room.currentOccupancy += 1;
    if (room.currentOccupancy >= room.capacity) {
      room.isAvailable = false;
    }
    await room.save();

    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's applications
exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate('room')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('room')
      .populate('user', 'name email usn year');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user is authorized to view this application
    if (application.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update application status (admin only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    await application.save();

    // If application is approved, update room availability
    if (status === 'approved') {
      const room = await Room.findById(application.room);
      room.currentOccupancy += 1;
      if (room.currentOccupancy >= room.capacity) {
        room.isAvailable = false;
      }
      await room.save();
    }

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};