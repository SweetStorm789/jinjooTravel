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
exports.updateImageOrder = exports.deleteImage = exports.linkImagesToPackage = exports.addImageToPackage = exports.uploadImages = void 0;
const database_1 = __importDefault(require("../config/database"));
const errorHandler_1 = require("../middleware/errorHandler");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
// 이미지 업로드 처리
const uploadImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const imageType = req.body.image_type || 'detail';
        const packageId = req.body.package_id && req.body.package_id !== '0' ? parseInt(req.body.package_id) : null;
        if (!files || files.length === 0) {
            throw new errorHandler_1.AppError('업로드된 파일이 없습니다.', 400);
        }
        // 트랜잭션 시작
        const connection = yield database_1.default.getConnection();
        yield connection.beginTransaction();
        try {
            // 각 파일 정보를 데이터베이스에 저장
            const results = yield Promise.all(files.map((file, index) => __awaiter(void 0, void 0, void 0, function* () {
                const imageUrl = `/uploads/${file.filename}`;
                // 1. package_images 테이블에 저장
                const [result] = yield connection.query('INSERT INTO package_images (package_id, image_url, image_type, display_order) VALUES (?, ?, ?, ?)', [packageId, imageUrl, imageType, index + 1]);
                // 2. 이미지 라이브러리에 추가 (중복 검증)
                // 동일한 original_name과 file_size를 가진 이미지가 이미 있는지 확인
                const [existingImages] = yield connection.query('SELECT id FROM image_library WHERE original_name = ? AND file_size = ?', [file.originalname, file.size]);
                if (existingImages.length === 0) {
                    // 중복이 없으면 새로 추가
                    yield connection.query('INSERT INTO image_library (filename, original_name, file_path, file_size, mime_type, category) VALUES (?, ?, ?, ?, ?, ?)', [
                        file.filename,
                        file.originalname,
                        imageUrl,
                        file.size,
                        file.mimetype,
                        'pilgrimage' // 기본 카테고리
                    ]);
                }
                else {
                    // 중복이 있으면 기존 이미지의 usage_count 증가
                    yield connection.query('UPDATE image_library SET usage_count = usage_count + 1 WHERE original_name = ? AND file_size = ?', [file.originalname, file.size]);
                }
                return {
                    id: result.insertId,
                    image_url: imageUrl,
                    image_type: imageType,
                    display_order: index + 1
                };
            })));
            yield connection.commit();
            res.status(201).json({
                message: '이미지가 성공적으로 업로드되었습니다.',
                images: results
            });
        }
        catch (error) {
            yield connection.rollback();
            // 업로드된 파일 삭제
            yield Promise.all(files.map(file => promises_1.default.unlink(file.path).catch(err => console.error(`Failed to delete file ${file.path}:`, err))));
            throw error;
        }
        finally {
            connection.release();
        }
    }
    catch (error) {
        console.error('Error uploading images:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('이미지 업로드 중 오류가 발생했습니다.', 500);
    }
});
exports.uploadImages = uploadImages;
// 새 이미지를 상품에 추가 (이미지 라이브러리에서 선택한 이미지용)
const addImageToPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: packageId } = req.params;
        const { image_url, display_order, image_type } = req.body;
        if (!packageId) {
            throw new errorHandler_1.AppError('상품 ID가 필요합니다.', 400);
        }
        if (!image_url) {
            throw new errorHandler_1.AppError('이미지 URL이 필요합니다.', 400);
        }
        const connection = yield database_1.default.getConnection();
        yield connection.beginTransaction();
        try {
            // 새 이미지를 package_images에 추가
            const [result] = yield connection.query('INSERT INTO package_images (package_id, image_url, display_order, image_type) VALUES (?, ?, ?, ?)', [packageId, image_url, display_order || 1, image_type || 'detail']);
            const imageId = result.insertId;
            yield connection.commit();
            res.status(201).json({
                message: '이미지가 성공적으로 추가되었습니다.',
                image: {
                    id: imageId,
                    package_id: packageId,
                    image_url,
                    display_order: display_order || 1,
                    image_type: image_type || 'detail'
                }
            });
        }
        catch (error) {
            yield connection.rollback();
            throw error;
        }
        finally {
            connection.release();
        }
    }
    catch (error) {
        console.error('Error adding image to package:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('이미지 추가 중 오류가 발생했습니다.', 500);
    }
});
exports.addImageToPackage = addImageToPackage;
// 이미지를 상품과 연결
const linkImagesToPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: packageId } = req.params;
        const { images } = req.body;
        if (!packageId) {
            throw new errorHandler_1.AppError('상품 ID가 필요합니다.', 400);
        }
        if (!Array.isArray(images) || images.length === 0) {
            throw new errorHandler_1.AppError('이미지 정보가 필요합니다.', 400);
        }
        const connection = yield database_1.default.getConnection();
        yield connection.beginTransaction();
        try {
            // 각 이미지를 상품과 연결
            yield Promise.all(images.map(image => connection.query('UPDATE package_images SET package_id = ?, display_order = ?, image_type = ? WHERE id = ?', [packageId, image.display_order, image.image_type, image.id])));
            yield connection.commit();
            res.json({
                message: '이미지가 성공적으로 연결되었습니다.',
                packageId,
                images
            });
        }
        catch (error) {
            yield connection.rollback();
            throw error;
        }
        finally {
            connection.release();
        }
    }
    catch (error) {
        console.error('Error linking images:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('이미지 연결 중 오류가 발생했습니다.', 500);
    }
});
exports.linkImagesToPackage = linkImagesToPackage;
// 이미지 삭제
const deleteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            throw new errorHandler_1.AppError('이미지 ID가 필요합니다.', 400);
        }
        const connection = yield database_1.default.getConnection();
        yield connection.beginTransaction();
        try {
            // 이미지 정보 조회
            const [images] = yield connection.query('SELECT image_url FROM package_images WHERE id = ?', [id]);
            if (!images || images.length === 0) {
                throw new errorHandler_1.AppError('이미지를 찾을 수 없습니다.', 404);
            }
            const image = images[0];
            const imagePath = path_1.default.join(__dirname, '../..', image.image_url);
            // 파일 시스템에서 이미지 삭제
            try {
                yield promises_1.default.unlink(imagePath);
            }
            catch (err) {
                console.error(`Failed to delete file ${imagePath}:`, err);
            }
            // 데이터베이스에서 이미지 정보 삭제
            yield connection.query('DELETE FROM package_images WHERE id = ?', [id]);
            yield connection.commit();
            res.json({
                message: '이미지가 성공적으로 삭제되었습니다.',
                id: id
            });
        }
        catch (error) {
            yield connection.rollback();
            throw error;
        }
        finally {
            connection.release();
        }
    }
    catch (error) {
        console.error('Error deleting image:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('이미지 삭제 중 오류가 발생했습니다.', 500);
    }
});
exports.deleteImage = deleteImage;
// 이미지 순서 변경
const updateImageOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = req.body.images;
        if (!Array.isArray(images) || images.length === 0) {
            throw new errorHandler_1.AppError('유효한 이미지 순서 데이터가 필요합니다.', 400);
        }
        const connection = yield database_1.default.getConnection();
        yield connection.beginTransaction();
        try {
            // 각 이미지의 순서 업데이트
            yield Promise.all(images.map(image => connection.query('UPDATE package_images SET display_order = ? WHERE id = ?', [image.display_order, image.id])));
            yield connection.commit();
            res.json({
                message: '이미지 순서가 성공적으로 업데이트되었습니다.',
                images: images
            });
        }
        catch (error) {
            yield connection.rollback();
            throw error;
        }
        finally {
            connection.release();
        }
    }
    catch (error) {
        console.error('Error updating image order:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('이미지 순서 변경 중 오류가 발생했습니다.', 500);
    }
});
exports.updateImageOrder = updateImageOrder;
