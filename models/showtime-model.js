import mongoose from "mongoose";

const showtimeSchema = new mongoose.Schema (
    {
        movie_id:{type:Number,required:true},
        screening_room_id: {type:Number, required:true},
        date:{type:Date, required:true},
        time: {type:String, required:true},
        language: {type:String, required:true},
    }
)

const ShowtimeModel= mongoose.model("showtimes",showtimeSchema)
export default ShowtimeModel;