import { Request, Response } from 'express';
import pool from '../config/database';
import { AppError } from '../middleware/errorHandler';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

// Multer 설정 - 파일 크기 제한을 늘리고 이미지 리사이징을 위해 임시 저장
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join(__dirname, '../../temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB (임시로 늘림, 리사이징 후 작아짐)
    files: 10, // 최대 10개 파일
    fieldSize: 10 * 1024 * 1024 // 필드 크기도 늘림
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('이미지 파일만 업로드 가능합니다.'));
    }
  }
});

// 이미지 리사이징 함수
const resizeImage = async (inputPath: string, outputPath: string, maxWidth: number = 1920, maxHeight: number = 1080, quality: number = 80) => {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // 원본 크기
    const { width, height } = metadata;

    if (!width || !height) {
      throw new Error('이미지 크기를 읽을 수 없습니다.');
    }

    // 리사이징이 필요한지 확인
    if (width <= maxWidth && height <= maxHeight) {
      // 크기가 작으면 그대로 복사하되 품질만 조정하고 회전 처리
      await image
        .rotate() // EXIF 회전 정보에 따라 자동 회전
        .jpeg({ quality })
        .png({ quality })
        .webp({ quality })
        .toFile(outputPath);
    } else {
      // 비율을 유지하면서 리사이징하고 회전 처리
      await image
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
  } catch (error) {
    console.error('이미지 리사이징 오류:', error);
    return false;
  }
};

