import { Request, Response } from 'express';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import db from '../config/database';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

// 갤러리 포스트 인터페이스
interface GalleryPost extends RowDataPacket {
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
  like_count: number;
  status: 'draft' | 'published' | 'private' | 'deleted' | 'pending';
  category_id?: number;
  category_name?: string;
  category_slug?: string;
  featured_image?: string;
  attachments?: string;
  image_count: number;
}

// 갤러리 카테고리 인터페이스
interface GalleryCategory extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  description: string;
}

// 갤러리 이미지 인터페이스
interface GalleryImage {
  id: number;
  original_name: string;
  stored_name: string;
  file_path: string;
  alt_text?: string;
  width?: number;
  height?: number;
}

/**
 * 포토갤러리 목록 조회 (그리드 형태)
 */
export const getGalleryList = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12; // 갤러리는 더 많이 표시
    const category = req.query.category as string;
    const search = req.query.search as string;
    const status = req.query.status as string || 'published';
    
    const offset = (page - 1) * limit;

    // 검색 조건 구성
    let whereConditions = ['p.board_type = ?', 'p.status = ?'];
    let queryParams: any[] = ['gallery', status];

    if (category) {
      whereConditions.push('c.slug = ?');
      queryParams.push(category);
    }

    if (search) {
      whereConditions.push('(p.title LIKE ? OR p.content_text LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // 갤러리 목록 조회 (첨부파일 수 포함)
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
        c.slug as category_slug,
        (SELECT COUNT(*) FROM board_attachments WHERE post_id = p.id) as image_count
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
    console.log("posts :::: ", posts);
    res.json({
      success: true,
      data: {
        posts: posts as GalleryPost[],
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
    console.error('포토갤러리 목록 조회 오류:', error);
    res.status(500).json({
      success: false,
      message: '포토갤러리 목록을 불러오는데 실패했습니다.'
    });
  }
};

/**
 * 포토갤러리 상세 조회
 */
export const getGalleryDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 조회수 증가
    await db.execute(
      'UPDATE board_posts SET view_count = view_count + 1 WHERE id = ? AND board_type = ?',
      [id, 'gallery']
    );

    // 갤러리 상세 정보 조회
    const [posts] = await db.execute(`
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM board_posts p
      LEFT JOIN board_categories c ON p.category_id = c.id
      WHERE p.id = ? AND p.board_type = ?
    `, [id, 'gallery']);

    if ((posts as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: '갤러리를 찾을 수 없습니다.'
      });
    }

    const post = (posts as GalleryPost[])[0];

    // 첨부 이미지들 조회
    const [images] = await db.execute(`
      SELECT 
        id,
        original_name,
        stored_name,
        file_path,
        alt_text,
        width,
        height
      FROM board_attachments
      WHERE post_id = ?
      ORDER BY id ASC
    `, [id]);

    res.json({
      success: true,
      data: {
        post,
        images: images as GalleryImage[]
      }
    });

  } catch (error) {
    console.error('포토갤러리 상세 조회 오류:', error);
    res.status(500).json({
      success: false,
      message: '갤러리 상세 정보를 불러오는데 실패했습니다.'
    });
  }
};

/**
 * 포토갤러리 작성
 */
