"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_2 = __importDefault(require("./config/cors"));
const errorHandler_1 = require("./middleware/errorHandler");
// 환경변수 설정
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') }); // dist 기준 한 칸 위 .env
// dotenv.config();
const app = (0, express_1.default)();
// 미들웨어 설정
app.use((0, cors_1.default)(cors_2.default));
app.use(express_1.default.json({ limit: '100mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '100mb' }));
// 정적 파일 제공
//app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
const fs_1 = __importDefault(require("fs"));
const uploadsPath = path_1.default.join(__dirname, '../uploads');
console.log('🔥 uploads 폴더 경로:', uploadsPath);
console.log('📂 폴더 존재함?', fs_1.default.existsSync(uploadsPath)); // true or false
app.use('/uploads', express_1.default.static(uploadsPath));
// 라우터 import
const pilgrimageRoutes_1 = __importDefault(require("./routes/pilgrimageRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const healthRoutes_1 = __importDefault(require("./routes/healthRoutes"));
const marianMessages_1 = __importDefault(require("./routes/marianMessages"));
const boardRoutes_1 = __importDefault(require("./routes/boardRoutes"));
const qnaRoutes_1 = __importDefault(require("./routes/qnaRoutes"));
const freeboardRoutes_1 = __importDefault(require("./routes/freeboardRoutes"));
const galleryRoutes_1 = __importDefault(require("./routes/galleryRoutes"));
const travelReviewRoutes_1 = __importDefault(require("./routes/travelReviewRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const imageLibraryRoutes_1 = __importDefault(require("./routes/imageLibraryRoutes"));
// 기본 라우트
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to Jinjoo Travel API' });
// });
// API 라우트
app.use('/api', pilgrimageRoutes_1.default);
app.use('/api', uploadRoutes_1.default);
app.use('/api', healthRoutes_1.default);
app.use('/api/marian-messages', marianMessages_1.default);
app.use('/api/board', boardRoutes_1.default);
app.use('/api/qna', qnaRoutes_1.default);
app.use('/api/freeboard', freeboardRoutes_1.default);
app.use('/api/gallery', galleryRoutes_1.default);
app.use('/api/travel-reviews', travelReviewRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.use('/api/image-library', imageLibraryRoutes_1.default);
// 에러 핸들링 미들웨어
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// 헬스체크 (NGINX 프록시 확인용)
app.get('/api', (_req, res) => {
    res.json({ message: 'Welcome to Jinjoo Travel API' });
});
