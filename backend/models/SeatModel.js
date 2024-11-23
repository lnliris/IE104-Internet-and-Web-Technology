const mongoose= require ('mongoose')
const RoomModel = require('./ScreeningRoomMode')

const SeatSchema = new mongoose.Schema (
    {
        roomId:{type:mongoose.Types.ObjectId,ref:RoomModel,required:true},
        row:{type:String,required:true},
        number:{type:Number,required:true},
        status:{type:String,required:true}
    }
)

const SeatModel= mongoose.model("seats",SeatSchema)
module.exports=SeatModel
