import { Request, Response } from 'express';
import pool from '../config/database';
import { AppError } from '../middleware/errorHandler';
import path from 'path';
import fs from 'fs/promises';

// 이미지 업로드 처리
export const uploadImages = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const imageType = req.body.image_type || 'detail';
    const packageId = req.body.package_id && req.body.package_id !== '0' ? parseInt(req.body.package_id) : null;

    if (!files || files.length === 0) {
      throw new AppError('업로드된 파일이 없습니다.', 400);
    }

    // 트랜잭션 시작
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // 각 파일 정보를 데이터베이스에 저장
      const results = await Promise.all(
        files.map(async (file, index) => {
          const imageUrl = `/uploads/${file.filename}`;
          
          // 1. package_images 테이블에 저장
          const [result] = await connection.query(
            'INSERT INTO package_images (package_id, image_url, image_type, display_order) VALUES (?, ?, ?, ?)',
            [packageId, imageUrl, imageType, index + 1]
          );
          
          // 2. 이미지 라이브러리에 추가 (중복 검증)
          // 동일한 original_name과 file_size를 가진 이미지가 이미 있는지 확인
          const [existingImages] = await connection.query(
            'SELECT id FROM image_library WHERE original_name = ? AND file_size = ?',
            [file.originalname, file.size]
          );
          
          if ((existingImages as any[]).length === 0) {
            // 중복이 없으면 새로 추가
            await connection.query(
              'INSERT INTO image_library (filename, original_name, file_path, file_size, mime_type, category) VALUES (?, ?, ?, ?, ?, ?)',
              [
                file.filename,
                file.originalname,
                imageUrl,
                file.size,
                file.mimetype,
                'pilgrimage' // 기본 카테고리
              ]
            );
          } else {
            // 중복이 있으면 기존 이미지의 usage_count 증가
            await connection.query(
              'UPDATE image_library SET usage_count = usage_count + 1 WHERE original_name = ? AND file_size = ?',
              [file.originalname, file.size]
            );
          }
          
          return {
            id: (result as any).insertId,
            image_url: imageUrl,
            image_type: imageType,
            display_order: index + 1
          };
        })
      );

      await connection.commit();
      res.status(201).json({
        message: '이미지가 성공적으로 업로드되었습니다.',
        images: results
      });
    } catch (error) {
      await connection.rollback();
      // 업로드된 파일 삭제
      await Promise.all(
        files.map(file => 
          fs.unlink(file.path).catch(err => 
            console.error(`Failed to delete file ${file.path}:`, err)
          )
        )
      );
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error uploading images:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('이미지 업로드 중 오류가 발생했습니다.', 500);
  }
};

// 새 이미지를 상품에 추가 (이미지 라이브러리에서 선택한 이미지용)
export const addImageToPackage = async (req: Request, res: Response) => {
  try {
    const { id: packageId } = req.params;
    const { image_url, display_order, image_type } = req.body;

    if (!packageId) {
      throw new AppError('상품 ID가 필요합니다.', 400);
    }

    if (!image_url) {
      throw new AppError('이미지 URL이 필요합니다.', 400);
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // 새 이미지를 package_images에 추가
      const [result] = await connection.query(
        'INSERT INTO package_images (package_id, image_url, display_order, image_type) VALUES (?, ?, ?, ?)',
        [packageId, image_url, display_order || 1, image_type || 'detail']
      );

      const imageId = (result as any).insertId;

      await connection.commit();
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
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error adding image to package:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('이미지 추가 중 오류가 발생했습니다.', 500);
  }
};

// 이미지를 상품과 연결
export const linkImagesToPackage = async (req: Request, res: Response) => {
  try {
    const { id: packageId } = req.params;
    const { images } = req.body;

    if (!packageId) {
      throw new AppError('상품 ID가 필요합니다.', 400);
    }

    if (!Array.isArray(images) || images.length === 0) {
      throw new AppError('이미지 정보가 필요합니다.', 400);
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // 각 이미지를 상품과 연결
      await Promise.all(
        images.map(image =>
          connection.query(
            'UPDATE package_images SET package_id = ?, display_order = ?, image_type = ? WHERE id = ?',
            [packageId, image.display_order, image.image_type, image.id]
          )
        )
      );

      await connection.commit();
      res.json({ 
        message: '이미지가 성공적으로 연결되었습니다.',
        packageId,
        images
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error linking images:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('이미지 연결 중 오류가 발생했습니다.', 500);
  }
};

// 이미지 삭제
export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError('이미지 ID가 필요합니다.', 400);
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // 이미지 정보 조회
      const [images] = await connection.query(
        'SELECT image_url FROM package_images WHERE id = ?',
        [id]
      );

      if (!images || (images as any[]).length === 0) {
        throw new AppError('이미지를 찾을 수 없습니다.', 404);
      }

      const image = (images as any[])[0];
      const imagePath = path.join(__dirname, '../..', image.image_url);

      // 파일 시스템에서 이미지 삭제
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.error(`Failed to delete file ${imagePath}:`, err);
      }

      // 데이터베이스에서 이미지 정보 삭제
      await connection.query('DELETE FROM package_images WHERE id = ?', [id]);

      await connection.commit();
      res.json({ 
        message: '이미지가 성공적으로 삭제되었습니다.',
        id: id
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('이미지 삭제 중 오류가 발생했습니다.', 500);
  }
};

// 이미지 순서 변경
export const updateImageOrder = async (req: Request, res: Response) => {
  try {
    const images: { id: number; display_order: number }[] = req.body.images;

    if (!Array.isArray(images) || images.length === 0) {
      throw new AppError('유효한 이미지 순서 데이터가 필요합니다.', 400);
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // 각 이미지의 순서 업데이트
      await Promise.all(
        images.map(image =>
          connection.query(
            'UPDATE package_images SET display_order = ? WHERE id = ?',
            [image.display_order, image.id]
          )
        )
      );

      await connection.commit();
      res.json({ 
        message: '이미지 순서가 성공적으로 업데이트되었습니다.',
        images: images
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating image order:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('이미지 순서 변경 중 오류가 발생했습니다.', 500);
  }
};