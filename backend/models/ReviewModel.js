const mongoose= require ('mongoose')
const UserModel = require('./UserModel')
const MovieModel = require('./MovieModel')

const ReviewSchema = new mongoose.Schema (
    {
        user_id:{type:mongoose.Types.ObjectId,ref:UserModel,required:true},
        movie_id:{type:mongoose.Types.ObjectId,ref:MovieModel,required:true},
        rating:{type:Number,required:true},
        comment:{type:String,required:true}
    }
)

const ReviewModel= mongoose.model("reviews",ReviewSchema)
module.exports=ReviewModel