// 이미지 라이브러리에서 모든 이미지 조회
export const getAllImages = async (req: Request, res: Response) => {
  const connection = await pool.getConnection();
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    const search = req.query.search as string;
    const category = req.query.category as string;

    // WHERE 조건 구성
    let whereClause = 'WHERE 1=1';
    const params: any[] = [];

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
    const [countResult] = await connection.query(
      `SELECT COUNT(*) as total FROM image_library ${whereClause}`,
      params
    );
    const total = (countResult as any[])[0].total;

    // 이미지 목록 조회
    const [images] = await connection.query(
      `SELECT 
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
      LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    // 이미지 URL을 절대 경로로 변환 (다른 컴포넌트들과 일치하도록)
    const imagesWithUrls = (images as any[]).map(img => {
      // 파일명 추출
      const filename = img.file_path.split('/').pop();
      const baseUrl = process.env.BASE_URL || process.env.VITE_API_BASE_URL || 'http://localhost:5000';

      return {
        ...img,
        url: `${baseUrl}/uploads/${filename}`,
        thumbnail_url: `${baseUrl}/uploads/${filename}` // 썸네일은 일단 원본과 동일하게
      };
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
  } catch (error) {
    console.error('Error fetching images:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch images', 500);
  } finally {
    connection.release();
  }
};

// 이미지 라이브러리에 이미지 추가
export const addImageToLibrary = async (req: Request, res: Response) => {
  const connection = await pool.getConnection();
  try {
    const { filename, original_name, file_path, file_size, mime_type, category, tags } = req.body;

    const [result] = await connection.query(
      'INSERT INTO image_library SET ?',
      {
        filename,
        original_name,
        file_path,
        file_size,
        mime_type,
        category: category || 'general',
        tags: tags ? JSON.stringify(tags) : null,
        usage_count: 0
      }
    );

    const imageId = (result as any).insertId;

    // 추가된 이미지 정보 조회
    const [images] = await connection.query(
      'SELECT * FROM image_library WHERE id = ?',
      [imageId]
    );

    const image = (images as any[])[0];
    // 파일명 추출
    const extractedFilename = image.file_path.split('/').pop();
    const baseUrl = process.env.BASE_URL || process.env.VITE_API_BASE_URL || 'http://localhost:5000';

    image.url = `${baseUrl}/uploads/${extractedFilename}`;
    image.thumbnail_url = `${baseUrl}/uploads/${extractedFilename}`; // 썸네일은 일단 원본과 동일하게

    res.status(201).json(image);
  } catch (error) {
    console.error('Error adding image to library:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to add image to library', 500);
  } finally {
    connection.release();
  }
};

// 이미지 사용 횟수 증가
export const incrementImageUsage = async (req: Request, res: Response) => {
  const connection = await pool.getConnection();
  try {
    const { imageId } = req.params;

    await connection.query(
      'UPDATE image_library SET usage_count = usage_count + 1 WHERE id = ?',
      [imageId]
    );

    res.json({ message: 'Usage count incremented' });
  } catch (error) {
    console.error('Error incrementing image usage:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to increment image usage', 500);
  } finally {
    connection.release();
  }
};

// 이미지 라이브러리에서 이미지 삭제
export const deleteImageFromLibrary = async (req: Request, res: Response) => {
  const connection = await pool.getConnection();
  try {
    const { imageId } = req.params;

    // 이미지 정보 조회
    const [images] = await connection.query(
      'SELECT * FROM image_library WHERE id = ?',
      [imageId]
    );

    if ((images as any[]).length === 0) {
      throw new AppError('Image not found', 404);
    }

    const image = (images as any[])[0];

    // 사용 중인 이미지인지 확인
    if (image.usage_count > 0) {
      throw new AppError('Cannot delete image that is currently in use', 400);
    }

    // 이미지 삭제
    await connection.query(
      'DELETE FROM image_library WHERE id = ?',
      [imageId]
    );

    res.json({ message: 'Image deleted from library' });
  } catch (error) {
    console.error('Error deleting image from library:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to delete image from library', 500);
  } finally {
    connection.release();
  }
};

// 이미지 카테고리 목록 조회
export const getImageCategories = async (req: Request, res: Response) => {
  const connection = await pool.getConnection();
  try {
    const [categories] = await connection.query(
      'SELECT DISTINCT category FROM image_library WHERE category IS NOT NULL ORDER BY category'
    );

    res.json(categories);
  } catch (error) {
    console.error('Error fetching image categories:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch image categories', 500);
  } finally {
    connection.release();
  }
};

// 이미지 업로드 (멀티파트) - 리사이징 포함
export const uploadImages = async (req: Request, res: Response) => {
  // console.log('🔄 이미지 업로드 시작');
  const connection = await pool.getConnection();

  // Multer 미들웨어 실행
  upload.array('images', 10)(req, res, async (err) => {
    if (err) {
      console.error('❌ Multer 오류:', err);
      connection.release();
      return res.status(400).json({ error: err.message });
    }

    try {
      const files = req.files as Express.Multer.File[];
      // console.log('📁 업로드된 파일 수:', files?.length || 0);

      if (!files || files.length === 0) {
        throw new AppError('업로드할 이미지가 없습니다.', 400);
      }

      const uploadedImages = [];
      const uploadsDir = path.join(__dirname, '../../uploads');
      // console.log('📂 업로드 디렉토리:', uploadsDir);

      // uploads 디렉토리 생성
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
        // console.log('✅ 업로드 디렉토리 생성됨');
      }

      for (const file of files) {
        try {
          // console.log(`🖼️ 파일 처리 중: ${file.originalname} (${file.size} bytes)`);

          // 임시 파일 경로
          const tempPath = file.path;
          // console.log('📁 임시 파일 경로:', tempPath);

          // 최종 파일명 생성
          const finalFilename = `resized-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
          const finalPath = path.join(uploadsDir, finalFilename);
          // console.log('📁 최종 파일 경로:', finalPath);

          // 이미지 리사이징
          // console.log('🔄 이미지 리사이징 시작...');
          const resizeSuccess = await resizeImage(tempPath, finalPath, 1920, 1080, 80);

          if (!resizeSuccess) {
            throw new Error('이미지 리사이징에 실패했습니다.');
          }
          // console.log('✅ 이미지 리사이징 완료');

          // 리사이징된 파일 정보 가져오기
          const finalStats = fs.statSync(finalPath);
          // console.log('📊 최종 파일 크기:', finalStats.size, 'bytes');

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

          // console.log('💾 데이터베이스에 저장 중...');
          const [result] = await connection.query(
            'INSERT INTO image_library SET ?',
            imageData
          );

          const imageId = (result as any).insertId;
          // console.log('✅ 데이터베이스 저장 완료, ID:', imageId);

          // 추가된 이미지 정보 조회
          const [images] = await connection.query(
            'SELECT * FROM image_library WHERE id = ?',
            [imageId]
          );

          const image = (images as any[])[0];
          const baseUrl = process.env.BASE_URL || process.env.VITE_API_BASE_URL || 'http://localhost:5000';

          image.url = `${baseUrl}${image.file_path}`;
          image.thumbnail_url = `${baseUrl}${image.file_path}`;

          uploadedImages.push(image);
          // console.log('✅ 이미지 처리 완료:', image.original_name);

          // 임시 파일 삭제
          if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
            // console.log('🗑️ 임시 파일 삭제됨');
          }

        } catch (fileError) {
          console.error(`❌ 파일 처리 오류 (${file.originalname}):`, fileError);
          // 임시 파일 정리
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
          // 개별 파일 오류는 건너뛰고 계속 진행
          continue;
        }
      }

      if (uploadedImages.length === 0) {
        throw new AppError('업로드에 성공한 이미지가 없습니다.', 400);
      }

      // console.log('🎉 업로드 완료:', uploadedImages.length, '개 파일');
      res.status(201).json({
        message: `${uploadedImages.length}개의 이미지가 업로드되었습니다.`,
        images: uploadedImages
      });
    } catch (error) {
      console.error('❌ 이미지 업로드 오류:', error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('이미지 업로드에 실패했습니다.', 500);
    } finally {
      connection.release();
    }
  });
};
