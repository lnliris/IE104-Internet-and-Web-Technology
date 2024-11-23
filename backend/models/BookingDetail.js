const mongoose= require ('mongoose')
const UserModel = require('./UserModel')
const BookingModel = require('./BookingModel')
const TicketModel = require('./TicketModel')
const FandBModel = require('./F&BModel')

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
