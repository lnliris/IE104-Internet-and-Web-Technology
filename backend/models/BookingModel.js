import mongoose from "mongoose";
import UserModel from './UserModel'

const BookingSchema = new mongoose.Schema (
    {
        user_id:{type:mongoose.Types.ObjectId,ref:UserModel,required:true},
        total:{type:Number,required:true},
        status:{type:Boolean,required:true}
    }
)

const BookingModel= mongoose.model("bookings",BookingSchema)
module.exports=BookingModel
