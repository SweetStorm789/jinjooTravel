import { Router } from 'express';
import {
  getQnaList,
  getQnaDetail,
  createQna,
  updateQna,
  deleteQna,
  createQnaAnswer,
  getQnaCategories
} from '../controllers/qnaController';

const router = Router();

// QnA 카테고리 목록
router.get('/categories', getQnaCategories);

// QnA 목록 조회
router.get('/', getQnaList);

// QnA 상세 조회
router.get('/:id', getQnaDetail);

// QnA 작성
router.post('/', createQna);

// QnA 수정
router.put('/:id', updateQna);

// QnA 삭제
router.delete('/:id', deleteQna);

// QnA 답변 작성 (관리자)
router.post('/:id/answers', createQnaAnswer);

export default router;
