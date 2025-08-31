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
exports.uploadImages = exports.getImageCategories = exports.deleteImageFromLibrary = exports.incrementImageUsage = exports.addImageToLibrary = exports.getAllImages = void 0;
const database_1 = __importDefault(require("../config/database"));
const errorHandler_1 = require("../middleware/errorHandler");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
// Multer 설정 - 파일 크기 제한을 늘리고 이미지 리사이징을 위해 임시 저장
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const tempDir = path_1.default.join(__dirname, '../../temp');
        if (!fs_1.default.existsSync(tempDir)) {
            fs_1.default.mkdirSync(tempDir, { recursive: true });
        }
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB (임시로 늘림, 리사이징 후 작아짐)
        files: 10, // 최대 10개 파일
        fieldSize: 10 * 1024 * 1024 // 필드 크기도 늘림
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            cb(new Error('이미지 파일만 업로드 가능합니다.'));
        }
    }
});
// 이미지 리사이징 함수
const resizeImage = (inputPath_1, outputPath_1, ...args_1) => __awaiter(void 0, [inputPath_1, outputPath_1, ...args_1], void 0, function* (inputPath, outputPath, maxWidth = 1920, maxHeight = 1080, quality = 80) {
    try {
        const image = (0, sharp_1.default)(inputPath);
        const metadata = yield image.metadata();
        // 원본 크기
        const { width, height } = metadata;
        if (!width || !height) {
            throw new Error('이미지 크기를 읽을 수 없습니다.');
        }
        // 리사이징이 필요한지 확인
        if (width <= maxWidth && height <= maxHeight) {
            // 크기가 작으면 그대로 복사하되 품질만 조정하고 회전 처리
            yield image
                .rotate() // EXIF 회전 정보에 따라 자동 회전
                .jpeg({ quality })
                .png({ quality })
                .webp({ quality })
                .toFile(outputPath);
        }
        else {
            // 비율을 유지하면서 리사이징하고 회전 처리
            yield image
                .rotate() // EXIF 회전 정보에 따라 자동 회전
                .resize(maxWidth, maxHeight, {
                fit: 'inside',
                withoutEnlargement: true
            })
                .jpeg({ quality })
                .png({ quality })
                .webp({ quality })
                .toFile(outputPath);
        }
        return true;
    }
    catch (error) {
        console.error('이미지 리사이징 오류:', error);
        return false;
    }
});
// 이미지 라이브러리에서 모든 이미지 조회
const getAllImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.default.getConnection();
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        const search = req.query.search;
        const category = req.query.category;
        // WHERE 조건 구성
        let whereClause = 'WHERE 1=1';
        const params = [];
        if (search) {
            whereClause += ' AND (filename LIKE ? OR original_name LIKE ?)';
            const searchPattern = `%${search}%`;
            params.push(searchPattern, searchPattern);
        }
        if (category) {
            whereClause += ' AND category = ?';
            params.push(category);
        }
        // 전체 개수 조회
        const [countResult] = yield connection.query(`SELECT COUNT(*) as total FROM image_library ${whereClause}`, params);
        const total = countResult[0].total;
        // 이미지 목록 조회
        const [images] = yield connection.query(`SELECT 
        id,
        filename,
        original_name,
        file_path,
        file_size,
        mime_type,
        category,
        tags,
        usage_count,
        created_at,
        updated_at
      FROM image_library 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?`, [...params, limit, offset]);
        // 이미지 URL을 절대 경로로 변환 (다른 컴포넌트들과 일치하도록)
        const imagesWithUrls = images.map(img => {
            // 파일명 추출
            const filename = img.file_path.split('/').pop();
            const baseUrl = process.env.BASE_URL || process.env.VITE_API_BASE_URL || 'http://localhost:5000';
            return Object.assign(Object.assign({}, img), { url: `${baseUrl}/uploads/${filename}`, thumbnail_url: `${baseUrl}/uploads/${filename}` // 썸네일은 일단 원본과 동일하게
             });
        });
        res.json({
            images: imagesWithUrls,
            pagination: {
                current_page: page,
                total_pages: Math.ceil(total / limit),
                total_items: total,
                items_per_page: limit,
                has_next: page < Math.ceil(total / limit),
                has_prev: page > 1
            }
        });
    }
    catch (error) {
        console.error('Error fetching images:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('Failed to fetch images', 500);
    }
    finally {
        connection.release();
    }
});
exports.getAllImages = getAllImages;
// 이미지 라이브러리에 이미지 추가
const addImageToLibrary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.default.getConnection();
    try {
        const { filename, original_name, file_path, file_size, mime_type, category, tags } = req.body;
        const [result] = yield connection.query('INSERT INTO image_library SET ?', {
            filename,
            original_name,
            file_path,
            file_size,
            mime_type,
            category: category || 'general',
            tags: tags ? JSON.stringify(tags) : null,
            usage_count: 0
        });
        const imageId = result.insertId;
        // 추가된 이미지 정보 조회
        const [images] = yield connection.query('SELECT * FROM image_library WHERE id = ?', [imageId]);
        const image = images[0];
        // 파일명 추출
        const extractedFilename = image.file_path.split('/').pop();
        const baseUrl = process.env.BASE_URL || process.env.VITE_API_BASE_URL || 'http://localhost:5000';
        image.url = `${baseUrl}/uploads/${extractedFilename}`;
        image.thumbnail_url = `${baseUrl}/uploads/${extractedFilename}`; // 썸네일은 일단 원본과 동일하게
        res.status(201).json(image);
    }
    catch (error) {
        console.error('Error adding image to library:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('Failed to add image to library', 500);
    }
    finally {
        connection.release();
    }
});
exports.addImageToLibrary = addImageToLibrary;
// 이미지 사용 횟수 증가
const incrementImageUsage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.default.getConnection();
    try {
        const { imageId } = req.params;
        yield connection.query('UPDATE image_library SET usage_count = usage_count + 1 WHERE id = ?', [imageId]);
        res.json({ message: 'Usage count incremented' });
    }
    catch (error) {
        console.error('Error incrementing image usage:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('Failed to increment image usage', 500);
    }
    finally {
        connection.release();
    }
});
exports.incrementImageUsage = incrementImageUsage;
// 이미지 라이브러리에서 이미지 삭제
const deleteImageFromLibrary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.default.getConnection();
    try {
        const { imageId } = req.params;
        // 이미지 정보 조회
        const [images] = yield connection.query('SELECT * FROM image_library WHERE id = ?', [imageId]);
        if (images.length === 0) {
            throw new errorHandler_1.AppError('Image not found', 404);
        }
        const image = images[0];
        // 사용 중인 이미지인지 확인
        if (image.usage_count > 0) {
            throw new errorHandler_1.AppError('Cannot delete image that is currently in use', 400);
        }
        // 이미지 삭제
        yield connection.query('DELETE FROM image_library WHERE id = ?', [imageId]);
        res.json({ message: 'Image deleted from library' });
    }
    catch (error) {
        console.error('Error deleting image from library:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('Failed to delete image from library', 500);
    }
    finally {
        connection.release();
    }
});
exports.deleteImageFromLibrary = deleteImageFromLibrary;
// 이미지 카테고리 목록 조회
const getImageCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.default.getConnection();
    try {
        const [categories] = yield connection.query('SELECT DISTINCT category FROM image_library WHERE category IS NOT NULL ORDER BY category');
        res.json(categories);
    }
    catch (error) {
        console.error('Error fetching image categories:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('Failed to fetch image categories', 500);
    }
    finally {
        connection.release();
    }
});
exports.getImageCategories = getImageCategories;
// 이미지 업로드 (멀티파트) - 리사이징 포함
const uploadImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('🔄 이미지 업로드 시작');
    const connection = yield database_1.default.getConnection();
    // Multer 미들웨어 실행
    upload.array('images', 10)(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error('❌ Multer 오류:', err);
            connection.release();
            return res.status(400).json({ error: err.message });
        }
        try {
            const files = req.files;
            console.log('📁 업로드된 파일 수:', (files === null || files === void 0 ? void 0 : files.length) || 0);
            if (!files || files.length === 0) {
                throw new errorHandler_1.AppError('업로드할 이미지가 없습니다.', 400);
            }
            const uploadedImages = [];
            const uploadsDir = path_1.default.join(__dirname, '../../uploads');
            console.log('📂 업로드 디렉토리:', uploadsDir);
            // uploads 디렉토리 생성
            if (!fs_1.default.existsSync(uploadsDir)) {
                fs_1.default.mkdirSync(uploadsDir, { recursive: true });
                console.log('✅ 업로드 디렉토리 생성됨');
            }
            for (const file of files) {
                try {
                    console.log(`🖼️ 파일 처리 중: ${file.originalname} (${file.size} bytes)`);
                    // 임시 파일 경로
                    const tempPath = file.path;
                    console.log('📁 임시 파일 경로:', tempPath);
                    // 최종 파일명 생성
                    const finalFilename = `resized-${Date.now()}-${Math.round(Math.random() * 1E9)}${path_1.default.extname(file.originalname)}`;
                    const finalPath = path_1.default.join(uploadsDir, finalFilename);
                    console.log('📁 최종 파일 경로:', finalPath);
                    // 이미지 리사이징
                    console.log('🔄 이미지 리사이징 시작...');
                    const resizeSuccess = yield resizeImage(tempPath, finalPath, 1920, 1080, 80);
                    if (!resizeSuccess) {
                        throw new Error('이미지 리사이징에 실패했습니다.');
                    }
                    console.log('✅ 이미지 리사이징 완료');
                    // 리사이징된 파일 정보 가져오기
                    const finalStats = fs_1.default.statSync(finalPath);
                    console.log('📊 최종 파일 크기:', finalStats.size, 'bytes');
                    const imageData = {
                        filename: finalFilename,
                        original_name: file.originalname,
                        file_path: `/uploads/${finalFilename}`,
                        file_size: finalStats.size,
                        mime_type: file.mimetype,
                        category: 'general',
                        tags: null,
                        usage_count: 0
                    };
                    console.log('💾 데이터베이스에 저장 중...');
                    const [result] = yield connection.query('INSERT INTO image_library SET ?', imageData);
                    const imageId = result.insertId;
                    console.log('✅ 데이터베이스 저장 완료, ID:', imageId);
                    // 추가된 이미지 정보 조회
                    const [images] = yield connection.query('SELECT * FROM image_library WHERE id = ?', [imageId]);
                    const image = images[0];
                    const baseUrl = process.env.BASE_URL || process.env.VITE_API_BASE_URL || 'http://localhost:5000';
                    image.url = `${baseUrl}${image.file_path}`;
                    image.thumbnail_url = `${baseUrl}${image.file_path}`;
                    uploadedImages.push(image);
                    console.log('✅ 이미지 처리 완료:', image.original_name);
                    // 임시 파일 삭제
                    if (fs_1.default.existsSync(tempPath)) {
                        fs_1.default.unlinkSync(tempPath);
                        console.log('🗑️ 임시 파일 삭제됨');
                    }
                }
                catch (fileError) {
                    console.error(`❌ 파일 처리 오류 (${file.originalname}):`, fileError);
                    // 임시 파일 정리
                    if (fs_1.default.existsSync(file.path)) {
                        fs_1.default.unlinkSync(file.path);
                    }
                    // 개별 파일 오류는 건너뛰고 계속 진행
                    continue;
                }
            }
            if (uploadedImages.length === 0) {
                throw new errorHandler_1.AppError('업로드에 성공한 이미지가 없습니다.', 400);
            }
            console.log('🎉 업로드 완료:', uploadedImages.length, '개 파일');
            res.status(201).json({
                message: `${uploadedImages.length}개의 이미지가 업로드되었습니다.`,
                images: uploadedImages
            });
        }
        catch (error) {
            console.error('❌ 이미지 업로드 오류:', error);
            if (error instanceof errorHandler_1.AppError) {
                throw error;
            }
            throw new errorHandler_1.AppError('이미지 업로드에 실패했습니다.', 500);
        }
        finally {
            connection.release();
        }
    }));
});
exports.uploadImages = uploadImages;
