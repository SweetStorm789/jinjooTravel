import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Admin 사용자 초기화 (개발용)
export const initAdminUser = async (req: Request, res: Response) => {
  try {
    // admin_users 테이블 생성
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        role ENUM('admin', 'moderator') DEFAULT 'admin',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL
      )
    `;

    await pool.query(createTableSQL);
    console.log('admin_users 테이블 생성 완료');

    // 기존 admin 사용자 확인
    const [existingUsers] = await pool.query(
      'SELECT id FROM admin_users WHERE username = ?',
      ['admin']
    ) as [any[], any];

    if (existingUsers.length === 0) {
      // 비밀번호 해시 생성
      const password = 'admin123';
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // admin 사용자 생성
      const insertSQL = `
        INSERT INTO admin_users (username, password_hash, email, full_name, role) 
        VALUES (?, ?, ?, ?, ?)
      `;

      await pool.query(insertSQL, [
        'admin',
        passwordHash,
        'admin@jinjootravel.com',
        '관리자',
        'admin'
      ]);

      console.log('Admin 사용자 생성 완료');
      
      res.json({
        success: true,
        message: 'Admin 사용자가 성공적으로 생성되었습니다.',
        credentials: {
          username: 'admin',
          password: 'admin123'
        }
      });
    } else {
      res.json({
        success: true,
        message: 'Admin 사용자가 이미 존재합니다.',
        credentials: {
          username: 'admin',
          password: 'admin123'
        }
      });
    }

  } catch (error) {
    console.error('Admin 초기화 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Admin 사용자 초기화에 실패했습니다.' 
    });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log('🔐 Admin 로그인 시도:', { username, password: password ? '***' : 'undefined' });

    if (!username || !password) {
      console.log('❌ 사용자명 또는 비밀번호 누락');
      return res.status(400).json({ 
        success: false, 
        message: '사용자명과 비밀번호를 입력해주세요.' 
      });
    }

    // DB에서 admin 사용자 조회
    console.log('🔍 데이터베이스에서 admin 사용자 조회 중...');
    const [rows] = await pool.query(
      'SELECT * FROM admin_users WHERE username = ? AND is_active = true',
      [username]
    ) as [any[], any];

    console.log('📊 조회된 사용자 수:', rows.length);

    if (rows.length === 0) {
      console.log('❌ 사용자를 찾을 수 없음');
      return res.status(401).json({ 
        success: false, 
        message: '잘못된 사용자명 또는 비밀번호입니다.' 
      });
    }

    const admin = rows[0];
    console.log('✅ 사용자 찾음:', { id: admin.id, username: admin.username, is_active: admin.is_active });

    // 비밀번호 검증
    console.log('🔐 비밀번호 검증 중...');
    console.log('📝 DB에 저장된 해시:', admin.password_hash);
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);
    console.log('🔍 비밀번호 일치 여부:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('❌ 비밀번호 불일치');
      return res.status(401).json({ 
        success: false, 
        message: '잘못된 사용자명 또는 비밀번호입니다.' 
      });
    }
    
    console.log('✅ 비밀번호 검증 성공');

    // JWT 토큰 생성
    const token = jwt.sign(
      { 
        id: admin.id, 
        username: admin.username, 
        role: admin.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 마지막 로그인 시간 업데이트
    await pool.query(
      'UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [admin.id]
    );

    res.json({
      success: true,
      message: '로그인 성공',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        fullName: admin.full_name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.' 
    });
  }
};

export const verifyAdminToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      console.log('🔍 Admin token verification: No token provided');
      return res.status(401).json({ 
        success: false, 
        message: '인증 토큰이 필요합니다.' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // DB에서 admin 사용자 확인
    const [rows] = await pool.query(
      'SELECT id, username, full_name, role FROM admin_users WHERE id = ? AND is_active = true',
      [decoded.id]
    ) as [any[], any];

    if (rows.length === 0) {
      console.log('🔍 Admin token verification: User not found or inactive');
      return res.status(401).json({ 
        success: false, 
        message: '유효하지 않은 토큰입니다.' 
      });
    }

    console.log('✅ Admin token verification: Success for user:', rows[0].username);
    res.json({
      success: true,
      admin: rows[0]
    });

  } catch (error) {
    console.log('🔍 Admin token verification: Invalid token format');
    res.status(401).json({ 
      success: false, 
      message: '유효하지 않은 토큰입니다.' 
    });
  }
};

export const adminLogout = async (req: Request, res: Response) => {
  try {
    // 클라이언트에서 토큰을 삭제하도록 응답
    res.json({
      success: true,
      message: '로그아웃 성공'
    });
  } catch (error) {
    console.error('Admin logout error:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.' 
    });
  }
};