export const createGalleryPost = async (req: Request, res: Response) => {
  try {
    // multer로 처리된 파일들과 폼 데이터
    const files = req.files as Express.Multer.File[];
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
      featured_image
    } = req.body;

    // 필수 필드 검증
    if (!title || !author_name || !password) {
      return res.status(400).json({
        success: false,
        message: '제목, 작성자명, 비밀번호는 필수입니다.'
      });
    }

    // 이미지 파일 검증 (신규 작성 시 필수)
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: '최소 1개의 이미지를 업로드해주세요.'
      });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 작성자 IP 추출
    const author_ip = req.ip || req.connection.remoteAddress || '127.0.0.1';

    // uploads 디렉토리 확인/생성
    const uploadsDir = path.join(process.cwd(), 'uploads/gallery');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // 갤러리 글 생성
    const [result] = await db.execute(`
      INSERT INTO board_posts (
        board_type, category_id, title, 
        content_html, content_json, content_text, excerpt,
        author_name, author_email, author_phone, author_ip, password, is_member,
        status, allow_comments, featured_image, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `, [
      'gallery', category_id, title,
      content_html || '', content_json ? JSON.stringify(content_json) : null, content_text || '', excerpt || '',
      author_name, author_email || null, author_phone || null, author_ip, hashedPassword, false,
      'published', true, featured_image || null
    ]);

    const insertResult = result as ResultSetHeader;
    const postId = insertResult.insertId;

    // 이미지 파일들 저장 및 DB 기록
    let firstImagePath = null;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const storedName = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(uploadsDir, storedName);
      const relativePath = `/uploads/gallery/${storedName}`;

      try {
        // sharp를 사용하여 이미지 최적화 및 저장 (EXIF 방향 정보 자동 처리)
        await sharp(file.buffer)
          .rotate() // EXIF 방향 정보에 따라 자동 회전
          .resize(1200, 1200, { 
            fit: 'inside', 
            withoutEnlargement: true 
          })
          .jpeg({ quality: 85 })
          .toFile(filePath);

        // 첫 번째 이미지를 대표 이미지로 설정
        if (i === 0) {
          firstImagePath = relativePath;
        }

        // board_attachments 테이블에 파일 정보 저장
        await db.execute(`
          INSERT INTO board_attachments (post_id, original_name, stored_name, file_path, mime_type, file_size)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [postId, file.originalname, storedName, relativePath, file.mimetype, file.size]);

      } catch (fileError) {
        console.error('파일 저장 오류:', fileError);
        // 이미 저장된 파일들 정리
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    // 첫 번째 이미지를 대표 이미지로 업데이트
    if (firstImagePath) {
      await db.execute(`
        UPDATE board_posts 
        SET featured_image = ? 
        WHERE id = ?
      `, [firstImagePath, postId]);
    }

    res.status(201).json({
      success: true,
      message: '갤러리가 성공적으로 등록되었습니다.',
      data: {
        id: postId
      }
    });

  } catch (error) {
    console.error('포토갤러리 작성 오류:', error);
    res.status(500).json({
      success: false,
      message: '갤러리 등록에 실패했습니다.'
    });
  }
};

/**
 * 포토갤러리 수정
 */
export const updateGalleryPost = async (req: Request, res: Response) => {
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
      featured_image,
      deletedImageIds
    } = req.body;

    const files = req.files as Express.Multer.File[];

    // 기존 게시물 조회
    const [posts] = await db.execute(
      'SELECT password FROM board_posts WHERE id = ? AND board_type = ?',
      [id, 'gallery']
    );

    if ((posts as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: '갤러리를 찾을 수 없습니다.'
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

    // 삭제된 이미지들 처리
    if (deletedImageIds) {
      const imageIdsToDelete = JSON.parse(deletedImageIds);
      if (imageIdsToDelete.length > 0) {
        // 삭제할 이미지 파일 경로들 조회
        const [imagesToDelete] = await db.execute(`
          SELECT file_path FROM board_attachments 
          WHERE id IN (${imageIdsToDelete.map(() => '?').join(',')}) AND post_id = ?
        `, [...imageIdsToDelete, id]);

        // 실제 파일 삭제
        for (const imageInfo of imagesToDelete as any[]) {
          const fullPath = path.join(__dirname, '..', imageInfo.file_path);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        }

        // DB에서 이미지 정보 삭제
        await db.execute(`
          DELETE FROM board_attachments 
          WHERE id IN (${imageIdsToDelete.map(() => '?').join(',')}) AND post_id = ?
        `, [...imageIdsToDelete, id]);
      }
    }

    // 새 이미지 파일들 저장
    if (files && files.length > 0) {
      const uploadsDir = path.join(process.cwd(), 'uploads/gallery');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      for (const file of files) {
        const fileExtension = path.extname(file.originalname).toLowerCase();
        const storedName = `${uuidv4()}${fileExtension}`;
        const filePath = path.join(uploadsDir, storedName);
        const relativePath = `/uploads/gallery/${storedName}`;

        try {
          // sharp를 사용하여 이미지 최적화 및 저장 (EXIF 방향 정보 자동 처리)
          await sharp(file.buffer)
            .rotate() // EXIF 방향 정보에 따라 자동 회전
            .resize(1200, 1200, { 
              fit: 'inside', 
              withoutEnlargement: true 
            })
            .jpeg({ quality: 85 })
            .toFile(filePath);

          // board_attachments 테이블에 파일 정보 저장
          await db.execute(`
            INSERT INTO board_attachments (post_id, original_name, stored_name, file_path, mime_type, file_size)
            VALUES (?, ?, ?, ?, ?, ?)
          `, [id, file.originalname, storedName, relativePath, file.mimetype, file.size]);

        } catch (fileError) {
          console.error('파일 저장 오류:', fileError);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      }
    }

    // 첫 번째 이미지를 대표 이미지로 설정 (기존 이미지가 없는 경우)
    const [remainingImages] = await db.execute(`
      SELECT file_path FROM board_attachments 
      WHERE post_id = ? 
      ORDER BY id ASC 
      LIMIT 1
    `, [id]);

    let newFeaturedImage = featured_image;
    if ((remainingImages as any[]).length > 0) {
      newFeaturedImage = (remainingImages as any[])[0].file_path;
    } else {
      newFeaturedImage = null; // 이미지가 없으면 대표 이미지도 null
    }

    // 갤러리 글 수정
    await db.execute(`
      UPDATE board_posts 
      SET title = ?, content_html = ?, content_json = ?, content_text = ?, 
          excerpt = ?, category_id = ?, featured_image = ?, updated_at = NOW()
      WHERE id = ? AND board_type = ?
    `, [
      title, content_html || '', content_json ? JSON.stringify(content_json) : null, content_text || '',
      excerpt || '', category_id, newFeaturedImage, id, 'gallery'
    ]);

    res.json({
      success: true,
      message: '갤러리가 성공적으로 수정되었습니다.'
    });

  } catch (error) {
    console.error('포토갤러리 수정 오류:', error);
    res.status(500).json({
      success: false,
      message: '갤러리 수정에 실패했습니다.'
    });
  }
};

/**
 * 포토갤러리 삭제
 */
export const deleteGalleryPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // 기존 게시물 조회
    const [posts] = await db.execute(
      'SELECT password FROM board_posts WHERE id = ? AND board_type = ?',
      [id, 'gallery']
    );

    if ((posts as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: '갤러리를 찾을 수 없습니다.'
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
    `, [id, 'gallery']);

    res.json({
      success: true,
      message: '갤러리가 성공적으로 삭제되었습니다.'
    });

  } catch (error) {
    console.error('포토갤러리 삭제 오류:', error);
    res.status(500).json({
      success: false,
      message: '갤러리 삭제에 실패했습니다.'
    });
  }
};

/**
 * 포토갤러리 카테고리 목록 조회
 */
export const getGalleryCategories = async (req: Request, res: Response) => {
  try {
    const [categories] = await db.execute(`
      SELECT id, name, slug, description
      FROM board_categories
      WHERE board_type = 'gallery' AND is_active = true
      ORDER BY sort_order ASC
    `);

    res.json({
      success: true,
      data: categories as GalleryCategory[]
    });

  } catch (error) {
    console.error('포토갤러리 카테고리 조회 오류:', error);
    res.status(500).json({
      success: false,
      message: '카테고리를 불러오는데 실패했습니다.'
    });
  }
};
