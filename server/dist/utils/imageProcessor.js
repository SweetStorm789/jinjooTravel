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
exports.processImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const uuid_1 = require("uuid");
const processImage = (file_1, ...args_1) => __awaiter(void 0, [file_1, ...args_1], void 0, function* (file, options = {}) {
    const { width = 1920, // 기본 최대 너비
    height = 1080, // 기본 최대 높이
    quality = 80 // 기본 품질
     } = options;
    // 업로드 디렉토리 설정
    const uploadDir = path_1.default.join(__dirname, '../../uploads');
    // 디렉토리가 없으면 생성
    try {
        yield promises_1.default.access(uploadDir);
    }
    catch (_a) {
        yield promises_1.default.mkdir(uploadDir, { recursive: true });
    }
    // 파일명 생성 (UUID + 원본 확장자)
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    const filename = `${(0, uuid_1.v4)()}${ext}`;
    const outputPath = path_1.default.join(uploadDir, filename);
    // 이미지 처리
    const image = (0, sharp_1.default)(file.buffer);
    const metadata = yield image.metadata();
    // 원본 이미지의 가로/세로 비율 유지하면서 리사이징
    if (metadata.width && metadata.height) {
        const aspectRatio = metadata.width / metadata.height;
        if (width / height > aspectRatio) {
            // 높이에 맞춤
            yield image
                .resize({ height, fit: 'contain' })
                .jpeg({ quality })
                .toFile(outputPath);
        }
        else {
            // 너비에 맞춤
            yield image
                .resize({ width, fit: 'contain' })
                .jpeg({ quality })
                .toFile(outputPath);
        }
    }
    const processedMetadata = yield (0, sharp_1.default)(outputPath).metadata();
    return {
        filename,
        path: `/uploads/${filename}`,
        width: processedMetadata.width || 0,
        height: processedMetadata.height || 0
    };
});
exports.processImage = processImage;
