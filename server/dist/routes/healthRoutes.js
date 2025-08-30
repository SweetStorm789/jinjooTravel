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
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../config/database"));
const router = express_1.default.Router();
router.get('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 데이터베이스 연결 테스트
        const connection = yield database_1.default.getConnection();
        yield connection.ping();
        connection.release();
        res.json({
            status: 'ok',
            message: 'Server is healthy',
            database: 'connected'
        });
    }
    catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server is running but database connection failed',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
exports.default = router;
