import RoomModel from '../models/room-model.js';
import mongoose from 'mongoose';

export const getRoomsByTheaterId = async (req, res) => {
    const { theaterId } = req.params;

    // Validate theaterId format
    if (!mongoose.Types.ObjectId.isValid(theaterId)) {
        return res.status(400).json({ message: 'Invalid theaterId format' });
    }

    let rooms;

    try {
        // Find rooms by theaterId
        rooms = await RoomModel.find({ theater_id: theaterId });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while fetching rooms' });
    }

    // Handle no rooms found
    if (!rooms || rooms.length === 0) {
        return res.status(404).json({ message: 'No rooms found for the given theaterId' });
    }

    // Return rooms
    return res.status(200).json({ rooms });
};