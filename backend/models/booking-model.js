import mongoose from "mongoose";
import Member from './member-model.js'

const BookingSchema = new mongoose.Schema (
    {
        user_id:{type:mongoose.Types.ObjectId,ref:Member,required:true},
        total:{type:Number,required:true},
        status:{type:Boolean,required:true}
    }
)

const BookingModel= mongoose.model("bookings",BookingSchema)
export default BookingModel
