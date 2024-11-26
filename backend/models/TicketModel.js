import mongoose from "mongoose";
import UserModel from './UserModel'
import ShowtimeModel from './ShowtimesModel'
import SeatModel from './SeatModel'

const TicketSchema = new mongoose.Schema (
    {
       user_id:{type:mongoose.Types.ObjectId,ref:UserModel,required:true},
       showtime_id:{type:mongoose.Types.ObjectId,ref:ShowtimeModel,required:true},
       seat_number:{type:mongoose.Types.ObjectId,ref:SeatModel,required:true},
       payment_status:{type:Boolean,required:true},
       ticketPrice:{type:Number,required:true}
    }
)

const TicketModel= mongoose.model("tickets",TicketSchema)
module.exports=TicketModel
