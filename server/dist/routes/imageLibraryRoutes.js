"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageLibraryController_1 = require("../controllers/imageLibraryController");
const router = express_1.default.Router();
// 이미지 라이브러리 조회 (페이징, 검색, 카테고리 필터 지원)
router.get('/', imageLibraryController_1.getAllImages);
// 이미지 카테고리 목록 조회
router.get('/categories', imageLibraryController_1.getImageCategories);
// 이미지 라이브러리에 추가
router.post('/', imageLibraryController_1.addImageToLibrary);
// 이미지 사용 횟수 증가
router.put('/:imageId/usage', imageLibraryController_1.incrementImageUsage);
// 이미지 라이브러리에서 삭제
router.delete('/:imageId', imageLibraryController_1.deleteImageFromLibrary);
exports.default = router;
