import mongoose from "mongoose";
import Showtime from "../models/showtime-model.js";

// export const getShowtimeByMovieId = async (req, res) => {
//     const movieId = req.params.id; // Lấy movieId từ URL

//     // Kiểm tra xem movieId có được cung cấp không
//     if (!movieId) {
//         return res.status(400).json({ message: "Movie ID is required" });
//     }

//     let showtimes;
//     try {
        
//         showtimes = await Showtime.find({ movie_id: movieId }); 

//         if (!showtimes || showtimes.length === 0) {
//             return res.status(404).json({ message: "No showtimes found for this movie" });
//         }

//         return res.status(200).json(showtimes);
//     } catch (error) {
//         return res.status(500).json({ message: "Failed to retrieve showtimes", error: error.message });
//     }
// };


export const addShowtime = async (req, res) => {
    const { id: movieId } = req.params;  // Lấy movieId từ tham số URL
    const { screening_room_id, date, language } = req.body;  // Lấy dữ liệu từ body

    // Kiểm tra xem movieId có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({ message: "Invalid Movie ID" });
    }

    // Kiểm tra xem các trường dữ liệu có hợp lệ không
    if (!screening_room_id || !mongoose.Types.ObjectId.isValid(screening_room_id)) {
        return res.status(400).json({ message: "Invalid Screening Room ID" });
    }

    if (!date || new Date(date).toString() === "Invalid Date") {
        return res.status(400).json({ message: "Invalid Date" });
    }

    if (!language || language.trim() === "") {
        return res.status(400).json({ message: "Language is required" });
    }

    try {
        // Tạo đối tượng showtime mới
        const newShowtime = new Showtime({
            movie_id: movieId,  
            screening_room_id: screening_room_id,
            date: new Date(date),  
            language: language.trim()  
        });

        // Lưu showtime mới vào cơ sở dữ liệu
        const savedShowtime = await newShowtime.save();

        // Trả về kết quả showtime đã được thêm mới
        return res.status(201).json({
            message: "Showtime added successfully",
            showtime: savedShowtime
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to add showtime",
            error: error.message
        });
    }
};


export const editShowtime = async (req, res) => {
    const { id: movieId, showtimeId } = req.params;   // Lấy showtimeId từ tham số URL
    const { movie_id, screening_room_id, date, language } = req.body;  // Lấy dữ liệu từ body

    // Kiểm tra xem showtimeId và các trường cần cập nhật có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(showtimeId)) {
        return res.status(400).json({ message: "Invalid Showtime ID" });
    }

   
    // Tạo đối tượng lưu trữ các trường cần cập nhật
    const updateFields = {};

    if (movie_id && mongoose.Types.ObjectId.isValid(movie_id)) {
        updateFields.movie_id = new mongoose.Types.ObjectId(movie_id);  // Cập nhật movie_id
    }

    if (screening_room_id && mongoose.Types.ObjectId.isValid(screening_room_id)) {
        updateFields.screening_room_id = new mongoose.Types.ObjectId(screening_room_id);  // Cập nhật screening_room_id
    }

    if (date && new Date(date).toString() !== "Invalid Date") {
        updateFields.date = new Date(date);  // Cập nhật ngày chiếu
    }

    if (language && language.trim() !== "") {
        updateFields.language = language.trim();  // Cập nhật ngôn ngữ
    }

    // Nếu không có trường hợp nào hợp lệ để cập nhật
    if (Object.keys(updateFields).length === 0) {
        return res.status(422).json({ message: "No valid fields to update" });
    }

    let updatedShowtime;
    try {
        
        // Cập nhật showtime với showtimeId và các trường hợp cần thiết
        updatedShowtime = await Showtime.findByIdAndUpdate(
            showtimeId,
            updateFields,
            { new: true }  // Trả về dữ liệu đã cập nhật
        );
        
        // Kiểm tra xem showtime có tồn tại hay không
        if (!updatedShowtime) {
            return res.status(404).json({ message: "Showtime not found" });
        }

        return res.status(200).json({ message: "Showtime updated successfully", showtime: updatedShowtime });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update showtime", error: error.message });
    }
};

export const deleteShowtime = async (req, res) => { 
    const { id: movieId, showtimeId } = req.params;  // Lấy movieId và showtimeId từ tham số URL

    // Kiểm tra xem showtimeId có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(showtimeId)) {
        return res.status(400).json({ message: "Invalid Showtime ID" });
    }

    try {
        // Xóa showtime dựa trên showtimeId
        const deletedShowtime = await Showtime.findByIdAndDelete(showtimeId);

        // Kiểm tra xem showtime có tồn tại không
        if (!deletedShowtime) {
            return res.status(404).json({ message: "Showtime not found" });
        }

        // Trả về thông báo xóa thành công
        return res.status(200).json({ message: "Showtime deleted successfully", showtime: deletedShowtime });
    } catch (error) {
        // Xử lý lỗi trong quá trình xóa
        return res.status(500).json({ message: "Failed to delete showtime", error: error.message });
    }
};


export const getShowtimeAndTheaterInfo = async (req, res) => { 
    try {
        // Lấy movieId từ params và ngày (date) từ query
        const { id: movieId } = req.params;
        const { date } = req.query;

        // Tạo query để lọc showtimes dựa trên movieId
        const query = { movie_id: movieId };

        // Nếu có date, lọc showtimes theo ngày cụ thể
        if (date) {
            const formattedDate = new Date(date).toISOString().split("T")[0];
            query.date = {
                $gte: new Date(`${formattedDate}T00:00:00Z`),
                $lt: new Date(`${formattedDate}T23:59:59Z`),
            };
        }

        // Lấy danh sách showtimes và populate thông tin phòng chiếu và rạp
        // Lấy danh sách showtimes và populate thông tin phòng chiếu và rạp
        const showtimes = await Showtime.find(query)
            .populate({
                path: "screening_room_id",
                select: "name",
                populate: {
                    path: "theater_id",
                    select: "name location",
                },
            });

        // Kiểm tra nếu không có dữ liệu
        // Kiểm tra nếu không có dữ liệu
        if (!showtimes || showtimes.length === 0) {
            return res.status(404).json({ message: "No showtimes found for this movie or date." });
        }

        // Group showtimes theo phòng chiếu và rạp
        // Group showtimes theo phòng chiếu và rạp
        const groupedShowtimes = showtimes.reduce((acc, curr) => {
            const key = `${curr.screening_room_id.theater_id._id}-${curr.screening_room_id._id}`;

            if (!acc[key]) {
                acc[key] = {
                    ...curr._doc,
                    dates: [], // Khởi tạo mảng dates rỗng
                    dates: [], // Khởi tạo mảng dates rỗng
                };
            }

            // Thêm đối tượng { showtimeId, date } vào mảng dates
            acc[key].dates.push({
                showtimeId: curr._id,   // Lấy showtimeId từ _id
                date: curr.date         // Thêm ngày chiếu
            });

            return acc;
        }, {});

        // Chuyển đổi kết quả grouped từ object về mảng
        const response = Object.values(groupedShowtimes);

        // Trả về kết quả
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching showtimes:", error);
        return res.status(500).json({ message: "Failed to retrieve showtimes", error: error.message });
    }
};