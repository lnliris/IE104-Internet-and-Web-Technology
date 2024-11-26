import mongoose from "mongoose";
import BookingModel from './BookingModel'

const PaymentSchema = new mongoose.Schema (
    {
        booking_id:{type:mongoose.Types.ObjectId,ref:BookingModel,required:true},
        method:{type:String,required:true},
        time:{type:Date,required:true},
    }
)

const PaymentModel= mongoose.model("payments",PaymentSchema)
module.exports=PaymentModel
