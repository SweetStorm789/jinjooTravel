import { Router } from 'express';
import {
  getFreeboardList,
  getFreeboardDetail,
  createFreeboardPost,
  updateFreeboardPost,
  deleteFreeboardPost,
  createFreeboardComment,
  getFreeboardCategories
} from '../controllers/freeboardController';

const router = Router();

// 자유게시판 카테고리 목록
router.get('/categories', getFreeboardCategories);

// 자유게시판 목록 조회
router.get('/', getFreeboardList);

// 자유게시판 상세 조회
router.get('/:id', getFreeboardDetail);

// 자유게시판 작성
router.post('/', createFreeboardPost);

// 자유게시판 수정
router.put('/:id', updateFreeboardPost);

// 자유게시판 삭제
router.delete('/:id', deleteFreeboardPost);

// 자유게시판 댓글 작성
router.post('/:id/comments', createFreeboardComment);

export default router;






