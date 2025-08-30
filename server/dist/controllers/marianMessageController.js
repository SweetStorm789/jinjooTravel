"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMarianMessage = exports.updateMarianMessage = exports.createMarianMessage = exports.getMarianMessageById = exports.getAllMarianMessages = void 0;
const database_1 = __importDefault(require("../config/database"));
// 모든 성모님 메시지 조회
const getAllMarianMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield database_1.default.query(`
      SELECT 
        id,
        message_date,
        content_message,
        prayer_priest,
        prayer_intent,
        created_at,
        updated_at
      FROM mary_message 
      ORDER BY message_date DESC
    `);
        res.json({
            success: true,
            data: rows
        });
    }
    catch (error) {
        console.error('성모님 메시지 목록 조회 에러:', error);
        res.status(500).json({
            success: false,
            message: '성모님 메시지 목록을 가져오는데 실패했습니다.'
        });
    }
});
exports.getAllMarianMessages = getAllMarianMessages;
// 특정 성모님 메시지 조회
const getMarianMessageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [rows] = yield database_1.default.query(`
      SELECT 
        id,
        message_date,
        content_message,
        prayer_priest,
        prayer_intent,
        created_at,
        updated_at
      FROM mary_message 
      WHERE id = ?
    `, [id]);
        if (Array.isArray(rows) && rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: '해당 메시지를 찾을 수 없습니다.'
            });
        }
        res.json({
            success: true,
            data: Array.isArray(rows) ? rows[0] : rows
        });
    }
    catch (error) {
        console.error('성모님 메시지 상세 조회 에러:', error);
        res.status(500).json({
            success: false,
            message: '성모님 메시지를 가져오는데 실패했습니다.'
        });
    }
});
exports.getMarianMessageById = getMarianMessageById;
// 성모님 메시지 생성
const createMarianMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message_date, content_message, prayer_priest, prayer_intent } = req.body;
        // 필수 필드 검증
        if (!message_date || !content_message) {
            return res.status(400).json({
                success: false,
                message: '메시지 일자와 내용은 필수입니다.'
            });
        }
        const [result] = yield database_1.default.query(`
      INSERT INTO mary_message (
        message_date,
        content_message,
        prayer_priest,
        prayer_intent
      ) VALUES (?, ?, ?, ?)
    `, [message_date, content_message, prayer_priest || null, prayer_intent || null]);
        res.status(201).json({
            success: true,
            message: '성모님 메시지가 성공적으로 등록되었습니다.',
            data: { id: result.insertId }
        });
    }
    catch (error) {
        console.error('성모님 메시지 생성 에러:', error);
        res.status(500).json({
            success: false,
            message: '성모님 메시지 등록에 실패했습니다.'
        });
    }
});
exports.createMarianMessage = createMarianMessage;
// 성모님 메시지 수정
const updateMarianMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { message_date, content_message, prayer_priest, prayer_intent } = req.body;
        // 필수 필드 검증
        if (!message_date || !content_message) {
            return res.status(400).json({
                success: false,
                message: '메시지 일자와 내용은 필수입니다.'
            });
        }
        // 메시지 존재 확인
        const [existing] = yield database_1.default.query('SELECT id FROM mary_message WHERE id = ?', [id]);
        if (Array.isArray(existing) && existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: '해당 메시지를 찾을 수 없습니다.'
            });
        }
        // 메시지 업데이트
        yield database_1.default.query(`
      UPDATE mary_message SET
        message_date = ?,
        content_message = ?,
        prayer_priest = ?,
        prayer_intent = ?
      WHERE id = ?
    `, [message_date, content_message, prayer_priest || null, prayer_intent || null, id]);
        res.json({
            success: true,
            message: '성모님 메시지가 성공적으로 수정되었습니다.'
        });
    }
    catch (error) {
        console.error('성모님 메시지 수정 에러:', error);
        res.status(500).json({
            success: false,
            message: '성모님 메시지 수정에 실패했습니다.'
        });
    }
});
exports.updateMarianMessage = updateMarianMessage;
// 성모님 메시지 삭제
const deleteMarianMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // 메시지 존재 확인
        const [existing] = yield database_1.default.query('SELECT id FROM mary_message WHERE id = ?', [id]);
        if (Array.isArray(existing) && existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: '해당 메시지를 찾을 수 없습니다.'
            });
        }
        // 메시지 삭제
        yield database_1.default.query('DELETE FROM mary_message WHERE id = ?', [id]);
        res.json({
            success: true,
            message: '성모님 메시지가 성공적으로 삭제되었습니다.'
        });
    }
    catch (error) {
        console.error('성모님 메시지 삭제 에러:', error);
        res.status(500).json({
            success: false,
            message: '성모님 메시지 삭제에 실패했습니다.'
        });
    }
});
exports.deleteMarianMessage = deleteMarianMessage;
