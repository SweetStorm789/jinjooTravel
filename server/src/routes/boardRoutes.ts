import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getCategories,
  updatePostOrder,
  togglePostPin,
  getAdjacentPosts
} from '../controllers/boardController';

const router = express.Router();

// 카테고리 목록 조회
router.get('/categories/:board_type', getCategories);

// 게시물 목록 조회
router.get('/', getPosts);

// 게시물 상세 조회
router.get('/:id', getPost);

// 이전/다음 게시물 조회
router.get('/:id/adjacent', getAdjacentPosts);

// 게시물 등록
router.post('/', createPost);

// 게시물 수정
router.put('/:id', updatePost);

// 게시물 삭제
router.delete('/:id', deletePost);

// 게시물 순서 업데이트
router.put('/:id/order', updatePostOrder);

// 게시물 고정 상태 토글
router.put('/:id/pin', togglePostPin);

export default router;

