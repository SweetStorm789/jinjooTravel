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
  // console.log('🚀 createPackage function called!');
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
    // console.log('[createPackage] insurance_notes value:', insurance_notes);
    // console.log('[createPackage] keys:', Object.keys(req.body));
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
              day_number: day.day_number,
              day_label: day.day_label,
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
    } catch (e: any) {
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
    // 쿼리 파라미터 추출
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const offset = (page - 1) * limit;
    const region = req.query.region as string;
    const search = req.query.search as string;

    // WHERE 조건 구성
    let whereClause = 'WHERE p.deleted_at IS NULL';
    const params: any[] = [];

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
    const [countResult] = await connection.query(
      `SELECT COUNT(*) as total FROM pilgrimage_packages p ${whereClause}`,
      params
    );
    const total = (countResult as any[])[0].total;

    // 패키지 목록 조회 (LEFT JOIN으로 이미지도 함께 가져오기)
    const [packages] = await connection.query(
      `SELECT 
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
      LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    // 이미지 JSON 파싱
    const packagesWithImages = (packages as any[]).map(pkg => {
      let images = [];
      if (pkg.images_json) {
        try {
          images = pkg.images_json.split('||').map((imgStr: string) => JSON.parse(imgStr));
        } catch (e) {
          console.error('Error parsing images JSON:', e);
          images = [];
        }
      }

      return {
        ...pkg,
        images: images
      };
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
      'SELECT day_number as day, day_label, title, description, activities, meals, accommodation FROM package_itineraries WHERE package_id = ? ORDER BY day_number',
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
      image_url: `${process.env.BASE_URL || 'http://localhost:5000'}${img.image_url}`
    }));

    const detailData = (details as any[])[0] || {};

    // 일정 데이터 처리 - activities를 원본 텍스트 그대로 유지
    const processedItineraries = (itineraries as any[]).map(itinerary => ({
      ...itinerary,
      activities: itinerary.activities || ''
    }));

    const responseData = {
      ...package_data,
      ...detailData,
      insuranceNotes: detailData.insurance_notes, // notes를 insuranceNotes로 변환
      itineraries: processedItineraries,
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
              day_number: day.day_number,
              day_label: day.day_label,
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

// 성지순례 상품 순서 업데이트
export const updatePackageOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { display_order } = req.body;

    if (!id || display_order === undefined) {
      return res.status(400).json({
        success: false,
        message: '상품 ID와 순서 정보가 필요합니다.'
      });
    }

    const connection = await pool.getConnection();

    try {
      // 상품 순서 업데이트
      const [result] = await connection.query(
        'UPDATE pilgrimage_packages SET display_order = ? WHERE id = ?',
        [display_order, id]
      );

      if ((result as any).affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: '해당 상품을 찾을 수 없습니다.'
        });
      }

      res.json({
        success: true,
        message: '상품 순서가 성공적으로 업데이트되었습니다.',
        data: { id, display_order }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating package order:', error);
    res.status(500).json({
      success: false,
      message: '상품 순서 업데이트 중 오류가 발생했습니다.'
    });
  }
};

// 성지순례 상품 고정 상태 토글
export const togglePackagePin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { is_pinned } = req.body;

    if (!id || is_pinned === undefined) {
      return res.status(400).json({
        success: false,
        message: '상품 ID와 고정 상태 정보가 필요합니다.'
      });
    }

    const connection = await pool.getConnection();

    try {
      // 상품 고정 상태 업데이트
      const [result] = await connection.query(
        'UPDATE pilgrimage_packages SET is_pinned = ? WHERE id = ?',
        [is_pinned ? 1 : 0, id]
      );

      if ((result as any).affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: '해당 상품을 찾을 수 없습니다.'
        });
      }

      res.json({
        success: true,
        message: `상품이 ${is_pinned ? '고정' : '고정 해제'}되었습니다.`,
        data: { id, is_pinned }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error toggling package pin:', error);
    res.status(500).json({
      success: false,
      message: '상품 고정 상태 변경 중 오류가 발생했습니다.'
    });
  }
};