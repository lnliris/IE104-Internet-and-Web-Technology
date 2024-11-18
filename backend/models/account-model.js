import mongoose from "mongoose";


const AccountSchema = new mongoose.Schema({
    memberId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Member', 
        required: true, 
        unique: true 
    }, // Khóa ngoại tham chiếu đến Member
    username: { 
        type: String,
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const Account= mongoose.model("account",AccountSchema)
export default Account;

