import { Request, Response } from 'express';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import db from '../config/database';
import bcrypt from 'bcrypt';
import { processSocialMediaLink } from '../utils/linkParser';
import axios from 'axios';

// 여행 후기 인터페이스
interface TravelReview extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  author_name: string;
  author_email?: string;
  author_phone?: string;
  author_ip: string;
  password: string;
  is_member: boolean;
  
  // 소셜 미디어 링크
  instagram_url?: string;
  youtube_url?: string;
  facebook_url?: string;
  threads_url?: string;
  
  // 링크 미리보기 정보
  preview_image?: string;
  preview_title?: string;
  preview_description?: string;
  
  // 상태 및 메타데이터
  status: 'draft' | 'published' | 'private' | 'deleted' | 'pending';
  view_count: number;
  like_count: number;
  comment_count: number;
  allow_comments: boolean;
  
  // 카테고리
  category_id?: number;
  category_name?: string;
  category_slug?: string;
  
  // 날짜
  created_at: string;
  updated_at: string;
  published_at: string;
}

// 여행 후기 카테고리 인터페이스
interface TravelReviewCategory extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  description: string;
  sort_order: number;
}

/**
 * 여행 후기 목록 조회
 */
export const getTravelReviewList = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const category = req.query.category as string;
    const search = req.query.search as string;
    const status = req.query.status as string || 'published';
    
    const offset = (page - 1) * limit;

    // 검색 조건 구성
    let whereConditions = ['tr.status = ?'];
    let queryParams: any[] = [status];

    if (category) {
      whereConditions.push('trc.slug = ?');
      queryParams.push(category);
    }

    if (search) {
      whereConditions.push('(tr.title LIKE ? OR tr.content LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // 여행 후기 목록 조회
    const listQuery = `
      SELECT 
        tr.id,
        tr.title,
        tr.content,
        tr.author_name,
        tr.author_email,
        tr.created_at,
        tr.updated_at,
        tr.view_count,
        tr.like_count,
        tr.comment_count,
        tr.status,
        tr.preview_image,
        tr.preview_title,
        tr.preview_description,
        tr.instagram_url,
        tr.youtube_url,
        tr.facebook_url,
        tr.threads_url,
        trc.id as category_id,
        trc.name as category_name,
        trc.slug as category_slug
      FROM travel_reviews tr
      LEFT JOIN travel_review_categories trc ON tr.category_id = trc.id
      ${whereClause}
      ORDER BY tr.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [posts] = await db.execute(listQuery, [...queryParams, limit, offset]);

    // 전체 개수 조회
    const countQuery = `
      SELECT COUNT(*) as total
      FROM travel_reviews tr
      LEFT JOIN travel_review_categories trc ON tr.category_id = trc.id
      ${whereClause}
    `;

    const [countResult] = await db.execute(countQuery, queryParams);
    const total = (countResult as any[])[0].total;

    // 페이지네이션 정보 계산
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.json({
      success: true,
      data: {
        posts: posts,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext,
          hasPrev
        }
      }
    });

  } catch (error) {
    console.error('여행 후기 목록 조회 오류:', error);
    res.status(500).json({
      success: false,
      message: '여행 후기 목록을 불러오는데 실패했습니다.'
    });
  }
};

/**
 * 여행 후기 카테고리 목록 조회
 */
export const getTravelReviewCategories = async (req: Request, res: Response) => {
  try {
    const [categories] = await db.execute(`
      SELECT id, name, slug, description, sort_order
      FROM travel_review_categories
      ORDER BY sort_order ASC, name ASC
    `);

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('여행 후기 카테고리 조회 오류:', error);
    res.status(500).json({
      success: false,
      message: '카테고리를 불러오는데 실패했습니다.'
    });
  }
};

/**
 * 여행 후기 상세 조회
 */
export const getTravelReviewDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 조회수 증가
    await db.execute(`
      UPDATE travel_reviews 
      SET view_count = view_count + 1 
      WHERE id = ? AND status = 'published'
    `, [id]);

    // 여행 후기 상세 조회
    const [posts] = await db.execute(`
      SELECT 
        tr.*,
        trc.name as category_name,
        trc.slug as category_slug
      FROM travel_reviews tr
      LEFT JOIN travel_review_categories trc ON tr.category_id = trc.id
      WHERE tr.id = ? AND tr.status = 'published'
    `, [id]);

    if ((posts as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: '여행 후기를 찾을 수 없습니다.'
      });
    }

    const post = (posts as any[])[0];

    res.json({
      success: true,
      data: {
        post: post
      }
    });

  } catch (error) {
    console.error('여행 후기 상세 조회 오류:', error);
    res.status(500).json({
      success: false,
      message: '여행 후기를 불러오는데 실패했습니다.'
    });
  }
};

/**
 * 여행 후기 작성
 */
export const createTravelReview = async (req: Request, res: Response) => {
  try {
    const {
      title,
      content,
      author_name,
      author_email,
      author_phone,
      password,
      category_id,
      instagram_url,
      youtube_url
    } = req.body;

    // 필수 필드 검증
    if (!title || !author_name || !password) {
      return res.status(400).json({
        success: false,
        message: '제목, 작성자명, 비밀번호는 필수입니다.'
      });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 작성자 IP 추출
    const author_ip = req.ip || req.connection.remoteAddress || '127.0.0.1';

    // 링크 미리보기 정보 추출
    let previewImage = null;
    let previewTitle = null;
    let previewDescription = null;

    // 첫 번째 유효한 링크에서 미리보기 정보 추출
    const links = [instagram_url, youtube_url].filter(Boolean);
    
    if (links.length > 0) {
      try {
        const metadata = await processSocialMediaLink(links[0]);
        previewImage = metadata.image || null;
        previewTitle = metadata.title || null;
        previewDescription = metadata.description || null;
      } catch (error) {
        console.error('링크 미리보기 추출 실패:', error);
      }
    }

    // 여행 후기 생성
    const [result] = await db.execute(`
      INSERT INTO travel_reviews (
        title, content, author_name, author_email, author_phone, author_ip, password, is_member,
        category_id, instagram_url, youtube_url, facebook_url, threads_url,
        preview_image, preview_title, preview_description, status, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, ?, ?, ?, 'published', NOW())
    `, [
      title, content || '', author_name, author_email || null, author_phone || null, author_ip, hashedPassword, false,
      category_id || null, instagram_url || null, youtube_url || null,
      previewImage || null, previewTitle || null, previewDescription || null
    ]);

    const insertResult = result as ResultSetHeader;
    const postId = insertResult.insertId;

    res.status(201).json({
      success: true,
      message: '여행 후기가 성공적으로 등록되었습니다.',
      data: {
        id: postId
      }
    });

  } catch (error) {
    console.error('여행 후기 작성 오류:', error);
    res.status(500).json({
      success: false,
      message: '여행 후기 등록에 실패했습니다.'
    });
  }
};

/**
 * 여행 후기 수정
 */
export const updateTravelReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      password,
      category_id,
      instagram_url,
      youtube_url
    } = req.body;

    // 기존 게시물 조회
    const [posts] = await db.execute(
      'SELECT password FROM travel_reviews WHERE id = ?',
      [id]
    );

    if ((posts as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: '여행 후기를 찾을 수 없습니다.'
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

    // 링크 미리보기 정보 재추출
    let previewImage = null;
    let previewTitle = null;
    let previewDescription = null;

    const links = [instagram_url, youtube_url].filter(Boolean);
    
    if (links.length > 0) {
      try {
        const metadata = await processSocialMediaLink(links[0]);
        previewImage = metadata.image || null;
        previewTitle = metadata.title || null;
        previewDescription = metadata.description || null;
      } catch (error) {
        console.error('링크 미리보기 추출 실패:', error);
      }
    }

    // 여행 후기 수정
    await db.execute(`
      UPDATE travel_reviews 
      SET title = ?, content = ?, category_id = ?, 
          instagram_url = ?, youtube_url = ?, facebook_url = NULL, threads_url = NULL,
          preview_image = ?, preview_title = ?, preview_description = ?,
          updated_at = NOW()
      WHERE id = ?
    `, [
      title, content || '', category_id || null,
      instagram_url || null, youtube_url || null,
      previewImage || null, previewTitle || null, previewDescription || null,
      id
    ]);

    res.json({
      success: true,
      message: '여행 후기가 성공적으로 수정되었습니다.'
    });

  } catch (error) {
    console.error('여행 후기 수정 오류:', error);
    res.status(500).json({
      success: false,
      message: '여행 후기 수정에 실패했습니다.'
    });
  }
};

/**
 * 여행 후기 미리보기 (링크에서 메타데이터 추출)
 */
export const getTravelReviewPreview = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL이 필요합니다.'
      });
    }

    // 링크 메타데이터 추출
    const metadata = await processSocialMediaLink(url);

    res.json({
      success: true,
      data: {
        title: metadata.title,
        description: metadata.description,
        image: metadata.image,
        site_name: metadata.site_name,
        author: metadata.author,
        author_url: metadata.author_url,
        url: metadata.url
      }
    });

  } catch (error) {
    console.error('여행 후기 미리보기 오류:', error);
    res.status(500).json({
      success: false,
      message: '미리보기 정보를 가져오는데 실패했습니다.'
    });
  }
};

/**
 * 이미지 프록시 (CORS 문제 해결)
 */
export const proxyImage = async (req: Request, res: Response) => {
  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        success: false,
        message: '이미지 URL이 필요합니다.'
      });
    }

    // 이미지 다운로드
    const response = await axios.get(url, {
      responseType: 'stream',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.instagram.com/',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    // 적절한 Content-Type 설정
    const contentType = response.headers['content-type'] || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1시간 캐시

    // 이미지 스트림을 응답으로 전송
    response.data.pipe(res);

  } catch (error) {
    console.error('이미지 프록시 오류:', error);
    res.status(500).json({
      success: false,
      message: '이미지를 불러오는데 실패했습니다.'
    });
  }
};

/**
 * 여행 후기 삭제
 */
export const deleteTravelReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // 기존 게시물 조회
    const [posts] = await db.execute(
      'SELECT password FROM travel_reviews WHERE id = ?',
      [id]
    );

    if ((posts as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: '여행 후기를 찾을 수 없습니다.'
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
      UPDATE travel_reviews 
      SET status = 'deleted', updated_at = NOW()
      WHERE id = ?
    `, [id]);

    res.json({
      success: true,
      message: '여행 후기가 삭제되었습니다.'
    });

  } catch (error) {
    console.error('여행 후기 삭제 오류:', error);
    res.status(500).json({
      success: false,
      message: '여행 후기 삭제에 실패했습니다.'
    });
  }
};

