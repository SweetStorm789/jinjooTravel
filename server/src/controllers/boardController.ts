import { Request, Response } from 'express';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from '../config/database';
import bcrypt from 'bcrypt';

interface BoardPost extends RowDataPacket {
  id: string;
  board_type: string;
  category_id?: number;
  title: string;
  slug?: string;
  content_html: string;
  content_json: any;
  content_text: string;
  excerpt?: string;
  author_name: string;
  author_email?: string;
  author_phone?: string;
  author_ip: string;
  password: string;
  is_member: boolean;
  status: 'draft' | 'published' | 'private' | 'deleted' | 'pending';
  is_featured: boolean;
  is_notice: boolean;
  allow_comments: boolean;
  is_secret: boolean;
  requires_approval: boolean;
  view_count: number;
  like_count: number;
  comment_count: number;
  featured_image?: string;
  attachments?: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string;
  published_at?: Date;
  expired_at?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  category_name?: string;
  category_slug?: string;
}

interface BoardCategory extends RowDataPacket {
  id: number;
  board_type: string;
  name: string;
  slug: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
  created_at: Date;
}

// HTML에서 텍스트 추출 함수
// HTML에서 텍스트 추출 함수
const stripHtml = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
};

// 요약 생성 함수
const generateExcerpt = (text: string, maxLength: number = 200): string => {
  if (text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > maxLength * 0.7) {
    return truncated.substring(0, lastSpace) + '...';
  }

  return truncated + '...';
};

// 게시물 목록 조회
export const getPosts = async (req: Request, res: Response) => {
  try {
    const {
      board_type = 'notice',
      category_id,
      status = 'published',
      is_featured,
      is_notice,
      search,
      page = 1,
      limit = 10,
      sort = 'created_at',
      order = 'DESC'
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    let whereConditions = ['bp.board_type = ?'];
    let queryParams: any[] = [board_type];

    // 상태 필터
    if (status) {
      whereConditions.push('bp.status = ?');
      queryParams.push(status);
    }

    // 카테고리 필터
    if (category_id) {
      whereConditions.push('bp.category_id = ?');
      queryParams.push(category_id);
    }

    // 추천글 필터
    if (is_featured !== undefined) {
      whereConditions.push('bp.is_featured = ?');
      queryParams.push(is_featured === 'true');
    }

    // 공지사항 필터
    if (is_notice !== undefined) {
      whereConditions.push('bp.is_notice = ?');
      queryParams.push(is_notice === 'true');
    }

    // 검색
    if (search) {
      whereConditions.push('(bp.title LIKE ? OR bp.content_text LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    // 게시 기간 체크 (공지사항의 경우)
    if (board_type === 'notice') {
      whereConditions.push('(bp.published_at IS NULL OR bp.published_at <= NOW())');
      whereConditions.push('(bp.expired_at IS NULL OR bp.expired_at >= NOW())');
    }

    const whereClause = whereConditions.join(' AND ');

    // 총 개수 조회
    const countQuery = `
      SELECT COUNT(*) as total
      FROM board_posts bp
      WHERE ${whereClause}
    `;

    const [countResult] = await pool.execute<RowDataPacket[]>(countQuery, queryParams);
    const totalItems = countResult[0].total;
    const totalPages = Math.ceil(totalItems / Number(limit));

    // 게시물 목록 조회
    const postsQuery = `
      SELECT 
        bp.*,
        bc.name as category_name,
        bc.slug as category_slug
      FROM board_posts bp
      LEFT JOIN board_categories bc ON bp.category_id = bc.id
      WHERE ${whereClause}
      ORDER BY 
        bp.is_notice DESC,
        bp.is_featured DESC,
        bp.${sort} ${order}
      LIMIT ? OFFSET ?
    `;

    queryParams.push(Number(limit), offset);

    const [posts] = await pool.execute<BoardPost[]>(postsQuery, queryParams);

    res.json({
      success: true,
      data: posts,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalItems,
        itemsPerPage: Number(limit)
      }
    });

  } catch (error) {
    console.error('게시물 목록 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '게시물 목록을 불러오는데 실패했습니다.'
    });
  }
};

// 게시물 상세 조회
export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password } = req.query;

    const query = `
      SELECT 
        bp.*,
        bc.name as category_name,
        bc.slug as category_slug
      FROM board_posts bp
      LEFT JOIN board_categories bc ON bp.category_id = bc.id
      WHERE bp.id = ? AND bp.status != 'deleted'
    `;

    const [posts] = await pool.execute<BoardPost[]>(query, [id]);

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: '게시물을 찾을 수 없습니다.'
      });
    }

    const post = posts[0];

    // 비밀글 체크
    if (post.is_secret && !post.is_member) {
      if (!password) {
        return res.status(403).json({
          success: false,
          message: '비밀글입니다. 비밀번호를 입력해주세요.',
          requirePassword: true
        });
      }

      const isValidPassword = await bcrypt.compare(password as string, post.password);
      if (!isValidPassword) {
        return res.status(403).json({
          success: false,
          message: '비밀번호가 올바르지 않습니다.'
        });
      }
    }

    // 조회수 증가
    await pool.execute(
      'UPDATE board_posts SET view_count = view_count + 1 WHERE id = ?',
      [id]
    );

    post.view_count += 1;

    res.json({
      success: true,
      data: post
    });

  } catch (error) {
    console.error('게시물 상세 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '게시물을 불러오는데 실패했습니다.'
    });
  }
};

