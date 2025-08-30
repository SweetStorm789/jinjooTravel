"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const travelReviewController_1 = require("../controllers/travelReviewController");
const router = express_1.default.Router();
// 여행 후기 목록 조회
router.get('/', travelReviewController_1.getTravelReviewList);
// 여행 후기 카테고리 목록 조회
router.get('/categories', travelReviewController_1.getTravelReviewCategories);
// 여행 후기 미리보기 (링크에서 메타데이터 추출)
router.post('/preview', travelReviewController_1.getTravelReviewPreview);
// 이미지 프록시 (CORS 문제 해결)
router.get('/proxy-image', travelReviewController_1.proxyImage);
// 여행 후기 상세 조회
router.get('/:id', travelReviewController_1.getTravelReviewDetail);
// 여행 후기 작성
router.post('/', travelReviewController_1.createTravelReview);
// 여행 후기 수정
router.put('/:id', travelReviewController_1.updateTravelReview);
// 여행 후기 삭제
router.delete('/:id', travelReviewController_1.deleteTravelReview);
exports.default = router;
