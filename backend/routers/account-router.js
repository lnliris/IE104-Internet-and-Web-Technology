import express from "express";
import { register, login, getProfile } from '../controllers/account-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = express.Router();

router.post('/register', register); // Đăng ký tài khoản
router.post('/login', login); // Đăng nhập
router.get('/profile', authMiddleware, getProfile); // Lấy thông tin hồ sơ

export default router;
