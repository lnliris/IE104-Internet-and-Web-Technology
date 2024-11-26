import mongoose from "mongoose";
import RoomModel from './room-model'
import MovieModel from './movie-model'

const showtimeSchema = new mongoose.Schema (
    {
        movie_id:{type:mongoose.Types.ObjectId, ref:MovieModel,required:true},
        screening_room_id: {type:mongoose.Types.ObjectId,ref:RoomModel, required:true},
        date:{type:Date,required:true},
        time: {type:String, required:true},
        language: {type:String, required:true},
    }
)

const ShowtimeModel= mongoose.model("showtimes",showtimeSchema)
export default ShowtimeModel
