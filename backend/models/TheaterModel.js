const mongoose= require ('mongoose')
const TheaterBrandModel = require('./TheaterBrandModel')

const TheaterSchema = new mongoose.Schema (
    {
        name:{type:String,required:true},
        location:{type:String,required:true},
        brand_id:{type:mongoose.Types.ObjectId, ref:TheaterBrandModel,required:true}
    }
)

const TheaterModel= mongoose.model("theaters",TheaterSchema)
module.exports=TheaterModel
