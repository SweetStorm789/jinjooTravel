import express from 'express';
import {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
} from '../controllers/pilgrimageController';

const router = express.Router();

// 순례 상품 목록 조회
router.get('/packages', getAllPackages);

// 순례 상품 상세 조회
router.get('/packages/:id', getPackageById);

// 순례 상품 등록
router.post('/packages', createPackage);

// 순례 상품 수정
router.put('/packages/:id', updatePackage);

// 순례 상품 삭제
router.delete('/packages/:id', deletePackage);

export default router;
