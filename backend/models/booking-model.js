import mongoose from "mongoose";
import Member from './member-model.js'
import TicketModel from './ticket-model.js'
import FandBModel from "./F&B-model.js";

const BookingSchema = new mongoose.Schema (
    {
        user_id:{type:mongoose.Types.ObjectId,ref:Member,required:true},
        ticket_id:[{type:mongoose.Types.ObjectId,ref:TicketModel,required:true}],
        FandB_id:[{type:mongoose.Types.ObjectId,ref:FandBModel}],
        total:{type:Number,required:true},
        status:{type:Boolean,required:true},
        createdAt: { type:Date, default:Date.now}
    }
)

const BookingModel= mongoose.model("bookings",BookingSchema)
export default BookingModel
