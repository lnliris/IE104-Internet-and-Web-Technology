import mongoose from "mongoose";
import BookingModel from './booking-model'
import TicketModel from'./ticket-model'
import FandBModel from './F&B-model'

const BookingDetailSchema = new mongoose.Schema (
    {
        booking_id:{type:mongoose.Types.ObjectId,ref:BookingModel,required:true},
        retail_list:{
            ticket_id:{type:mongoose.Types.ObjectId,ref:TicketModel,required:true},
            FandB_id:{type:mongoose.Types.ObjectId,ref:FandBModel    
            }}

    }
)

const BookingDetailModel= mongoose.model("bookingDetail",BookingDetailSchema)
export default BookingDetailModel
