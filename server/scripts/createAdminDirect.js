const pool = require('../src/config/database').default;
const bcrypt = require('bcrypt');

async function createAdminDirect() {
  try {
    console.log('Admin 사용자 생성 시작...');

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
    console.log('✅ admin_users 테이블 생성 완료');

    // 기존 admin 사용자 확인
    const [existingUsers] = await pool.query(
      'SELECT id FROM admin_users WHERE username = ?',
      ['admin']
    );

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

      console.log('✅ Admin 사용자 생성 완료');
      console.log('📝 로그인 정보:');
      console.log('   사용자명: admin');
      console.log('   비밀번호: admin123');
    } else {
      console.log('ℹ️ Admin 사용자가 이미 존재합니다');
      console.log('📝 로그인 정보:');
      console.log('   사용자명: admin');
      console.log('   비밀번호: admin123');
    }

    // 생성된 사용자 확인
    const [users] = await pool.query(
      'SELECT id, username, email, full_name, role, is_active FROM admin_users'
    );

    console.log('\n📊 현재 admin_users 테이블의 사용자들:');
    users.forEach(user => {
      console.log(`   - ID: ${user.id}, 사용자명: ${user.username}, 이메일: ${user.email}, 이름: ${user.full_name}, 역할: ${user.role}, 활성화: ${user.is_active}`);
    });

    console.log('\n🎉 Admin 사용자 생성 완료! 이제 로그인을 시도해보세요.');

  } catch (error) {
    console.error('❌ 오류 발생:', error);
  } finally {
    // pool은 서버에서 계속 사용되므로 end하지 않음
    process.exit(0);
  }
}

createAdminDirect();
