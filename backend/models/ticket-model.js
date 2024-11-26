import mongoose from "mongoose";
import Member from './member-model'
import ShowtimeModel from './showtime-model'
import SeatModel from './seat-model'

const TicketSchema = new mongoose.Schema (
    {
       user_id:{type:mongoose.Types.ObjectId,ref:Member,required:true},
       showtime_id:{type:mongoose.Types.ObjectId,ref:ShowtimeModel,required:true},
       seat_number:{type:mongoose.Types.ObjectId,ref:SeatModel,required:true},
       payment_status:{type:Boolean,required:true},
       ticketPrice:{type:Number,required:true}
    }
)

const TicketModel= mongoose.model("tickets",TicketSchema)
export default TicketModel
