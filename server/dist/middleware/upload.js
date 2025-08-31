"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
// 업로드 디렉토리 설정
const uploadDir = path_1.default.join(__dirname, '../../uploads');
// 업로드 디렉토리가 없으면 생성
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
// 파일 저장 설정
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // 원본 파일명에서 확장자 추출
        const ext = path_1.default.extname(file.originalname);
        // 파일명 생성: UUID + 확장자
        const filename = `${(0, uuid_1.v4)()}${ext}`;
        cb(null, filename);
    }
});
// 파일 필터링
const fileFilter = (req, file, cb) => {
    // 허용할 이미지 타입
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('지원하지 않는 파일 형식입니다. (jpeg, png, gif, webp 파일만 업로드 가능)'));
    }
};
// Multer 설정
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB (더 늘림)
        files: 10, // 최대 10개 파일
        fieldSize: 10 * 1024 * 1024 // 필드 크기도 늘림
    }
});
exports.default = upload;
