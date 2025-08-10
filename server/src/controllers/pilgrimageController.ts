import { Request, Response } from 'express';
import pool from '../config/database';
import { AppError } from '../middleware/errorHandler';

type SqlError = Error & {
  code?: string;
  errno?: number;
  sqlState?: string;
  sqlMessage?: string;
  sql?: string;
};

function logSqlError(prefix: string, error: SqlError) {
  console.error(prefix, {
    code: error?.code,
    errno: error?.errno,
    sqlState: error?.sqlState,
    sqlMessage: error?.sqlMessage,
    sql: error?.sql,
    message: error?.message,
  });
}

export const createPackage = async (req: Request, res: Response) => {
  console.log('🚀 createPackage function called!');
  try {
    // 기본 데이터와 상세 데이터 분리
    const {
      // 기본 정보
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
      status,

      // 상세 정보
      included,
      not_included,
      insurance_notes,
      customer_promise,
      cancellation_policy,
      other_info,
      itinerary,
      ...rest
    } = req.body;
    console.log('[createPackage] insurance_notes value:', insurance_notes);
    console.log('[createPackage] keys:', Object.keys(req.body));
    // 트랜잭션 시작
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // 1. 패키지 기본 정보 저장
      const [result] = await connection.query(
        'INSERT INTO pilgrimage_packages SET ?',
        {
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
        }
      );
      const packageId = (result as any).insertId;

      // 2. 패키지 상세 정보 저장 (JSON으로 변환)
      await connection.query(
        'INSERT INTO package_details SET ?',
        {
          package_id: packageId,
          included: Array.isArray(included) ? JSON.stringify(included) : included,
          not_included: Array.isArray(not_included) ? JSON.stringify(not_included) : not_included,
          insurance_notes: insurance_notes, // insuranceNotes를 notes 필드에 저장
          customer_promise,
          cancellation_policy,
          other_info
        }
      );

      // 3. 일정 정보 저장
      if (Array.isArray(itinerary) && itinerary.length > 0) {
        for (const day of itinerary) {
          await connection.query(
            'INSERT INTO package_itineraries SET ?',
            {
              package_id: packageId,
              day_number: day.day,
              day_label: day.dayLabel,
              title: day.title,
              description: day.description,
              activities: day.activities,
              meals: day.meals,
              accommodation: day.accommodation
            }
          );
        }
      }

      await connection.commit();
      res.status(201).json({ 
        id: packageId, 
        message: 'Package created successfully' 
      });
    } catch (e:any) {
      await connection.rollback();
      console.error('❌ [CreatePackage SQL Error]', {
        message: e?.message,
        sqlMessage: e?.sqlMessage,
        sql: e?.sql,
        stack: e?.stack,
        errno: e?.errno,
        code: e?.code
      });
      return res.status(500).json({
        status: 'error',
        message: e?.sqlMessage || e?.message || 'Failed to create package',
        details: {
          errno: e?.errno,
          code: e?.code,
          sql: e?.sql
        }
      });
    } 
    finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error creating package:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to create package', 500);
  }
};

export const getAllPackages = async (req: Request, res: Response) => {
  const connection = await pool.getConnection();
  try {
    // 기본 패키지 정보 조회
    const [packages] = await connection.query(
      'SELECT * FROM pilgrimage_packages WHERE deleted_at IS NULL ORDER BY created_at DESC'
    );

    // 각 패키지의 이미지 정보 조회
    const packagesWithImages = await Promise.all((packages as any[]).map(async (pkg) => {
      const [images] = await connection.query(
        'SELECT * FROM package_images WHERE package_id = ? ORDER BY display_order',
        [pkg.id]
      );
      return {
        ...pkg,
        images: images
      };
    }));

    res.json(packagesWithImages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch packages', 500);
  } finally {
    connection.release();
  }
};

export const getPackageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // 기본 정보 조회
    const [packages] = await pool.query(
      'SELECT * FROM pilgrimage_packages WHERE id = ? AND deleted_at IS NULL',
      [id]
    );
    
    if (!packages || (packages as any[]).length === 0) {
      throw new AppError('Package not found', 404);
    }

    const package_data = (packages as any[])[0];

    // 상세 정보 조회
    const [details] = await pool.query(
      'SELECT * FROM package_details WHERE package_id = ?',
      [id]
    );

    // 일정 정보 조회
    const [itineraries] = await pool.query(
      'SELECT * FROM package_itineraries WHERE package_id = ? ORDER BY day_number',
      [id]
    );

    // 이미지 정보 조회
    const [images] = await pool.query(
      'SELECT * FROM package_images WHERE package_id = ? ORDER BY display_order',
      [id]
    );

    // 이미지 URL을 절대 경로로 변환
    const imagesWithFullUrls = (images as any[]).map(img => ({
      ...img,
      image_url: `http://localhost:5000${img.image_url}`
    }));

    const detailData = (details as any[])[0] || {};
    const responseData = {
      ...package_data,
      ...detailData,
      insuranceNotes: detailData.insurance_notes, // notes를 insuranceNotes로 변환
      itineraries,
      images: imagesWithFullUrls
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching package:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to fetch package details', 500);
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      // 기본 정보
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
      status,

      // 상세 정보
      included,
      not_included,
      insurance_notes,
      customer_promise,
      cancellation_policy,
      other_info,
      itinerary,
      ...rest
    } = req.body;

    // 트랜잭션 시작
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // 1. 패키지 기본 정보 업데이트
      await connection.query(
        'UPDATE pilgrimage_packages SET ? WHERE id = ?',
        [{
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
        }, id]
      );

      // 2. 패키지 상세 정보 업데이트 (JSON으로 변환)
      await connection.query(
        'UPDATE package_details SET ? WHERE package_id = ?',
        [{
          included: Array.isArray(included) ? JSON.stringify(included) : included,
          not_included: Array.isArray(not_included) ? JSON.stringify(not_included) : not_included,
          insurance_notes: insurance_notes, // insuranceNotes를 notes 필드에 저장
          customer_promise,
          cancellation_policy,
          other_info
        }, id]
      );

      // 3. 일정 정보 업데이트
      await connection.query('DELETE FROM package_itineraries WHERE package_id = ?', [id]);
      if (Array.isArray(itinerary) && itinerary.length > 0) {
        for (const day of itinerary) {
          await connection.query(
            'INSERT INTO package_itineraries SET ?',
            {
              package_id: id,
              day_number: day.day,
              day_label: day.dayLabel,
              title: day.title,
              description: day.description,
              activities: day.activities,
              meals: day.meals,
              accommodation: day.accommodation
            }
          );
        }
      }

      await connection.commit();
      res.json({ message: 'Package updated successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating package:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to update package', 500);
  }
};

export const deletePackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // 소프트 삭제 - deleted_at 필드 업데이트
    await pool.query(
      'UPDATE pilgrimage_packages SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );

    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to delete package', 500);
  }
};