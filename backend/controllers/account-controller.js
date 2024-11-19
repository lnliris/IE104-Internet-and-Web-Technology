import Account from '../models/account-model.js';
import Member from '../models/member-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Đăng ký tài khoản mới
export const register = async (req, res) => {
    try {
        const { name, email, phone, dateOfBirth, gender, username, password } = req.body;
        
        // Kiểm tra email hợp lệ
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Email không hợp lệ' });
        }

        // Kiểm tra email hoặc username đã tồn tại
        const existingAccount = await Account.findOne({ username });
        const existingMember = await Member.findOne({ email });
        if (existingAccount || existingMember) {
            return res.status(400).json({ message: 'Email hoặc tên người dùng đã tồn tại!' });
        }

        // Kiểm tra độ mạnh của mật khẩu
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Mật khẩu chưa hợp lệ',
            });
        }

        // Tạo Member
        const member = new Member({ name, email, phone, dateOfBirth, gender });
        await member.save();

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo Account
        const account = new Account({
            memberId: member._id,
            username,
            password: hashedPassword,
        });
        await account.save();

        res.status(201).json({ message: 'Đăng ký tài khoản thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Đăng nhập
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm tài khoản
        const account = await Account.findOne({ email });
        if (!account) {
            return res.status(404).json({ message: 'Tài khoản không tồn tại!' });
        }

        if (!email || !password) {
            return res.status(400).json({ error: 'Nhập email hoặc mật khẩu.' });
          }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Thông tin đăng nhập không hợp lệ' });
        }

        // Tạo JWT
        const token = jwt.sign({ id: account._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, account });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
    res.status(200).json({ message: 'Đăng nhập thành công!' });

};



// Lấy thông tin hồ sơ người dùng
export const getProfile = async (req, res) => {
    try {
        const accountId = req.user.id; // ID từ JWT
        const account = await Account.findById(accountId).populate('memberId');
        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }
        res.json(account.memberId); // Chỉ trả thông tin Member
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
