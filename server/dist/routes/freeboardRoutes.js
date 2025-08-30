"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const freeboardController_1 = require("../controllers/freeboardController");
const router = (0, express_1.Router)();
// 자유게시판 카테고리 목록
router.get('/categories', freeboardController_1.getFreeboardCategories);
// 자유게시판 목록 조회
router.get('/', freeboardController_1.getFreeboardList);
// 자유게시판 상세 조회
router.get('/:id', freeboardController_1.getFreeboardDetail);
// 자유게시판 작성
router.post('/', freeboardController_1.createFreeboardPost);
// 자유게시판 수정
router.put('/:id', freeboardController_1.updateFreeboardPost);
// 자유게시판 삭제
router.delete('/:id', freeboardController_1.deleteFreeboardPost);
// 자유게시판 댓글 작성
router.post('/:id/comments', freeboardController_1.createFreeboardComment);
exports.default = router;
