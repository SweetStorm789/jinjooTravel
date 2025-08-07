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
          const [result] = await connection.query(
            'INSERT INTO package_images (image_url, image_type, display_order) VALUES (?, ?, ?)',
            [imageUrl, imageType, index + 1]
          );
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