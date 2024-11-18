import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
        name: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
    },
    phone: { 
        type: String, 
        required: true 
    },
    dateOfBirth: { 
        type: Date, 
        required: true 
    },
    gender: { 
        type: String, 
        enum: ['Nam', 'Nữ', 'Khác'], 
        required: true 
    },
        avatar: { 
            type: String // Đường dẫn ảnh đại diện
        }, 
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});


const Member= mongoose.model("member",MemberSchema)
export default Member;