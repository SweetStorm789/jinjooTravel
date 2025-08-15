import express from 'express';
import {
  getAllMarianMessages,
  getMarianMessageById,
  createMarianMessage,
  updateMarianMessage,
  deleteMarianMessage
} from '../controllers/marianMessageController';

const router = express.Router();

// 모든 성모님 메시지 조회
router.get('/', getAllMarianMessages);

// 특정 성모님 메시지 조회
router.get('/:id', getMarianMessageById);

// 성모님 메시지 생성
router.post('/', createMarianMessage);

// 성모님 메시지 수정
router.put('/:id', updateMarianMessage);

// 성모님 메시지 삭제
router.delete('/:id', deleteMarianMessage);

export default router;

