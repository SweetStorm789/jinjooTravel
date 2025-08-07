import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

// 업로드 디렉토리 설정
const uploadDir = path.join(__dirname, '../../uploads');

// 업로드 디렉토리가 없으면 생성
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 파일 저장 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 원본 파일명에서 확장자 추출
    const ext = path.extname(file.originalname);
    // 파일명 생성: UUID + 확장자
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  }
});

// 파일 필터링
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
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
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 10 // 최대 10개 파일
  }
});

export default upload;
