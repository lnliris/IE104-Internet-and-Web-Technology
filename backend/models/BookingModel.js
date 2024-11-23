const mongoose= require ('mongoose')
const UserModel = require('./UserModel')

const BookingSchema = new mongoose.Schema (
    {
        user_id:{type:mongoose.Types.ObjectId,ref:UserModel,required:true},
        total:{type:Number,required:true}
    }
)

const BookingModel= mongoose.model("bookings",BookingSchema)
module.exports=BookingModel
