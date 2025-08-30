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
exports.getImageCategories = exports.deleteImageFromLibrary = exports.incrementImageUsage = exports.addImageToLibrary = exports.getAllImages = void 0;
const database_1 = __importDefault(require("../config/database"));
const errorHandler_1 = require("../middleware/errorHandler");
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
            const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
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
        const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
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
