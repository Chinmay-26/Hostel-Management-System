const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  currentOccupancy: { type: Number, default: 0 },
  type: { type: String, enum: ['single', 'double', 'triple'], required: true },
  floor: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  price: { type: Number, required: true },
  amenities: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);