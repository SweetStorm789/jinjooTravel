"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const marianMessageController_1 = require("../controllers/marianMessageController");
const router = express_1.default.Router();
// 모든 성모님 메시지 조회
router.get('/', marianMessageController_1.getAllMarianMessages);
// 특정 성모님 메시지 조회
router.get('/:id', marianMessageController_1.getMarianMessageById);
// 성모님 메시지 생성
router.post('/', marianMessageController_1.createMarianMessage);
// 성모님 메시지 수정
router.put('/:id', marianMessageController_1.updateMarianMessage);
// 성모님 메시지 삭제
router.delete('/:id', marianMessageController_1.deleteMarianMessage);
exports.default = router;
