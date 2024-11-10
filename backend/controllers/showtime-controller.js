import Showtime from "../models/showtime-model.js";

export const getShowtimes = async (req, res) => {
    let showtimes;
    try {
        showtimes = await Showtime.find();
        res.status(200).json(showtimes);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve showtimes", error });
    }
};