// 게시물 등록
export const createPost = async (req: Request, res: Response) => {
  try {
    const {
      board_type,
      category_id,
      title,
      content_html,
      content_json,
      author_name,
      author_email,
      author_phone,
      password,
      is_member = false,
      status = 'published',
      is_featured = false,
      is_notice = false,
      allow_comments = true,
      is_secret = false,
      requires_approval = false,
      featured_image,
      attachments,
      meta_title,
      meta_description,
      tags,
      published_at,
      expired_at
    } = req.body;

    // 필수 필드 검증
    if (!board_type || !title || !content_html) {
      return res.status(400).json({
        success: false,
        message: '필수 필드가 누락되었습니다.'
      });
    }

    // 게시판 타입별 작성자명 강제 설정 (보안)
    let validatedAuthorName = author_name;
    if (board_type === 'notice') {
      validatedAuthorName = '진주여행사'; // 공지사항은 항상 "진주여행사"로 설정
    } else if (board_type === 'marian_message') {
      validatedAuthorName = '성모님메시지'; // 성모님 메시지는 항상 "성모님메시지"로 설정
    } else if (!author_name) {
      return res.status(400).json({
        success: false,
        message: '작성자명이 필요합니다.'
      });
    }

    // 비회원이고 관리 게시판이 아닌 경우에만 password 필수
    if (!is_member && board_type !== 'notice' && board_type !== 'marian_message' && !password) {
      return res.status(400).json({
        success: false,
        message: '비회원 게시물은 비밀번호가 필요합니다.'
      });
    }

    // 비밀번호 해시화
    let hashedPassword = null;
    if (!is_member && password) {
      hashedPassword = await bcrypt.hash(password, 10);
    } else if (!is_member && board_type === 'notice') {
      // 공지사항의 경우 기본 비밀번호 설정 (관리자용)
      hashedPassword = await bcrypt.hash('admin_notice_default', 10);
    } else if (!is_member && board_type === 'marian_message') {
      // 성모님 메시지의 경우 기본 비밀번호 설정 (관리자용)
      hashedPassword = await bcrypt.hash('admin_marian_default', 10);
    }

    // HTML에서 텍스트 추출
    const content_text = stripHtml(content_html);
    const excerpt = generateExcerpt(content_text);

    // 클라이언트 IP 가져오기
    const author_ip = req.ip || req.connection.remoteAddress || '127.0.0.1';

    const insertQuery = `
      INSERT INTO board_posts (
        board_type, category_id, title, content_html, content_json, content_text, excerpt,
        author_name, author_email, author_phone, author_ip, password, is_member,
        status, is_featured, is_notice, allow_comments, is_secret, requires_approval,
        featured_image, attachments, meta_title, meta_description, tags,
        published_at, expired_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      board_type, category_id, title, content_html,
      JSON.stringify(content_json), content_text, excerpt,
      validatedAuthorName, author_email, author_phone, author_ip, hashedPassword, is_member,
      status, is_featured, is_notice, allow_comments, is_secret, requires_approval,
      featured_image, attachments ? JSON.stringify(attachments) : null,
      meta_title, meta_description, tags ? JSON.stringify(tags) : null,
      published_at, expired_at
    ];

    const [result] = await pool.execute<ResultSetHeader>(insertQuery, values);

    res.status(201).json({
      success: true,
      message: '게시물이 성공적으로 등록되었습니다.',
      data: { id: result.insertId }
    });

  } catch (error) {
    console.error('게시물 등록 실패:', error);
    res.status(500).json({
      success: false,
      message: '게시물 등록에 실패했습니다.'
    });
  }
};

// 게시물 수정
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password: inputPassword, ...updateData } = req.body;

    // 기존 게시물 조회
    const [posts] = await pool.execute<BoardPost[]>(
      'SELECT * FROM board_posts WHERE id = ? AND status != "deleted"',
      [id]
    );

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: '게시물을 찾을 수 없습니다.'
      });
    }

    const post = posts[0];

    // 비회원 게시물인 경우 비밀번호 확인
    if (!post.is_member) {
      if (!inputPassword) {
        return res.status(403).json({
          success: false,
          message: '비밀번호를 입력해주세요.'
        });
      }

      const isValidPassword = await bcrypt.compare(inputPassword, post.password);
      if (!isValidPassword) {
        return res.status(403).json({
          success: false,
          message: '비밀번호가 올바르지 않습니다.'
        });
      }
    }

    // 게시판 타입별 작성자명 강제 설정 (보안)
    if (post.board_type === 'notice' && updateData.author_name) {
      updateData.author_name = '진주여행사'; // 공지사항은 항상 "진주여행사"로 설정
    } else if (post.board_type === 'marian_message' && updateData.author_name) {
      updateData.author_name = '성모님메시지'; // 성모님 메시지는 항상 "성모님메시지"로 설정
    }

    // 수정할 필드들 준비
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (updateData.title) {
      updateFields.push('title = ?');
      updateValues.push(updateData.title);
    }

    if (updateData.content_html) {
      updateFields.push('content_html = ?', 'content_text = ?', 'excerpt = ?');
      const content_text = stripHtml(updateData.content_html);
      updateValues.push(
        updateData.content_html,
        content_text,
        generateExcerpt(content_text)
      );
    }

    if (updateData.content_json) {
      updateFields.push('content_json = ?');
      updateValues.push(JSON.stringify(updateData.content_json));
    }

    // 기타 필드들
    const otherFields = [
      'category_id', 'author_name', 'author_email', 'author_phone',
      'status', 'is_featured', 'is_notice', 'allow_comments', 'is_secret',
      'featured_image', 'meta_title', 'meta_description',
      'published_at', 'expired_at'
    ];

    otherFields.forEach(field => {
      if (updateData[field] !== undefined) {
        updateFields.push(`${field} = ?`);
        updateValues.push(updateData[field]);
      }
    });

    // JSON 필드들
    if (updateData.attachments) {
      updateFields.push('attachments = ?');
      updateValues.push(JSON.stringify(updateData.attachments));
    }

    if (updateData.tags) {
      updateFields.push('tags = ?');
      updateValues.push(JSON.stringify(updateData.tags));
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: '수정할 내용이 없습니다.'
      });
    }

    updateFields.push('updated_at = NOW()');
    updateValues.push(id);

    const updateQuery = `UPDATE board_posts SET ${updateFields.join(', ')} WHERE id = ?`;

    await pool.execute(updateQuery, updateValues);

    res.json({
      success: true,
      message: '게시물이 성공적으로 수정되었습니다.'
    });

  } catch (error) {
    console.error('게시물 수정 실패:', error);
    res.status(500).json({
      success: false,
      message: '게시물 수정에 실패했습니다.'
    });
  }
};

// 게시물 삭제
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password: inputPassword } = req.body;

    // 기존 게시물 조회
    const [posts] = await pool.execute<BoardPost[]>(
      'SELECT * FROM board_posts WHERE id = ? AND status != "deleted"',
      [id]
    );

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: '게시물을 찾을 수 없습니다.'
      });
    }

    const post = posts[0];

    // 비회원 게시물인 경우 비밀번호 확인
    if (!post.is_member) {
      if (!inputPassword) {
        return res.status(403).json({
          success: false,
          message: '비밀번호를 입력해주세요.'
        });
      }

      const isValidPassword = await bcrypt.compare(inputPassword, post.password);
      if (!isValidPassword) {
        return res.status(403).json({
          success: false,
          message: '비밀번호가 올바르지 않습니다.'
        });
      }
    }

    // 소프트 삭제
    await pool.execute(
      'UPDATE board_posts SET status = "deleted", deleted_at = NOW() WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: '게시물이 성공적으로 삭제되었습니다.'
    });

  } catch (error) {
    console.error('게시물 삭제 실패:', error);
    res.status(500).json({
      success: false,
      message: '게시물 삭제에 실패했습니다.'
    });
  }
};

// 카테고리 목록 조회
export const getCategories = async (req: Request, res: Response) => {
  try {
    const { board_type } = req.params;

    const query = `
      SELECT * FROM board_categories 
      WHERE board_type = ? AND is_active = true 
      ORDER BY sort_order ASC, name ASC
    `;

    const [categories] = await pool.execute<BoardCategory[]>(query, [board_type]);

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('카테고리 목록 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '카테고리 목록을 불러오는데 실패했습니다.'
    });
  }
};

// 게시글 순서 업데이트
export const updatePostOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { display_order } = req.body;

    if (!id || display_order === undefined) {
      return res.status(400).json({
        success: false,
        message: '게시글 ID와 순서 정보가 필요합니다.'
      });
    }

    const connection = await pool.getConnection();

    try {
      // 게시글 순서 업데이트
      const [result] = await connection.query(
        'UPDATE board_posts SET display_order = ? WHERE id = ?',
        [display_order, id]
      );

      if ((result as ResultSetHeader).affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: '해당 게시글을 찾을 수 없습니다.'
        });
      }

      res.json({
        success: true,
        message: '게시글 순서가 성공적으로 업데이트되었습니다.',
        data: { id, display_order }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating post order:', error);
    res.status(500).json({
      success: false,
      message: '게시글 순서 업데이트 중 오류가 발생했습니다.'
    });
  }
};

// 게시글 고정 상태 토글
export const togglePostPin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { is_pinned } = req.body;

    if (!id || is_pinned === undefined) {
      return res.status(400).json({
        success: false,
        message: '게시글 ID와 고정 상태 정보가 필요합니다.'
      });
    }

    const connection = await pool.getConnection();

    try {
      // 게시글 고정 상태 업데이트
      const [result] = await connection.query(
        'UPDATE board_posts SET is_pinned = ? WHERE id = ?',
        [is_pinned ? 1 : 0, id]
      );

      if ((result as ResultSetHeader).affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: '해당 게시글을 찾을 수 없습니다.'
        });
      }

      res.json({
        success: true,
        message: `게시글이 ${is_pinned ? '고정' : '고정 해제'}되었습니다.`,
        data: { id, is_pinned }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error toggling post pin:', error);
    res.status(500).json({
      success: false,
      message: '게시글 고정 상태 변경 중 오류가 발생했습니다.'
    });
  }
};

// 이전/다음 게시물 조회
export const getAdjacentPosts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { board_type } = req.query;

    if (!id || !board_type) {
      return res.status(400).json({
        success: false,
        message: '게시글 ID와 게시판 타입이 필요합니다.'
      });
    }

    // 현재 게시글 조회 (기준점)
    const [currentPost] = await pool.execute<BoardPost[]>(
      'SELECT published_at, created_at FROM board_posts WHERE id = ?',
      [id]
    );

    if (currentPost.length === 0) {
      return res.status(404).json({
        success: false,
        message: '게시글을 찾을 수 없습니다.'
      });
    }

    // published_at이 있으면 사용하고, 없으면 created_at 사용
    const currentTime = currentPost[0].published_at || currentPost[0].created_at;
    const timeColumn = currentPost[0].published_at ? 'published_at' : 'created_at';

    // 이전 게시글 (현재 글보다 오래된 글 중 가장 최신 글)
    // 예: 현재 2023-05-01 -> 이전글은 2023-04-30 (DESC 정렬의 첫번째)
    const prevQuery = `
      SELECT id, title, created_at, published_at
      FROM board_posts 
      WHERE board_type = ? 
      AND status = 'published'
      AND ${timeColumn} < ?
      ORDER BY ${timeColumn} DESC 
      LIMIT 1
    `;

    // 다음 게시글 (현재 글보다 최신 글 중 가장 오래된 글)
    // 예: 현재 2023-05-01 -> 다음글은 2023-05-02 (ASC 정렬의 첫번째)
    const nextQuery = `
      SELECT id, title, created_at, published_at
      FROM board_posts 
      WHERE board_type = ? 
      AND status = 'published'
      AND ${timeColumn} > ?
      ORDER BY ${timeColumn} ASC 
      LIMIT 1
    `;

    const [prevResult] = await pool.execute<BoardPost[]>(prevQuery, [board_type, currentTime]);
    const [nextResult] = await pool.execute<BoardPost[]>(nextQuery, [board_type, currentTime]);

    res.json({
      success: true,
      data: {
        prev: prevResult[0] || null,
        next: nextResult[0] || null
      }
    });

  } catch (error) {
    console.error('이전/다음 게시물 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '이전/다음 게시물을 불러오는데 실패했습니다.'
    });
  }
};
