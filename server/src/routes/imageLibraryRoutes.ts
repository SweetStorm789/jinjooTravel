import express from 'express';
import {
  getAllImages,
  addImageToLibrary,
  incrementImageUsage,
  deleteImageFromLibrary,
  getImageCategories
} from '../controllers/imageLibraryController';

const router = express.Router();

// 이미지 라이브러리 조회 (페이징, 검색, 카테고리 필터 지원)
router.get('/', getAllImages);

// 이미지 카테고리 목록 조회
router.get('/categories', getImageCategories);

// 이미지 라이브러리에 추가
router.post('/', addImageToLibrary);

// 이미지 사용 횟수 증가
router.put('/:imageId/usage', incrementImageUsage);

// 이미지 라이브러리에서 삭제
router.delete('/:imageId', deleteImageFromLibrary);

export default router;
