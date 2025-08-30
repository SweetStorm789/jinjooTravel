import express from 'express';
import upload from '../middleware/upload';
import {
  uploadImages,
  deleteImage,
  updateImageOrder,
  linkImagesToPackage,
  addImageToPackage
} from '../controllers/uploadController';

const router = express.Router();

// 이미지 업로드 (최대 10개)
router.post('/images', upload.array('images', 10), uploadImages);

// 이미지 삭제
router.delete('/images/:id', deleteImage);

// 이미지 순서 변경
router.put('/images/order', updateImageOrder);

// 이미지를 상품과 연결
router.put('/images/link/:id', linkImagesToPackage);

// 새 이미지를 상품에 추가 (이미지 라이브러리에서 선택한 이미지용)
router.post('/packages/:id/images', addImageToPackage);

export default router;