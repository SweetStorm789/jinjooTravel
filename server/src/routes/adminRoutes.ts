import express from 'express';
import { adminLogin, verifyAdminToken, adminLogout, initAdminUser } from '../controllers/adminController';

const router = express.Router();

// Admin 로그인
router.post('/login', adminLogin);

// Admin 토큰 검증
router.get('/verify', verifyAdminToken);

// Admin 로그아웃
router.post('/logout', adminLogout);

// Admin 사용자 초기화 (개발용)
router.post('/init', initAdminUser);

export default router;
