const mongoose= require ('mongoose')

const showtimeSchema = new mongoose.Schema (
    {
        movie_id:{type:Number,required:true},
        screening_room_id: {type:Number, required:true},
        date:{type:date, required:true},
        time: {type:String, required:true},
        language: {type:String, required:true},
    }
)

const ShowtimeModel= mongoose.model("showtimes",showtimeSchema)