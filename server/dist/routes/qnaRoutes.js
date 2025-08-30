"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const qnaController_1 = require("../controllers/qnaController");
const router = (0, express_1.Router)();
// QnA 카테고리 목록
router.get('/categories', qnaController_1.getQnaCategories);
// QnA 목록 조회
router.get('/', qnaController_1.getQnaList);
// QnA 상세 조회
router.get('/:id', qnaController_1.getQnaDetail);
// QnA 작성
router.post('/', qnaController_1.createQna);
// QnA 수정
router.put('/:id', qnaController_1.updateQna);
// QnA 삭제
router.delete('/:id', qnaController_1.deleteQna);
// QnA 답변 작성 (관리자)
router.post('/:id/answers', qnaController_1.createQnaAnswer);
exports.default = router;
