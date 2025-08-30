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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePackage = exports.updatePackage = exports.getPackageById = exports.getAllPackages = exports.createPackage = void 0;
const database_1 = __importDefault(require("../config/database"));
const errorHandler_1 = require("../middleware/errorHandler");
function logSqlError(prefix, error) {
    console.error(prefix, {
        code: error === null || error === void 0 ? void 0 : error.code,
        errno: error === null || error === void 0 ? void 0 : error.errno,
        sqlState: error === null || error === void 0 ? void 0 : error.sqlState,
        sqlMessage: error === null || error === void 0 ? void 0 : error.sqlMessage,
        sql: error === null || error === void 0 ? void 0 : error.sql,
        message: error === null || error === void 0 ? void 0 : error.message,
    });
}
const createPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('🚀 createPackage function called!');
    try {
        // 기본 데이터와 상세 데이터 분리
        const _a = req.body, { 
        // 기본 정보
        title, subtitle, description, region, duration, price, departure_date, arrival_date, max_people, highlights, status, 
        // 상세 정보
        included, not_included, insurance_notes, customer_promise, cancellation_policy, other_info, itinerary } = _a, rest = __rest(_a, ["title", "subtitle", "description", "region", "duration", "price", "departure_date", "arrival_date", "max_people", "highlights", "status", "included", "not_included", "insurance_notes", "customer_promise", "cancellation_policy", "other_info", "itinerary"]);
        console.log('[createPackage] insurance_notes value:', insurance_notes);
        console.log('[createPackage] keys:', Object.keys(req.body));
        // 트랜잭션 시작
        const connection = yield database_1.default.getConnection();
        yield connection.beginTransaction();
        try {
            // 1. 패키지 기본 정보 저장
            const [result] = yield connection.query('INSERT INTO pilgrimage_packages SET ?', {
                title,
                subtitle,
                description,
                region,
                duration,
                price,
                departure_date,
                arrival_date,
                max_people,
                highlights,
                status: status || 'draft'
            });
            const packageId = result.insertId;
            // 2. 패키지 상세 정보 저장 (JSON으로 변환)
            yield connection.query('INSERT INTO package_details SET ?', {
                package_id: packageId,
                included: Array.isArray(included) ? JSON.stringify(included) : included,
                not_included: Array.isArray(not_included) ? JSON.stringify(not_included) : not_included,
                insurance_notes: insurance_notes, // insuranceNotes를 notes 필드에 저장
                customer_promise,
                cancellation_policy,
                other_info
            });
            // 3. 일정 정보 저장
            if (Array.isArray(itinerary) && itinerary.length > 0) {
                for (const day of itinerary) {
                    yield connection.query('INSERT INTO package_itineraries SET ?', {
                        package_id: packageId,
                        day_number: day.day_number,
                        day_label: day.day_label,
                        title: day.title,
                        description: day.description,
                        activities: day.activities,
                        meals: day.meals,
                        accommodation: day.accommodation
                    });
                }
            }
            yield connection.commit();
            res.status(201).json({
                id: packageId,
                message: 'Package created successfully'
            });
        }
        catch (e) {
            yield connection.rollback();
            console.error('❌ [CreatePackage SQL Error]', {
                message: e === null || e === void 0 ? void 0 : e.message,
                sqlMessage: e === null || e === void 0 ? void 0 : e.sqlMessage,
                sql: e === null || e === void 0 ? void 0 : e.sql,
                stack: e === null || e === void 0 ? void 0 : e.stack,
                errno: e === null || e === void 0 ? void 0 : e.errno,
                code: e === null || e === void 0 ? void 0 : e.code
            });
            return res.status(500).json({
                status: 'error',
                message: (e === null || e === void 0 ? void 0 : e.sqlMessage) || (e === null || e === void 0 ? void 0 : e.message) || 'Failed to create package',
                details: {
                    errno: e === null || e === void 0 ? void 0 : e.errno,
                    code: e === null || e === void 0 ? void 0 : e.code,
                    sql: e === null || e === void 0 ? void 0 : e.sql
                }
            });
        }
        finally {
            connection.release();
        }
    }
    catch (error) {
        console.error('Error creating package:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('Failed to create package', 500);
    }
});
exports.createPackage = createPackage;
const getAllPackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield database_1.default.getConnection();
    try {
        // 쿼리 파라미터 추출
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const offset = (page - 1) * limit;
        const region = req.query.region;
        const search = req.query.search;
        // WHERE 조건 구성
        let whereClause = 'WHERE p.deleted_at IS NULL';
        const params = [];
        if (region && region !== 'all') {
            whereClause += ' AND p.region = ?';
            params.push(region);
        }
        if (search) {
            whereClause += ' AND (p.title LIKE ? OR p.subtitle LIKE ? OR p.description LIKE ?)';
            const searchPattern = `%${search}%`;
            params.push(searchPattern, searchPattern, searchPattern);
        }
        // 전체 개수 조회
        const [countResult] = yield connection.query(`SELECT COUNT(*) as total FROM pilgrimage_packages p ${whereClause}`, params);
        const total = countResult[0].total;
        // 패키지 목록 조회 (LEFT JOIN으로 이미지도 함께 가져오기)
        const [packages] = yield connection.query(`SELECT 
        p.id, 
        p.title, 
        p.subtitle, 
        p.description, 
        p.region, 
        p.duration, 
        p.price, 
        DATE_FORMAT(p.departure_date, '%Y%m%d') as departure_date, 
        DATE_FORMAT(p.arrival_date, '%Y%m%d') as arrival_date, 
        p.max_people, 
        p.highlights, 
        p.status, 
        p.created_at, 
        p.updated_at,
        GROUP_CONCAT(
          JSON_OBJECT(
            'id', pi.id,
            'image_url', pi.image_url,
            'display_order', pi.display_order,
            'image_type', pi.image_type
          ) ORDER BY pi.display_order SEPARATOR '||'
        ) as images_json
      FROM pilgrimage_packages p
      LEFT JOIN package_images pi ON p.id = pi.package_id
      ${whereClause}
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?`, [...params, limit, offset]);
        // 이미지 JSON 파싱
        const packagesWithImages = packages.map(pkg => {
            let images = [];
            if (pkg.images_json) {
                try {
                    images = pkg.images_json.split('||').map((imgStr) => JSON.parse(imgStr));
                }
                catch (e) {
                    console.error('Error parsing images JSON:', e);
                    images = [];
                }
            }
            return Object.assign(Object.assign({}, pkg), { images: images });
        });
        res.json({
            packages: packagesWithImages,
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
        console.error('Error fetching packages:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('Failed to fetch packages', 500);
    }
    finally {
        connection.release();
    }
});
exports.getAllPackages = getAllPackages;
const getPackageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // 기본 정보 조회
        const [packages] = yield database_1.default.query('SELECT * FROM pilgrimage_packages WHERE id = ? AND deleted_at IS NULL', [id]);
        if (!packages || packages.length === 0) {
            throw new errorHandler_1.AppError('Package not found', 404);
        }
        const package_data = packages[0];
        // 상세 정보 조회
        const [details] = yield database_1.default.query('SELECT * FROM package_details WHERE package_id = ?', [id]);
        // 일정 정보 조회
        const [itineraries] = yield database_1.default.query('SELECT * FROM package_itineraries WHERE package_id = ? ORDER BY day_number', [id]);
        // 이미지 정보 조회
        const [images] = yield database_1.default.query('SELECT * FROM package_images WHERE package_id = ? ORDER BY display_order', [id]);
        // 이미지 URL을 절대 경로로 변환
        const imagesWithFullUrls = images.map(img => (Object.assign(Object.assign({}, img), { image_url: `${process.env.BASE_URL || 'http://localhost:5000'}${img.image_url}` })));
        const detailData = details[0] || {};
        const responseData = Object.assign(Object.assign(Object.assign({}, package_data), detailData), { insuranceNotes: detailData.insurance_notes, // notes를 insuranceNotes로 변환
            itineraries, images: imagesWithFullUrls });
        res.json(responseData);
    }
    catch (error) {
        console.error('Error fetching package:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('Failed to fetch package details', 500);
    }
});
exports.getPackageById = getPackageById;
const updatePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _a = req.body, { 
        // 기본 정보
        title, subtitle, description, region, duration, price, departure_date, arrival_date, max_people, highlights, status, 
        // 상세 정보
        included, not_included, insurance_notes, customer_promise, cancellation_policy, other_info, itinerary } = _a, rest = __rest(_a, ["title", "subtitle", "description", "region", "duration", "price", "departure_date", "arrival_date", "max_people", "highlights", "status", "included", "not_included", "insurance_notes", "customer_promise", "cancellation_policy", "other_info", "itinerary"]);
        // 트랜잭션 시작
        const connection = yield database_1.default.getConnection();
        yield connection.beginTransaction();
        try {
            // 1. 패키지 기본 정보 업데이트
            yield connection.query('UPDATE pilgrimage_packages SET ? WHERE id = ?', [{
                    title,
                    subtitle,
                    description,
                    region,
                    duration,
                    price,
                    departure_date,
                    arrival_date,
                    max_people,
                    highlights,
                    status: status || 'draft'
                }, id]);
            // 2. 패키지 상세 정보 업데이트 (JSON으로 변환)
            yield connection.query('UPDATE package_details SET ? WHERE package_id = ?', [{
                    included: Array.isArray(included) ? JSON.stringify(included) : included,
                    not_included: Array.isArray(not_included) ? JSON.stringify(not_included) : not_included,
                    insurance_notes: insurance_notes, // insuranceNotes를 notes 필드에 저장
                    customer_promise,
                    cancellation_policy,
                    other_info
                }, id]);
            // 3. 일정 정보 업데이트
            yield connection.query('DELETE FROM package_itineraries WHERE package_id = ?', [id]);
            if (Array.isArray(itinerary) && itinerary.length > 0) {
                for (const day of itinerary) {
                    yield connection.query('INSERT INTO package_itineraries SET ?', {
                        package_id: id,
                        day_number: day.day_number,
                        day_label: day.day_label,
                        title: day.title,
                        description: day.description,
                        activities: day.activities,
                        meals: day.meals,
                        accommodation: day.accommodation
                    });
                }
            }
            yield connection.commit();
            res.json({ message: 'Package updated successfully' });
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
        console.error('Error updating package:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('Failed to update package', 500);
    }
});
exports.updatePackage = updatePackage;
const deletePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // 소프트 삭제 - deleted_at 필드 업데이트
        yield database_1.default.query('UPDATE pilgrimage_packages SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
        res.json({ message: 'Package deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting package:', error);
        if (error instanceof errorHandler_1.AppError) {
            throw error;
        }
        throw new errorHandler_1.AppError('Failed to delete package', 500);
    }
});
exports.deletePackage = deletePackage;
