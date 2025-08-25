import { Request, Response } from 'express';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import db from '../config/database';
import bcrypt from 'bcrypt';

// QnA 포스트 인터페이스
interface QnaPost extends RowDataPacket {
  id: number;
  title: string;
  content_html: string;
  content_text: string;
  excerpt: string;
  author_name: string;
  author_email?: string;
  author_phone?: string;
  created_at: string;
  updated_at: string;
  view_count: number;
  comment_count: number;
  is_secret: boolean;
  status: 'draft' | 'published' | 'private' | 'deleted' | 'pending';
  category_id?: number;
  category_name?: string;
  is_answered: boolean;
}

// QnA 카테고리 인터페이스
interface QnaCategory extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  description: string;
}

// QnA 댓글 (답변) 인터페이스
interface QnaAnswer extends RowDataPacket {
  id: number;
  post_id: number;
  content: string;
  author_name: string;
  author_email?: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * QnA 목록 조회
 */
export const getQnaList = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;
    const search = req.query.search as string;
    const status = req.query.status as string || 'published';
    
    const offset = (page - 1) * limit;

    // 검색 조건 구성
    let whereConditions = ['p.board_type = ?', 'p.status = ?'];
    let queryParams: any[] = ['qna', status];

    if (category) {
      whereConditions.push('c.slug = ?');
      queryParams.push(category);
    }

    if (search) {
      whereConditions.push('(p.title LIKE ? OR p.content_text LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // QnA 목록 조회 (답변 여부 포함)
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
        p.is_secret,
        p.status,
        c.id as category_id,
        c.name as category_name,
        c.slug as category_slug,
        CASE WHEN p.comment_count > 0 THEN true ELSE false END as is_answered
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

    const [posts] = await db.execute(listQuery, [...queryParams, limit, offset]);
    const [countResult] = await db.execute(countQuery, queryParams);
    
    const total = (countResult as any[])[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        posts: posts as QnaPost[],
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

  } catch (error) {
    console.error('QnA 목록 조회 오류:', error);
    res.status(500).json({
      success: false,
      message: 'QnA 목록을 불러오는데 실패했습니다.'
    });
  }
};

/**
 * QnA 상세 조회
 */
export const getQnaDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 조회수 증가
    await db.execute(
      'UPDATE board_posts SET view_count = view_count + 1 WHERE id = ? AND board_type = ?',
      [id, 'qna']
    );

    // QnA 상세 정보 조회
    const [posts] = await db.execute(`
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM board_posts p
      LEFT JOIN board_categories c ON p.category_id = c.id
      WHERE p.id = ? AND p.board_type = ?
    `, [id, 'qna']);

    if ((posts as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: 'QnA를 찾을 수 없습니다.'
      });
    }

    const post = (posts as QnaPost[])[0];

