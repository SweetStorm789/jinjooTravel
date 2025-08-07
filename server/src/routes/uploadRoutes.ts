import express from 'express';
import upload from '../middleware/upload';
import {
  uploadImages,
  deleteImage,
  updateImageOrder,
  linkImagesToPackage
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

export default router;