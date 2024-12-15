import mongoose from "mongoose";
import RoomModel  from './room-model.js'

const SeatSchema = new mongoose.Schema (
    {
        roomId:{type:mongoose.Types.ObjectId,ref:RoomModel,required:true},
        row:{type:String,required:true},
        number:{type:Number,required:true},
        type: String,
            enum: ['available', 'booked', 'selected'], 
            required: true,
            default: 'available',
    }
)

const SeatModel= mongoose.model("seats",SeatSchema)
export default SeatModel
