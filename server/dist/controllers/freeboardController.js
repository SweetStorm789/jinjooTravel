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
exports.getFreeboardCategories = exports.createFreeboardComment = exports.deleteFreeboardPost = exports.updateFreeboardPost = exports.createFreeboardPost = exports.getFreeboardDetail = exports.getFreeboardList = void 0;
const database_1 = __importDefault(require("../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * 자유게시판 목록 조회
 */
const getFreeboardList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category;
        const search = req.query.search;
        const status = req.query.status || 'published';
        const offset = (page - 1) * limit;
        // 검색 조건 구성
        let whereConditions = ['p.board_type = ?', 'p.status = ?'];
        let queryParams = ['free', status];
        if (category) {
            whereConditions.push('c.slug = ?');
            queryParams.push(category);
        }
        if (search) {
            whereConditions.push('(p.title LIKE ? OR p.content_text LIKE ?)');
            queryParams.push(`%${search}%`, `%${search}%`);
        }
        const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
        // 자유게시판 목록 조회
        const listQuery = `
      SELECT 
        p.id,
        p.title,
        p.content_html,
        p.content_text,
        p.excerpt,
        p.author_name,
        p.author_email,
        p.created_at,
        p.updated_at,
        p.view_count,
        p.comment_count,
        p.like_count,
        p.status,
        p.featured_image,
        p.attachments,
        c.id as category_id,
        c.name as category_name,
        c.slug as category_slug
      FROM board_posts p
      LEFT JOIN board_categories c ON p.category_id = c.id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;
        // 전체 개수 조회
        const countQuery = `
      SELECT COUNT(*) as total
      FROM board_posts p
      LEFT JOIN board_categories c ON p.category_id = c.id
      ${whereClause}
    `;
        const [posts] = yield database_1.default.execute(listQuery, [...queryParams, limit, offset]);
        const [countResult] = yield database_1.default.execute(countQuery, queryParams);
        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);
        res.json({
            success: true,
            data: {
                posts: posts,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                }
            }
        });
    }
    catch (error) {
        console.error('자유게시판 목록 조회 오류:', error);
        res.status(500).json({
            success: false,
            message: '자유게시판 목록을 불러오는데 실패했습니다.'
        });
    }
});
exports.getFreeboardList = getFreeboardList;
/**
 * 자유게시판 상세 조회
 */
const getFreeboardDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // 조회수 증가
        yield database_1.default.execute('UPDATE board_posts SET view_count = view_count + 1 WHERE id = ? AND board_type = ?', [id, 'free']);
        // 자유게시판 상세 정보 조회
        const [posts] = yield database_1.default.execute(`
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM board_posts p
      LEFT JOIN board_categories c ON p.category_id = c.id
      WHERE p.id = ? AND p.board_type = ?
    `, [id, 'free']);
        if (posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: '게시글을 찾을 수 없습니다.'
            });
        }
        const post = posts[0];
        // 댓글 조회
        const [comments] = yield database_1.default.execute(`
      SELECT 
        id,
        post_id,
        parent_id,
        content,
        author_name,
        author_email,
        is_member,
        created_at,
        updated_at
      FROM board_comments
      WHERE post_id = ? AND is_approved = true AND is_deleted = false
      ORDER BY created_at ASC
    `, [id]);
        res.json({
            success: true,
            data: {
                post,
                comments: comments
            }
        });
    }
    catch (error) {
        console.error('자유게시판 상세 조회 오류:', error);
        res.status(500).json({
            success: false,
            message: '게시글 상세 정보를 불러오는데 실패했습니다.'
        });
    }
});
exports.getFreeboardDetail = getFreeboardDetail;
/**
 * 자유게시판 작성
 */
const createFreeboardPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content_html, content_json, content_text, excerpt, author_name, author_email, author_phone, password, category_id, featured_image, attachments } = req.body;
        // 필수 필드 검증
        if (!title || !content_html || !author_name || !password) {
            return res.status(400).json({
                success: false,
                message: '제목, 내용, 작성자명, 비밀번호는 필수입니다.'
            });
        }
        // 비밀번호 해시화
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // 작성자 IP 추출
        const author_ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
        // 자유게시판 글 생성
        const [result] = yield database_1.default.execute(`
      INSERT INTO board_posts (
        board_type, category_id, title, 
        content_html, content_json, content_text, excerpt,
        author_name, author_email, author_phone, author_ip, password, is_member,
        status, allow_comments, featured_image, attachments, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `, [
            'free', category_id, title,
            content_html || '', content_json ? JSON.stringify(content_json) : null, content_text || '', excerpt || '',
            author_name, author_email || null, author_phone || null, author_ip, hashedPassword, false,
            'published', true, featured_image || null, attachments ? JSON.stringify(attachments) : null
        ]);
        const insertResult = result;
        res.status(201).json({
            success: true,
            message: '게시글이 성공적으로 등록되었습니다.',
            data: {
                id: insertResult.insertId
            }
        });
    }
    catch (error) {
        console.error('자유게시판 작성 오류:', error);
        res.status(500).json({
            success: false,
            message: '게시글 등록에 실패했습니다.'
        });
    }
});
exports.createFreeboardPost = createFreeboardPost;
/**
 * 자유게시판 수정
 */
const updateFreeboardPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content_html, content_json, content_text, excerpt, password, category_id, featured_image, attachments } = req.body;
        // 기존 게시물 조회
        const [posts] = yield database_1.default.execute('SELECT password FROM board_posts WHERE id = ? AND board_type = ?', [id, 'free']);
        if (posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: '게시글을 찾을 수 없습니다.'
            });
        }
        const existingPost = posts[0];
        // 비밀번호 확인
        const isPasswordValid = yield bcrypt_1.default.compare(password, existingPost.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: '비밀번호가 일치하지 않습니다.'
            });
        }
        // 자유게시판 글 수정
        yield database_1.default.execute(`
      UPDATE board_posts 
      SET title = ?, content_html = ?, content_json = ?, content_text = ?, 
          excerpt = ?, category_id = ?, featured_image = ?, attachments = ?, updated_at = NOW()
      WHERE id = ? AND board_type = ?
    `, [
            title, content_html || '', content_json ? JSON.stringify(content_json) : null, content_text || '',
            excerpt || '', category_id, featured_image || null, attachments ? JSON.stringify(attachments) : null, id, 'free'
        ]);
        res.json({
            success: true,
            message: '게시글이 성공적으로 수정되었습니다.'
        });
    }
    catch (error) {
        console.error('자유게시판 수정 오류:', error);
        res.status(500).json({
            success: false,
            message: '게시글 수정에 실패했습니다.'
        });
    }
});
exports.updateFreeboardPost = updateFreeboardPost;
/**
 * 자유게시판 삭제
 */
const deleteFreeboardPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { password } = req.body;
        // 기존 게시물 조회
        const [posts] = yield database_1.default.execute('SELECT password FROM board_posts WHERE id = ? AND board_type = ?', [id, 'free']);
        if (posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: '게시글을 찾을 수 없습니다.'
            });
        }
        const existingPost = posts[0];
        // 비밀번호 확인
        const isPasswordValid = yield bcrypt_1.default.compare(password, existingPost.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: '비밀번호가 일치하지 않습니다.'
            });
        }
        // 소프트 삭제
        yield database_1.default.execute(`
      UPDATE board_posts 
      SET status = 'deleted', deleted_at = NOW()
      WHERE id = ? AND board_type = ?
    `, [id, 'free']);
        res.json({
            success: true,
            message: '게시글이 성공적으로 삭제되었습니다.'
        });
    }
    catch (error) {
        console.error('자유게시판 삭제 오류:', error);
        res.status(500).json({
            success: false,
            message: '게시글 삭제에 실패했습니다.'
        });
    }
});
exports.deleteFreeboardPost = deleteFreeboardPost;
/**
 * 자유게시판 댓글 작성
 */
const createFreeboardComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // 게시글 ID
        const { content, author_name, author_email, password, parent_id = null } = req.body;
        if (!content || !author_name || !password) {
            return res.status(400).json({
                success: false,
                message: '내용, 작성자명, 비밀번호는 필수입니다.'
            });
        }
        // 비밀번호 해시화
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // 작성자 IP 추출
        const author_ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
        // 댓글 생성
        const [result] = yield database_1.default.execute(`
      INSERT INTO board_comments (
        post_id, parent_id, content, author_name, author_email, author_ip, 
        password, is_member, is_approved
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
            id, parent_id, content, author_name, author_email, author_ip,
            hashedPassword, false, true
        ]);
        // 게시글 댓글 수 업데이트
        yield database_1.default.execute(`
      UPDATE board_posts 
      SET comment_count = comment_count + 1
      WHERE id = ? AND board_type = ?
    `, [id, 'free']);
        res.status(201).json({
            success: true,
            message: '댓글이 성공적으로 등록되었습니다.',
            data: {
                id: result.insertId
            }
        });
    }
    catch (error) {
        console.error('자유게시판 댓글 작성 오류:', error);
        res.status(500).json({
            success: false,
            message: '댓글 등록에 실패했습니다.'
        });
    }
});
exports.createFreeboardComment = createFreeboardComment;
/**
 * 자유게시판 카테고리 목록 조회
 */
const getFreeboardCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [categories] = yield database_1.default.execute(`
      SELECT id, name, slug, description
      FROM board_categories
      WHERE board_type = 'free' AND is_active = true
      ORDER BY sort_order ASC
    `);
        res.json({
            success: true,
            data: categories
        });
    }
    catch (error) {
        console.error('자유게시판 카테고리 조회 오류:', error);
        res.status(500).json({
            success: false,
            message: '카테고리를 불러오는데 실패했습니다.'
        });
    }
});
exports.getFreeboardCategories = getFreeboardCategories;
