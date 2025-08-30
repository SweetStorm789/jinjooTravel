"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const boardController_1 = require("../controllers/boardController");
const router = express_1.default.Router();
// 카테고리 목록 조회
router.get('/categories/:board_type', boardController_1.getCategories);
// 게시물 목록 조회
router.get('/', boardController_1.getPosts);
// 게시물 상세 조회
router.get('/:id', boardController_1.getPost);
// 게시물 등록
router.post('/', boardController_1.createPost);
// 게시물 수정
router.put('/:id', boardController_1.updatePost);
// 게시물 삭제
router.delete('/:id', boardController_1.deletePost);
exports.default = router;
