"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pilgrimageController_1 = require("../controllers/pilgrimageController");
const router = express_1.default.Router();
// 순례 상품 목록 조회
router.get('/packages', pilgrimageController_1.getAllPackages);
// 순례 상품 상세 조회
router.get('/packages/:id', pilgrimageController_1.getPackageById);
// 순례 상품 등록
router.post('/packages', pilgrimageController_1.createPackage);
// 순례 상품 수정
router.put('/packages/:id', pilgrimageController_1.updatePackage);
// 순례 상품 삭제
router.delete('/packages/:id', pilgrimageController_1.deletePackage);
// 순례 상품 순서 업데이트
router.put('/packages/:id/order', pilgrimageController_1.updatePackageOrder);
// 순례 상품 고정 상태 토글
router.put('/packages/:id/pin', pilgrimageController_1.togglePackagePin);
exports.default = router;
