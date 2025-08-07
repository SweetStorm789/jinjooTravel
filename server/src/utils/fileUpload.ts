import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// 업로드 디렉토리 설정
const UPLOAD_DIR = path.join(__dirname, '../../uploads');

// 업로드 디렉토리가 없으면 생성
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// 파일 저장 설정
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // 원본 파일명에서 확장자 추출
    const ext = path.extname(file.originalname);
    // 파일명 생성: 타임스탬프 + 랜덤문자열 + 확장자
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${ext}`;
    cb(null, filename);
  }
});

// 파일 필터링
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // 허용할 이미지 타입
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('지원하지 않는 파일 형식입니다. (jpeg, png, gif, webp 파일만 업로드 가능)'));
  }
};

// Multer 설정
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 기본 5MB
    files: 10 // 최대 파일 개수
  }
});

export default upload;
