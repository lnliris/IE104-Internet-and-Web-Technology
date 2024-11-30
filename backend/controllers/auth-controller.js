import Account from '../models/account-model.js';
import Member from '../models/member-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Đăng ký tài khoản mới
export const register = async (req, res) => {
    try {
        const { name, email, phone, dateOfBirth, gender, password } = req.body;
        
        // Kiểm tra email hợp lệ
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Email không hợp lệ' });
        }

        // Kiểm tra email hoặc username đã tồn tại
        const existingAccount = await Account.findOne({ username: email });
        const existingMember = await Member.findOne({ email });
        if (existingAccount || existingMember) {
            return res.status(400).json({ message: 'Email đã tồn tại!' });
        }

        // Kiểm tra độ mạnh của mật khẩu
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và ký tự đặc biệt.',
            });
        }

        const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;

        // Tạo Member
        const member = new Member({ name, email, phone, dateOfBirth, gender, avatar: avatarPath });
        await member.save();
        // const savedMember = await member.save();
        // console.log('Member saved:', savedMember);

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo Account
        const account = new Account({
            member: member._id,
            username: email,
            password: hashedPassword,
        });
        await account.save();
        // const savedAccount = await account.save();
        // console.log('Account saved:', savedAccount);

        res.status(201).json({ message: 'Đăng ký tài khoản thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Đăng nhập
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Vui lòng nhập tên người dùng và mật khẩu' });
        }

        // Tìm tài khoản
        const account = await Account.findOne({ username });
        if (!account) {
            return res.status(404).json({ message: 'Tài khoản không tồn tại.' });
        }


        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Thông tin đăng nhập không hợp lệ' });
        }

        // Tạo JWT
        const token = jwt.sign({ id: account._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ 
            message: 'Đăng nhập thành công!',
            token,
            account });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
    res.status(200).json({ message: 'Đăng nhập thành công!' });

};



// Lấy thông tin hồ sơ người dùng
export const getProfile = async (req, res) => {
    try {
        const accountId = req.user.id; // ID từ JWT

        const account = await Account.findById(accountId).populate('member');
        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }

        const userProfile = {
            name: account.member.name,
            email: account.member.email,
            phone: account.member.phone,
            dateOfBirth: account.member.dateOfBirth,
            gender: account.member.gender,
            avatar: account.member.avatar,
        };

        res.json(userProfile);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const logout = async (req, res) => {
    try {
        // Xóa token ở phía client, thông qua cookie (nếu sử dụng cookie)
        res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        // Hoặc nếu bạn đang lưu token trong localStorage/sessionStorage thì thông báo xóa token đó
        res.status(200).json({ message: 'Đã đăng xuất thành công' });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi khi đăng xuất', message: err.message });
    }
};