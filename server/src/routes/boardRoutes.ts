import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getCategories
} from '../controllers/boardController';

const router = express.Router();

// 카테고리 목록 조회
router.get('/categories/:board_type', getCategories);

// 게시물 목록 조회
router.get('/', getPosts);

// 게시물 상세 조회
router.get('/:id', getPost);

// 게시물 등록
router.post('/', createPost);

// 게시물 수정
router.put('/:id', updatePost);

// 게시물 삭제
router.delete('/:id', deletePost);

export default router;