    // 답변(댓글) 조회
    const [answers] = await db.execute(`
      SELECT 
        id,
        post_id,
        content,
        author_name,
        author_email,
        is_member as is_admin,
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
        answers: answers as QnaAnswer[]
      }
    });

  } catch (error) {
    console.error('QnA 상세 조회 오류:', error);
    res.status(500).json({
      success: false,
      message: 'QnA 상세 정보를 불러오는데 실패했습니다.'
    });
  }
};

/**
 * QnA 작성
 */
export const createQna = async (req: Request, res: Response) => {
  try {
    const {
      title,
      content_html,
      content_json,
      content_text,
      excerpt,
      author_name,
      author_email,
      author_phone,
      password,
      category_id,
      is_secret = false
    } = req.body;

    // 필수 필드 검증
    if (!title || !content_html || !author_name || !password) {
      return res.status(400).json({
        success: false,
        message: '제목, 내용, 작성자명, 비밀번호는 필수입니다.'
      });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 작성자 IP 추출
    const author_ip = req.ip || req.connection.remoteAddress || '127.0.0.1';

    // QnA 생성
    const [result] = await db.execute(`
      INSERT INTO board_posts (
        board_type, category_id, title, 
        content_html, content_json, content_text, excerpt,
        author_name, author_email, author_phone, author_ip, password, is_member,
        status, allow_comments, is_secret, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `, [
      'qna', category_id, title,
      content_html, JSON.stringify(content_json), content_text, excerpt,
      author_name, author_email, author_phone, author_ip, hashedPassword, false,
      'published', true, is_secret
    ]);

    const insertResult = result as ResultSetHeader;

    res.status(201).json({
      success: true,
      message: 'QnA가 성공적으로 등록되었습니다.',
      data: {
        id: insertResult.insertId
      }
    });

  } catch (error) {
    console.error('QnA 작성 오류:', error);
    res.status(500).json({
      success: false,
      message: 'QnA 등록에 실패했습니다.'
    });
  }
};

/**
 * QnA 수정
 */
export const updateQna = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      content_html,
      content_json,
      content_text,
      excerpt,
      password,
      category_id,
      is_secret = false
    } = req.body;

    // 기존 게시물 조회
    const [posts] = await db.execute(
      'SELECT password FROM board_posts WHERE id = ? AND board_type = ?',
      [id, 'qna']
    );

    if ((posts as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: 'QnA를 찾을 수 없습니다.'
      });
    }

    const existingPost = (posts as any[])[0];

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, existingPost.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: '비밀번호가 일치하지 않습니다.'
      });
    }

    // QnA 수정
    await db.execute(`
      UPDATE board_posts 
      SET title = ?, content_html = ?, content_json = ?, content_text = ?, 
          excerpt = ?, category_id = ?, is_secret = ?, updated_at = NOW()
      WHERE id = ? AND board_type = ?
    `, [
      title, content_html, JSON.stringify(content_json), content_text,
      excerpt, category_id, is_secret, id, 'qna'
    ]);

    res.json({
      success: true,
      message: 'QnA가 성공적으로 수정되었습니다.'
    });

  } catch (error) {
    console.error('QnA 수정 오류:', error);
    res.status(500).json({
      success: false,
      message: 'QnA 수정에 실패했습니다.'
    });
  }
};

/**
 * QnA 삭제
 */
export const deleteQna = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // 기존 게시물 조회
    const [posts] = await db.execute(
      'SELECT password FROM board_posts WHERE id = ? AND board_type = ?',
      [id, 'qna']
    );

    if ((posts as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: 'QnA를 찾을 수 없습니다.'
      });
    }

    const existingPost = (posts as any[])[0];

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, existingPost.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: '비밀번호가 일치하지 않습니다.'
      });
    }

    // 소프트 삭제
    await db.execute(`
      UPDATE board_posts 
      SET status = 'deleted', deleted_at = NOW()
      WHERE id = ? AND board_type = ?
    `, [id, 'qna']);

    res.json({
      success: true,
      message: 'QnA가 성공적으로 삭제되었습니다.'
    });

  } catch (error) {
    console.error('QnA 삭제 오류:', error);
    res.status(500).json({
      success: false,
      message: 'QnA 삭제에 실패했습니다.'
    });
  }
};

/**
 * QnA 답변 작성 (관리자 전용)
 */
export const createQnaAnswer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // QnA ID
    const {
      content,
      author_name = '관리자',
      author_email = 'admin@jinjootravel.com'
    } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: '답변 내용은 필수입니다.'
      });
    }

    // 작성자 IP 추출
    const author_ip = req.ip || req.connection.remoteAddress || '127.0.0.1';

    // 답변 생성 (관리자는 비밀번호 필요 없음)
    const [result] = await db.execute(`
      INSERT INTO board_comments (
        post_id, content, author_name, author_email, author_ip, 
        password, is_member, is_approved
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id, content, author_name, author_email, author_ip,
      'admin_no_password', true, true
    ]);

    // QnA 댓글 수 업데이트
    await db.execute(`
      UPDATE board_posts 
      SET comment_count = comment_count + 1
      WHERE id = ? AND board_type = ?
    `, [id, 'qna']);

    res.status(201).json({
      success: true,
      message: '답변이 성공적으로 등록되었습니다.',
      data: {
        id: (result as ResultSetHeader).insertId
      }
    });

  } catch (error) {
    console.error('QnA 답변 작성 오류:', error);
    res.status(500).json({
      success: false,
      message: '답변 등록에 실패했습니다.'
    });
  }
};

/**
 * QnA 카테고리 목록 조회
 */
export const getQnaCategories = async (req: Request, res: Response) => {
  try {
    const [categories] = await db.execute(`
      SELECT id, name, slug, description
      FROM board_categories
      WHERE board_type = 'qna' AND is_active = true
      ORDER BY sort_order ASC
    `);

    res.json({
      success: true,
      data: categories as QnaCategory[]
    });

  } catch (error) {
    console.error('QnA 카테고리 조회 오류:', error);
    res.status(500).json({
      success: false,
      message: 'QnA 카테고리를 불러오는데 실패했습니다.'
    });
  }
};
