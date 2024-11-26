import mongoose from "mongoose";
import UserModel from './UserModel'
import BookingModel from './BookingModel'
import TicketModel from'./TicketModel'
import FandBModel from './F&BModel'

const BookingDetailSchema = new mongoose.Schema (
    {
        user_id:{type:mongoose.Types.ObjectId, ref:UserModel, required:true},
        booking_id:{type:mongoose.Types.ObjectId,ref:BookingModel,required:true},
        retail_list:{
            ticket_id:{type:mongoose.Types.ObjectId,ref:TicketModel,required:true},
            FandB_id:{type:mongoose.Types.ObjectId,ref:FandBModel    
            }}

    }
)

const BookingDetailModel= mongoose.model("bookingDetail",BookingDetailSchema)
module.exports=BookingDetailModel
