import express from "express";
import { register, login, getProfile } from '../controllers/account-controller.js';
import authMiddleware from '../middlewares/auth-middlewares.js';
import loginLimiter from '../middlewares/rate-limit-middleware.js';


const AccountRouter = express.Router();

AccountRouter.post('/register', register); // Đăng ký tài khoản
AccountRouter.get('/profile', authMiddleware, getProfile); // Lấy thông tin hồ sơ
AccountRouter.post('/login', loginLimiter, login); // // Route đăng nhập (áp dụng giới hạn đăng nhập)

export default AccountRouter;
