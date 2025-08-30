"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("../middleware/upload"));
const uploadController_1 = require("../controllers/uploadController");
const router = express_1.default.Router();
// 이미지 업로드 (최대 10개)
router.post('/images', upload_1.default.array('images', 10), uploadController_1.uploadImages);
// 이미지 삭제
router.delete('/images/:id', uploadController_1.deleteImage);
// 이미지 순서 변경
router.put('/images/order', uploadController_1.updateImageOrder);
// 이미지를 상품과 연결
router.put('/images/link/:id', uploadController_1.linkImagesToPackage);
// 새 이미지를 상품에 추가 (이미지 라이브러리에서 선택한 이미지용)
router.post('/packages/:id/images', uploadController_1.addImageToPackage);
exports.default = router;
