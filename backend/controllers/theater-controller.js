import TheaterModel from "../models/theater-model.js";

export const getAllTheater = async (req, res) =>{
    let theaters;
    try{
        theaters = await TheaterModel.find().populate('brand_id', 'name'); 
        res.status(200).json(theaters);
    }
    catch (error) {
        res.status(500).json({message:"Failed to get all theater: ",error})
    }
}

export const addTheater = async (req, res) => {
  try {
    const { name, location, brand_id,img } = req.body;

    // Kiểm tra đầu vào
    if (!name || !location || !brand_id ||!img) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Tạo rạp chiếu mới
    const newTheater = new TheaterModel({
      name,
      location,
      brand_id,
      img
    });

    const savedTheater = await newTheater.save();
    res.status(201).json({ message: "Theater added successfully", theater: savedTheater });
  } catch (error) {
    console.error("Error adding theater:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
