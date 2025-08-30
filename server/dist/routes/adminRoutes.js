"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
// Admin 로그인
router.post('/login', adminController_1.adminLogin);
// Admin 토큰 검증
router.get('/verify', adminController_1.verifyAdminToken);
// Admin 로그아웃
router.post('/logout', adminController_1.adminLogout);
// Admin 사용자 초기화 (개발용)
router.post('/init', adminController_1.initAdminUser);
exports.default = router;
