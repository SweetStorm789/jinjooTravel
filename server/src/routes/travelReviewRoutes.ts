import express from 'express';
import {
  getTravelReviewList,
  getTravelReviewCategories,
  getTravelReviewDetail,
  createTravelReview,
  updateTravelReview,
  deleteTravelReview,
  getTravelReviewPreview,
  proxyImage
} from '../controllers/travelReviewController';

const router = express.Router();

// 여행 후기 목록 조회
router.get('/', getTravelReviewList);

// 여행 후기 카테고리 목록 조회
router.get('/categories', getTravelReviewCategories);

// 여행 후기 미리보기 (링크에서 메타데이터 추출)
router.post('/preview', getTravelReviewPreview);

// 이미지 프록시 (CORS 문제 해결)
router.get('/proxy-image', proxyImage);

// 여행 후기 상세 조회
router.get('/:id', getTravelReviewDetail);

// 여행 후기 작성
router.post('/', createTravelReview);

// 여행 후기 수정
router.put('/:id', updateTravelReview);

// 여행 후기 삭제
router.delete('/:id', deleteTravelReview);

export default router;

