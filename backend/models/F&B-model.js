import mongoose from "mongoose";

const FandBSchema = new mongoose.Schema (
    {
        name:{type:String,required:true},
        price:{type:Number,required:true},
        detail:{type:String,required:true}
    }
)

const FandBModel= mongoose.model("fandb",FandBSchema)
export default FandBModel
