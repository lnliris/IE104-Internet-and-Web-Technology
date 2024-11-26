import mongoose from "mongoose";
import TheaterModel from './TheaterModel'

const RoomSchema = new mongoose.Schema (
    {
        name:{type:String,required:true},
        capacity:{type:Number,required:true},
        theater_id:{type:mongoose.Types.ObjectId,ref:TheaterModel,required:true}
    }
)

const RoomModel= mongoose.model("rooms",RoomSchema)
module.exports=RoomModel
