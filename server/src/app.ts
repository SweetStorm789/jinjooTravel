import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import corsOptions from './config/cors';
import { errorHandler } from './middleware/errorHandler';
// 환경변수 설정
dotenv.config({ path: path.join(__dirname, '../.env') }); // dist 기준 한 칸 위 .env
// dotenv.config();

const app = express();

// 미들웨어 설정
app.use(cors(corsOptions));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// 정적 파일 제공
//app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
import fs from 'fs';
const uploadsPath = path.join(__dirname, '../uploads');
console.log('🔥 uploads 폴더 경로:', uploadsPath);
console.log('📂 폴더 존재함?', fs.existsSync(uploadsPath));  // true or false

app.use('/uploads', express.static(uploadsPath));


// 라우터 import
import pilgrimageRoutes from './routes/pilgrimageRoutes';
import uploadRoutes from './routes/uploadRoutes';
import healthRoutes from './routes/healthRoutes';
import marianMessageRoutes from './routes/marianMessages';
import boardRoutes from './routes/boardRoutes';
import qnaRoutes from './routes/qnaRoutes';
import freeboardRoutes from './routes/freeboardRoutes';
import galleryRoutes from './routes/galleryRoutes';
import travelReviewRoutes from './routes/travelReviewRoutes';
import adminRoutes from './routes/adminRoutes';

// 기본 라우트
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to Jinjoo Travel API' });
// });

// API 라우트
app.use('/api', pilgrimageRoutes);
app.use('/api', uploadRoutes);
app.use('/api', healthRoutes);
app.use('/api/marian-messages', marianMessageRoutes);
app.use('/api/board', boardRoutes);
app.use('/api/qna', qnaRoutes);
app.use('/api/freeboard', freeboardRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/travel-reviews', travelReviewRoutes);
app.use('/api/admin', adminRoutes);

// 에러 핸들링 미들웨어
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 헬스체크 (NGINX 프록시 확인용)
app.get('/api', (_req, res) => {
  res.json({ message: 'Welcome to Jinjoo Travel API' });
});